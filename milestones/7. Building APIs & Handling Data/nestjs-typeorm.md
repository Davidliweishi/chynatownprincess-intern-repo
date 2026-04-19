## Focus Bear’s backend uses PostgreSQL with TypeORM to manage relational data efficiently. Understanding how to interact with the database is essential for working with user data, habits, and app settings.

## Tasks

## Research how TypeORM integrates with NestJS (@nestjs/typeorm)

TypeORM:

- An ORM (Object Relational Mapper) for TypeScript/JavaScript.
- Allows you to interact with a database using TypeScript classes instead of writing raw SQL.

So instead of:

sqlSELECT \* FROM users WHERE id = 1;

You write:

typescriptthis.usersRepository.findOne({ where: { id: 1 } });

How it intergrates with NestJS via @nestjs/typeorm:

**@nestjs/typeorm** = NestJS's official wrapper that plugs TypeORM into the NestJS dependency injection system. It gives you two key things:

1. **TypeOrmModule.forRoot()** - connects to your database, configuree once in 'app.module.ts

2) **TypeOrmModule.forFeature()** - registers specific entities per feaature module, giving you an injectiable repository:

3) **Entities** - TypeScript classes that map to database tables:

Your service nevers wirtes the SQL, it just calls repo methods like find(), findOne(), save(), and delete() while TypeORM handles the rest. 

## Set up a database connection in NestJS

1) Make sure you have Docker installed.
2) Set up your docker.compose.yml (already did)
3) define your DB environment details in '.env'

4) update **app.module.ts** to connect TypeORM:
<img width="812" height="855" alt="Image" src="https://github.com/user-attachments/assets/062ba458-0dbe-4d32-b7cf-4f9d3d7334c4" />

5) update **user.entity.ts**  

<img width="712" height="457" alt="Image" src="https://github.com/user-attachments/assets/b5cd6ea8-c2f7-4722-90aa-0bbadfa50511" />


## Create an entity and repository to interact with PostgreSQL

Use TypeORM to utilise decorators to map TypeScript classes to PosgreSQL tables

entity = class that maps a database table
repository - object TypeORM gives you for querying and saving that entity.

1) Create the entity:

path to user.entity.ts = chynatownprincess-intern-repo/nest-js/src/users/entities/user.entity.ts

2) Connect NEst to PostgreSQL in 'app.module.ts'

Path to app.module.ts demonstration: chynatownprincess-intern-repo/nest-js/src/app.module.ts

3) Register the entity in 'users.module.ts'

This tells Nest to use the 'UserEntity':

path to demostration: chynatownprincess-intern-repo/nest-js/src/users/entities/user.entity.ts

4) Use the repo in the service

This is where you sace and read users:

path to users.service.ts demonstration: 
chynatownprincess-intern-repo/nest-js/src/users/users.service.ts


## Perform basic database operations (CRUD) using TypeORM

C = Create a record
R = Read a record
U = Update a record
D = Delete a record

C = Create
<img width="476" height="93" alt="Image" src="https://github.com/user-attachments/assets/e11ad239-30e5-4ab9-b2bf-76276d30be48" />

<img width="692" height="318" alt="Image" src="https://github.com/user-attachments/assets/1e93f625-0663-49f6-82c3-898a9a6348c8" />


R = Read
<img width="515" height="99" alt="Image" src="https://github.com/user-attachments/assets/95825cbf-6c66-4090-b479-505fbeb9ca10" />

<img width="595" height="112" alt="Image" src="https://github.com/user-attachments/assets/b3c3d498-1459-455b-8601-77e4c6bfa2bb" />

U = Update
<img width="515" height="200" alt="Image" src="https://github.com/user-attachments/assets/dd499b6e-f91c-48d0-b9af-f9753f1f4f85" />

<img width="595" height="112" alt="Image" src="https://github.com/user-attachments/assets/02049ea0-d8b9-4d15-b065-62e643b92474" />

D = Delete
<img width="558" height="200" alt="Image" src="https://github.com/user-attachments/assets/630c66c9-85e8-49e0-906b-9c13d21b8b70" />

<img width="595" height="81" alt="Image" src="https://github.com/user-attachments/assets/15175a73-5665-49bc-b21e-b6514fbcf5c9" />

## ✅ Reflection (nestjs-typeorm.md)

## How does @nestjs/typeorm simplify database interactions?

@nestjs/typeorm integrates TypeORM into NestJs using dependency injection.

- It automates inecting repos into services (@InjectRepository)

- Removes the need to manually manage database connections

- Organises database logic into modules, services and entities

- Works seamlessly with NestJS features like providers and decorators


## What is the difference between an entity and a repository in TypeORM?

Entity is the blueprint of the table and Repo is the tool to read/write data in the table.

## How does TypeORM handle migrations in a NestJS project?

Migration ise used to safely update the database over time. It essentially updates without losing data.

- You generate a migration file when your entity changes
- The migration contains SQL instructions
- Run migrations using CLI commands (e.g. typeorm migration:run)

## What are the advantages of using PostgreSQL over other databases in a NestJS app?

1) Reliability & stability – widely used in production systems

2) Strong data integrity – supports constraints, transactions, relationships

3) Advanced features – JSON support, indexing, full-text search
4) Scalability – handles large datasets efficiently

5) Open-source – free and well-supported

