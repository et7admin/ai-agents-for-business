// Shared helpers for validate.mjs and build.mjs. No side effects on import.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const REPO_URL = 'https://github.com/et7admin/ai-agents-for-business';
export const BRANCH = 'main';
export const AUTONOMY = ['A0', 'A1', 'A2', 'A3'];
export const PACK_INSTRUCTIONS_LIMIT = 8000; // custom GPT instructions limit (characters)

export const rel = (p) => relative(ROOT, p).split(sep).join('/');
export const read = (p) => readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
export const readYaml = (p) => YAML.parse(read(p));
export const readJson = (p) => JSON.parse(read(p));
export const isDir = (p) => existsSync(p) && statSync(p).isDirectory();

export function listDirs(p) {
  if (!isDir(p)) return [];
  return readdirSync(p).filter((n) => isDir(join(p, n))).sort();
}

export function walk(dir, { skip = ['node_modules', '.git'] } = {}) {
  const out = [];
  if (!isDir(dir)) return out;
  for (const name of readdirSync(dir).sort()) {
    if (skip.includes(name)) continue;
    const p = join(dir, name);
    if (isDir(p)) out.push(...walk(p, { skip }));
    else out.push(p);
  }
  return out;
}

/** Split a Markdown file into { data, body, raw }. data is null when there is no frontmatter. */
export function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: null, body: text, raw: '' };
  return { data: YAML.parse(m[1]), body: m[2], raw: m[1] };
}

export const autonomyRank = (a) => AUTONOMY.indexOf(a);

/** Departments = folders in manual/ except 00-company-foundations. */
export function departments() {
  return listDirs(join(ROOT, 'manual')).filter((d) => !d.startsWith('00-'));
}

export function loadRoles() {
  const file = join(ROOT, 'manual', '00-company-foundations', 'roles.yaml');
  return { file, data: readYaml(file) };
}

export function loadSops(dept) {
  const dir = join(ROOT, 'manual', dept, 'sops');
  if (!isDir(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const file = join(dir, f);
      const text = read(file);
      return { file, name: f, text, ...parseFrontmatter(text) };
    });
}

export function loadKpis(dept) {
  const file = join(ROOT, 'manual', dept, 'kpis.yaml');
  if (!existsSync(file)) return null;
  return { file, data: readYaml(file) };
}

export function loadSkills(dept) {
  const dir = join(ROOT, 'departments', dept, 'skills');
  return listDirs(dir).map((name) => {
    const file = join(dir, name, 'SKILL.md');
    const text = existsSync(file) ? read(file) : '';
    return { name, dir: join(dir, name), file, text, ...parseFrontmatter(text) };
  });
}

export function loadAgents(dept) {
  const dir = join(ROOT, 'departments', dept, 'agents');
  if (!isDir(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const file = join(dir, f);
      const text = read(file);
      return { file, name: f.replace(/\.md$/, ''), text, ...parseFrontmatter(text) };
    });
}

export const skillSops = (skill) =>
  String(skill.data?.metadata?.sop ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

/** GitHub-style heading slug. */
export function slugify(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .replace(/\s/g, '-');
}

/** All anchor targets in a Markdown document (headings with GitHub dedupe, plus explicit ids). */
export function anchorsOf(markdown) {
  const anchors = new Set();
  const counts = new Map();
  let inFence = false;
  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const h = line.match(/^#{1,6}\s+(.*?)\s*#*\s*$/);
    if (h) {
      const base = slugify(h[1].replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[`*_]/g, ''));
      const n = counts.get(base) ?? 0;
      anchors.add(n === 0 ? base : `${base}-${n}`);
      counts.set(base, n + 1);
    }
    for (const m of line.matchAll(/<a\s+(?:id|name)="([^"]+)"/g)) anchors.add(m[1]);
  }
  return anchors;
}

/** Markdown links outside code fences and inline code: [{ text, target, line }]. */
export function linksOf(markdown) {
  const links = [];
  let inFence = false;
  markdown.split('\n').forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) return;
    const clean = line.replace(/`[^`]*`/g, '');
    for (const m of clean.matchAll(/\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      links.push({ text: m[1], target: m[2], line: i + 1 });
    }
  });
  return links;
}

export const isExternal = (t) => /^(https?:|mailto:|tel:)/i.test(t);

/** Rewrite relative links in a Markdown file (located at srcFile) to absolute GitHub URLs. */
export function absolutizeLinks(markdown, srcFile) {
  return markdown.replace(/\]\(([^)\s]+)\)/g, (whole, target) => {
    if (isExternal(target) || target.startsWith('#')) return whole;
    const [path, hash] = target.split('#');
    const abs = resolve(dirname(srcFile), path);
    const kind = isDir(abs) ? 'tree' : 'blob';
    const url = `${REPO_URL}/${kind}/${BRANCH}/${rel(abs)}${hash ? `#${hash}` : ''}`;
    return `](${url})`;
  });
}
