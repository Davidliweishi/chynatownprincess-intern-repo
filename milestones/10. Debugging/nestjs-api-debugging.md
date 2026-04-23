# Inspecting API Requests & Responses
# 🎯 Goal
**Learn how to inspect incoming API requests and outgoing responses to debug NestJS applications effectively.**

# ✅ Why is this important?

**When debugging Focus Bear’s backend, it’s crucial to verify that API requests contain the expected data and that responses return the correct structure. Debugging at the request/response level helps catch issues like incorrect payloads, missing headers, and invalid authentication.**

# ✅ Tasks

**Research tools for inspecting API requests (Bruno, Postman, or curl)**

curl = lightiweight, command-line tool for making HTTPs request without GUI overhead. It's perfect for quick tests and automation

curl http://localhost:3001/test makes a simple GET request, while curl -X POST -H "Content-Type: application/json" -d '{"name":"John"}' http://localhost:3001/users sends POST data with headers.

Postman = a comprehensive GUI application with a massive feature set for API development and testing. You create requests visually, organize them into collections, save request history, set environment variables ({{baseUrl}}), write tests in JavaScript, and generate documentation automatically. 

Bruno = a newer, open-source API client designed as a lighter alternative to Postman, stored as plain text files instead of cloud databases. You get the visual interface and collections like Postman, but with offline-first design, version control friendliness (git-compatible), and minimal resource usage. It supports variables, scripting, and environment management similar to Postman but stays local to your machine.


**Log request payloads and headers in a NestJS controller**

Use Request Object for Complete info including payloads and headers:

1) Change your controller, 'teest.controller' since we are only setting up:

<img width="629" height="718" alt="Image" src="https://github.com/user-attachments/assets/f2c38f4e-e5b1-4a05-b832-e817b3dd2ae1" />

2. Start up your app 

npm run start:dev

3. Make a request in another terminal, with all the fields you want to test P.S use a different email from what's in your system to test headers as well: 

curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test-token" \
  -d '{"name":"john_doe","email":"john_new@example.com","password":"secret123"}'

output should be:

<img width="710" height="132" alt="Image" src="https://github.com/user-attachments/assets/f2591d5f-1a66-43a7-8e9b-d458d7818f51" />

***
**Inspect API responses and verify HTTP status codes**

HTTPS status codes tell you the result of your request. Learning them is vital to understand responses for debugging APIs

**HTTP Status Code Categories**

2xx Success (Request succeeded)

200 OK - Request succeeded, data returned
201 Created - Resource successfully created
204 No Content - Request succeeded, no data to return

3xx Redirection (Further action needed)

301 Moved Permanently - Resource moved permanently
302 Found - Temporary redirect
304 Not Modified - Resource unchanged since last request

4xx Client Error (Client's fault)

400 Bad Request - Invalid request data
401 Unauthorized - Authentication required
403 Forbidden - Authenticated but not allowed
404 Not Found - Resource doesn't exist
409 Conflict - Request conflicts (e.g., duplicate)
422 Unprocessable Entity - Valid syntax but semantic error

5xx Server Error (Server's fault)

500 Internal Server Error - Server error
502 Bad Gateway - Invalid response from upstream
503 Service Unavailable - Server temporarily unavailable

Example: Let's test 201 Created - Resource successfully created:

Command: curl -i -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"NewUser","email":"newemail'$(date +%s)'@example.com","password":"secret123"}'

Output:
<img width="722" height="367" alt="Image" src="https://github.com/user-attachments/assets/0e4252a4-b846-49f1-9348-7826964220c1" />



**Use middleware or interceptors to modify and analyze API responses**

Middleware - lower level, handles raw requests/responses

- Best for: global logging, CORS compression
- Cannot tramsform responses easily

Interceptors - higher level, more powerful. 

- Best for: Transform responses, error haldning, timing, caching
- Can inspect execution context

Process:

1. Global Response Logging  - create a logging inteceptor:
<img width="661" height="560" alt="Image" src="https://github.com/user-attachments/assets/29fc6ef0-5e43-47dc-9365-d599ae6d4ac6" />


2. start your app with:

npm run start:debug

3. In new terminal:

curl http://localhost:3001/test

4. It should come up with a wrapped response with both modification and analysis:

<img width="541" height="151" alt="Image" src="https://github.com/user-attachments/assets/c7d647c4-d854-416e-b9a5-be301dfe5947" />




# ✅ Reflection (nestjs-api-debugging.md)
**How can logging request payloads help with debugging?**

It provides a detailed redorc of the exact input that triggers a certain behavior. This helps debug issues that are oterwise invisibile or hard to spot.

**What tools can you use to inspect API requests and responses?**

You can use built in tools like Consoles ('fetch()'), GUI clients, command line interfaces and specialised debugging proxies. Make sure that it allows you to view headers, payloads, status codes and response times in real time.


**How would you debug an issue where an API returns the wrong status code?**

You should follow these steps:

1) use an API client like Postman or curl to eliminate any forntend or environment-specific bugs. 

2) Verify consistency by checking if the wrong status code happens every time or sometimes, which can suggest a race condition or data specific issue. 

3) Inspect the full response body -  instead of a specific 400, the response body often contains a JSON object with a detailed error message or a "Problem Detail" as defined in RFC 9457. Hence look for fields like 'message', 'error', 'detail' or 'code' to see why a server chose its status. 

4) Validate request parameters like endpoints and methods, headers, and payload to see if any part of the envelope is correct.

5) Review server-side logs - trace requests, check the middleware and breakpoints to see if anything is happening in the backend. 

6) Check external dependencies - the wrong status may be a pass-through from an external service. 


**What are some security concerns when logging request data?**

Logging request data can introduce a certain list of security risks:

1) Plaintext credentials = unintentionally logging usernames, passwords, API keys and authentication tokens can allow attackers to gain unauthorised access. 

2) Personally Identifiable Info = Logging full request bodies often include personal data like naes, emails home addresses, phone numbers and other sensitive informationm which can violate data privacy regulations and policies (dependeing on your country and company)

3) Improper Access Control and Storage: Logging injection/Log Forging, over-retention and insecure log storage can all cause security breaches. 

