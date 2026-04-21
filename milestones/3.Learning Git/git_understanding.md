✅ Tasks

## Research the difference between staging and committing.

Staging prepares specific changes to be included in commit, you can think of it like drafting code. Committing permanently records those changes into the local repository history. Essentially, staging is drafting the code before committing. Whereas committing is finalising code to a code base. 


## Experiment with adding and committing files in your repo using either:
The terminal (git add / git commit)

git add:
<img width="1179" height="362" alt="Image" src="https://github.com/user-attachments/assets/91c1dea8-e254-483a-a5d5-d6b6f772b3db" />

git commit: 
<img width="1179" height="362" alt="Image" src="https://github.com/user-attachments/assets/0dba36b4-be44-4202-8ade-5c86fe9df7ea" />

A Git desktop client (e.g., GitHub Desktop, VS Code Git integration).

## Modify a file and try the following:
Stage it but don’t commit (git add <file> or equivalent in your client).
<img width="1512" height="909" alt="Image" src="https://github.com/user-attachments/assets/fe471977-cfc1-41a1-9401-9247c95ae92c" />

Check the status (git status).
<img width="1512" height="909" alt="Image" src="https://github.com/user-attachments/assets/fe471977-cfc1-41a1-9401-9247c95ae92c" />

Unstage the file (git reset HEAD <file> or equivalent).
<img width="1512" height="909" alt="Image" src="https://github.com/user-attachments/assets/5f5cd5be-cbe4-43ea-9598-5f96f83109c2" />

Commit the file and observe the difference.
<img width="1512" height="909" alt="Image" src="https://github.com/user-attachments/assets/166b5b7f-a05f-41ab-b681-2fc9fbc86c76" />


## Write a summary in git_understanding.md:

What is the difference between staging and committing?

Staging is the setup where you prepare and que changes for your next commit. You can add or remove files from the staging area freely without anything saved in your project history yet. committing is making the changes permanent - sealing it into Git's history with a message and timestamp - therefore, becoming a part of the repo's history permanently. 

Why does Git separate these two steps?
Git separates them to give you more control and precision over what goes into each commit. Without staging, every change will automatically become a commit - which makes it confusing and hard to read. Staging allows you to group changes together into one commit. For example, you might have fixed a bug in one file and updated something in another - staging allows you to commit both of these separately with clear and unique messages. 

When would you want to stage changes without committing?

1) You made changes to multiple files but only want to commit one as of now.
2) You want to review changes carefully before deciding to make them permanent.
3) You're halfway through a project and want to check your work without committing incomplete code.
4) You want to split your work into multiple small, more meaningful commits rather than a large messy one.

Commit and push your changes to GitHub.

✅ Tasks

## Research git bisect and how it helps in debugging.

"git bisect" is a command that is used to identify a certain commit in a project's history that introduced  bug, issue or other unwanted changes into a codebase. Its purpose is to significantly reduce the amount of commits a developer has to manually check. Therefore, it is appropriate for reducing time and effort in debugging and troubleshooting. 

## Create a test scenario:

Make a series of commits in your test repo.
<img width="1512" height="968" alt="Image" src="https://github.com/user-attachments/assets/c1fdce14-257d-40ee-94d6-201fb2c354f4" />

Introduce a bug in one of the commits.
<img width="1512" height="968" alt="Image" src="https://github.com/user-attachments/assets/008f21e9-c92c-4bc1-a038-738562ceef26" />


Use git bisect to track down the commit that introduced the issue:

<img width="1171" height="374" alt="Image" src="https://github.com/user-attachments/assets/60b963a7-800a-4c0b-90f3-e7aac48c250b" />

## Experiment using your Git desktop client (or CLI if preferred).
I've done this in VSC

## Write reflections in git_understanding.md:

## What does git bisect do?

A Git tool used to help you find a specific commit in your project's history to find a bug, issue or unwanted change. 


## When would you use it in a real-world debugging situation?

An example of this can be debugging an unfamiliar codebase that isn't yours. when you are given a project that isn't yours to begin with, it can be hard to figure out the entire codebase. Therefore, using git bisect can help you pinpoint exactly where a change broke a specific behavior, allowing a developer to fix it.

##How does it compare to manually reviewing commits?

Git bisect is way more efficient and faster than manually reviewing commits. For example, rather than looking through 50 commits (which is a waste of time and energy), you can isolate a bug with just a command. Not only that, you can also automate the process ("git bisect run <script>") to run the entire search process that identifies good and bad lines of code. 

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


✅ Tasks

Research best practices for writing commit messages.

Explore commit histories in an open-source GitHub project (e.g., React, Node.js) and analyze good vs. bad commit messages.

Good commit messages: 

- Concise and imperative: e.g "fix bug"
- Limits the subject line to 50 characters
- Capitalises the subject line 
- Does not end the line with a period (.)
- Uses the body to explain what and why changes were ade, not how.
- Wraps the body at 72 characters. 
- Explains the reasoning and any relevant context for further upkeeping. 

Bad commit messages:

- Vague and lacks context: e.g "fix"
- Emotionally driven writing: "It works!"
- Duplicates information: repeats code changes from a previous commit and forces users to check manually - e.g "Fix BUG-9284"
- Poorly formatted: messages are either too long, use incorrect tense or uses improper capitalisation making code history hard to scan - e.g "ADDED NEW STUFF AND FIXED CHANGES FROM PAST ISSUES"( way too long and all capitalised).

Make three commits in your repo with different commit message styles:
A really vague commit message (e.g., "fixed stuff").


An overly detailed commit message.

A well-structured commit message.

Write reflections in git_understanding.md:
What makes a good commit message?
How does a clear commit message help in team collaboration?
How can poor commit messages cause issues later?

Commit and push your changes to GitHub.

***

## 📌 Creating & Reviewing Pull Requests

**🎯 Goal**
**Learn how to create, review, and collaborate on Pull Requests (PRs) in GitHub.*

# ✅ Tasks

**Research what a Pull Request (PR) is and why it’s used.**

Pull Request = a formal way to submit code changes to a software project. It is a request sent by a contributor to a repository manager/platform (in most cases Github) to review betfore merging the code changes into the main codebase. 

**Create a new branch in your Git desktop client.**

<img width="553" height="164" alt="Image" src="https://github.com/user-attachments/assets/0cb288f9-0b31-4cee-b7c8-e83d37e52824" />


**Make a small change and push the branch to GitHub.**

<img width="1275" height="290" alt="Image" src="https://github.com/user-attachments/assets/e645a320-14d6-40ad-a4d8-1d6aa942c1c3" />


**Open a Pull Request on GitHub:**
**Add a meaningful PR title and description.**

<img width="1496" height="897" alt="Image" src="https://github.com/user-attachments/assets/3e1cb3dc-d977-43e8-a86c-4e50d2cd01d3" />

Link to a related issue (if applicable).

**Review an existing PR in a public open-source repo (e.g., React PRs):**

**Read through comments and discussions.**
<img width="1496" height="897" alt="Image" src="https://github.com/user-attachments/assets/51686341-70a9-4015-852f-77353fa4629c" />


**Observe how changes are requested and approved.**

The Process:

* Code review
- Multiple review from the Facebook/React team
- This can be seen through "CLA signed" 
- There are several workflow checks that await approval
- Human reviewers leave comments and suggestions in the conversation box


# Write reflections in git_understanding.md:

**Why are PRs important in a team workflow?*

PRs are important as they help regulate and review your code before it can be merged into the main codebase. It allows for extra security and scrutiny, as it makes sure your code is properly maintained and bug-free so that it doesn't potentially cause issues for the rest of the codebase. 

**What makes a well-structured PR?*

A good PR is small, descriptive and focused. It should be designed to faciliate quick review, rather than a long one. It must feature a clear title, a detailed desciption of what and why something happened. Ideally, it should include relevant tests, linked issue numbers, and follows a consistent template in accordance to your work team. 


**What did you learn from reviewing an open-source PR?*

REviewing open-source PRs allowed me to understand that context and clear communication matters. Both factors contribute towards clarity and easy maintainance of code. Without this, work becomes convoluted and confusing. This would slow down progress and make it harder for yourslef and your team to provide meaningful work. 


Request feedback on your PR from a peer or mentor.

Done

Merge the PR (if approved) and delete the branch.

Done