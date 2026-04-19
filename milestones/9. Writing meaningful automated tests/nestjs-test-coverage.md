## 📌 Understanding the Focus Bear Coverage Bar & Writing Meaningful Tests

**🎯 Goal**
**Learn how to measure and improve test coverage in Focus Bear’s NestJS backend using the coverage bar while ensuring tests have meaningful assertions.*

## ✅ Why is this important?

**Focus Bear maintains a high standard of test coverage, ensuring stability and reducing bugs. The coverage bar tracks how well code is tested, and all code is expected to meet at least 80% test coverage before deployment. However, high coverage alone isn’t enough—tests must have good assertions to ensure they verify actual behavior.*

***

## ✅ Tasks

**Research how Jest generates test coverage reports in NestJS**

* What are Test Coverage Reports in NestJS?

They are metric-dirven documents that show how much of your app's source code is executed during the unit, component and end-to-end (e2e) tests. These reports help developers identify bugs and 'blind spots' - untested code lines or logic branches - to ensure the app is reliable enough to use. 

* How do they generate in NestJS?

- CLI Flag: Run your tests with the "--coverage" flag (e.g 'jest--coverage' or 'npm test -- -- coverage')

- Configuration: Enable permanent coverage collection by setting "collectCoverage: true" in your Jest Configuration file (e.g 'jest.config.js' or 'package.json')


**Run the test suite and view the test coverage report**

There are multiple ways to generate reports:

1. Basic Coverage (Terminal)

* npm test -- --coverage

<img width="807" height="471" alt="Image" src="https://github.com/user-attachments/assets/cc2b525d-8fb1-44d1-8017-2de090fe86d4" />


2. HTML Report (View in Browser)

* npm test -- --coverage --coverageReporters=html
open coverage/index.html

3. Coverage for One Module

npm test -- --coverage src/users

<img width="669" height="437" alt="Image" src="https://github.com/user-attachments/assets/ef2a6d5a-05f5-412b-9ec8-15d9f859e9ad" />

4. Coverage in Watch Mode

npm test -- --coverage --watch

<img width="669" height="403" alt="Image" src="https://github.com/user-attachments/assets/0c75b346-93b5-44b7-b0fe-98997652a0ae" />


**Identify untested areas and write additional tests to improve coverage**

<img width="669" height="556" alt="Image" src="https://github.com/user-attachments/assets/5f040deb-4501-490e-a7bf-6c668257e039" />

1. RolesGuard (5 tests)

- Allow when no roles required
- Allow ehn user has required role
- Deny when user lack required role
- Deny when user is not present
- Allow when user as one of multiple roles

<img width="720" height="556" alt="Image" src="https://github.com/user-attachments/assets/4f798f96-15de-4df5-a924-2794f65a016b" />

<img width="720" height="271" alt="Image" src="https://github.com/user-attachments/assets/7f89def8-0ff2-45d7-a399-dd2997ceb1bb" />


2. JWTStrategy (3 tests) 

- Validate with complete payload
- Handle minimal payload
- Ignore extra fields

<img width="553" height="241" alt="Image" src="https://github.com/user-attachments/assets/aebd4bbe-714f-4696-a0c2-b682ae3c04b4" />

3. Users Service 

- Update user
- Update fails
- Update multiple
- Delete user
- Delete fails
- Delete call

<img width="553" height="241" alt="Image" src="https://github.com/user-attachments/assets/46488144-60fd-46e7-9991-947e552ef6fa" />

4. E2E Patch and Delete 

<img width="553" height="457" alt="Image" src="https://github.com/user-attachments/assets/c66e02dc-ca11-448c-af66-572fa647d861" />



**Research the concept of "meaningful test assertions" and why high coverage can sometimes be misleading**

* What is a meaningful test assertion?

a meaningful test assertion should:

- test specific, important behavior
- catch real bugs if the code broke
- fail clearly if something is wrong
- Add real value to code quality

High Coverage can be misleading because often it measures the code quantity instead of quality, depth and actual effectiveness. It often looks at surface-level testing, and neglect much depper and complex code logic - where most bugs hide. 



**Refactor a weak test to ensure it has proper assertions**

Users.service.spec.ts:
<img width="553" height="112" alt="Image" src="https://github.com/user-attachments/assets/e645a22d-16eb-457f-a604-ebfe890a1e5f" />

Issues with this:

- Only tests 1 user case
- Doesn't test empty array
- No error handling test
- Doesn't verify data structure

Refactored:

<img width="553" height="503" alt="Image" src="https://github.com/user-attachments/assets/5276d803-1e10-4bb4-accb-9c2dbd26e154" />



## ✅ Reflection (nestjs-test-coverage.md)

**What does the coverage bar track, and why is it important?**

code coverage measures how much of your source code is executed by tests through four dimensions:

1. statements
2. branches
3. functions
4. lines

Coverage matters because it prevents bugs in untested code, ensures error handling works and give developers confidence when refactoring and documents expected behaviors. 



**Why does Focus Bear enforce a minimum test coverage threshold?**

A minimum level allows for a standardised coverage level, so that developes won't deploy an app with untested code. It prevents technical debt from occuring and catches bugs during production. 


**How can high test coverage still lead to untested functionality?**


High coverage mostly coverscode quantity, rather than quality. Surface-level coverage skims over deeper and more complex bugs, making it deceptive when running coverage tests. 


**What are examples of weak vs. strong test assertions?**

Example:

1) weak assertion: checkng that an element merely exists

- expect(page.locator('.phone')).toBeVisible()

This is weak because the element might exist but contains empty text or incorrect info. 

2) strong assertion: Checking that the element contains specific, formatted text.

expect(page.locator('.phone')).toHaveText('(123) 456-7890')

It's strong because it ensures the user sees the exact correct data. 


**How can you balance increasing coverage with writing effective tests?**

Key strategies for balance:

- Prioritise high-risk areas
- Maintain writing many fast, isolated unit tests, fewer integration tests, and fewer e2e tests.
- Avoid high coverage percentages and more on scenario based tests
- Target logic rather than code lines - ensure all logical paths and edge cases are tested. 
- Use tools to introduce 'bugs' into your code, if the tests still pass, the code needs better refactoring. 

