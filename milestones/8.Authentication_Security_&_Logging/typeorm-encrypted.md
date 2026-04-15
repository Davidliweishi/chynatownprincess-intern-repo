## 📌 Using typeorm-encrypted for Data Encryption

## 🎯 Goal
**Learn how to encrypt sensitive data in PostgreSQL using typeorm-encrypted, adding an extra layer of security on top of database encryption at rest.*

## ✅ Why is this important?
**Focus Bear’s backend double encrypts sensitive data—the database is already encrypted at rest, and typeorm-encrypted adds field-level encryption to protect specific data even if the database is compromised.*

✅ Tasks

**Research how typeorm-encrypted works and why it’s needed**

What is it? 

Typeorm-encrypted = a specialised library for the TypeORM ecosystem that provides app-level filed encryption.This is done via transformers.

How it works: 

1) Encryption on save: when you save an entity, the libray's EncryptionTransformer looks at the plain text value and encrypts it. Therefore making it inaccessible when it's not being used. 

2) Decryption on Fetch: When you fetch teh data/query the database, the transformer will decrypt your text and put it back to its' original, readable form for your application code and use.


**Implement typeorm-encrypted in a NestJS entity**

1) First, install the dependencies:

npm install typeorm-encrypted

<img width="517" height="129" alt="Image" src="https://github.com/user-attachments/assets/b819d673-e0f3-4e1f-8d79-4e83db25abb3" />

2) Implement typeorm-encryted by attaching its transformer to a @Column in an entity. In this case it is src/users/entities/user.entity.ts

<img width="736" height="855" alt="Image" src="https://github.com/user-attachments/assets/817fbbc1-417e-4a09-b6b7-9e79ebf3eb94" />

4) Validate the Encryption Key before the app starts

go to src/config/env.validation.ts

<img width="736" height="855" alt="Image" src="https://github.com/user-attachments/assets/2d139803-3df2-4afb-a7e2-0578fe6cacbc" />

5) Go back to user.entity.ts and add a non-password field that uses the transformer. Encryption key alone will not encrypt anything until the column has **'transformer: encryptionTransformer* on it. 

<img width="736" height="855" alt="Image" src="https://github.com/user-attachments/assets/3a19352d-0929-4963-98af-859d48b543f6" />

6) Create a migration

First go to your Nest container:
docker exec -it nestjs sh

Second, generate a migration:

docker exec -it nestjs sh
npm run migration:generate

14:01The core issue was that your data-source.ts file was in the wrong location (src/data-source.ts instead of src/database/data-source.ts), which broke the import path in seed.ts and caused all subsequent migration and database connection attempts to fail silently or hang indefinitely. When you moved the file to the correct location and fixed the import path, you discovered your local Postgres installation had permission issues with the postgres role, making Docker the only viable option — but even with Docker running, TypeORM's auto-migration generation continued to hang, likely due to connection or configuration issues that would have required significant debugging. The simplest resolution is to manually create the migration file instead of relying on TypeORM's auto-generation feature.



**Understand how encryption keys are managed and stored**

Encryption keys are stored and managed within environment variables like .env files. because NestJs is built using Node.js, it relies on third party modules like type-encrypted for encryption, as the framework itself doesn't have a dedicated package to do so. In terms of management and implementation, it relies the following:

**Key Rotation*: Keys are rotated regularly to help keep old keys from being abused and generate new ones after a given timeframe (e.g every 30 days or so).

**Encapsulation within Modules*: Module encapsulation is often used to created dedicated 'EncryptionModule' that uses denpendency injections to provide encryption services within a framework/application. 

**Envelope Encryption*: although not expected off the bat, this is an advanced method of protecting data through a DEK (data encryption key), where it is then encrytped again with a KEK (Key Encryption Key). thus, offering a two layer protection method. 

**Test encrypting and decrypting a database field**

✅ Reflection (typeorm-encrypted.md)

**Why does Focus Bear double encrypt sensitive data instead of relying on database encryption alone?*


**How does typeorm-encrypted integrate with TypeORM entities?*

It uses a transformer property in the '@Column' section to automatially encrypt and decrypt data. 

The key integration points are as follows:

1) Automatic transformation: provides an "Encryptiontransformer' that you pass to the transformer option in TypeOrm column. This makes sure that the data is encrypted before it is saved to the database and decrypted before it is automaitcally fetched. 

2) Encryted Decorator: 

this partocular decorator simplifies configuration and validates your encryption keys and algorithms during application setup. 

3) Centralised configuration: All your encrypted settings like keys and algorithums are cnifugred once in the transformer instance and then applied to any entity field that needs to be protected. 

**What are the best practices for securely managing encryption keys?*

What are the trade-offs between encrypting at the database level vs. the application level?