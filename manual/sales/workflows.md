# Sales workflows

## Lead to cash (end to end)

```mermaid
flowchart TD
  IN[Inbound lead<br/>form, call, referral] --> Q
  OUT[Outbound prospecting<br/>SAL-SOP-002] --> Q
  Q{Qualify<br/>SAL-SOP-001}
  Q -- "C/D: not a fit" --> NUR[Return to marketing<br/>nurture with reason]
  Q -- "A/B: fit" --> S1[Stage 1 Qualified<br/>meeting booked]
  S1 --> DISC[Discovery call<br/>SAL-SOP-003]
  DISC -- "no real pain / no path to buyer" --> LOST[Closed lost<br/>reason recorded]
  DISC --> S2[Stage 2 Discovery<br/>exit criteria met]
  S2 --> S3[Stage 3 Solution<br/>scope + success criteria]
  S3 --> PROP[Proposal & quote<br/>SAL-SOP-004]
  PROP --> S4[Stage 4 Proposal]
  S4 -- "outside policy" --> APP[Approval:<br/>head-of-sales / owner-ceo]
  APP --> S4
  S4 --> S5[Stage 5 Commit]
  S5 --> SIGN[Signature by customer<br/>human only]
  SIGN --> WON[Closed won]
  WON --> HO[Handoff to delivery<br/>SAL-SOP-006]
  S4 -- "declined" --> LOST
  S5 -- "slipped / lost" --> LOST
  WON --> WL[Win/loss review<br/>SAL-SOP-008]
  LOST --> WL
```

## Weekly rhythm

```mermaid
flowchart LR
  H[Every day:<br/>CRM updated after each call<br/>SAL-SOP-007] --> A
  A[Monday:<br/>hygiene audit<br/>audit-crm-hygiene] --> B[Tuesday:<br/>pipeline review & forecast<br/>SAL-SOP-005]
  B --> C[Deal actions<br/>owners + dates]
  C --> D[Friday:<br/>forecast snapshot]
  D --> M[Monthly:<br/>win/loss review<br/>SAL-SOP-008]
```

| When | What | SOP | Skill |
|---|---|---|---|
| Within 1 hour of a lead arriving (business hours) | Qualify and respond | SAL-SOP-001 | `qualify-lead` |
| Daily | Outbound research and drafted outreach | SAL-SOP-002 | `research-prospect`, `draft-outreach` |
| Before every discovery call | Call plan | SAL-SOP-003 | `prep-discovery-call` |
| Within 24 hours after every sales call | Summary, CRM update, follow-up email | SAL-SOP-003 | `summarize-sales-call` |
| Monday | Hygiene audit, fixes assigned to owners | SAL-SOP-007 | `audit-crm-hygiene` |
| Weekly pipeline meeting | Pipeline review, forecast call | SAL-SOP-005 | `review-pipeline` |
| Within 1 business day of signature | Handoff package | SAL-SOP-006 | `handoff-closed-deal` |
| Monthly | Win/loss themes | SAL-SOP-008 | `analyze-win-loss` |

## Where humans must act

These points are never delegated to an agent, whatever the autonomy settings say (see [hard stops](../00-company-foundations/governance-and-autonomy.md#hard-stops)):

- approving any discount, credit or term outside policy,
- sending a contract for signature and signing anything,
- committing delivery dates or scope that delivery hasn't confirmed,
- first outreach to a prospect's executive team, unless the business has approved the template and the list.
