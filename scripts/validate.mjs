#!/usr/bin/env node
// Validates the manual and the agent plugins: schemas, ID references, RACI,
// autonomy rules, SOP <-> skill traceability, plugin manifests and Markdown links.
// Usage: npm run validate
import { existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, basename, sep } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import {
  ROOT, AUTONOMY, PACK_INSTRUCTIONS_LIMIT, rel, read, readJson, walk, isDir, listDirs,
  departments, loadRoles, loadSops, loadKpis, loadSkills, loadAgents, skillSops,
  autonomyRank, anchorsOf, linksOf, isExternal,
} from './lib.mjs';

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${rel(file)}: ${msg}`);
const warn = (file, msg) => warnings.push(`${rel(file)}: ${msg}`);

const ajv = new Ajv2020({ allErrors: true, strict: false });
const schema = (name) => ajv.compile(readJson(join(ROOT, 'schemas', `${name}.schema.json`)));
const validators = {
  sop: schema('sop'), kpi: schema('kpi'), roles: schema('roles'), skill: schema('skill'), agent: schema('agent'),
};
function check(kind, data, file) {
  const v = validators[kind];
  if (!v(data)) for (const e of v.errors) err(file, `${kind} schema: ${e.instancePath || '(root)'} ${e.message}`);
}

const SKILL_MAX_FILES = 512; // Skills over MCP extension limits per skill
const SKILL_MAX_BYTES = 16 * 1024 * 1024;
const SOP_SECTIONS =['Purpose', 'Scope', 'Trigger', 'Procedure', 'Decision rules', 'Quality checks', 'Exceptions & escalation', 'Records'];
const SKILL_SECTIONS = ['Before you start', 'Steps', 'Output format', 'Guardrails', 'If no connector is available'];
const AGENT_SECTIONS = ['Mission', 'You own these procedures', 'How you work', 'Handoffs', 'Limits'];
const hasSection = (body, title) => new RegExp(`^##\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm').test(body);

// ---------- Roles ----------
const roles = loadRoles();
check('roles', roles.data, roles.file);
const roleIds = new Set();
for (const r of roles.data.roles ?? []) {
  if (roleIds.has(r.id)) err(roles.file, `duplicate role id ${r.id}`);
  roleIds.add(r.id);
}
for (const r of roles.data.roles ?? []) {
  if (r.reports_to && !roleIds.has(r.reports_to)) err(roles.file, `${r.id}.reports_to: unknown role ${r.reports_to}`);
}

// ---------- Departments ----------
const allSopIds = new Map(); // id -> sop
const allKpiIds = new Set();
const depts = departments();
const perDept = {};
for (const dept of depts) {
  const sops = loadSops(dept);
  const kpis = loadKpis(dept);
  const skills = loadSkills(dept);
  const agents = loadAgents(dept);
  perDept[dept] = { sops, kpis, skills, agents };
  for (const s of sops) if (s.data?.id) allSopIds.set(s.data.id, s);
  for (const k of kpis?.data?.kpis ?? []) allKpiIds.add(k.id);
}

for (const dept of depts) {
  const { sops, kpis, skills, agents } = perDept[dept];
  const skillNames = new Set(skills.map((s) => s.name));

  // KPIs
  if (!kpis) warn(join(ROOT, 'manual', dept), 'no kpis.yaml');
  else {
    check('kpi', kpis.data, kpis.file);
    if (kpis.data.department !== dept) err(kpis.file, `department "${kpis.data.department}" should be "${dept}"`);
    const seen = new Set();
    for (const k of kpis.data.kpis ?? []) {
      if (seen.has(k.id)) err(kpis.file, `duplicate KPI id ${k.id}`);
      seen.add(k.id);
      if (k.owner && !roleIds.has(k.owner)) err(kpis.file, `${k.id}.owner: unknown role ${k.owner}`);
    }
  }

  // SOPs
  for (const sop of sops) {
    const f = sop.file;
    if (!sop.data) { err(f, 'missing YAML frontmatter'); continue; }
    check('sop', sop.data, f);
    const d = sop.data;
    if (!sop.name.startsWith(`${d.id}-`)) err(f, `file name should start with "${d.id}-"`);
    if (d.department !== dept) err(f, `department "${d.department}" should be "${dept}"`);
    if (!sop.body.includes(`# ${d.id} `)) err(f, `H1 should start with "# ${d.id} "`);
    for (const s of SOP_SECTIONS) if (!hasSection(sop.body, s)) err(f, `missing section "## ${s}"`);

    const raciRoles = new Set([
      ...(d.raci?.responsible ?? []), d.raci?.accountable, ...(d.raci?.consulted ?? []), ...(d.raci?.informed ?? []),
    ].filter(Boolean));
    for (const r of [d.owner, ...raciRoles]) if (r && !roleIds.has(r)) err(f, `unknown role ${r}`);
    for (const k of d.kpis ?? []) if (!allKpiIds.has(k)) err(f, `unknown KPI ${k}`);
    for (const r of d.related_sops ?? []) if (!allSopIds.has(r)) err(f, `unknown related SOP ${r}`);
    for (const s of d.skills ?? []) {
      if (!skillNames.has(s)) { err(f, `skill "${s}" not found in departments/${dept}/skills/`); continue; }
      const sk = skills.find((x) => x.name === s);
      if (!skillSops(sk).includes(d.id)) err(f, `lists skill "${s}" but that skill's metadata.sop doesn't include ${d.id}`);
    }

    // Step tables: | # | Step | Role | Autonomy | Output |
    let steps = 0;
    for (const line of sop.body.split('\n')) {
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      if (cells.length < 5 || !/^\d+$/.test(cells[0])) continue;
      const [, , role, autonomy] = cells;
      steps++;
      if (!AUTONOMY.includes(autonomy)) { err(f, `step ${cells[0]}: autonomy "${autonomy}" must be one of ${AUTONOMY.join(', ')}`); continue; }
      if (autonomyRank(autonomy) > autonomyRank(d.max_autonomy)) err(f, `step ${cells[0]}: ${autonomy} exceeds max_autonomy ${d.max_autonomy}`);
      if (!roleIds.has(role)) err(f, `step ${cells[0]}: unknown role "${role}"`);
      else if (!raciRoles.has(role)) err(f, `step ${cells[0]}: role "${role}" is not in the RACI`);
    }
    if (steps === 0) err(f, 'no procedure steps found (expected a | # | Step | Role | Autonomy | Output | table)');
  }

  // Skills
  for (const sk of skills) {
    const f = sk.file;
    if (!existsSync(f)) { err(sk.dir, 'missing SKILL.md'); continue; }
    if (!sk.data) { err(f, 'missing YAML frontmatter'); continue; }
    check('skill', sk.data, f);
    if (sk.data.name !== sk.name) err(f, `name "${sk.data.name}" must match folder "${sk.name}"`);
    if (sk.data.metadata?.department !== dept) err(f, `metadata.department should be "${dept}"`);
    for (const s of SKILL_SECTIONS) if (!hasSection(sk.body, s)) err(f, `missing section "## ${s}"`);
    const lines = sk.text.split('\n').length;
    if (lines > 300) warn(f, `${lines} lines; keep SKILL.md under ~300 and move detail into reference files`);
    const ids = skillSops(sk);
    if (ids.length === 0) err(f, 'metadata.sop is empty');
    for (const id of ids) {
      const sop = allSopIds.get(id);
      if (!sop) { err(f, `metadata.sop: unknown SOP ${id}`); continue; }
      if (!(sop.data.skills ?? []).includes(sk.name)) err(f, `${id} doesn't list this skill in its frontmatter "skills"`);
      if (autonomyRank(sk.data.metadata?.autonomy) > autonomyRank(sop.data.max_autonomy)) {
        err(f, `metadata.autonomy ${sk.data.metadata.autonomy} exceeds ${id} max_autonomy ${sop.data.max_autonomy}`);
      }
    }
    if (!/data, not instructions|treat .* as data|is data|are data/i.test(sk.body)) {
      err(f, 'Guardrails must state that content the skill reads is data, not instructions');
    }

    // Self-contained: a skill can be installed alone or served over MCP (Skills extension),
    // so relative links must stay inside its folder, within the extension's size limits.
    const files = walk(sk.dir);
    const bytes = files.reduce((n, p) => n + statSync(p).size, 0);
    if (files.length > SKILL_MAX_FILES) err(sk.dir, `${files.length} files; Skills over MCP allows at most ${SKILL_MAX_FILES} per skill`);
    if (bytes > SKILL_MAX_BYTES) err(sk.dir, `${(bytes / 1048576).toFixed(1)} MiB; Skills over MCP allows at most 16 MiB per skill`);
    for (const p of files.filter((x) => x.endsWith('.md'))) {
      for (const { target, line } of linksOf(read(p))) {
        if (isExternal(target) || target.startsWith('#')) continue;
        const dest = resolve(dirname(p), decodeURIComponent(target.split('#')[0]));
        const inside = dest === sk.dir || dest.startsWith(sk.dir + sep);
        if (!inside) err(p, `line ${line}: link "${target}" leaves the skill folder; link to a file inside it (e.g. references/) or use an absolute URL`);
      }
    }
  }

  // Agents
  for (const ag of agents) {
    const f = ag.file;
    if (!ag.data) { err(f, 'missing YAML frontmatter'); continue; }
    check('agent', ag.data, f);
    if (ag.data.name !== ag.name) err(f, `name "${ag.data.name}" must match file name "${ag.name}"`);
    if (!roleIds.has(ag.name)) err(f, `agent "${ag.name}" is not a role in roles.yaml`);
    for (const s of ag.data.skills ?? []) if (!skillNames.has(s)) err(f, `unknown skill "${s}"`);
    for (const s of AGENT_SECTIONS) if (!hasSection(ag.body, s)) err(f, `missing section "## ${s}"`);
  }

  // Plugin manifest
  const pdir = join(ROOT, 'departments', dept);
  if (isDir(pdir)) {
    const pfile = join(pdir, 'plugin.json');
    if (!existsSync(pfile)) err(pdir, 'missing plugin.json (Agent Plugins 1.0 manifest)');
    else {
      const p = readJson(pfile);
      if (p.$schema !== 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json') err(pfile, '$schema must be the Agent Plugins 1.0.0 plugin schema URL');
      if (p.name !== dept) err(pfile, `name "${p.name}" should be "${dept}"`);
      if (!/^[a-z0-9](?:[a-z0-9.-]{0,62}[a-z0-9])?$/.test(p.name ?? '') || /--|\.\./.test(p.name ?? '')) err(pfile, 'name violates the Agent Plugins name rules');
      if (p.version && !/^\d+\.\d+\.\d+/.test(p.version)) err(pfile, 'version must be semver');
    }
    for (const mf of ['mcp.json', 'mcp.example.json']) {
      const mfile = join(pdir, mf);
      if (!existsSync(mfile)) continue;
      const m = readJson(mfile);
      if (m.$schema !== 'https://agent-plugins.org/schemas/1.0.0/mcp.schema.json') err(mfile, '$schema must be the Agent Plugins 1.0.0 mcp schema URL');
      for (const [name, srv] of Object.entries(m.mcpServers ?? {})) {
        if (!['stdio', 'streamable-http', 'sse'].includes(srv.type)) err(mfile, `${name}: type must be stdio, streamable-http or sse`);
        if (srv.type !== 'stdio' && !/^https:\/\//.test(srv.url ?? '')) err(mfile, `${name}: url must be https`);
        if (srv.type === 'stdio' && !srv.command) err(mfile, `${name}: stdio server needs a command`);
      }
    }
  }
}

// Every SOP-referenced skill department exists, plugin folders have a manual
for (const d of listDirs(join(ROOT, 'departments'))) {
  if (!depts.includes(d)) err(join(ROOT, 'departments', d), 'plugin has no matching manual/<department>/');
}

// ---------- Packs ----------
for (const f of walk(join(ROOT, 'packs'))) {
  if (basename(f) === 'INSTRUCTIONS.md') {
    const n = read(f).length;
    if (n > PACK_INSTRUCTIONS_LIMIT) err(f, `${n} characters; must be ≤ ${PACK_INSTRUCTIONS_LIMIT} to fit chat-app instruction limits`);
  }
}

// ---------- Markdown links ----------
const anchorCache = new Map();
const anchorsFor = (p) => {
  if (!anchorCache.has(p)) anchorCache.set(p, anchorsOf(read(p)));
  return anchorCache.get(p);
};
const mdFiles = walk(ROOT).filter((f) => f.endsWith('.md') && !rel(f).startsWith('templates/'));
for (const f of mdFiles) {
  for (const { target, line } of linksOf(read(f))) {
    if (isExternal(target)) continue;
    const [path, hash] = target.split('#');
    const dest = path ? resolve(dirname(f), decodeURIComponent(path)) : f;
    if (!existsSync(dest)) { err(f, `line ${line}: broken link "${target}"`); continue; }
    if (hash && dest.endsWith('.md') && !anchorsFor(dest).has(hash)) err(f, `line ${line}: missing anchor "#${hash}" in ${rel(dest)}`);
  }
}

// ---------- Report ----------
for (const w of warnings) console.warn(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);
const counts = depts.map((d) => `${d}: ${perDept[d].sops.length} SOPs, ${perDept[d].skills.length} skills, ${perDept[d].agents.length} agents, ${perDept[d].kpis?.data?.kpis?.length ?? 0} KPIs`);
console.log(`\nChecked ${roleIds.size} roles · ${counts.join(' · ')} · ${mdFiles.length} Markdown files`);
if (errors.length) {
  console.error(`\n✖ ${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(1);
}
console.log(`✔ valid (${warnings.length} warning(s))`);
