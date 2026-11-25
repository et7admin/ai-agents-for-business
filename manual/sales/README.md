# Sales

**Purpose:** turn qualified demand into signed, well-fitting customers, predictably, and hand them to delivery with nothing lost.

## Scope
**In:** lead qualification, outbound prospecting, discovery, solution shaping, proposals and quotes, negotiation within policy, forecasting, CRM data quality, closed-deal handoff, win/loss learning.

**Out:** demand generation and campaigns (Marketing), contract law (Legal), billing and credit (Finance), delivery and onboarding (Customer Success / Operations), pricing *policy* (owner-ceo). Sales applies pricing policy but doesn't set it.

## Outcomes and headline KPIs
| Outcome | KPI |
|---|---|
| Leads are handled fast and fairly | [SAL-KPI-001 Speed to lead](kpis.md#sal-kpi-001) |
| The pipeline is big enough and real | [SAL-KPI-007 Pipeline coverage](kpis.md#sal-kpi-007) |
| We win the deals we should win | [SAL-KPI-004 Win rate](kpis.md#sal-kpi-004) |
| Revenue is predictable | [SAL-KPI-008 Forecast accuracy](kpis.md#sal-kpi-008) |
| Customers start well | [SAL-KPI-014 Handoff completeness](kpis.md#sal-kpi-014) |

All KPIs: [kpis.md](kpis.md).

## Standard pipeline stages

Use these as the shared language. Map your CRM's stage names to them in `business-context.md` (section 7). A deal moves forward only when the **exit criteria** are met: activity alone doesn't move it.

| Stage | Meaning | Exit criteria (all required) | Starter probability* |
|---|---|---|---|
| **1 Qualified** | Lead accepted as a real potential buyer | Lead score A or B ([SAL-SOP-001](sops/SAL-SOP-001-lead-qualification.md)); a named contact; a first meeting booked | 10% |
| **2 Discovery** | Understanding the problem and buying process | Pain and its business impact documented; decision process and economic buyer identified; timeline known | 20% |
| **3 Solution** | Shaping and validating a solution | Solution fits the stated pain; technical or delivery feasibility confirmed; success criteria agreed with the buyer | 40% |
| **4 Proposal** | Formal offer delivered | Proposal or quote sent within policy ([SAL-SOP-004](sops/SAL-SOP-004-proposal-and-quote.md)); review meeting held or booked | 60% |
| **5 Commit** | Buyer has verbally chosen us | Economic buyer verbally agreed; paperwork path and close date confirmed; no open blocking issues | 80% |
| **Closed won** | Signed | Signed contract or PO received; handoff complete ([SAL-SOP-006](sops/SAL-SOP-006-closed-deal-handoff.md)) | 100% |
| **Closed lost** | Not proceeding | Loss reason recorded ([SAL-SOP-007](sops/SAL-SOP-007-crm-data-hygiene.md)) | 0% |

\*Starter probabilities are a starting point for weighted forecasts. Replace them with your own historical stage-to-close rates once you have about 30 closed deals.

## Procedures

| SOP | Title | Main role | Skill(s) |
|---|---|---|---|
| [SAL-SOP-001](sops/SAL-SOP-001-lead-qualification.md) | Lead intake and qualification | sales-development-rep | `qualify-lead` |
| [SAL-SOP-002](sops/SAL-SOP-002-prospecting-and-outreach.md) | Prospect research and outbound outreach | sales-development-rep | `research-prospect`, `draft-outreach` |
| [SAL-SOP-003](sops/SAL-SOP-003-discovery-call.md) | Discovery call | account-executive | `prep-discovery-call`, `summarize-sales-call` |
| [SAL-SOP-004](sops/SAL-SOP-004-proposal-and-quote.md) | Proposal and quote | account-executive | `build-proposal` |
| [SAL-SOP-005](sops/SAL-SOP-005-pipeline-review-and-forecast.md) | Weekly pipeline review and forecast | sales-manager | `review-pipeline` |
| [SAL-SOP-006](sops/SAL-SOP-006-closed-deal-handoff.md) | Closed-won handoff to delivery | account-executive | `handoff-closed-deal` |
| [SAL-SOP-007](sops/SAL-SOP-007-crm-data-hygiene.md) | CRM data hygiene | sales-operations | `audit-crm-hygiene` |
| [SAL-SOP-008](sops/SAL-SOP-008-win-loss-review.md) | Win/loss review | head-of-sales | `analyze-win-loss` |

End-to-end flow: [workflows.md](workflows.md). Who does what: [roles-and-raci.md](roles-and-raci.md). Tools and connectors: [tools-and-mcp.md](tools-and-mcp.md).

## Interfaces with other departments
| With | Sales receives | Sales gives |
|---|---|---|
| Marketing | Leads with source and context; content and case studies | Lead feedback (accepted/rejected + reason); win/loss themes; customer language |
| Customer Success / Operations | Delivery capacity and feasibility input | Handoff package for every closed deal |
| Finance | Credit checks, billing setup, approval of non-standard payment terms | Signed contract details, billing schedule |
| Legal | Review of non-standard terms | Redlines and the business context of the ask |
| Owner / CEO | Pricing policy, discount authority, strategic accounts | Forecast, pipeline risks, market feedback |

## Agents in this department
[`departments/sales/`](../../departments/sales/): the `sales-development-rep`, `account-executive`, `sales-manager` and `sales-operations` role agents plus 10 skills.
