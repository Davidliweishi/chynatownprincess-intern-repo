✅ Tasks

## Research the difference between staging and committing.

Staging prepares specific changes to be included in commit, you can think of it like drafting code. Commiting permanently records those changes into the local repository history. Essentially, staging is drafting the code before commiting. Whereas commiting is finalising code to a code base. 


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

Staging is the setp where you prepare and que changes for your next commit. You can add or remove files from the staging area frrely without anything saved in your project history yet. Commiting is making the changes permanent - sealing it into Git's history with a message and timestamp - therefore, becoming a part of the repo's history permanently. 

Why does Git separate these two steps?
Git seperates them to give you more control and precision over what goes into each commit. Without staging, every change will automatically become a commit - which makes it confusing and hard to read. Staging allows you to group changes together into one commit. For example, you might have fixed a bug in one file and updated something in another - staging allows you to commit both of these seperately with clear and unique messages. 

When would you want to stage changes without committing?

1) You made changes to multiple files but only want to commit one as of now.
2) You want to review changes carefully before deciding to make them permanent.
3) You're halfway through a project and want to check your work without commiting incomplete code.
4) You want to split your work into multiple small, more meaningful commits rather than a large messy one.

Commit and push your changes to GitHub.





✅ Tasks

## Research git bisect and how it helps in debugging.

"git bisect" is a command that is used to idenitify a certain commit in a project's history that introduced  bug, issue or other unwanted changes into a coodebase. Its purpose is to significantly reduce the amount of commits a developer has to manually check. Therefore, it is appropriate for reducing time and effort in debugging and troubleshooting. 

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


✅ Tasks

Research best practices for writing commit messages.

Explore commit histories in an open-source GitHub project (e.g., React, Node.js) and analyze good vs. bad commit messages.

Good commit messages: 

- Concise and imperative: e.g "fix bug"
- Limits the subject line to 50 characters
- Caplitalizes the subject line 
- Does not end the line with a period (.)
- Uses the body to explain what and why changes were ade, not how.
- Wraps the body at 72 characters. 
- Explains the reasoning and any relevant context for further upkeeping. 

Bad commit messages:

- Vague and lacks context: e.g "fix"
- Emotionally driven writing: "It works!"
- Duplicates information: repeats code changes from a previous commit and forces users to check manually - e.g "Fix BUG-9284"
- Poorly formatted: messages are either too long, use incorrect tense or uses improper capitalisation making code history hard to scan - e.g "ADDED NEW STUFF AND FIXED CHANGES FROM PAST ISSUES"( waay too long and all capitalised).

Make three commits in your repo with different commit message styles:
A really vague commit message (e.g., "fixed stuff").


An overly detailed commit message.

A well-structured commit message.

Write reflections in git_understanding.md:
What makes a good commit message?
How does a clear commit message help in team collaboration?
How can poor commit messages cause issues later?

Commit and push your changes to GitHub.
