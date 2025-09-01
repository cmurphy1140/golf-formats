# CC-Sessions Workflow for Golf Formats

## Core Principles

### DAIC (Discuss, Align, Implement, Confirm)
1. **DISCUSS** all changes before implementing
2. **ALIGN** on approach and get explicit approval
3. **IMPLEMENT** only after "go ahead" or similar trigger
4. **CONFIRM** changes meet requirements

## Task Management

### Creating Tasks
```
User: Create a task for [description]
Claude: 
1. Ask for priority (h/m/l/?)
2. Create task file in sessions/tasks/
3. Run context-gathering if needed
4. Set up feature branch
5. Update current_task.json
```

### Task Structure
- All work happens in tasks
- Each task has its own branch
- Context persists in task files
- Work logs track progress

## Context Management

### At 75% Context
- Warn user about context usage
- Suggest wrapping up current work
- Prepare for compaction if needed

### At 90% Context
- Strong warning about context limit
- Recommend immediate compaction
- Save all work to task file

### Compaction Process
1. User says "let's compact"
2. Save comprehensive session log to task
3. Update next steps clearly
4. User runs `/clear`
5. Auto-reload task and continue

## Branch Enforcement
- Each task has designated branch
- Cannot edit on wrong branch
- Must switch before implementing

## Current Task Status
Check: `.claude/state/current_task.json`

## Trigger Phrases for Implementation
- "go ahead"
- "ship it"
- "make it so"
- "do it"
- "proceed"
- "implement"

## Project-Specific Notes
- Next.js 15 with App Router
- TypeScript throughout
- Masters Tournament theme
- Mobile-first design
- AWS Amplify deployment target