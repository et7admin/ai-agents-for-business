# Sales roles and RACI

Role IDs come from the [roles directory](../00-company-foundations/roles-directory.md).

## Roles

| Role | Owns | Typical weekly time on | Agent |
|---|---|---|---|
| **head-of-sales** | Revenue target, sales process, pricing application, team performance | Forecast, strategic deals, coaching, hiring | — (use `sales-manager`) |
| **sales-manager** | Pipeline health, deal approvals within delegated limits, coaching | Pipeline review, deal reviews, one-to-ones | [`sales-manager`](../../departments/sales/agents/sales-manager.md) |
| **account-executive** | Opportunities from discovery to signature, handoff | Discovery, demos, proposals, negotiation | [`account-executive`](../../departments/sales/agents/account-executive.md) |
| **sales-development-rep** | Lead response, qualification, outbound prospecting, meetings booked | Calls, emails, research | [`sales-development-rep`](../../departments/sales/agents/sales-development-rep.md) |
| **solutions-engineer** | Technical fit, scoping, demos, feasibility | Discovery support, demos, scoping | — |
| **sales-operations** | CRM, data quality, reports, forecast mechanics, tools | Audits, dashboards, admin | [`sales-operations`](../../departments/sales/agents/sales-operations.md) |

## RACI by procedure

**R** responsible (does the work) · **A** accountable (one per SOP; signs off) · **C** consulted (gives input before) · **I** informed (told after).

| SOP | head-of-sales | sales-manager | account-executive | sales-development-rep | solutions-engineer | sales-operations | head-of-marketing | customer-success-manager | finance-manager | legal-counsel | owner-ceo |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [001 Lead qualification](sops/SAL-SOP-001-lead-qualification.md) |  | **A** | I | **R** |  |  | C |  |  |  |  |
| [002 Prospecting & outreach](sops/SAL-SOP-002-prospecting-and-outreach.md) |  | **A** | I | **R** |  |  | C |  |  |  |  |
| [003 Discovery call](sops/SAL-SOP-003-discovery-call.md) |  | **A** | **R** | I | C |  |  |  |  |  |  |
| [004 Proposal & quote](sops/SAL-SOP-004-proposal-and-quote.md) | **A** | I | **R** |  | C |  |  |  | C | C | C |
| [005 Pipeline review & forecast](sops/SAL-SOP-005-pipeline-review-and-forecast.md) | **A** | **R** | C |  |  | C |  |  | I |  | I |
| [006 Closed-deal handoff](sops/SAL-SOP-006-closed-deal-handoff.md) |  | **A** | **R** |  | C |  |  | C | I |  |  |
| [007 CRM data hygiene](sops/SAL-SOP-007-crm-data-hygiene.md) | **A** | I | C | C |  | **R** |  |  |  |  |  |
| [008 Win/loss review](sops/SAL-SOP-008-win-loss-review.md) | **A** | **R** | C |  |  |  | C | C |  |  | I |

Consulted roles on SOP 004 are only needed when the deal triggers them: finance for non-standard payment terms, legal for non-standard contract terms, owner-ceo for pricing exceptions beyond the head of sales's limit.

## How roles collapse in a small business

You don't need six people to run this. The RACI still holds: it tells one person which hat they're wearing.

| Team size | Who holds what | Where agents help most |
|---|---|---|
| **Solo / founder-led (1–3)** | The owner is head-of-sales, sales-manager and account-executive. An office manager or the owner does sales-operations. | `qualify-lead`, `research-prospect` and `draft-outreach` do SDR work at A1; `audit-crm-hygiene` stops the CRM from rotting |
| **Small team (4–15)** | Owner or senior seller is head-of-sales + sales-manager. One or two sellers act as account-executive + sales-development-rep. A delivery lead acts as solutions-engineer. | `prep-discovery-call`, `summarize-sales-call` and `build-proposal` give the sellers back hours each week; `review-pipeline` runs the weekly meeting |
| **Growing team (15–50)** | Dedicated SDRs and AEs, a sales manager, part-time sales ops. | All skills, with A2/A3 for logging and CRM updates once trusted |
| **Larger (50+)** | Every role is separate, often several per role. | Consistency at scale: the same SOP and skill for every rep |

## Separation of duties

- The person who **negotiates** a deal does not **approve** its discount outside their own limit.
- **Forecast categories** are set by the account-executive but challenged in the pipeline review by the sales-manager.
- Agents never approve anything. Approval is a human action (see [governance](../00-company-foundations/governance-and-autonomy.md)).
