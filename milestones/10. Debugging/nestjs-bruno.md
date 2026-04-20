# 📌 API Debugging with Bruno

**🎯 Goal**
*Learn how to use Bruno for testing and debugging API requests in a NestJS application.*

# ✅ Why is this important?

**Bruno is an open-source API client used to test NestJS endpoints. It provides a lightweight alternative to Postman for making REST and GraphQL requests, saving and organizing API collections efficiently.**

# ✅ Tasks

**Research what Bruno is and how it differs from Postman**

What is Bruno?

A popular, open-source, offline-first API client. Designed as the faster and more Git-friendly alternative to Postman. 


**Install Bruno and create a new API collection**

1. Install Bruno

Command: brew install Bruno

<img width="583" height="379" alt="Image" src="https://github.com/user-attachments/assets/3f985e07-f669-461e-935e-657dbdb4569b" />

2. Install Bruno CLI (for automatic CI/CD)

Command: npm install -g @usebruno/cli

<img width="676" height="129" alt="Image" src="https://github.com/user-attachments/assets/b767d507-f002-4c6e-9f95-7cf66faffd42" />

3. Open the Bruno app and select "Open Collection"

<img width="1276" height="759" alt="Image" src="https://github.com/user-attachments/assets/a85f15d5-b4bc-4df5-a49b-0164ce7536c3" />


**Manually add and test a simple public NestJS API endpoint**

1. Right click the left sidebar under your collection name and selec "New Request":

<img width="1276" height="759" alt="Image" src="https://github.com/user-attachments/assets/82a98ea7-f632-43f2-93b6-69e05755ae84" />

2. Enter a new request name and choose the HTTP method (GET, POST, PUT,etc.)

3. Start docker (or postgresSQL if you have it locally installed) and then start your application:

<img width="1163" height="546" alt="Image" src="https://github.com/user-attachments/assets/733add48-b267-4cf7-8d96-fe7d47eda9e7" />

4. Click on 'Send Request" ( Cmmd + Enter ) and check the result:

<img width="1276" height="768" alt="Image" src="https://github.com/user-attachments/assets/7cac4f5c-99c6-48a8-b8ce-8f842406aac4" />

**Explore how to pass headers and authentication tokens in Bruno**

<img width="1512" height="793" alt="Image" src="https://github.com/user-attachments/assets/297f5b71-081a-49ab-a78f-055cf0bc62df" />

1. Set up Authenticaiton Module 

List of commands: 

npm install @nestjs/jwt @nestjs/passport passport passport-jwt
nest generate module auth
nest generate service auth
nest generate controller auth

2. Configure JWT Strategy

Go into jwt.strategy.ts and validate incoming JWT tokens:

<img width="872" height="578" alt="Image" src="https://github.com/user-attachments/assets/e1419015-0d3c-4a09-8489-4246c2076ca2" />

3. Set up Auth Service and Controller

<img width="872" height="714" alt="Image" src="https://github.com/user-attachments/assets/15f73538-de80-40a2-ad6e-de4fae9cea38" />

<img width="872" height="343" alt="Image" src="https://github.com/user-attachments/assets/f56f43c8-189e-4f18-a43c-103fcf537f09" />

4. Protect Endpoints with guards

Used @UseGuards(AuthGuard('jwt'), RolesGuard) decorator on protected endpoints to:

Validate JWT token is present and valid
Check user has required roles

5. Fix the RolesGuard Bug

Problem: RolesGuard checked user.role but JWT returned user.roles (plural)
Solution: Updated guard to check user.roles.includes(role)
typescriptreturn requiredRoles.some(role => user.roles.includes(role));

Set up before generating token:
- Start up docker (docker compose up -d)
- then use command (npm run start)

<img width="699" height="597" alt="Image" src="https://github.com/user-attachments/assets/32255337-e1ba-447e-b6d3-d2d9c1eb6eed" />

6. Generate the Token

curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "anything"}'

7. Use the Token to access the Protected Endpoints

In curl (or Bruno), add the token in the authorization header with space after 'Bearer'

curl http://localhost:3001/users \
  -H "Authorization: Bearer TOKEN HERE..."

<img width="699" height="124" alt="Image" src="https://github.com/user-attachments/assets/cc0448e9-4c28-400c-b7e2-233e7ba674b4" />

In Bruno:

1. Auth Tab → Select Bearer Token
2. Token Field → Paste your access_token
3. Send Request → Token automatically added to Authorization: Bearer <token> header

<img width="1279" height="743" alt="Image" src="https://github.com/user-attachments/assets/c1418bd8-9f1d-426c-af73-304bfc9b8d2a" />

## ✅ Reflection (nestjs-bruno.md)

**How does Bruno help with API testing compared to Postman or cURL?**

Bruno helps with API testing by using a Git-native, local and offline-first approach to avoid a 'bloated platform' - meaning it operates faster with no exccess libraries. 

Aside from the speed and more Git-friendly interface, the biggest differences between Bruno and Post are:

1. Local data storage - Bruno stores your data locally, whereas Postman does so with the cloud, requiring account logins and internet connectivity. 
2. Offline use - Relating to how data is stored. Because of local data storage, it has the ability to go offline. 
3. Features offloading and performance: Bruno is considered more lightweight and faster. However, this is a trade off from the heavier interface of Postman, which offers more CI/CD, documentation and API governance tools. 

**How do you send an authenticated request in Bruno?**

---

## Method 2: Basic Auth

### Best for: APIs using username/password

**Steps:**

1. Click **Auth** tab
2. Select **Basic Auth**
3. Enter:
   - **Username:** your username
   - **Password:** your password
4. Click **Send** 

Bruno automatically encodes it as: `Authorization: Basic base64(username:password)`

---

## Method 3: API Key

### Best for: APIs using custom headers

**Steps:**

1. Click **Auth** tab
2. Select **API Key**
3. Enter:
   - **Key name:** `X-API-Key` (or whatever your API expects)
   - **Key value:** your-api-key-here
4. Click **Send** 

Bruno adds it as: `X-API-Key: your-api-key-here` header

---

## Method 4: Custom Headers

### Best for: Any custom authentication

**Steps:**

1. Click **Headers** tab
2. Add:
   - **Name:** `Authorization`
   - **Value:** `Bearer eyJ...` (your token)
3. Click **Send** 

---

### Step 2: Save Token
1. Click **Send** on login request
2. Copy `access_token` from response
3. Go to **Vars** tab
4. Add variable: `jwtToken` = token value
5. Check ✅

GET http://localhost:3001/users
Auth: Bearer Token
Token: {{jwtToken}}

---

## Token Expiration

**Problem:** Getting 401 Unauthorized after a while?

**Solution:** Token expired! Get a new one:
1. Click your Login request
2. Click **Send**
3. Copy new `access_token`
4. Update `{{jwtToken}}` variable
5. Try request again ✅


**What are the advantages of organizing API requests in collections?**

Organising API requests in collections provide structure, consistency and efficieny.
Collections allow you to group related requests together, and share authentication settings across different requests. This also makes it resuable as well for differnt variables in various environments. Instead of managing scattered requests, a well-organized collection saves time, reduces errors, and makes your API testing more scalable and maintainable.

**How would you structure a Bruno collection for a NestJS backend project?**

# How Would You Structure a Bruno Collection for a NestJS Backend Project?


A well-organized Bruno collection mirrors the NestJS folder structure. 

Start with a root collection representing your API, then create folders for each module (Auth, Users, Products, etc.). Within each folder, organize requests by HTTP method: Create (POST), Read (GET all and GET by ID), Update (PATCH), and Delete (DELETE). 

Set collection-level authentication (Bearer Token with `{{jwtToken}}`) so all requests inherit it automatically. Use variables for baseUrl, tokens, and API keys at the collection level, then create separate environments (Development, Staging, Production) with different values. 

Add documentation to each request explaining what it does, what roles are required, and example responses. 

This structure keeps requests organized, makes it easy to find endpoints, enables code reuse, and allows your team to test complete workflows seamlessly.