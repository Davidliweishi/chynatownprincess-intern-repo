# 📌 Using Jest & Supertest for API Testing in NestJS

# 🎯 Goal
**Learn how to write integration tests for API endpoints using Jest and Supertest.* 

# ✅ Why is this important?
**Focus Bear’s backend exposes APIs for the web and mobile apps. API tests ensure that endpoints return the correct responses, handle errors properly, and interact with services as expected.*

# ✅ Tasks

**Research how Supertest is used for API testing in NestJS**

what Supertest does:

Supertest - provides a fluent API for making HTTP requests to your app and asserts this on the responses. It works with any node.js HTTP server, but it pairs perfectly with NestJS for integration testing. 

Key Features:

1. Making Requests: Suoertest allows yout to make all HTTP vers - GET,POST, PUT, DELETE and PATCH - directly against your app without needing an external HTTP and more in a readable chain.

2. Assertions: you can assert response status codes, headers, body content, JSON structure and more in a readable chain. 

3. No Port Binding: Supertest doesn't require your server to bind to a port, it works directly with the Express/Fastify instance, making tests faster and cleaner. 

Common supertest Methods:

Building the request: request(app), .get(), .post(), .put(), .delete(), .patch()

Setting headers: .set('Authorization', 'Bearer token') or .set({ 'Content-Type': 'application/json' })

Sending body data: .send({ key: 'value' }) or .send('raw-data')

Assertions: .expect(200) for status, .expect('Content-Type', /json/) for headers

Custom assertions: .expect((res) => { /* custom checks */ }) for complex validations

***
**Write an integration test for a simple GET API endpoint**

1. use the following in a spec.ts file. I'm using a separate file called users.e2e.spec.ts to do this:

<img width="722" height="215" alt="Image" src="https://github.com/user-attachments/assets/f2475678-b87f-4e59-b022-996c06336aad" />

2. Now test it:

<img width="550" height="440" alt="Image" src="https://github.com/user-attachments/assets/07056f1b-47f6-419c-8e15-052ce1306e52" />


**Write an integration test for a POST API endpoint with request validation**

An integration test for a POST API endpoint verifies that multiple components - like rouitn g, request validation middleware, and DB interactions - work together as intended. 

1. Define the method inside the relevant .spec.ts file (in this instance we are using one called 'post-users.e2e.spec.ts')

<img width="651" height="777" alt="Image" src="https://github.com/user-attachments/assets/671400f3-35ae-426f-a914-b0b7bbe9eed6" />

2. Now test it:

<img width="576" height="246" alt="Image" src="https://github.com/user-attachments/assets/550848f3-171f-4da8-86e5-b914116889fe" />

If it passes, it means your POST API endpoint is working fine. 

**Mock authentication in API tests (e.g., by providing a test JWT)**

Mocking authentication in API tests using a test JSON Web TOken (JWT) allows you to simulate authenticaed users sessions wihout relying on a live identity provider. 

This approach is perfect for testing protected endpoints, validating role-based access control (RBAC), and speeding up CI/CD pipelines by removing external network latency. 

* Ways to implement:

- Mocking the Middleware: you replace the standard JWT validaton middleware with a 'test mode; veriosn that accepts any token signed with specific 'test secret'.

- Mocking Identity Providers: For systems that verify tokens against an external service, use tools like WireMock or Mock Service Worker to simulate the JWKS endpoint, providing the public keys needed to validate your test JWT. 

- Postman Mocking: Use Postman Mock Servers to simulate entire authenticatin flows, retunring predefined test tokens in response to mock login requests. 

To simplify:

An API requires JWT tokens to access endpoints:

example (users.controller - POST/users endpoint)

<img width="576" height="589" alt="Image" src="https://github.com/user-attachments/assets/2ff76e04-2a35-4e37-b604-abaaaa784532" />

without mocking, the tests woul fail with a 401 Unauthorised. 

**STEPS**

1. Go to a testing file (we are using users.e2e.spec.ts as an example) and implement the highlighted method:

<img width="807" height="605" alt="Image" src="https://github.com/user-attachments/assets/51b99544-9162-439f-a958-8c504603c4cb" /> 


2. Now test it:

<img width="807" height="206" alt="Image" src="https://github.com/user-attachments/assets/0c41a51e-7761-40fa-a468-48dd23f44bbb" />a



# ✅ Reflection (nestjs-api-tests.md)

**How does Supertest help test API endpoints?*

It helps simplify API endpoint testing by providing a 'fake' browser that talks directly to the code.

It doesn't need a server, i has easy assertions, readability and faster tests. 

**What is the difference between unit tests and API tests?*

Unit tests - isolates and verifies small testable parts of your application - usually these are functions or methods. 

API tests - verifies and validates APIS (application Programming Interfaces) for their functionality, reliability, performance and security. It is to check if every one of these aspects are working as intended. 

**Why should authentication be mocked in integration tests?*

Mocking authentication in API tests using a test JSON Web TOken (JWT) allows you to simulate authenticaed users sessions wihout relying on a live identity provider. 

Mocking authentication in API tests allow you to simulate authenticated user sessions, wothout having to use a real life identity provider to do so. This creates a safe environment to test authentication before actually implementing it. 


**How can you structure API tests to cover both success and failure cases?* 


You make sure that your API tests has a test suite that covers and categorises all case outcomes based on intentions. For example, positive, negative and edge cases. 

- Positive - verifies if API wokrs as intended with valid outputs. 

- Negative - Deliberately setting upo invalid or malicious inputs to ensure APIs can handle them with secure outputs. 

- Edge and Boundary cases - test the extreme conditions of the API, e,g making sure there is stability when handling empty payloads, excessively long strings, or very large file uploads. 

