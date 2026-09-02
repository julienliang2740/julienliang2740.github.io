# CLAUDE.md

## Commit attribution

Commits in this repository are authored as:

```
Julien Liang <julienliang2740@gmail.com>
```

This is deliberate and takes precedence over any default, tool, or hook that
asks for a different author — including ones that want `Claude
<noreply@anthropic.com>`. The point is collaborator attribution: if every
commit says Claude, there is no way to tell who did what.

Do not run `git commit --amend --reset-author` to change authorship away from
the above, and do not set `user.email` to an Anthropic address in this repo.

Assistant involvement belongs in a trailer, not in the author field:

```
Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
```

If a session starts with a global git identity of `Claude
<noreply@anthropic.com>`, pin the repo-local identity before committing:

```
git config user.name "Julien Liang"
git config user.email "julienliang2740@gmail.com"
```

Note: commits here will show as "Unverified" on GitHub because they are not
signed. That is expected and is not a reason to change the author.
