## Focus Bear’s backend relies on environment variables for secrets, API keys, and database credentials. Proper configuration management ensures security and flexibility across environments (local, staging, production).

## Tasks

## Research how NestJS handles configuration using @nestjs/config

What is it?

@nestjs/config is a module that lets you manage environment variables (from your .env file) in a structured, typed way across your entire NestJS app.

1) First install config

npm install @nestjs/config

2) Import it into 'app.module.ts':

Demostration: chynatownprincess-intern-repo/nest-js/src/app.module.ts

## Set up an .env file to manage environment variables securely

1) In your '.env' file

DB_HOST=localhost
DB_PORT=5432
AUTH0_DOMAIN=dev-xxx.au.auth0.com

Demonstration = chynatownprincess-intern-repo/nest-js/.env

2) Replace your hard-coded details:

Demonstration = chynatownprincess-intern-repo/nest-js/src/auth/jwt.strategy.ts

## Explore how to validate environment variables in NestJS

There are multiple ways to validate environment variables in NestJS, but this is often the most recommended way to do so for NestJS:

1) Install the following if you haven't already:

npm install @nestjs/config
npm install class-validator class-transformer

2) Create a file called 'env.validation.ts in your src/config directory:

File path: chynatownprincess-intern-repo/nest-js/src/config/env.validation.ts

4) Create the Config Module:

File Path: chynatownprincess-intern-repo/nest-js/src/config/config.module.ts

5) Import ConfigurationModule in AppModule 

File Path: chynatownprincess-intern-repo/nest-js/src/app.module.ts

6) Update your .env and .env.development files

NOTE:

Running WITHOUT Docker (Local Development)

In this setup, the NestJS app runs on your machine, while services like PostgreSQL and Redis run in Docker.

Steps:

Start only the required services:
docker compose up -d postgres-db redis
Run the NestJS app locally:
npm run start:dev
Use local environment variables:
DATABASE_HOST=127.0.0.1
REDIS_HOST=127.0.0.1

Explanation:
The app connects to services via localhost because it is running outside Docker.

Running WITH Docker (Full Container Setup)

In this setup, everything runs inside Docker containers (NestJS, PostgreSQL, Redis).

Steps:

docker compose up --build

Do NOT run npm run start:dev separately.

Use Docker-based environment variables:

DATABASE_HOST=postgres-db
REDIS_HOST=redis

Explanation:
Containers communicate using service names (e.g., postgres-db, redis) instead of localhost.

7) Now run the app to test it
<img width="583" height="678" alt="Image" src="https://github.com/user-attachments/assets/4f10e772-573e-4716-ba96-edceea7c1530" />

8) run npm run start:dev
<img width="583" height="98" alt="Image" src="https://github.com/user-attachments/assets/7d9f42ae-c024-428a-9265-9ce42a340a12" />

<img width="710" height="323" alt="Image" src="https://github.com/user-attachments/assets/2bd0b2d5-0434-4a29-9900-9521b2317189" />

## Understand the importance of not committing secrets to version control
Committing sensitive information (like API keys, database passwords and access tokens) pose a major security threat to version control systems like Git. Once the secret has been pushed to the repo - it is then easily accessed, copied and used by anyone. 

Git history is permanent. Therefore, even if the secret is removed in a later commit, it will still exist in on record and can be seen. 

To prevent this, developers should:

1) Store secrets in environment variables (e.g., .env files) instead of hardcoding them

2) Use configuration tools like NestJS ConfigModule to manage them securely
3) Add .env files to .gitignore so they are never committed

4) Use secret management services (e.g., AWS Secrets Manager, Docker secrets) in production

## Reflection (nestjs-env-config.md)

## How does @nestjs/config help manage environment variables?

It provides a strutured and safe way to load and access config through ConfigModule and Config service. Essentially it is a wrapper around the 'doctenv' library.

## Why should secrets (e.g., API keys, database passwords) never be stored in source code?

Because it can expose sensitive information to anyone with access to the repo, risking breaches and unauthorised access. 

## How can you validate environment variables before the app starts?

You can validate environment variables before your app starts by implementing a "Fail Fast" strategy, which involves running a validation script or schema check at the very beginning of your application’s entry point. This ensures the process exits immediately with a clear error message if any critical configuration is missing or invalid.

## How can you separate configuration for different environments (e.g., local vs. production)?

To separate configuration for different environments, use a multi-layered approach that combines environment-specific files for local work and injected secrets for production. 
