## Focus Bear’s backend evolves over time, requiring schema updates and initial test data. TypeORM migrations help ensure safe, version-controlled changes, and seeding is useful for setting up test environments.

✅ Tasks

## Research how migrations work in TypeORM (typeorm migration:generate)

TypeORM migrations are versioned files that describe scheme changes to a database. 

Instead of relying on 'synchronize: true', you generate or write migration files, then run them in order. 

it can help:

- Create tables
- Adding columns
- Updating fields

**This makes your database changes more predictable and safe**

## Create a new migration and apply it to the database

Know the order:

- Change entity
- Generate migration
- run migration

1) Go to src/users/entities/user.entity.ts

<img width="552" height="538" alt="Image" src="https://github.com/user-attachments/assets/adfffa86-007c-4d6c-a1ef-e95f3459cbd2" />

2) Make sure we have 'data-source.ts (src/data-source.ts)

<img width="552" height="538" alt="Image" src="https://github.com/user-attachments/assets/ec930682-55f9-4d2e-aa7b-7891f793bee1" />

This file is what TypeORM uses to compare database vs code

3) Generate the migration using the following command:

npx typeorm-ts-node-commonjs migration:generate src/migrations/AddIsActive -d src/data-source.ts

<img width="643" height="128" alt="Image" src="https://github.com/user-attachments/assets/978982f7-f89b-46c0-9349-c24ade285523" />

4) Check the migration file: 

<img width="643" height="350" alt="Image" src="https://github.com/user-attachments/assets/f0cb3cc8-e5a2-43ac-b4a0-f2231584292c" />a

5) Run the migration:

npx typeorm-ts-node-commonjs migration:run -- -d src/data-source.ts

<img width="643" height="303" alt="Image" src="https://github.com/user-attachments/assets/7175ffd8-e4c4-41ae-93cb-b92551a9c06f" />


## Seed sample data into PostgreSQL using TypeORM repositories

1) Create a file to seed (add data)
src/seed.ts

<img width="643" height="402" alt="Image" src="https://github.com/user-attachments/assets/937cc309-3ca3-4fc2-96d5-8ebb5d162fd9" />

and then run it:

npx ts-node src/seed.ts

<img width="643" height="633" alt="Image" src="https://github.com/user-attachments/assets/858458a5-a94a-414e-b1b7-9ec8cca199d4" />

And that's it!

## Explore how migrations can be used to roll back database changes

1) Roll back (if needed):

npx typeorm-ts-node-commonjs migration:revert -d src/data-source.ts

<img width="643" height="238" alt="Image" src="https://github.com/user-attachments/assets/a98f505e-4988-40dc-ad15-9505a1b1721f" />

Then check everything is rolled back:

npx typeorm-ts-node-commonjs migration:show -d src/data-source.ts

<img width="643" height="44" alt="Image" src="https://github.com/user-attachments/assets/1e633f76-8424-4cc6-a497-4b8c65aeddc6" />


## ✅ Reflection (typeorm-migrations.md)
## What is the purpose of database migrations in TypeORM?

Migrations serve as a data version control system for your DB schema. It allowd you to update and manage a DB structure withpout loosing existing data. They are essential in environments where using the automatic 'synchronize: true' option is too unsafe, as it can elead to accidental data loss. 

## How do migrations differ from seeding?

DB migrations manages the structural evolution of a database (like adding columns and tables), acting as a form of version control. Whereas, seeding populates a database with default data. Migrations deliver versioned and reversable data (rollbacks), while seeding typically only inject data once. 

## Why is it important to version-control database schema changes?

Version control databases are critical because it ensures that structural modifications like adding columns and tables are tracable, repeatable and synchronised with application code. Thus, preventing production failures and data loss. 

## How can you roll back a migration if an issue occurs?

To roll back a migration in NestJs (using TypeORM), we must run the command 'npm run typeorm:revert -- -d path/to/database', which executes teh 'down' method of your last migration. If the migration fails, you can manually update the 'migrations' table in your database, revert the TypeScript code, and create a new migration to fix it. 

## Why is it important to version-control database schema changes?
Version-controlling database schema changes is critical because it ensures consistency across environments, prevents data loss through safe rollbacks, and eliminates the manual bottleneck that often delays modern application releases.

## How can you roll back a migration if an issue occurs?
To rollback a migration in NestJS (typically using TypeORM), use the migration:revert command. This executes the down method of the most recently applied migration and removes its entry from the database's migration history table.

