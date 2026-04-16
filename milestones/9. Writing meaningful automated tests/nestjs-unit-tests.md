## Writing Unit Tests for Services & Controllers in NestJS

**Goal**
*Learn how to write unit tests for NestJS services and controllers using Jest.*

**✅ Why is this important?**

*Unit tests help ensure that individual functions work correctly in isolation. In Focus Bear, controllers handle API requests, and services contain business logic—both need thorough testing.*

**✅ Tasks**

**Research how unit testing works in NestJS using Jest*

Unit test is work by isolating individual componements like services and controllers and testing their logic independently from the rest of the NestJS app. 

**Write a unit test for a simple NestJS service*

I've already done this in a previous milestone issue (9.2)

Files I've done a unit test for:

1. users.service.spec.ts

<img width="831" height="900" alt="Image" src="https://github.com/user-attachments/assets/8b0dcc11-a4bd-4f9a-bdb2-f397b70aa84b" />




**Write a unit test for a controller method handling API requests*

I've already demonstrated this is a previous milestone (9.2) 

* users.controller.spec.ts

<img width="831" height="900" alt="Image" src="https://github.com/user-attachments/assets/d136d1e1-b285-46df-a736-04d9b2f78ab1" />


**Both pass the tests* 

<img width="831" height="213" alt="Image" src="https://github.com/user-attachments/assets/088ef0ac-2b16-4c09-9e7f-ec3e71415cfc" />

**Mock dependencies using jest.mock() or NestJS’s testing utilities*

'jest.mock()' does 3 things:

1. Replaces an entire module with a fake one
2. Prevents real API calls, database queires, or file I/O during tests
Tracks all calls so you can verify what happened. 

However, because I don't hvae any external npm packages installed (like axios or stripe), I'll be using another testing utility called 'jest.spyOn()'

jest.spyOn() = creates a mock function similar to 'jest.fn()', that specifically tracks calls to a pre-existing method on an object. It only observes a specific function rather than a whole module. 

<img width="831" height="130" alt="Image" src="https://github.com/user-attachments/assets/05edfef8-a772-4dfc-9a9f-e0c9534b295e" />



# ✅ Reflection (nestjs-unit-tests.md)

* Why is it important to test services separately from controllers?

Testing services away from controllers is important because it separatees business logic from web logic like HTTP requests. Separate testing means faster debugs, much better code maintainability and test reusability. 

* How does mocking dependencies improve unit testing?

Mocking lets you test in isolation away from the main code base to see what your dependencies are exactly doing and what their outputs are. 


* What are common pitfalls when writing unit tests in NestJS?

Common pitfalls:

1. over-mocking - mocking only the dependencies and not the service method itself

2. Forgetting to clean uop your mocks - mokcs can leak in between tests

3. Not testing error cases

4. Testing private methods instead of public API


* How can you ensure that unit tests cover all edge cases?

to ensure all edges are covered, you must move beyond just testing the 'happy path' (standard scenarios) and testing the boundaries in a certain method to see where the software most likely fails. 

1. Boundary value testing
2. Null/Underfined/Empty testing
3. Invalid Data Type Testing
4. Invalid Format testing
5. Duplicate data Testing 
6. Permission and Authorization testing
7. Error Scenario testing
8. concurrent operation testing
9. Special character and Unicode testing
10. State and Transitions testing