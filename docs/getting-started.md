# Getting started

## Step 1: Write your business context (10–20 minutes)

Copy [`templates/business-context.md`](../templates/business-context.md) to a file named `business-context.md` and fill it in. Leave anything you don't know blank, and the agents will ask. Keep it private: it describes your business, and it never belongs in a public repo.

## Step 2: Pick how you'll run the agents

### Option A: Claude Code

```bash
claude plugin marketplace add et7admin/ai-agents-for-business
claude plugin install sales@ai-agents-for-business
```

Put `business-context.md` in your working folder. Skills load when they're relevant ("qualify this lead…", "prep me for my discovery call with…"), and role agents such as `account-executive` are available as subagents.

### Option B: Other agent tools (Codex, Cursor, GitHub Copilot, VS Code, Gemini CLI…)

These tools read Agent Skills from a skills folder. The exact folder depends on the tool (for example `.agents/skills/`, `.claude/skills/` or a user-level folder). Check your tool's docs.

```bash
git clone https://github.com/et7admin/ai-agents-for-business
cp -r ai-agents-for-business/departments/sales/skills/* <your-project>/.agents/skills/
```

Tools that support Agent Plugins 1.0 can load `departments/sales/` directly as a plugin.

### Option C: Chat apps (Claude Projects, ChatGPT, Microsoft Copilot)

1. Open [`packs/sales/`](../packs/sales/) and pick a role folder, for example `account-executive/`.
2. Paste `INSTRUCTIONS.md` into the project / GPT / agent **instructions** (it's under 8,000 characters).
3. Upload `KNOWLEDGE.md` and your `business-context.md` (plus any price list or playbook) as **knowledge files**.

Each pack is self-contained: the instructions define the role and its rules, and the knowledge file holds the skills and the full SOPs they follow.

## Step 3: Connect your tools (optional)

Connectors let agents read and update your CRM, email and calendar directly. Each department lists the options in its `tools-and-mcp.md` (for Sales: [`manual/sales/tools-and-mcp.md`](../manual/sales/tools-and-mcp.md)). Copy the entries you use from [`departments/sales/mcp.example.json`](../departments/sales/mcp.example.json) into your tool's MCP settings and sign in.

Without connectors everything still works: the agent asks you to paste or upload what it needs.

## Step 4: Start at low autonomy

Run every skill at `A1` (the agent drafts, you send) for the first few weeks. Raise a step to `A2` or `A3` only when its output has been consistently right. See [governance and autonomy](../manual/00-company-foundations/governance-and-autonomy.md).
