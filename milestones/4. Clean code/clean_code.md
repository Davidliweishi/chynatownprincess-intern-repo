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

Commit and push your changes to GitHub.
