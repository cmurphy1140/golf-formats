# Context Compaction Protocol

When context reaches warning threshold (75% or 90%):

## 1. Announce Context Status
- Show current context usage
- Warn about approaching limit
- Suggest compaction

## 2. When User Agrees to Compact

### Save Session State
1. **Call logging agent** to write comprehensive session log
2. **Update task file** with:
   - Current implementation status
   - Files modified this session
   - Decisions made
   - Blockers encountered
   - Clear next steps

### Prepare Handoff
Create concise summary including:
- Task name and branch
- What was accomplished
- Current state of work
- Immediate next action
- Any critical context

## 3. After /clear

### Auto-reload Protocol
1. Check `.claude/state/current_task.json`
2. If task exists, load task file
3. Present summary of:
   - Task objectives
   - Previous session work
   - Current status
   - Next steps
4. Ask if user wants to continue

### Context Restoration
- Load context manifest from task file
- Remind of key patterns and decisions
- Show files touched in last session
- Ready to continue work immediately