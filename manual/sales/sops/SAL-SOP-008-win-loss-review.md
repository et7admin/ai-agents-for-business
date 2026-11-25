---
id: SAL-SOP-008
title: Win/loss review
department: sales
version: 0.1.0
status: active
owner: head-of-sales
raci:
  responsible: [sales-manager]
  accountable: head-of-sales
  consulted: [account-executive, head-of-marketing, customer-success-manager]
  informed: [owner-ceo]
trigger: Monthly, covering deals closed in the previous month that meet the review threshold.
frequency: monthly
inputs:
  - Closed opportunities from the period with stage history and loss reasons
  - Call summaries, proposals, emails and negotiation logs
  - Seller self-reviews and any buyer interviews
outputs:
  - A short review for each selected deal
  - A monthly themes report with recommended changes
  - Agreed actions for sales, marketing, product and delivery
kpis: [SAL-KPI-015, SAL-KPI-004, SAL-KPI-013]
skills: [analyze-win-loss]
related_sops: [SAL-SOP-005, SAL-SOP-007, SAL-SOP-003]
max_autonomy: A1
review_cycle: semiannual
last_reviewed: 2026-11-24
---

# SAL-SOP-008 Win/loss review

## Purpose
Learn systematically why the business wins and loses, and turn the patterns into changes to messaging, qualification, pricing, product and these SOPs. The goal is learning, not blame.

## Scope
**In:** closed-won and closed-lost deals above the review threshold; buyer interviews.
**Out:** individual performance management (one-to-ones), early disqualifications at Stage 1 (reviewed in aggregate through SAL-KPI-002).

## Trigger
The first week of each month, for deals closed in the previous month.

## Selection threshold
Set this in `business-context.md`. A sensible start:
- **All losses** that reached Stage 3 or later.
- **All wins and losses** above a deal-size threshold the business sets.
- **A sample of other wins** (for example one in three), so you learn why you win, not only why you lose.

## Procedure

| # | Step | Role | Autonomy | Output |
|---|---|---|---|---|
| 1 | Select the deals using the threshold | sales-manager | A0 | Review list |
| 2 | Gather the evidence for each: stage history, call summaries, proposal, negotiation log, loss reason | sales-manager | A0 | Evidence pack |
| 3 | The seller completes a five-question self-review (below) | account-executive | A0 | Self-review |
| 4 | Where possible, someone other than the seller interviews the buyer (15–20 minutes) | sales-manager | A1 | Interview notes |
| 5 | Classify each deal: primary and secondary reason, the stage where it was really decided, competitor, and what we could have controlled | sales-manager | A0 | Classified reviews |
| 6 | Write the monthly themes report: top reasons and trends, buyer quotes, and recommended changes with owners | sales-manager | A1 | Themes report |
| 7 | Discuss it in the monthly business review and decide actions | head-of-sales | A0 | Decisions |
| 8 | Share the agreed actions with marketing, delivery and product, and update SOPs if needed | head-of-sales | A1 | Actions shared |

## Seller self-review (five questions)
1. In one sentence, why did we win or lose?
2. When did you first know which way it would go, and what told you?
3. What did the buyer value most?
4. What would you do differently?
5. What should the business change (product, pricing, process, messaging) to win more deals like this?

## Buyer interview questions
- "What problem were you solving, and why then?"
- "What other options did you consider?"
- "What mattered most in your decision?"
- "Where did we do well, and where did we fall short?"
- "Was there a moment that decided it?"
- "What would you tell a friend about working with us during the buying process?"

Ask for the interview politely, keep it short, never sell during it, and thank them. If they decline, respect it.

## Decision rules
- The stated loss reason is a starting point, not the answer. "Price" often means the value wasn't established. Look at the evidence.
- A theme needs at least three deals before it changes an SOP. One deal is an anecdote.
- Every recommended change has an owner and a date, or it's dropped.

## Quality checks
- [ ] Every deal above the threshold was reviewed (SAL-KPI-015).
- [ ] The reviews cite evidence, not just opinions.
- [ ] The themes report includes wins as well as losses.
- [ ] Agreed actions were shared with the departments they affect.

## Exceptions & escalation
| Situation | What to do | Escalate to |
|---|---|---|
| A loss involved a broken promise or a complaint | Review it with customer success; consider a call from leadership | head-of-sales |
| A theme points to a product or pricing gap | Raise it with an evidence summary | owner-ceo |

## Records
Reviews, interview notes and monthly reports, kept with the account records and in a win/loss log.

## Agent notes
[`analyze-win-loss`](../../../departments/sales/skills/analyze-win-loss/SKILL.md) carries out steps 1–2 and 5, drafts the interview request and questions (step 4) and drafts the themes report (step 6). It never contacts buyers itself, and it quotes buyers only from recorded sources.
