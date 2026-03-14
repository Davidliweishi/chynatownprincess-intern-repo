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

## Make three commits in your repo with different commit message styles:
A vague commit message (e.g., "fixed stuff").

<img width="1169" height="361" alt="Image" src="https://github.com/user-attachments/assets/a5c840b7-13e3-4912-b6eb-d29249a1c6cb" />

An overly detailed commit message.

<img width="1184" height="348" alt="Image" src="https://github.com/user-attachments/assets/e34f8f20-bfcf-41f8-a88b-23c3eb2d7254" />

A well-structured commit message.

<img width="1184" height="348" alt="Image" src="https://github.com/user-attachments/assets/0afca99e-357b-4a0e-8f5a-dbaf6ba50630" />

## Write reflections in git_understanding.md:

## What makes a good commit message?

1) Imperative subject line - it writes it like a command — "Fix bug" not "Fixed bug"
2) Capitalised beginning, no period at the end - "Fix the bug" not "fixed the bug."
3) Explains the why, not the what of a code difference. The message should shpw why something changed. E.g "Fix token expriy bug, Tokens were expired immediately due to a timezone mismatch. Changed all timestaps to store in UTC."
   
## How does a clear commit message help in team collaboration?
Good commit messages help enhance communication, streamline development tasks and clarifies any confusion around code reviews and debugging.

## How can poor commit messages cause issues later?

It can create confusing, which hinders tasks being completed in a timely and streamlined manner. It can also make it hard to debug and identify small issues that affects a whole project. It can also reduce code maintainability and crea severe friction for developers. 

Commit and push your changes to GitHub.
