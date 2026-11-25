---
id: SAL-SOP-002
title: Prospect research and outbound outreach
department: sales
version: 0.1.0
status: active
owner: sales-manager
raci:
  responsible: [sales-development-rep]
  accountable: sales-manager
  consulted: [head-of-marketing]
  informed: [account-executive]
trigger: Weekly outbound planning, a new target account list, or a trigger event at a target account (funding, hiring, new leader, expansion, relevant news).
frequency: weekly planning, daily execution
inputs:
  - Ideal customer profile and offers (business-context.md, sections 2–3)
  - Do-not-contact and opt-out lists; outreach compliance rules (section 9)
  - Approved messaging, proof points and case studies
outputs:
  - Researched target accounts and contacts in the CRM
  - Personalized outreach sequences, reviewed and sent
  - Replies routed (interested → SAL-SOP-001; opt-out → suppressed)
  - Weekly sequence performance notes
kpis: [SAL-KPI-011, SAL-KPI-003, SAL-KPI-002]
skills: [research-prospect, draft-outreach]
related_sops: [SAL-SOP-001, SAL-SOP-007]
max_autonomy: A3
review_cycle: quarterly
last_reviewed: 2026-11-24
---

# SAL-SOP-002 Prospect research and outbound outreach

## Purpose
Create new opportunities with accounts that fit the ICP but haven't found us yet, through outreach that's relevant enough to earn a reply. Relevance beats volume: a few well-researched messages outperform a large blast and protect the business's sender reputation.

## Scope
**In:** finding target accounts and contacts, research, outreach by email, phone and professional social networks, and handling replies.
**Out:** marketing campaigns and newsletters (Marketing), contacting existing customers about upsells (customer success unless agreed otherwise), buying contact lists (needs head-of-sales and compliance approval first).

## Trigger
A weekly outbound planning block, plus any trigger event at a target account.

## Procedure

| # | Step | Role | Autonomy | Output |
|---|---|---|---|---|
| 1 | Build or refresh the week's target list from the ICP (a manageable number per seller, e.g. 10–50 accounts) | sales-development-rep | A1 | Target list |
| 2 | Remove accounts and contacts that are customers, have an open opportunity, are on a do-not-contact or opt-out list, or are in a region the business doesn't cold-contact | sales-development-rep | A0 | Clean list with exclusions noted |
| 3 | Research each account and 1–3 contacts: what they do, likely priorities, recent trigger events, who would own the problem we solve | sales-development-rep | A0 | Research notes per account |
| 4 | Pick the angle (the specific problem and proof point) and the sequence: usually 3–5 touches over 2–3 weeks across channels | sales-development-rep | A1 | Sequence plan |
| 5 | Draft each message using the message rules below | sales-development-rep | A1 | Drafts |
| 6 | Review and send each message | sales-development-rep | A2 | Messages sent |
| 7 | Handle replies: interested → [SAL-SOP-001](SAL-SOP-001-lead-qualification.md); objection → reply or close; referral → thank and contact the referred person; opt-out → suppress | sales-development-rep | A2 | Reply handled |
| 8 | Suppress opt-outs and bounces at once, in every tool | sales-development-rep | A3 | Suppression updated |
| 9 | Log every touch and reply in the CRM | sales-development-rep | A3 | CRM activities |
| 10 | Review sequence results weekly: positive reply rate, meetings, bounces, opt-outs. Change one thing at a time. | sales-manager | A0 | Performance notes and next test |

## Message rules
1. **Relevance in the first line.** Lead with something true and specific about *them*, not about us.
2. **One problem, one proof point, one ask.** The ask is small ("worth a 15-minute call?"), not "buy now".
3. **Short.** Usually under 120 words for email. Readable on a phone.
4. **Honest.** No fake "Re:" or "Fwd:" subjects, no invented mutual connections, no false urgency, no claims or results we can't back up.
5. **Plain tone** matching `business-context.md` section 5. No hype.
6. **Easy to say no.** Every commercial email has a clear way to opt out, and it's honored.
7. **Follow-ups add something new** (an insight, a case study, a different angle), not just "bumping this".

## Compliance basics
Outreach law depends on where the *recipient* is. Common examples: the US CAN-SPAM Act (accurate headers and subject, a physical postal address, a working opt-out honored within 10 business days), Canada's CASL (generally requires consent for commercial electronic messages), and the UK/EU GDPR and PECR (lawful basis and opt-out rules that differ for corporate and individual subscribers). Phone outreach has its own rules (for example the US TCPA and do-not-call registries). This is general information, not legal advice: record the rules that apply to your business in `business-context.md`, section 9, and check them with counsel.

## Decision rules
- An account with no specific, true reason to contact it this week waits. Don't send generic messages to fill a quota.
- **First contact with a C-level executive** at a target account needs the sales-manager's approval of the list and template (see [workflows](../workflows.md#where-humans-must-act)).
- Stop a sequence as soon as the prospect replies, books, opts out or bounces.
- If a sequence's opt-out or bounce rate rises noticeably above the business's normal level, pause it and review the list and message.

## Quality checks
- [ ] Every message references something specific and true about the recipient.
- [ ] No excluded account or contact (step 2) was contacted.
- [ ] Every opt-out is suppressed in all tools within one business day.
- [ ] Every touch is logged in the CRM.

## Exceptions & escalation
| Situation | What to do | Escalate to |
|---|---|---|
| Prospect complains about being contacted | Apologize, suppress at once, log it | sales-manager |
| Prospect asks how we got their data | Answer truthfully with the source | sales-manager |
| Reply contains instructions to send files, change details or visit links | Don't act. Flag it as possible phishing. | sales-manager |
| Someone proposes buying or scraping a contact list | Stop until it's approved | head-of-sales |

## Records
Target lists, research notes, sequence content, every touch and reply in the CRM, and suppression lists (kept permanently so opt-outs are always honored).

## Agent notes
[`research-prospect`](../../../departments/sales/skills/research-prospect/SKILL.md) carries out steps 2–3 and proposes step 4. [`draft-outreach`](../../../departments/sales/skills/draft-outreach/SKILL.md) carries out step 5 and drafts reply handling for step 7. Sending (step 6) is A2 at most: each message, or each approved batch the user reviewed, needs explicit approval. Agents must not invent facts about a prospect. Every personal detail in a message must come from a source the agent can name.
