📌 Identifying & Fixing Code Smells
🎯 Goal
## Learn how to recognize common code smells and refactor them for better readability, maintainability, and performance.

✅ Tasks

## Research common code smells and how they impact code quality.

Code Smell(s) is an aspect in a source code that act as as a surface level indicator of a deeper design or maintainability problem.
It is imprtant to know that code smells are necessarily bugs - the code can still work, but they indicate design weaknesses that can stun future development, increase risk of issues/bugs and potential for technical debt if not identified. 

## Find or write code examples that demonstrate the following code smells:

## Magic Numbers & Strings – Using hardcoded values instead of constants.

Magic numbers and stirngs are literal values hard-coded directly into the source code without explanation of their meaning. This makes the code less readable, harder to maintain, and more prone to errors.

Example:

Bad: 
<img width="509" height="119" alt="Screenshot 2026-03-18 at 3 14 47 pm" src="https://github.com/user-attachments/assets/245b295c-a559-44a3-bcc7-f70f10784a5d" />

Good: 
<img width="509" height="119" alt="Screenshot 2026-03-18 at 3 17 21 pm" src="https://github.com/user-attachments/assets/5a36a318-e3e7-4257-8016-26f358e8ba11" />

## Long Functions – Functions that do too much and should be broken into smaller parts.

Bad:
<img width="808" height="173" alt="Screenshot 2026-03-18 at 3 28 08 pm" src="https://github.com/user-attachments/assets/f88b452b-b786-4a29-872a-830e1a1ff88b" />

Good:
<img width="808" height="233" alt="Screenshot 2026-03-18 at 3 32 14 pm" src="https://github.com/user-attachments/assets/7006f06d-9827-425d-9242-54870279bdaf" />

Duplicate Code – Copy-pasting logic instead of reusing functions.

Bad: 
<img width="808" height="179" alt="Screenshot 2026-03-18 at 3 34 12 pm" src="https://github.com/user-attachments/assets/df4bdac8-4503-4780-a6d0-225b0423b0d1" />

Good: 
<img width="1616" height="358" alt="image" src="https://github.com/user-attachments/assets/08fcb65f-49e2-48f9-8964-72faed4bcd61" />

## Large Classes (God Objects) – Classes that handle too many responsibilities.

Bad:
<img width="808" height="237" alt="Screenshot 2026-03-18 at 4 04 27 pm" src="https://github.com/user-attachments/assets/e64f42a7-e7b9-4125-810b-295aeab1be33" />


Good:
<img width="808" height="344" alt="Screenshot 2026-03-18 at 4 05 33 pm" src="https://github.com/user-attachments/assets/fc50d6fc-c55c-4f29-b23e-2c83b4b5c3c2" />


## Deeply Nested Conditionals – Complex if/else trees that make code harder to follow.

Bad: 
<img width="808" height="344" alt="Screenshot 2026-03-18 at 4 15 41 pm" src="https://github.com/user-attachments/assets/120e4c1d-ba25-47fc-9248-3f58fec91e70" />

Good: 
<img width="808" height="344" alt="Screenshot 2026-03-18 at 4 19 01 pm" src="https://github.com/user-attachments/assets/11ff024f-9873-4713-aa64-b9474f6f8935" />


## Commented-Out Code – Unused code that clutters the codebase.

Bad:
<img width="808" height="300" alt="Screenshot 2026-03-18 at 4 21 32 pm" src="https://github.com/user-attachments/assets/78ec1a7a-7801-43d9-a24c-0c0786992b2c" />

Good:
<img width="808" height="300" alt="Screenshot 2026-03-18 at 4 21 59 pm" src="https://github.com/user-attachments/assets/976198b4-4b4f-4349-bdec-148d5d70e8fa" />


## Inconsistent Naming – Variable names that don't clearly describe their purpose.

## Refactor the code to eliminate these code smells.

I've put side by side comparison in the above section. 


## Write reflections in code_smells.md:

What code smells did you find in your code?
How did refactoring improve the readability and maintainability of the code?
How can avoiding code smells make future debugging easier?

Commit and push your changes to GitHub.
simp
