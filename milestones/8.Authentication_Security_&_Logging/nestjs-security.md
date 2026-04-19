## 📌 Security Best Practices in NestJS

## 🎯 Goal

**Learn and apply security best practices to protect NestJS applications from common vulnerabilities.*

## ✅ Why is this important?
**Focus Bear’s backend handles sensitive user data, making security a top priority. Implementing best practices helps prevent attacks like XSS, SQL injection, and CSRF.*

## ✅ Tasks

**Research common security risks in NestJS (e.g., injection attacks, CORS misconfigurations)*

1) Missing Global Validation Pipes: Inability to implement 'ValidationPipe' globally allows for unauthorised data to reach your bacnekdn/controllers, which can lead to SQL injection, XSS (Cross-site scripting) and other malicious methods. 

2) Unprotected Routes (Missing Guards): leaving sensitive routes without Guards (e.g authentication) can expose app logic and private data to unauthorised users. 

3) CORS Misconfiguration: When web servers are poorly defined in which origins can have access to resources, allowing malicious sites to read sensitive data or execute authenticated actions through the command 'Access-Control-Allow-Origin."

4) Arbitrary Code injection in FileTypeValidator:
Older versions of @nestjs/common (before 10.4.16 and 11.0.16) have a vulnerability where an attacker can execute code through a crafted payload in the 'Content-Type" header due to improper MIME type validation. 

5) Exposed Error Details: Raw error responses or stack traces in produciton can leak internal logic and structure to attackers. 

**Explore how @fastify/helmet helps secure HTTP headers*

What is it?

It helps NestJS applications in securing themselves through the Fastify adapter. By automatically setting 15 different HTTP response headeers, it mitigates common web vulnerabilies. It acts as a wrapper around Helmet.js library - which is optimized for the Fastify framework. 

1) Start by installing the package:

npm i --save helmet
<img width="609" height="396" alt="Image" src="https://github.com/user-attachments/assets/5f27abdc-331b-4897-a791-e5bf40b68453" />

2) Once installed, apply it as a global middleware (in main.ts)
<img width="609" height="698" alt="Image" src="https://github.com/user-attachments/assets/925af7ac-06c2-4657-8711-5434f0099b54" />

3) Validate to see if it worked:
<img width="600" height="372" alt="Image" src="https://github.com/user-attachments/assets/608ee64d-6ea7-4eaa-a050-557982490098" />

The app was tested using:

curl -I http://localhost:3000

This was to inspect the HTTP response headers. Security headers like X-Frame-Options, X-Content-Type-Options and Content-Security-Policy indicates that the Helment middleware is present. The absense of the X-Powered-By header confirms that the application is being ran by Fastify. 

**Implement request rate limiting using @fastify/rate-limit*

What is it? 

A Fastify plugin that hekps protect an application from abuse and excessive traffic by limiting how many requests a client can send in a certain timeframe. It checks requests early through an 'onRequest' hook.

1) First install the @fastify/rate-limit plugin

npm install @fastify/rate-limit

2)  Use this in main.ts

<img width="504" height="863" alt="Image" src="https://github.com/user-attachments/assets/554e043c-71c3-45ff-a983-a30d097625b6" />

3) Now run docker to test it out:

docker compose up --build (We are rebuilding our docker container as there is new code)

npm run start:dev (run the app locally):

PS: change the port if you get an error (e.g port 3000 to something else) if it is already being used.

<img width="593" height="863" alt="Image" src="https://github.com/user-attachments/assets/0142dadc-e68c-4fa5-933b-8806e35a087a" />

4) 


**Understand how to securely handle API keys and environment variables*

In NestJS, senstive information like API keys, database credentials and JWT secrets should never be exposed and hardcoded into your source code. Instead, they should be stored in environment variables like .env files and accessed through @nestjs/config.

'ConfigModule' and ConfigService' provides a central and secure way to manage all configurations. They also allow you to validate required variables at start up. Thus, making the app run without missing or incorrect values. 

For security:

1) use '.env' and '.gitignore' to avoid commiting senseitive information. 

2) Never log or expose secrets in API responses.

3) Use different environment variables for development, testing and production. 

4) Apply least privilege to all credentials (only giving necessary access and nothing else to relevant users).

While these are all good, production apps should still consider using a secrets manager like AWS secrets manager, to reinforce better security and access control. 


✅ Reflection (nestjs-security.md)

**What are the most common security vulnerabilities in a NestJS backend?*

1) Missing Global Validation Pipes: Inability to implement 'ValidationPipe' globally allows for unauthorised data to reach your bacnekdn/controllers, which can lead to SQL injection, XSS (Cross-site scripting) and other malicious methods. 

2) Unprotected Routes (Missing Guards): leaving sensitive routes without Guards (e.g authentication) can expose app logic and private data to unauthorised users. 

3) CORS Misconfiguration: When web servers are poorly defined in which origins can have access to resources, allowing malicious sites to read sensitive data or execute authenticated actions through the command 'Access-Control-Allow-Origin."

4) Arbitrary Code injection in FileTypeValidator:
Older versions of @nestjs/common (before 10.4.16 and 11.0.16) have a vulnerability where an attacker can execute code through a crafted payload in the 'Content-Type" header due to improper MIME type validation. 

5) Exposed Error Details: Raw error responses or stack traces in produciton can leak internal logic and structure to attackers. 

**How does @fastify/helmet improve application security?* 

It helps improve app security by automatically installing a series of HTTP response headers that protects your app from common web vulnerabilities. It is essentially a lightweight wrapper that protects the Helmet.js middleware. 

**Why is rate limiting important for preventing abuse?*

Rate limiting is a security management technique that controls how many requests a user can send to a network or server within a certain timeframe. Essentially, it protects the system from being overwhelmed, enforcing API usage to have quotas and mitigates maliclious activity. 

**How can sensitive configuration values be protected in a production environment?* 

Sensitive configuration values should be protected by centralizing htme in dedicated secrets management tools, removing them from version control and using short-lived or dynamic credentials like temporary access tokens, keys or passwords generated on demand. In a production environment, secrets should never be stored in plain file texts or commited to permanent code repos like Github. Therefore consider using files like .gitignore to keep information hidden, but still accessible. 