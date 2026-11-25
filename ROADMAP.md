# Roadmap

## Phase 1: Foundation and reference department ✅ in progress
- [x] Repo structure, license, contribution rules
- [x] Schemas and templates for SOPs, KPIs, skills, agents and business context
- [x] Company foundations: governance and autonomy levels, roles directory, numbering
- [x] Sales manual: charter, roles and RACI, 8 SOPs, workflows, KPIs, tools and MCP
- [x] Sales plugin: skills tied to SOPs, role agents, connector config
- [x] Validator, build script (Claude Code adapter and chat packs), CI

## Phase 2: Skills over MCP server
A small, stateless MCP server in `servers/skills-mcp/` that serves every department's skills through the [Skills over MCP extension](https://modelcontextprotocol.io/extensions/skills/overview) (`io.modelcontextprotocol/skills`), generated from this repo by `npm run build`.

- [ ] Serve `skills/list`, `skills/get` and `resources/read` with `skill://<department>/<skill>/SKILL.md` URIs and per-file SHA-256 digests, so clients see updates and ask users to re-approve changed skills
- [ ] Load supporting files (`references/`) on demand only, as the spec requires
- [ ] Deploy as a public, read-only endpoint, and document self-hosting for businesses that want their own
- [ ] Optional: serve a business's own `business-context.md` as a private resource in self-hosted setups
- [ ] Later: action tools that use **elicitation** for A2 approvals, **tasks** for long audits and reports, and **MCP Apps** for an approval inbox and pipeline review screen

Status of the extension (checked 2026-11-24): public beta in Claude and Claude Code. On by default for Pro, Max and Ultra; Team needs an admin to enable it; Enterprise is coming soon. SDK and other-client support is still in progress, so the plugin, skill folders and chat packs remain the main ways to install.

## Phase 3: Core departments
Built from the Sales reference, one department per pull request, each reviewed against the [authoring guide](docs/authoring-guide.md).

| Department | Planned SOP prefix | Example SOPs |
|---|---|---|
| Marketing | `MKT` | Campaign planning, content production, SEO, email programs, lead handoff to sales, brand review |
| Customer Support & Success | `CS` | Ticket triage, escalation, onboarding, health scoring, renewals, churn save |
| HR / People | `HR` | Requisition, hiring, onboarding, performance reviews, offboarding, policy questions |
| IT | `IT` | Access requests, device setup, patching, incident response, backup checks, vendor/SaaS review |
| Finance & Accounting | `FIN` | Invoicing and collections, AP, expense review, month-end close, budgeting, cash forecast |
| Operations | `OPS` | Vendor management, inventory, quality checks, project intake, process improvement |

## Phase 4: Remaining departments
Legal & Compliance (`LEG`), Procurement (`PRC`), Product (`PRD`), Executive / Strategy (`EXE`).

## Phase 5: Vertical overlays
Overlays add or override SOPs, compliance rules, KPIs and tools for an industry without forking the departments. Candidates, ranked by demand and how much regulation they carry:

- Managed service providers and IT services
- Healthcare practices and clinics (HIPAA)
- Accounting and bookkeeping firms
- Law firms
- Real estate brokerages
- Construction and home-services trades
- E-commerce and retail
- Restaurants and hospitality
- Manufacturing and distribution
- Agencies and professional services

## Phase 6: Distribution
- Documentation site
- Versioned releases and changelog
- Listings in plugin marketplaces and skill directories
- Example runtime: one end-to-end coded agent in `examples/` for teams that want to self-host
