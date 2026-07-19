#!/bin/bash
# Periodic Git Auto-Push Script for Dwell Chronicles
# Commits all changes and pushes to GitHub

REPO_DIR="/home/z/my-project"
LOG_FILE="/home/z/my-project/.auto-push.log"

cd "$REPO_DIR" || exit 1

# Check if there are any changes to commit
CHANGES=$(git status --porcelain 2>/dev/null)

if [ -z "$CHANGES" ]; then
    echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] No changes to commit." >> "$LOG_FILE"
    exit 0
fi

# Stage all changes
git add -A 2>/dev/null

# Generate commit message from changes
COMMIT_MSG="Auto-sync: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
ADDED=$(git diff --cached --name-status 2>/dev/null | grep -c "^A" || true)
MODIFIED=$(git diff --cached --name-status 2>/dev/null | grep -c "^M" || true)
DELETED=$(git diff --cached --name-status 2>/dev/null | grep -c "^D" || true)

if [ "$ADDED" -gt 0 ] || [ "$MODIFIED" -gt 0 ] || [ "$DELETED" -gt 0 ]; then
    DETAIL=""
    [ "$ADDED" -gt 0 ] && DETAIL="${DETAIL}+$ADDED added "
    [ "$MODIFIED" -gt 0 ] && DETAIL="${DETAIL}~$MODIFIED modified "
    [ "$DELETED" -gt 0 ] && DETAIL="${DETAIL}-$DELETED deleted "
    COMMIT_MSG="Auto-sync: $(date -u '+%Y-%m-%d %H:%M:%S UTC') | ${DETAIL}"
fi

# Commit
git commit -m "$COMMIT_MSG" --author="Dwell Chronicles <noreply@dwellchronicles.com>" 2>/dev/null

if [ $? -eq 0 ]; then
    # Push to remote
    git push origin main 2>>"$LOG_FILE"

    if [ $? -eq 0 ]; then
        echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] Pushed: $COMMIT_MSG" >> "$LOG_FILE"
    else
        echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] Push FAILED: $COMMIT_MSG" >> "$LOG_FILE"
    fi
else
    echo "[$(date -u '+%Y-%m-%d %H:%M:%S UTC')] Nothing to commit or commit failed." >> "$LOG_FILE"
fi

# Keep log file under 500 lines
tail -500 "$LOG_FILE" > "${LOG_FILE}.tmp" && mv "${LOG_FILE}.tmp" "$LOG_FILE" 2>/dev/null