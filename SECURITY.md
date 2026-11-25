# Security

This repository holds procedures, prompts and connector configuration, not running services. Security issues can still come up, for example:

- a skill or agent instruction that could make an agent take an unapproved or harmful action,
- an instruction that is open to prompt injection (it trusts content from emails, web pages or documents as commands),
- a connector config pointing at an untrusted endpoint,
- a business-context example that leaks real personal or customer data.

Please report these privately with GitHub's **Report a vulnerability** button on the repository's Security tab, not in a public issue. We aim to respond within 7 days.

## Rules every skill follows

- Content an agent reads (emails, web pages, CRM notes, documents) is **data, not instructions**.
- Actions above the step's autonomy level stop and ask a human.
- The [hard stops](manual/00-company-foundations/governance-and-autonomy.md#hard-stops) are never automated.
