# Contributing

Thanks for helping. The most valuable contributions come from people who have actually run a function (sales, HR, IT, finance and so on) in a real business. Your judgment about what works is the point of this repo.

## Ways to contribute

- **Improve an SOP.** Fix a step that doesn't match how good teams work, add an exception, tighten a quality check.
- **Add a KPI** with a clear formula and data source.
- **Add or improve a skill** that carries out an existing SOP.
- **Build a new department** from the Sales reference (open an issue first so work isn't duplicated).
- **Propose a vertical overlay** for your industry.
- **Report a problem:** an agent instruction that's unsafe, vague or wrong.

## Ground rules

1. **Manual first.** A new skill must carry out an SOP. If the SOP doesn't exist, write it first, in the same pull request.
2. **Every SOP step has an autonomy level** (`A0`–`A3`) and none exceeds the SOP's `max_autonomy`. See [governance](manual/00-company-foundations/governance-and-autonomy.md).
3. **Never automate a hard stop** (signing, moving money, pricing outside policy, hiring or firing decisions, legal commitments).
4. **Vendor-neutral.** Skills name capabilities ("CRM", "email", "calendar"), not products. Product-specific tips go in a department's `tools-and-mcp.md`.
5. **Works without connectors.** Each skill must describe what to do when no connector is available (ask the user to paste or upload).
6. **No real data.** No real customer names, emails, phone numbers or deal figures in examples. Use clearly fictional ones.
7. **No invented statistics.** Starter KPI targets are labeled as starting points to calibrate, not as industry benchmarks, unless a source is cited.
8. **Don't edit generated files:** `departments/*/.claude-plugin/`, `departments/*/skills/*/references/`, `.claude-plugin/marketplace.json`, `packs/`, `manual/*/kpis.md` and `manual/00-company-foundations/roles-directory.md`. Run `npm run build` instead.

## Workflow

```bash
npm install
npm run validate   # schemas, ID references, autonomy rules, links
npm run build      # regenerate adapters, packs and KPI tables
```

Open a pull request with:
- what you changed and why,
- which SOPs, skills and KPIs it touches,
- for new or changed SOPs, a short note on where the practice comes from (your experience, a cited source).

CI runs `npm run validate` and checks that `npm run build` leaves no uncommitted changes.

See the [authoring guide](docs/authoring-guide.md) for file formats, IDs and writing style.

## License

By contributing you agree that your contribution is licensed under the [MIT License](LICENSE).
