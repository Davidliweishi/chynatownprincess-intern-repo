✅ Tasks

## Research and summarize the following clean code principles in clean_code.md:

## Simplicity – Keep code as simple as possible.

Simplicity in terms of clean code is should follow the following principles:

1) KISS - Keep it simple, stupid = write code that is simple and easy to read, whilst avoiding complicated language that may confuse other developers. 
3) Focus on present coding - it is better to write code that focus on present codie, rather than any past or future scenerios.

## Readability – Code should be easy to understand.

Code is often read more than it actually is written. Therefore, it is better to focus on conciseness and cleverness.

## Maintainability – Future developers (including you!) should be able to work with the code easily.

Clean code should be easy to read, understand and change.maintain. This would reduce the possiblity of introducing bugs and issues should the code be amended and revisted. 

## Consistency – Follow style guides and project conventions.

Clean code should be consistent in style guides and project conventions, to keep uniformity with the rest of the projects. This helps codebase structures and code become predictable, avoid any confusion and reduce potential for error and bugs. 

## Efficiency – Write performant, optimized code without premature over-engineering.

Optimized, clean code creates efficieny by allowing for faster execution and minimilisation of resource utilisation. 

## Find an example of messy code online (or write one yourself) and describe why it's difficult to read.


The code is is sitting on multiple lines, with alot of nested logic. This makes it hard to digest what we are looking at. 
<img width="1104" height="618" alt="Image" src="https://github.com/user-attachments/assets/4b6711dc-88ae-4499-9b9b-b6ea730b928a" />

## Rewrite the code in a cleaner, more structured way.

<img width="1104" height="618" alt="Image" src="https://github.com/user-attachments/assets/37e93068-b181-4634-9673-8e2ffbbe69c5" />
the code is way more structured and legible. There are no nested logic and is minimalised to just two lines. Therefore, it makes it easier to read and more efficient. 

## Commit and push your changes to GitHub.


✅ Tasks

## Research best practices for naming variables and functions.

Best practises for naming variables and functions:

For Variables:
1) Using Nouns or Noun Phrases: variables all hold specific and different data, hence it is best practise to give them nounds that reflect exactly what they are.
   For example - Good: "user_name", Bad: "name_string"
   
2) Prefix Booleans with "is", "has", or "should": this tells you a variable has boolean value.
"is": "isActive", "isVisible" - tells you what is happening right now to a variable.
"has": "hasPermission", "hasItems" -  tells you the presence or absense of a resource or characteristic.   
"can": "canEdit", "canRead" - tells you what a subject is allowed or able to do.
"should": "shouldSave", "shouldRetry" - tells you to perform a certain action or recommendation.

3) Use Plural Names for Collections/Arrays: helps indicate a variable holds many items. For example, "users", "items", "accounts".
4) Define Constants with "SCREAMING_SNAKE_CASE": use uppercase letters with underscores to seperate words for constants. For example, "MAX_USERS", "API_KEY".

For Functions:
1) Use Verbs or Verb Phrases: names should refelct the actions that a function will do. For example, "calculate_total", "fetch_user_data".
2) Functions have one purpose/action: a function should only do one thing, rather than multiple. For example, it should not include "and".
3) Use Consistent Verbs: a functio should have one word to descript the same concept throughout the codebase. For example, use "fetch" instead of mixing "fetch", "get" and "retrieve".

## Find examples of unclear variable names in an existing codebase (or write your own).
1) Variable "input" - too vague
   <img width="1118" height="900" alt="Image" src="https://github.com/user-attachments/assets/cddc2ae8-53e9-4bdd-b979-c16bf084c0f5" />

   Variable "choice" - too vague
   <img width="1118" height="900" alt="Image" src="https://github.com/user-attachments/assets/d8bd4c03-78c0-4113-9eb2-7b278c5885d2" />

## Refactor the code by renaming variables/functions for better clarity.

Changed "input" to "genre_input" and "title_input":
<img width="1118" height="900" alt="Image" src="https://github.com/user-attachments/assets/20a2cbaf-a0ed-4554-b035-7009b2030f43" />

Changed "choice" to "book_choice":
<img width="1118" height="900" alt="Image" src="https://github.com/user-attachments/assets/3c6a2970-3113-4ca5-bb07-43ecce2a2e62" />

## Write reflections in clean_code.md:
## What makes a good variable or function name?

A good variable name consists of elements that make it makes it describe its exact data type/name and also its purpose. A good function consists of elements that gives it a singular action (verb), purpose (one function rather than multiple and consistent verb. 

## What issues can arise from poorly named variables?

Poorly named variables can cause confusion and lack of clarity in a codebase, because you cannot interpret the context of the variable, leading to syntax errors and bugs. 

## How did refactoring improve code readability?

It allowed for me to not only understand my own code better, but also gives more clarity in terms of what purpose and where my variables and functions are serving in my codebase. 


📌 Writing Small, Focused Functions
🎯 Goal
Learn how to break down large functions into smaller, more maintainable units.

✅ Tasks

## Research best practices for writing small, single-purpose functions.

1) Single Responsibility Priciple (SRP): a function should explain exactly its purpose and only fulfill that purpose.
2) Keep the function small: this way its more managable, keep it 20-30 lines max.
3) Descriptive naming: Function names should describe exaclt whay they do and often need to be verb-noun pairing (e.g "calculateTotal").
4) Minimal Parameters: Functions should keep parameters to one or two arguments.

## Find an example of a long, complex function in an existing codebase (or write your own).

<img width="980" height="559" alt="Image" src="https://github.com/user-attachments/assets/d6037414-3f94-47f2-b49d-0a947540e9c4" />


## Refactor it into multiple smaller functions with clear responsibilities.

<img width="1308" height="605" alt="Image" src="https://github.com/user-attachments/assets/2b6f3679-af15-4287-9887-cd6a9059b6f2" />

## Write reflections in clean_code.md:
##Why is breaking down functions beneficial?

1) It helps debugging if you should come across one and want to pinpoint exactly where it went wrong.
2) It helps create more readable, easily maintained code.
3) It allows code blocks to be potentially reused elsewhere (if needed).
   
##How did refactoring improve the structure of the code?

It helps maintain the structure and efficiency of your code without changing its functionality. It helps make your code more easy to maintain by breaking down complex, large codebases that can be easily read and maintained. 

Commit and push your changes to GitHub.


📌 Avoiding Code Duplication
🎯 Goal
## Understand how to identify and eliminate unnecessary duplication in code.

✅ Tasks

## Research the "Don't Repeat Yourself" (DRY) principle.

DRY principle was formulated by Andy Hunt and Dave Thomas, which aims to reduce software redundancy, encoruage code maintainability, reusability and readability by making sure that changes only need to be made in one central location. 

The key aspects of DRY are:

1) Single source of truth - all aspects of software and code should not be duplicated.
2) Beyond code - DRY principle should apply to everything software related (e.g documentation), not just code.
3) Over-application - overuse of the DRY principle can lead to unwanted complexity. Therefore, making code harder to understand. 

## Find a section of code in your test repo with unnecessary repetition.

<img width="1247" height="623" alt="Screenshot 2026-03-17 at 8 51 46 pm" src="https://github.com/user-attachments/assets/f1ffcf3b-4993-4852-beef-20341dcbf896" />
Both methods essentially perform the same function. Only difference is the field and message. 

## Refactor the code to eliminate duplication.

<img width="1135" height="664" alt="Screenshot 2026-03-17 at 8 55 45 pm" src="https://github.com/user-attachments/assets/8a1e2c87-ebdc-490b-b207-13a5fb91a7c2" />
Combined the function of both methods into one - "Search and display", with the original methods "read_in_genre" and "read_in_title" as thin wrappers around it.


## Write reflections in clean_code.md:

## What were the issues with duplicated code?

Duplicate code makes a codebase and software less efficient and more complicated than it needs to be. It makes it harder/tedious to read and debug, due to semi-identical code that can confuse developers. Therefore, its better to try and condense and use single, unique code that serves one particular purpose, rather than multiple that shares similar purpose. 

## How did refactoring improve maintainability?

It helps make a code strcture more efficient and easier to understand/read, all without sacrifacing its function. It reduces technical debt (the potential for future reworking), therefore allowing for easier and better maintainability. 

Commit and push your changes to GitHub.


📌 Commenting & Documentation
🎯 Goal
## Learn when and how to write helpful comments and documentation.

✅ Tasks

## Research best practices for writing comments and documentation.

Helpful comments and documentation mostly focuses on the reason and 'why' of explainations, rather than the 'what'. 

Good comments are often concise, constantly updated, properly named (''calculateTotal' instead of 'calc'), and describes in detail about the purpose of the code than just repeating the logic. 

Good documentation are often include a "README.md" file that includes a rbief project description, installation instructions and a usage example. It tailors technical details for developers and high-level summaries for managers and users. It also has good, clear structure that makes it easy to navigate. Sometimes it can even include diagrams and charts to explain concepts. 

## Find an example of poorly commented code and rewrite the comments to be more useful.

This is my code comments before:

<img width="805" height="369" alt="Screenshot 2026-03-18 at 12 20 06 pm" src="https://github.com/user-attachments/assets/5746a094-07a5-4a14-99b6-6a47120421c0" />

It is only describing what the code is doing, rather than the reason we are using it. 

This is my code comments after:

<img width="805" height="328" alt="Screenshot 2026-03-18 at 12 31 20 pm" src="https://github.com/user-attachments/assets/12dfff63-4365-435b-8232-c73ff1d17d2c" />

I've changed it to describe and explain more interesting and unusual aspects of the code. In this case, the global variable "$albums". I'm describing why I'm using it: to access an Array of album names. 

## Write reflections in clean_code.md:

## When should you add comments?

1) When you are trying to add context and intent, rather than describing what the code is doing.
2) When you are documenting complex code blocks.
3) When you have incomplete code. For example, "TODO" or "FIXME" to mark code that requires further work.
4) If you have external references like sources or links.
   
## When should you avoid comments and instead improve the code?

1) When the code is clear to understand and is self-documented. THis means that the functions, variables and classes are self-explanatory.

2) When you use comments to explain what the code is doing, rather than why you've used it. 

Commit and push your changes to GitHub.



