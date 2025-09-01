# Task Startup Protocol

When starting or resuming a task:

1. **Load task file**:
   - Read `sessions/tasks/[task-name].md` or `sessions/tasks/[task-name]/README.md`
   - Extract metadata, context manifest, and next steps

2. **Verify branch**:
   - Check current git branch matches task branch
   - If mismatch, prompt to switch: `git checkout [branch]`

3. **Update current task state**:
   ```bash
   cat > .claude/state/current_task.json << EOF
   {
     "task": "[task-name]",
     "branch": "[branch-name]",
     "services": [...],
     "updated": "YYYY-MM-DD"
   }
   EOF
   ```

4. **Announce resumption**:
   - State task name and current status
   - List next steps from task file
   - Show any blockers or dependencies

5. **Context refresh**:
   - If context manifest exists, briefly review key patterns
   - If no context manifest, suggest running context-gathering agent