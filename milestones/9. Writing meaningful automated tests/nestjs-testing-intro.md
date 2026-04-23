# Introduction to Testing in NestJS

# Goal
*Understand the different types of testing in NestJS and how they ensure application stability.* 

# Why is this important?

*Testing is critical in Focus Bear’s backend to ensure reliability and prevent regressions. NestJS supports unit, integration, and end-to-end (E2E) testing using Jest and Supertest.*

# Tasks

**Research the different types of testing in NestJS (Unit, Integration, E2E)**

*What are the different ways of testing in NestJS?*

1. Unit Testing - Verifies the smallest parts of your app - usually individual methods or functions - in complete isolation

This was shown in unit tests I've done as listed in previous reflections:

- app.controller.spec.ts (1 failing test)
- users/users.controller.spec.ts (passing)
- users/users.service.spec.ts (passing)

***
2. Integration Testing - checks how different componenets (modules, services, or controllers) work together.

This is implemented by using the 'TestingModule' to create a subset of the application graph, allowing you to test specific 'seams; without the overhead of your entire app. 

Example:

<img width="768" height="562" alt="Image" src="https://github.com/user-attachments/assets/baa0e9d0-e7a1-438f-ad33-9b301e1f8658" />

***

3. End-to-End (E2E) Testing - it validates the full request-response cycle from a user's POV. It is meant to cover the entire system starting from the API entry point to the database. 

This requires the use of the NestJS Test runner bootstraps the full app context. 'Supertest' is commonly used to send real HTTP requests to the app. 

Usually this is situated in your /test folder in your NestJs app - under a file called 'app.e2e-spec.ts':

<img width="575" height="603" alt="Image" src="https://github.com/user-attachments/assets/0e5aecc1-1cdd-4401-bacd-b672e24b55e3" />


End result should be using 'npm run test:e2e
<img width="768" height="224" alt="Image" src="https://github.com/user-attachments/assets/ad83632d-fda0-498e-8b29-6ebd4756c0b4" />


**Understand the role of Jest in NestJS testing**

*What does Jest do in a NestJS setting?* 

Jest = the default, pre-configured testing framework used to check if your app's logic is correct. we can consider it as NestJS's official testing library, therefore Jest acts as that tool to help handle everything from unit tests to E2E suites. 

**Explore how to test NestJS modules using @nestjs/testing**

To test NestJS modules, you have to set up 'TestingModule' in your code by importing it. In this example, I'll be using my users.controller.spec.ts to test this (p.s testing only works in files that are ".spec.ts" files):

1. Import @nestjs/testing

<img width="768" height="89" alt="Image" src="https://github.com/user-attachments/assets/42f811d4-6b93-48af-b078-6f89c98959b4" />

2. Load the file with the basic set up:

- Test.createTestingModule() - Creates a test module with your providers/controllers

- beforeEach() - Sets up the module before each test

- module.get() - Gets instances from the test module

<img width="820" height="749" alt="Image" src="https://github.com/user-attachments/assets/ed5269d5-ee58-4706-b5a5-43121c32f430" />



# Run a sample test using Jest

3. Now test the files with the following command:

npm test 

Example of tests not passing:
<img width="768" height="191" alt="Image" src="https://github.com/user-attachments/assets/97ea4e4e-2b77-44b0-a61d-a41aee13899c" />



Example of all tests passing:
<img width="768" height="191" alt="Image" src="https://github.com/user-attachments/assets/4b0450f9-a35f-48c8-8b3e-8c84a4d6d7a5" />


# ✅ Reflection (nestjs-testing-intro.md)


**What are the key differences between unit, integration, and E2E tests?* 

1. Unit testing only tests a specific code or function. Usuaully this is done in isolation. 

2. Integration testing chekcs how different components like modules, services, or controllers work together.

3. End-to-End (E2E) Testing - it validates the full request-response cycle from a user's POV. It is meant to cover the entire system starting from the API entry point to the database. 


**Why is testing important for a NestJS backend?*

Testing is vital as it makes sure tha application is running reliably. It facilitates safe code refactoring, and makes sure that business logic is running as expected by checking the outcomes before an app is fully deployed and in use. 

**How does NestJS use @nestjs/testing to simplify testing?*

It simplifies testing by providing built-in functions that mimic NestJS's runtime environment. this enables the easy mock up of dependencies, creating isolated units, integration or E2E testing suites. 


**What are the challenges of writing tests for a NestJS application?*

Biggest challenges for me is recognising how to implement the different methos of testing in NestJS.

For example, I found integration testing the hardest to grasp at first as there were many components being tested. 

it('should fetch all users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
      { id: 1, name: 'John', email: 'john@example.com' }
    ]);
    expect(repository.findAll).toHaveBeenCalled();
  });

I tried to understand this code as much as I can, as it was calling upon other components. But I figured at last that it was calling from the controller to the service, which is calling the repo to fetch the data to validate it. 
