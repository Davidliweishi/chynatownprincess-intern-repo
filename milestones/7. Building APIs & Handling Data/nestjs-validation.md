## Focus Bear’s backend relies on request validation to ensure data consistency and security. NestJS pipes help validate and transform incoming requests before processing them.

## ✅ Tasks

## Research what pipes are in NestJS and how they work

In NestJS, Pipes are classes used to perform data transformation and validation on incoming request data before it reaches the route handler. It makes sure that data flowing into your app is in the correct format and meets required standards.

What they do:

1) Transformation = convert input data into the shape you want (e.g., turning the string "42" into the number 42)

2) Validation = checks if the data is acceptablem and throw an error if it's not (e.g., rejecting a request if a required field is missing)

Where do they run?

Right between the incoming request and your route handler. The user sends data, the pipe intercepts it and your controller method gets cleaned/validated result. 



## Explore built-in pipes like ValidationPipe and ParseIntPipe

## ValidationPipe = Validates against a DTO class using decorators

1) First we must install class-validator and class-transformer:

npm install class-validator class-transformer

2) Enable it globally in 'main.ts'

<img width="573" height="470" alt="Image" src="https://github.com/user-attachments/assets/39a4aab0-2735-48ab-9489-4097e91c0ac9" />

3) Create a DTO (Data Transfer Object) with validation rules in place. We have to create a file like 'create-cat.dto.ts' in your feature file:

<img width="573" height="470" alt="Image" src="https://github.com/user-attachments/assets/be2d87b0-748b-4434-9887-c8573c83568b" />


4) use your DTO in your controller:

<img width="647" height="591" alt="Image" src="https://github.com/user-attachments/assets/4be07197-6aa7-4b2c-a554-a1112f258ec0" />

5) Now NestJS will automatically validate any incoming requests.

## ParseIntPipe = Converts "42" → 42 (or throws if it can't)

<img width="734" height="940" alt="Image" src="https://github.com/user-attachments/assets/c9164b7e-d6af-4531-ba0a-0c9baa729a26" />


## Create a custom DTO (Data Transfer Object) and apply class-validator decorators

This has already been created in the above examples with screenshots. 

For summary, I created 'create-cat.dto.ts' - which is a DTO with class-validator decorators.

I then applied this to the 'user.controller.ts file with @Body() createUserDto: CreateUserDto.

## Use a global validation pipe to enforce DTO validation across the app

In summmary:

I added 'app.useGlobalPipes(new ValidationPipe) in 'main.ts' - to define a global validation pipe that would enforce DTO validation across the app. This is shown in the screen shot regarding validation pipe.

## ✅ Reflection (nestjs-validation.md)

## What is the purpose of pipes in NestJS?

In NestJS, Pipes are classes used to perform data transformation and validation on incoming request data before it reaches the route handler. It makes sure that data flowing into your app is in the correct format and meets required standards.

In NestJS, Pipes are classes used to peform data transformation, as well as data validation on incoming request data. This is to make them in the correct format and meets app criterias.

## How does ValidationPipe improve API security and data integrity?

ValidationPipe improves security and data integrity in the following ways:

1) Blocks unexpected data fields from reaching your data base. Example is 'CreateUserDto' and "CreateCatDto' - which defines what fields are allowed. 

2) Rejects bad data early with a 400 error before your code runs. Example can be the 'UsersController' using 'ParseIntPipe' on all the id parameters.

3) Gurantees data is always matching the shape you define in your DTO. Example is create() routes use @Body() createUserDto: CreateUserDto, so the controller is guaranteed to receive the right shape before passing it to the service.

4) Auto-converts data types and preventing mismatchs from slipping through. Example is +id with ParseIntPipe, so instead of manually converting the string param yourself, NestJS handles it automatically.

## What is the difference between built-in and custom pipes?

Built-in pipes are pre-defined, ready to use data provided by NestJS. Whereas custom pipes are user-defined classes used to perform specific tasks. 

Example can be:

Built-in: {{ birthday | date:'fullDate' }}

Custom: {{ userRating | roundNumber }} (a hypothetical pipe to round numbers) 

## How do decorators like @IsString() and @IsNumber() work with DTOs?

@IsString() = validation decorator used in DTO to ensure that a specific incoming property's value is a valid string

<img width="734" height="940" alt="Image" src="https://github.com/user-attachments/assets/02f2b998-3735-4e04-8333-2377c61b5c9e" />

@IsNumber = Used to validate that a specific property is a valid JavaScript number type at runtime. 

<img width="480" height="940" alt="Image" src="https://github.com/user-attachments/assets/b6ffcbae-6906-406d-bb92-8c8d1c1f8b33" />