# AI Agents for Business

**An open-source business operations manual, plus the AI agents that run it.**

Each department has written procedures: roles, responsibilities, SOPs, workflows, KPIs, tools and connectors. Each department also ships as a portable agent plugin whose skills carry out those procedures step by step, and the human approval steps are built in. You can use the manual without any AI, or you can use the agents knowing exactly which written procedure they follow.

> **Status:** early build. The **Sales** department is complete and is the reference for every other department. See the [roadmap](ROADMAP.md).

---

## Why this exists

Most "AI agents for business" collections are lists of prompts. They tell a model to *act like* a sales rep. They don't say what the sales process is, who owns each step, what must be approved, or how success is measured.

This repo starts from how a well-run business actually operates:

| Layer | What it gives you | Where it lives |
|---|---|---|
| **Operations manual** | Department charters, roles and RACI, numbered SOPs, workflows, KPIs, tool stacks | [`manual/`](manual/) |
| **Agent plugins** | Skills that carry out each SOP, role agents that coordinate them, connector configs | [`departments/`](departments/) |
| **Vertical overlays** | Industry-specific SOPs, compliance rules and KPIs layered on top of the departments | [`verticals/`](verticals/) *(planned)* |
| **Governance** | Autonomy levels (what an agent may do on its own and what needs a human), hard stops, audit rules | [`manual/00-company-foundations/`](manual/00-company-foundations/) |

Every skill names the SOP it carries out, and every SOP step is tagged with the most an agent may do at that step. That link is what makes the agents trustworthy enough to use in a real business.

**Tool skills vs. process skills.** Software vendors now ship skills inside their own connectors that teach an agent *how to use their tool* (how to update a deal in a given CRM, say). This repo ships the layer above: *how to run the department*, meaning which deals to work on, what must be approved, and what good looks like. The two work together. Our skills name capabilities ("the CRM") and leave tool mechanics to the vendor's skills and connectors.

## Departments

| Department | Manual | Agent plugin | Status |
|---|---|---|---|
| Company foundations | [manual](manual/00-company-foundations/) | — | ✅ v0.1 |
| Sales | [manual](manual/sales/) | [plugin](departments/sales/) | ✅ v0.1 (reference) |
| Marketing | — | — | Planned |
| Customer Support & Success | — | — | Planned |
| HR / People | — | — | Planned |
| IT | — | — | Planned |
| Finance & Accounting | — | — | Planned |
| Operations | — | — | Planned |
| Legal & Compliance, Procurement, Product, Executive | — | — | Later |

## Three ways to use it

**1. As a manual (no AI needed).** Copy the SOPs, RACI charts and KPI definitions into your own wiki or handbook and adapt them. Start with [company foundations](manual/00-company-foundations/), then the department you need.

**2. In an AI agent tool** (Claude Code, Codex, Cursor, GitHub Copilot, VS Code and others that support [Agent Skills](https://agentskills.io) and [Agent Plugins](https://agent-plugins.org)).

Claude Code:

```bash
claude plugin marketplace add et7admin/ai-agents-for-business
claude plugin install business-sales@ai-agents-for-business
```

Other tools: copy `departments/<department>/skills/` into the skills folder your tool reads (for example `.agents/skills/` or `.claude/skills/`). See [getting started](docs/getting-started.md).

**3. In a chat app** (Claude Projects, ChatGPT custom GPTs, Microsoft Copilot agents). Each role agent is also built as a pack in [`packs/`](packs/): paste `INSTRUCTIONS.md` into the project or GPT instructions, and upload `KNOWLEDGE.md` plus your business context file as knowledge.

**4. Coming: as one connector URL.** MCP servers can now serve skills directly ([Skills over MCP](https://modelcontextprotocol.io/extensions/skills/overview)). We plan a server that publishes every department's skills, so a business adds one connector and gets updates automatically. See the [roadmap](ROADMAP.md#phase-2-skills-over-mcp-server).

### Tell the agents about your business

Copy [`templates/business-context.md`](templates/business-context.md), fill it in (what you sell, who you sell to, pricing rules, tone, tools, approval limits) and keep it where your agents can read it. Every skill reads it first, so the same agents fit a 3-person agency and a 300-person distributor.

## Design principles

1. **Manual first.** Agents carry out documented procedures. They don't make up a process.
2. **Humans approve what matters.** Every SOP step has an autonomy level, from `A0` (observe only) to `A3` (act within set limits). Some actions are never automated: signing contracts, moving money, changing prices outside policy. See [governance](manual/00-company-foundations/governance-and-autonomy.md).
3. **Vendor-neutral.** Written once in open formats (Agent Skills `SKILL.md` and Agent Plugins `plugin.json`/`mcp.json`), then built for specific tools. Skills refer to *capabilities* such as "CRM" or "email", not to products, so they work with HubSpot, Salesforce, Pipedrive or a spreadsheet.
4. **Works without connectors.** Each skill runs with whatever the user can paste or upload. Connectors (MCP servers) make it faster, not possible.
5. **Measurable.** Every SOP links to KPIs with formulas, data sources and owners.

## Repository layout

```
manual/                     Business operations manual (plain Markdown)
  00-company-foundations/   Governance, autonomy levels, roles directory, numbering
  sales/                    Charter, roles & RACI, SOPs, workflows, KPIs, tools & MCP
departments/                One Agent Plugin per department
  sales/
    plugin.json             Agent Plugins 1.0 manifest
    mcp.example.json        Connector options to copy (none are switched on by default)
    skills/<skill>/SKILL.md Agent Skills, each tied to an SOP
    agents/<role>.md        Role agents that coordinate the skills
    .claude-plugin/         Generated Claude Code adapter (do not edit)
packs/                      Generated copy-paste packs for chat apps (do not edit)
templates/                  Templates for SOPs, KPIs, skills, agents, business context
schemas/                    JSON Schemas for SOP, KPI, skill and agent metadata
scripts/                    validate.mjs, build.mjs
docs/                       Architecture, getting started, authoring guide
```

## Contributing

Contributions are welcome, especially from people who have run these functions in a real business. Read [CONTRIBUTING.md](CONTRIBUTING.md) and [docs/authoring-guide.md](docs/authoring-guide.md). Every pull request is checked with `npm run validate`.

## Disclaimer

This repo gives general operational guidance, not legal, tax, financial or employment advice. Check SOPs that touch regulated areas (employment law, privacy, payments, contracts) with a qualified professional in your jurisdiction before you adopt them. You are responsible for what your agents do. Start at low autonomy levels and raise them only when the results earn it.

## License

[MIT](LICENSE). Use it, adapt it, sell services built on it.
