## @TransformationModel — Toy Project Management Model

### Direct answers
- **1) Is this possible with AI Frames?** Yes. AI Frames can orchestrate intake, planning, execution, governance, RAID, and reporting via modular “frames” (agents + tools + prompts) with human-in-the-loop approvals.
- **2) Overall use case (what this doc covers):** A lightweight, repeatable transformation model with phases, governance, reporting, and ready-to-use assets/forms. Includes a filled toy project to demonstrate end-to-end usage and an AI Frames mapping for automation.

---

## Toy Transformation Model (Phases, Entry/Exit, Artifacts)

### Phase 1 — Discover (Weeks 1–2)
- **Goal**: Clarify problem, stakeholders, scope, constraints, success criteria.
- **Entry**: Sponsor intent, preliminary vision.
- **Exit**: Approved Charter v1, initial KPI tree, high-level roadmap draft.
- **Key Artifacts**: Project Charter, Stakeholder Map, KPI Tree, Assumptions/Constraints, Initial RAID.

### Phase 2 — Design (Weeks 3–4)
- **Goal**: Define target operating model, backlog, governance, reporting cadence.
- **Entry**: Charter v1 and validated problem framing.
- **Exit**: Prioritized backlog, delivery plan, governance calendar, RACI.
- **Key Artifacts**: Backlog (epics/stories), Delivery Plan, RACI, Governance Plan, Comms Plan.

### Phase 3 — Deliver (Weeks 5–10)
- **Goal**: Execute increments with demos; manage risks, decisions, changes.
- **Entry**: Approved delivery plan and backlog.
- **Exit**: Increment(s) shipped, training and adoption plan ready.
- **Key Artifacts**: Sprint Plans, Demo Notes, Updated RAID, Decision Log, Change Requests.

### Phase 4 — Deploy (Week 11)
- **Goal**: Release and enablement.
- **Entry**: Release candidate and readiness sign-offs.
- **Exit**: Go-live, handover package, support model activated.
- **Key Artifacts**: Release Notes, Cutover Plan, Runbooks, Handover Checklist.

### Phase 5 — Drive Value (Week 12+)
- **Goal**: Prove value via KPIs; reinforce adoption; harvest lessons.
- **Entry**: Production usage started.
- **Exit**: Benefits realization snapshot and adoption health.
- **Key Artifacts**: KPI Dashboard, Adoption Plan, Retrospectives, Lessons Learned.

### Continuous — Govern and Report
- **Goal**: Ensure controlled progress, transparency, and timely decisions.
- **Cadence**:
  - Weekly Project Review (RAG, RAID, decisions needed)
  - Biweekly SteerCo (strategy, funding, scope changes)
  - Monthly Benefits Review (KPI deltas, adoption)
- **Gateways**: Charter approval, Plan approval, Release readiness, Benefits review.

---

## Process-wise Governance (Lightweight)
- **Roles**: Sponsor, Product Owner, Delivery Lead, Tech Lead, PM/TPM, Change Manager, BA/UX, QA, SMEs.
- **RACI**:
  - Charter: R=PM, A=Sponsor, C=PO/Tech Lead, I=SteerCo
  - Plan: R=PM, A=Sponsor, C=PO/Tech Lead/Finance, I=Team
  - Release: R=Tech Lead, A=Sponsor, C=QA/Change, I=Team
- **Controls**:
  - Change Control: Simple CR form with impact, options, and decision.
  - Risk Policy: Probability×Impact scoring; escalate High within 24h.
  - Decision Log: Owner, option set, rationale, effective date.

---

## Drive Project: Reporting (Minimal, Actionable)
- **Weekly Status (one-page):**
  - RAG: Scope | Schedule | Cost | Risks | Quality
  - Highlights/Insights (3 bullets), Lowlights/Blockers (3 bullets)
  - KPI Snapshot (Top 3), Milestone Forecast, Decisions Needed
- **Dashboard Fields**: Plan vs Actual (burn, milestones), RAID counts by severity, Decision latency, Change count and lead time, Adoption/usage metrics.

---

## Assets / Forms (Templates)

### Project Charter (template)
- Project Name
- Problem/Opportunity
- Objectives and Success Criteria (link to KPI Tree)
- Scope / Out-of-Scope
- Constraints / Assumptions
- Stakeholders (Name, Role, Influence, Support level)
- High-level Timeline and Milestones
- Budget Envelope (if applicable)
- Governance (cadence, SteerCo composition)
- Risks (Top 3) and Mitigations
- Approvals (Sponsor, PM, Tech Lead)

### RAID Log (table)
| Type | ID | Title | Description | Owner | Severity | Likelihood | Impact | Status | Target Date | Mitigation/Decision |
|---|---|---|---|---|---|---|---|---|---|---|

### KPI Tree (template)
- North Star KPI
  - Driver KPI A
    - Sub-metric A1
    - Sub-metric A2
  - Driver KPI B
    - Sub-metric B1
    - Sub-metric B2

### Weekly Status Report (template)
- Week Ending:
- Overall RAG: Scope/Time/Cost/Risks/Quality
- Highlights:
- Lowlights/Blockers:
- KPI Snapshot:
- Milestones (Plan vs Actual):
- Decisions Needed:
- Next Week Plan:

### Decision Log (table)
| ID | Decision | Context/Options | Rationale | Owner | Date | Effective | Follow-ups |
|---|---|---|---|---|---|---|---|

### Change Request (template)
- Change Title
- Description and Drivers
- Options Considered (with impacts)
- Recommended Option and Rationale
- Affected Scope/Cost/Schedule/Quality
- Approvals (names/roles/dates)

---

## Toy Project (Filled Example) — “Canvas3D-LLM Pilot”
- **Sponsor**: Head of Product Innovation
- **PM/TPM**: You
- **Product Owner**: Design Systems Lead
- **Tech Lead**: Platform Engineering Lead
- **Problem/Opportunity**: Designers and engineers lack an interactive 3D canvas with AI assistance to speed concept-to-prototype by 30%.
- **Objectives**:
  - Reduce time from idea to interactive prototype by 30% in 12 weeks.
  - Achieve >20 weekly active users across design and frontend engineering.
  - Demonstrate extensible AI Frame integrations for reporting and governance.
- **Scope**:
  - Build a web-based 3D canvas with LLM-assisted primitives and export.
  - Integrate AI Frames for status generation, RAID upkeep, and decision capture.
  - Pilot with 2 squads; production-hardening is out of scope.
- **Timeline (12 weeks)**:
  - Discover (W1–2), Design (W3–4), Deliver (W5–10), Deploy (W11), Drive Value (W12+)
- **Top KPIs**:
  - Cycle time from idea→prototype (median days)
  - Weekly Active Users (WAU) in Canvas3D-LLM
  - Prototype quality satisfaction (survey ≥4/5)
- **Initial RAID**:
  - RISK-1: Model hallucinations during design prompts — Mitigation: guardrails + reviews.
  - ISSUE-1: GPU quota variability — Mitigation: local inference fallback.
  - DEP-1: Design token API readiness — Mitigation: mock service W3, cutover W6.
- **Governance Cadence**:
  - Weekly Project Review (Mon), SteerCo (biweekly Thu), Benefits Review (monthly).
- **Weekly Status Sample**:
  - Overall RAG: Scope=G, Schedule=A, Cost=G, Risks=A, Quality=G
  - Highlights: Canvas core + export MVP done; AI prompt guardrails v1 landed.
  - Lowlights: Token API mock lagging; GPU quota spikes.
  - Decisions Needed: CR-2 approve “MVP out-of-scope physics plugin”.

---

## AI Frames Mapping (Automation)
- **Charter Frame**: Intake Q&A → draft Project Charter; output MD + JSON; human approval.
- **Backlog Frame**: Turns objectives into epics/stories; enforces INVEST; exports to tracker.
- **RAID Frame**: Extracts risks/issues/assumptions/deps from notes and PRs; updates RAID.
- **Status Frame**: Generates weekly status from commits, PRs, tickets, and meeting notes; highlights deltas and decisions needed.
- **Decision Frame**: Structures decisions (options, rationale); posts to Decision Log; links to CRs.
- **Change Control Frame**: Guides impact analysis; produces CR; routes for approvals.
- **Governance Orchestrator**: Runs cadences, compiles packets (KPIs, RAID, decisions), and nudges owners on SLAs.
- **Benefits Frame**: Pulls KPI telemetry, charts trends, and drafts benefits updates.

### Triggers, Inputs, Outputs (example)
- Trigger: “/status this-week” → Inputs: PRs, issues, commits, calendar notes → Output: “Weekly Status Report” MD + JSON.
- Trigger: “/raid sync” → Inputs: meeting notes, issue tracker → Output: RAID updates + owners.
- Trigger: “/decision new” → Inputs: context + options → Output: Decision Log entry + notifications.

---

## How to Use This Model (fast path)
1) Fill the Charter template and KPI tree.  
2) Draft the backlog and Delivery Plan.  
3) Start weekly reporting using the Status template.  
4) Keep RAID and Decision Log current.  
5) Use AI Frames triggers to automate updates and packet assembly.  
6) At Deploy, complete release artifacts; in Drive Value, track KPIs and adoption.  


