## Focus Bear’s backend requires different levels of access for different users. RBAC ensures that only authorized users can access specific features (e.g., admin vs. regular user).

## Tasks

## Research how role-based access control (RBAC) works in Auth0

Auth0 implements Role-Based Access Control (RBAC) by grouping permissions into roles, which are then aissgined to users to define what actions they can perform on protected resources. This model allows you to manage access for large groups of users collectively rather than individually. 

When using RBAC, you analyze the needs of your users and group them into the roles based on common responsibilities.

Work process:

1) Roles - you create roles in the Auth0 dashboard (e.g admin or user)
2) Permissions - you decline permissions and attach them to roles (e.g read:users, delete:posts)
Users - you assign roles to users
Tokens - when a user logs in, Auth0 includes their permissions in the JWT access. token
Your API - your NestJS backend reads the token and checks if the user has the required permisison for a given route


## Explore how to retrieve user roles from Auth0’s access token

1) Configure Auth0 to include roles in the token

In the Auth0 dashboard, you need to add a custom action (or rule) to include roles in the access token. In Actions/Library/Create Action/Create Custom Action. Then you select Login/Post Login as the trigger:

<img width="832" height="819" alt="Image" src="https://github.com/user-attachments/assets/93608301-46a8-4b89-a6d1-4cc1e31ee9ee" />

2) Use the following script to add roles as a namespaced custom claim (namespaces must be in URI format) and then click deploy:

<img width="832" height="674" alt="Image" src="https://github.com/user-attachments/assets/021278f8-66dd-4be8-9bdd-9e4f354aa7d7" />

3) Install dependencies

npm install @nestjs/passport passport-jwt jwks-rsa

4) Extract roles from the JWT in a Guard and put them in the following files:

Guard: chynatownprincess-intern-repo/nest-js/src/auth/guards/roles.guard.ts

5) Create a Role Decorator:

Role Decorator: chynatownprincess-intern-repo/nest-js/src/auth/decorators/roles.decorator.ts

6) Use it in the routes (controllers) you want to protect:

users.controller.ts: chynatownprincess-intern-repo/nest-js/src/users/users.controller.ts

7) Test it:

<img width="832" height="65" alt="Image" src="https://github.com/user-attachments/assets/b4fb96a8-030e-4b4d-9222-126c9bc36e88" />


## Implement a NestJS guard to enforce role-based authorization

Demonstration: chynatownprincess-intern-repo/nest-js/src/auth/guards/roles.guard.ts

# Protect an API endpoint based on user roles (e.g., allow only admins to access it)

This has already been down:

1) chynatownprincess-intern-repo/nest-js/src/auth/guards/roles.guard.ts - checks if the user has the required role
2) chynatownprincess-intern-repo/nest-js/src/auth/decorators/roles.decorator.ts - @Roles decorator
3) chynatownprincess-intern-repo/nest-js/src/auth/jwt.strategy.ts - validates the JWT token from Auth0

## Reflection (nestjs-rbac.md)

How does Auth0 store and manage user roles?

Auth0 stores roles in its own database and assigns them to users through the dashboard or via the Auth0 Management API. By default, roles are NOT included in the JWT token — you have to explicitly add them using a custom Action in the Auth0 login flow, which attaches the roles as a custom claim (e.g. https://user-login.com/roles) to the access token.

What is the purpose of a guard in NestJS?

A guard is a class that runs before a route handler and decides whether the incoming request should be allowed through or blocked. It returns true to allow the request or false to block it (returning a 403 Forbidden). Guards are commonly used for authentication (is the user logged in?) and authorization (does the user have the right role?).

How would you restrict access to an API endpoint based on user roles?

You combine two guards and a decorator:

AuthGuard('jwt') — verifies the JWT token is valid
RolesGuard — checks the user's roles from the token
@Roles('admin') — declares which roles are allowed


What are the security risks of improper authorization, and how can they be mitigated?

Risks:

Privilege escalation — a regular user accessing admin endpoints
Data exposure — users reading other users' private data
Broken access control — one of the OWASP Top 10 most critical security vulnerabilities

Mitigations:

Always validate tokens server-side, never trust the client
Use guards on every protected route — don't rely on the frontend to hide things
Follow the principle of least privilege — give users only the permissions they actually need
Regularly audit roles and permissions in Auth0