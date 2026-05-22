# Claude Code project memory

This project's agent guidance is consolidated in [AGENTS.md](AGENTS.md) — that file is the single source of truth, read by every agent that works in this repo (Cursor reads it natively; Codex / Aider / Copilot / Zed / JetBrains Junie / others read it via the open AGENTS.md convention).

For Claude Code, the line below imports AGENTS.md into project memory so its rules apply automatically.

@AGENTS.md
