1) ✅ Tasks

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


2) ✅ Tasks

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


3) 📌 Writing Small, Focused Functions
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


4) 📌 Avoiding Code Duplication
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


5) 📌 Commenting & Documentation
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


6) 📌 Handling Errors & Edge Cases
🎯 Goal
## Learn how to write robust code that gracefully handles errors and unexpected inputs.

✅ Tasks

## Research strategies for handling errors and edge cases in code (include Guard Clauses).

Writing robust code often centeres around real exception handling:
1) Anticipate possible failures
2) Catching exceptions at the right level
3) Logging with full context
4) Providing recovery or fallback options
5) Centralising error handling for consistency

Common strategies to handle errors and edge cases in code

Anticipate Edge cases:

Edge cases are rare but unexpected situations happening at the max, min or boundary parameters of a system's operation. Edge cases deal with the "what if" situations - like empty inputs, massive data or unusual user behaviors that can result in software crashes, security risks or logical errors if not handled properly.

Strategies:
1) Check boundaries: Spot the minimum and maximum constraints
2) Test EmptyNull values: Always test what happens when data is missing.
3) User behavior: look at users who try unusual paths, like clikcing buttons twice or navigating back in unexpected ways.
4) Use automated testing: create specific, automated tests for these boundary conditions.

Error Handling:

Error handling often involve anticipating, detecting and resolving exceptional conditions that occur during a program run to prevent crashes, bugs and ensure smooth user experience. 

Strategies:
1) Exceptions (try/Catch/Finally): Modern programming languages have commands that isolate error-prone code (like 'try', 'catch', and 'finally' blocks) to let developers manage errors, prevent crashes.

For example: 
1) Throwing (throw) - tell sus that an error has occured. stopping normal functions and passing controls to a handler.
2) Catching (catch) - Defines a block of code to handle specific exceptions thrown in a 'try' block.
3) finally - runs a code regardless of whether an exception was thrown, commonly used for cleanup taks like clsoing files.
4) Hierachy - exceptions are often organised in a hierarchy, allowing specific handling for derived exceptions. 

2) Fail Fast: Use guard clauses to check required conditions at the beginning of a function, allowing a program to fail immediately and vividly, rather than allow it to carry on with issues.

3) Graceful Degradation: Enable a system, to maintain partial functionality and operations, rather than let it crash completely.

4) Return Explicit Errors: Return explicit error objects for easier debugging and testing. 
Find an existing function that doesn’t properly handle errors or invalid inputs.

## Find an existing function that doesn’t properly handle errors or invalid inputs.

<img width="639" height="162" alt="Screenshot 2026-03-18 at 1 48 27 pm" src="https://github.com/user-attachments/assets/7c3c2492-cda4-4a5b-9a9c-3646b4be0ced" />

<img width="639" height="107" alt="Screenshot 2026-03-18 at 1 49 45 pm" src="https://github.com/user-attachments/assets/d79125d4-d81d-4119-b518-936f4de34dd7" />

## Refactor the function to improve error handling.

<img width="639" height="107" alt="Screenshot 2026-03-18 at 1 53 59 pm" src="https://github.com/user-attachments/assets/89846413-792f-4035-9507-ec827bf90671" />


## Write reflections in clean_code.md:

## What was the issue with the original code?

The second line in the original code block will raise a "NoMethodError" because you cannot call "downcase" on a 'nil' value. Therefore, I've put an "if" statement to include print "downcase" output, only if there is "user_data" selected. 

## How does handling errors improve reliability?

Handling errors help improve reliability by preventing unexpected errors, allowing graceful system recoveryn ensuring data integrity, and allow developers to isolate and identify issues/bugs; allowing it to crash early on to prevent issues from carryinng on into later stages. 

Commit and push your changes to GitHub.



7) ✅ Tasks

## Research common refactoring techniques.

1) Extract Method - turns a code fragment into its own method with a descriptive name, replacing the need to call from the original code to this new method. It helps reduce code repetition, improve readability and maintainability by breaking down long, complex code into more managable chunks.

2) Raname Variables and Methods - having descriptive, concise names for variables and functions, allow them to clearly convey their purpose and functionality without being too long. It also allows for more consistent coding standards across a code base.

3) Simplify conditional expressions - reduces cognative overload (mental fatigue) by replacing long, nested 'ifelse' logic with shorter alternatives like '&&' or '||'.

4) Introduce code parameters - use classes or structures that encapsulate multiple related parameters into a single object. Therefore, grouping similiar methods together and allowing for code organisation. 

## Find an example of overly complicated code in an existing project (or write your own).

<img width="639" height="314" alt="Screenshot 2026-03-18 at 2 31 08 pm" src="https://github.com/user-attachments/assets/7c76b02c-1439-49f2-a42d-2fd7ddbfbaea" />

## Refactor it to make it simpler and more readable.

I've decided to condense the above code block to avoid repetition and improve efficiency:
<img width="735" height="235" alt="Screenshot 2026-03-18 at 2 48 02 pm" src="https://github.com/user-attachments/assets/a59e8cf1-d1d4-4d2c-b1a7-e1210c92de5d" />

## Write reflections in clean_code.md:

What made the original code complex?

There were too many methods that served a similar purpose. for '/search/title' and /search/genre', they both were meant to access a route to get data for both book titles and genres. However, this is unnecessary, and makes the code less efficient by duplicating code. 

How did refactoring improve it?

It condensed both methods into one, therefore eliminating the need to write a method for both title and genre. Both routes share an identical pattern, but with a different output, so its better to elimiate the initial setup and just render the output. 

Commit and push your changes to GitHub.

## 8) 📌 Writing Unit Tests for Clean Code
🎯 Goal
## Learn how writing unit tests helps maintain clean and reliable code.

## ✅ Tasks

## Research the importance of unit testing in software development.

## Choose a testing framework (e.g., Jest for JavaScript, PyTest for Python).

I'm currently using NUnit for C# in my university paper Object Orientated Programming:

<img width="866" height="658" alt="Screenshot 2026-03-20 at 4 35 35 pm" src="https://github.com/user-attachments/assets/86bc60f0-9a94-4a51-9c2f-9ebc2be674e0" />

## Write a few unit tests for a function in your test repo.

<img width="866" height="763" alt="Screenshot 2026-03-20 at 4 31 17 pm" src="https://github.com/user-attachments/assets/bc9a802d-650e-40b1-a042-9788c00dffc5" />


## Write reflections in clean_code.md:

## How do unit tests help keep code clean?

What is unit testing?

Individual code components being tested in isolation to confirm if they work. They are vital to ensure early bug detection, improve code quality, and facilitate refactoring. All of this is for the purpose of better maintainability and less risk of technical debt. 

What issues did you find while testing?

<img width="973" height="119" alt="Screenshot 2026-03-20 at 4 38 37 pm" src="https://github.com/user-attachments/assets/1b9c4938-99be-4111-b94a-0a93eea9b96e" />

For my "Week3-Lab.cs" there was a missing semi-colon (;). Hence the above error came up.

## 9) Code Formatting & Style Guides

## ✅ Tasks

## Research the importance of consistent code style.

## Review the Airbnb javascript style guide.

This is the link I used to research:
https://medium.com/free-code-camp/adding-some-air-to-the-airbnb-style-guide-3df40e31c57a

Install and configure ESLint and Prettier in your development environment.

ESLint: 
<img width="973" height="119" alt="Screenshot 2026-03-20 at 5 01 49 pm" src="https://github.com/user-attachments/assets/2f98ab92-d400-4af0-9992-8fe27d58e47c" />

Prettier:
<img width="973" height="119" alt="Screenshot 2026-03-20 at 5 03 26 pm" src="https://github.com/user-attachments/assets/91f29871-b85e-47c8-af6b-12cff1fa9736" />

Run the formatter and linter on your codebase and fix any issues.

Prettier:

Before:
<img width="973" height="515" alt="Screenshot 2026-03-20 at 5 08 15 pm" src="https://github.com/user-attachments/assets/5ca46281-bf1b-4b29-99bf-7010be2b54fa" />

After:
<img width="973" height="515" alt="Screenshot 2026-03-20 at 5 08 49 pm" src="https://github.com/user-attachments/assets/af7269f5-45fd-434d-a843-503cb00bcb21" />
There is proper spacing after the comma.

ESLint:

Before:
<img width="1166" height="820" alt="Screenshot 2026-03-20 at 5 31 26 pm" src="https://github.com/user-attachments/assets/9576304f-31ea-410f-a792-2724cf7e36cd" />

After:
<img width="1166" height="889" alt="Screenshot 2026-03-20 at 5 32 01 pm" src="https://github.com/user-attachments/assets/f5d31a23-a179-4479-91a4-770b3701254c" />


## Write reflections in clean_code.md:

## Why is code formatting important?

It is important as it enhances readability, maintainability and collaboration. It also helps reduce cognitive overload, as it can cause developers to become confused due to messy code. It is better to have code that conforms with a style, as this helps it seem more predicatable and consistent throughout a codebase. 

What issues did the linter detect?

It detected a function called "sayHelloLinting" that was assigned a value, but it was never called. Therfore I had to make sure it was called properly at the bottom of the code. 

Did formatting the code make it easier to read?

Some of them yes. There were a few that didn't quite make sense to me, but I think this is just a matter of getting used to the conventional formatting, rather than my own habits. 

