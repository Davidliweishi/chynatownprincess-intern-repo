✅ Tasks

## Research what causes merge conflicts in Git.

1) Conflicting/Competing line changes: Merge conflicts can happen if two or more developers are trying to modify the same line of code, usually if they are coming from different branches. This confuses Git and it won't be able to determine which direction it should take.
2) Structural differences: For example, if a file is turned into a folder in one branch, but it's still a file in another, this woulc create merging conflict.
3) Uncommited local changes: if there are changes made locall yon your computer, and you attemp to merge - it can create conflict or even potential data loss if changes do get commited.
4)  
## Create a merge conflict in your test repo by:
1) Creating a branch and editing a file.
2) Switching back to main, making a conflicting edit in the same file, and committing it.
3) Merging the branch back into main.

This screenshot shows the message before merging:
<img width="1174" height="763" alt="Screenshot 2026-03-07 at 9 05 10 am" src="https://github.com/user-attachments/assets/01aa72ee-a81c-4193-bd42-7cf2101268dc" />

This screenshot shows a warning during the process of merging:
<img width="1174" height="763" alt="Screenshot 2026-03-07 at 9 04 36 am" src="https://github.com/user-attachments/assets/1f2e4810-505a-407c-99dc-580cd99386f4" />


## Use your Git desktop client to resolve the conflict.

This is the end result of resolving the issue in Git desktop client:
<img width="1174" height="763" alt="Screenshot 2026-03-07 at 9 23 48 am" src="https://github.com/user-attachments/assets/38ca58dd-4b18-4446-87e0-b0891becb3f4" />

## Write about your experience in git_understanding.md:
- What caused the conflict?

The conflict happened because two different commits changed the same section of the same file (README.md) on two different branches. 
I created a new branch (e.g. conflict-merge-test). On that branch I edited README.md and committed like: "This line was added from conflict-merge-test."
Then I switched back to the main branch and edited the same part of README.md, committing: "This line was added from main branch."
When I tried to merge the branch back into main, Git attempted to combine the changes. 
Because both branches tried to modify the same line, Git couldn't decide which direciton to go first. Therefore, I got a message saying a merge cnflict must be resolved before progressing. 

- How did you resolve it?

The merge conflict was resolved by manually editing the conflicting file and completing the merge in GitHub Desktop. The conflict was resolved by manually editing the conflicting section of README.md, removing Git’s
conflict markers, keeping the desired lines of code, and completing the merge commit in GitHub Desktop.

- What did you learn?

Through this exercise, I learned how merge conflicts happen in Git by two branches modifying the same part of a file. I also learned how to resolve the conflicts by looking into the code editor, comparing the differences and manually editing them. 
Overall, the task gave me a better understanding of how branching and merging works when working in a collaborative environment. 
##Commit and push your changes to GitHub.

Changes can be found in my repository named "desktop-tutorial" in my repositories section on Github:
<img width="1512" height="763" alt="Screenshot 2026-03-07 at 9 26 41 am" src="https://github.com/user-attachments/assets/c2f04c7e-f970-4b1b-9c49-445dc49950e4" />
