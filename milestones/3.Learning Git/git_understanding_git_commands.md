

## Research the following Git commands and test them in your repo:

git checkout main -- <file> – Restore a specific file from main without affecting other changes.
git cherry-pick <commit> – Apply a specific commit from another branch without merging the whole branch.
git log – View commit history and understand how changes evolved.
git blame <file> – See who last modified each line in a file and when.

## Experiment with each command in your test repo:

Modify a file, then restore it using checkout.
Commit changes on a branch, then cherry-pick one commit onto main.
Use git log to explore the commit history.
Use git blame to see past changes in a file.

## Write reflections in git_understanding.md:

## What does each command do?

1) git log - describe what you saw when you ran it
2) git blame — describe what it showed you about the file
3) git checkout main -- <file> — describe what happened to the file
4) git cherry-pick — describe what it did to your branch

When would you use it in a real project (hint: these are all really important in long running projects with multiple developers)?

1) git log — when you are trying to figure out when a bug was introduced. You'd scroll through the history to find the exact commit that broke something.

2) git blame — when a line of code is causing a crash. You'd use this to find out who wrote it and when, so you can ask them why they did it that way.

3) git checkout main -- file — when you've been editing a file and completely messed it up. You'd use this to restore just that one file without losing all your other work.

4) git cherry-pick — when your teammate fixed a critical bug on their feature branch but it's not ready to merge yet. You'd cherry-pick just that bug fix commit onto main without bringing in all their unfinished work.


## What surprised you while testing these commands?

If a teammate fixed an important bug on their branch but their branch isn't ready to merge, I could use git cherry-pick to apply just that one fix to main without merging all their other unfinished changes.

