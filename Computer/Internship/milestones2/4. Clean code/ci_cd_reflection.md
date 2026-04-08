## 📌 Static Analysis Checks in CI/CD
🎯 Goal
## Understand the purpose of Continuous Integration (CI) and Continuous Deployment (CD) and learn how to enforce Markdown linting and spell checks automatically in a project.

## ✅ Tasks

## Research what CI/CD is and why it’s used in software development.

CI = Continuous integration 
CD = Continuous Delivery 

Both are vital for software development as they help process, test and deploy code.

## Set up a CI workflow that runs Markdown linting and spell checks on PRs in your repo.

CI workflow:
<img width="1512" height="814" alt="Screenshot 2026-03-22 at 9 26 54 am" src="https://github.com/user-attachments/assets/fe7d440f-f2e0-4603-b4d0-b526b4201d28" />

markdownlint.json - configures which rules markdownlint enforces:
<img width="1192" height="423" alt="Screenshot 2026-03-23 at 11 44 50 am" src="https://github.com/user-attachments/assets/830a7b88-bec3-4ee8-b383-87531c41f8fb" /> 

cspell.json - spell checker for technical writing and code:
<img width="1192" height="464" alt="Screenshot 2026-03-23 at 11 45 05 am" src="https://github.com/user-attachments/assets/793010f2-773f-4b08-8e65-e4109f97d6a1" /> 

## Experiment with Git Hooks (e.g., Husky) to enforce linting before commits.
<img width="853" height="150" alt="Image" src="https://github.com/user-attachments/assets/ac44f6ea-d71c-4064-8c58-f747416d9dab" />

## Open a test PR in your repository and review the automated checks.
<img width="1512" height="740" alt="Image" src="https://github.com/user-attachments/assets/f6741ad8-fe24-4d31-be6c-50044b0ae69c" />

## Push your CI/CD configuration to your repo.
<img width="1512" height="796" alt="Image" src="https://github.com/user-attachments/assets/e02f9b8e-a25e-44f6-993a-223b947763b7" />

## Write reflections in ci_cd_reflection.md:

## What is the purpose of CI/CD?

It has a few important purposes:
1) It automates workflows - allowing for the transition of software development into production a lot quicker and smoother. 
2) It allows for faster release cycles, therefore allowing developers and users to test and release updates faster. 
3) Higher code quality - every code change is automatically flagged, hence allows for earlier bug detect, integration issues and security problems. 
4) Continuous feedback - developers will constantly see feedback on code commits and fixes. 

## How does automating style checks improve project quality?
Automating checks allow for consistent quality by enforcing coding standards on every change, commit and fixes. By linting and spell checking your code, it will allow for cleaner code - which reduces technical debt when you're further along the project. 

## What are some challenges with enforcing checks in CI/CD?
There can be instances where you get a 'false positive', meaning that some changes get flagged incorrectly. This may lead to frustration and distrust by developers in the system. This in turn slows down the fast turnaround for frequent updates. 

## How do CI/CD pipelines differ between small projects and large teams?
 Small projects focus on speed, simplicity and automation with simple setups. Whereas larger teams require scalability, security, parallelization, and robust governance to manage complex dependencies.