# Authentication in NestJS with Auth0 & JWT

**Goal**

**Learn how authentication works in NestJS using Auth0 and JWT.*

# Why is this important?

**Focus Bear’s backend relies on Auth0 for user authentication and JWT for session management. Understanding how this works is essential for securing API endpoints.**

# Tasks

**Research how Auth0 integrates with NestJS (auth0, @nestjs/jwt, jwks-rsa)**

Integration of Auth0 involves using a Passport-based strategy to validate JSON Web Tokens (JWT) issued by Auth0.

Passport-based = Uses PAssport.js middleware with the 'passport-jwt' strategy to secure Node.js RESTful APIs without sesisons.

Core integration Principles:

1. auth0 = a third party, external platform that creates and provides authentication and authorization as a service. It protects applications, APIs, and users. 

2. @nestjs/jwt = This is primarily used in advanced token decoidng or manual validation if you are not implementing the full Passport strategy. It is not used to issue tokens in local auth setups during the Auth0 integration process. 

3. jwks-rsa = A library used for essential RS256 (asymmetric) signing. it exposes the 'passportJwtSecret' (which enables secure JWT verification by dynamically fetching signing keys from a JWKS (JSON Web Key Set) endpoint), which automatically fetches, caches and rotate the public keys from your Auth0 domain. 

**Understand how JWT-based authentication works**

JWT Authentication Work Flow:

1. Module Set up

- Import PassportModule and JwtModule:

<img width="639" height="447" alt="Image" src="https://github.com/user-attachments/assets/99a00b39-13dc-48bf-8f8e-2b9500a3facb" />

2. Configure JWT with a secret and an expiration date:

<img width="639" height="447" alt="Image" src="https://github.com/user-attachments/assets/dee0ab73-ae8d-415b-baa2-949bd9e03309" />

3. Register the strategy globally in 'app.module.ts':

<img width="575" height="812" alt="Image" src="https://github.com/user-attachments/assets/adb0d1c3-d8f3-4c6f-8e1e-476b362a9573" />

4. Create the JWT Strategy ('jwt.strategy.ts'):

<img width="693" height="474" alt="Image" src="https://github.com/user-attachments/assets/d9c3aead-2dc4-485e-9e61-6b1e83064eef" />

5. Create the JWT Auth Guard ('jwt-auth.guard.ts'):

<img width="693" height="474" alt="Image" src="https://github.com/user-attachments/assets/280797db-dc49-4893-be4d-f48637579f33" />

6. Create a Public Route Decorator in 'public.decorator.ts':

<img width="693" height="474" alt="Image" src="https://github.com/user-attachments/assets/971bcd2b-4412-4e2e-94d3-0839b9e35484" />

7. Use it in 'auth.controller.ts':

<img width="693" height="619" alt="Image" src="https://github.com/user-attachments/assets/1ff8ce0a-01ec-4439-b366-d0919d7c3717" />

8. Start your NestJs server to test authentication

Command: npm run start:dev

9. Test your Login Endpoint:

Once your server is running: try using cURL command:

curl -X POST http://localhost:3000/auth/login \ 
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

* replace localhost:WITHWHTEVERPORT YOU HAVE

<img width="671" height="134" alt="Image" src="https://github.com/user-attachments/assets/0c1ffeee-b800-4020-b9f8-1ee0b6d0c87c" />

Token generated!

**Explore how Auth0 manages user sessions and access tokens**

Auth0 manages 3 different things:

1. Sessions (Server-side)
- Tracks who's logged in
- Remembers user across requests
- Can timeout after inactivity

2. Access Tokens (Short-lived)
- Prove identity to API
- Expire quickly (1 hour)
- Can be refreshed

3. Refresh Tokens (Long-lived)
- Get new access tokens
- Last 7-30 days
- Allow "remember me" functionality

Auth.service.ts:

Enhanced version provided in the following pathway:
chynatownprincess-intern-repo/nest-js/src/auth/auth.service.ts

Auth.controller.ts:

Enhanced version provided in the following pathway:
chynatownprincess-intern-repo/nest-js/src/auth/auth.controller.ts

<img width="671" height="883" alt="Image" src="https://github.com/user-attachments/assets/23ef61ce-a9da-4e8c-8f34-a1b602b45ec2" />



**Set up a simple authentication flow using Auth0 in a NestJS app**

1. Set up your auth0 account

2. Create an application 

We will use nest-js/app
<img width="771" height="474" alt="Image" src="https://github.com/user-attachments/assets/05516b2c-6913-4d38-92b0-c59a85537837" />

3. Get the credentials in application settings:

<img width="771" height="599" alt="Image" src="https://github.com/user-attachments/assets/f26a11f2-bb1e-49f2-b6ae-d1ad45dba99b" />

4. Create the API and get the identifier:

<img width="771" height="599" alt="Image" src="https://github.com/user-attachments/assets/c94148cc-57ae-4483-adec-168e926160a6" />

5. Set up youe NestJS with dependencies installation:

npm install @nestjs/passport passport passport-auth0 passport-jwt dotenv
npm install --save-dev @types/passport-jwt

6. Put your credentials in .env file:

<img width="613" height="175" alt="Image" src="https://github.com/user-attachments/assets/f727a93a-44ae-41fa-841a-65c72244f12c" />

7. Edit your Auth0 Strategy 

<img width="707" height="628" alt="Image" src="https://github.com/user-attachments/assets/be24ca03-5bf5-4334-905a-a97b1331ea0d" />

8. Set up JWT Strategy for API 

<img width="1137" height="628" alt="Image" src="https://github.com/user-attachments/assets/100c42d7-8c92-44d9-a1e6-e84cf2b68d16" />

9. Install Required Packages:

npm install jwks-rsa
npm install passport-auth0

10. Create Guards (Dual Auth)
<img width="737" height="406" alt="Image" src="https://github.com/user-attachments/assets/16d95b01-47c2-4750-8b31-68b1ecae37c2" />

11. Update AuthModule with all the strategies:
<img width="737" height="715" alt="Image" src="https://github.com/user-attachments/assets/4c884d81-3571-4eb9-906e-75a0c75694f1" />

12. Create/Update Controllers

- Add /auth/auth0/login endpoint
- Add /auth/auth0/callback endpoint for OAuth redirect
- Implement token exchange logic

13. Configure Auth0 Dashboard

14. Update Environment Variables

Add all Auth0 credentials to .env

- Enable Grant Types (Authorization Code, Refresh Token)
- Set Allowed Callback URLs
- Set Allowed Web Origins

15. npm run start: dev and test it

<img width="1511" height="922" alt="Image" src="https://github.com/user-attachments/assets/9aa60fd6-72e5-4191-8ca4-fae3c77fa52a" />

Since I don't deal with frontend, once you sign in it will be just blank (and that is okay):

<img width="737" height="715" alt="Image" src="https://github.com/user-attachments/assets/296d95e4-d47e-44a6-8af0-b45d7dde4abc" />

# Reflection (nestjs-auth0.md)

**How does Auth0 handle authentication compared to traditional username/password auth?**

Traditional auth sotres sessions on the server, while Auth0 deals with authentication with Auth0' servers - they verify credentials and send them back with JWTs that your client stores. Your server never stores anything, it just verifies the token's signiture.

**What is the role of JWT in API authentication?** 

JWT is a digitally signed token containing user information (payload), creayed by Auth0 with their private key. Your server verfies the signiture by using Auth0's public key - if the signiture matches, you know that Auth0 created it. No DB lookups means you can just verify the signiture and extract the data from the token. 

**How do jwks-rsa and public/private key verification work in Auth0?**

Auth0 publishes their public keys at a public JWKS endpoint. The jwks-rsa library fetches these keys and caches them. Once a token arrives, it extracts the key ID from the token header, finds the matching public key and verfies the signiture. 

**How would you protect an API route so that only authenticated users can access it?**

Using the "@UseGuards (JwtAuthGuard)" decorator on your endpoints. This guard extracts the token from the Authorization header, verfies it and attaches the user to the request. Without this guard, the route is public and only requests with the valid token is allowed. 