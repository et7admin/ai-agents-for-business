# Vertical overlays (planned)

An overlay adapts the department manuals and agents to one industry without forking them. It will:

- **add** industry SOPs (for example, patient intake for a clinic, or ticket SLAs for an MSP),
- **extend** department SOPs with extra steps or stricter autonomy limits (for example, HIPAA handling in HR and IT),
- **add** industry KPIs, tools and MCP connectors,
- **declare** its compliance rules in one place, for every agent to respect.

Planned format: `verticals/<industry>/overlay.yaml` declaring which department SOPs it extends or replaces, plus `sops/`, `kpis.yaml` and `skills/` folders that follow the same schemas as the departments.

Candidate industries and their order are in the [roadmap](../ROADMAP.md#phase-5-vertical-overlays). To propose one, open an issue describing the industry, the SOPs that differ most from the generic departments, and the regulations involved.
