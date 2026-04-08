## Focus Bear’s backend is built with RESTful APIs that interact with the frontend and mobile apps. Understanding how to create, structure, and expose endpoints is essential.

✅ Tasks

## Research how REST APIs are structured in NestJS

RESTFUL API = an interface where two computer systems are used to exchange information securely over the internet. In terms of how it relates to Focus Bear's backend, it separates the client (frontend and mobile apps) away from the server (the system hosting all the resources aka backend), allowing them to evolve independently (as long as the interface and code base remains consistent with each other).

How it is structured in NestJS is similar to what was mentioned in milestone 5, through the following:

1) Modules - it organises the app into domains

<img width="648" height="473" alt="Image" src="https://github.com/user-attachments/assets/6d2bfa23-764d-436b-b688-f50bb91a237c" />

2) Controllers - handling incoming HTTP requests and define routes

<img width="648" height="473" alt="Image" src="https://github.com/user-attachments/assets/8ecb2e3c-6523-4fd9-ba81-3ca3aa34d074" />


3) Services - this is where business logic is contained via DI (dependency injection)

<img width="648" height="305" alt="Image" src="https://github.com/user-attachments/assets/22af9680-8506-47fc-b6e8-ab50308c2e78" />

4) DTOs (Data Transfer Objects) - This defines and carries data between software processes

(example of DTOs, cannot find in local repo):

class UserDTO {
    Long id;
    String firstName;
    String lastName;
    String email;
}

## Create a controller with basic CRUD routes (GET, POST, PUT, DELETE)

Creating a basic NestJS controller with CRUD routes involves using the NestJS CLI to generate the foundational files and then deifning the route handlers with HTTP method decorators. 

1) We first generate all the components for a CRUD resource using the following command:

nest generate resource [name] 

Once command is entered, we select 'REST API"

<img width="648" height="138" alt="Image" src="https://github.com/user-attachments/assets/4358cea0-8457-44f3-ac97-4de265b3ec53" />

<img width="648" height="654" alt="Image" src="https://github.com/user-attachments/assets/1e200b1d-aa11-4b77-b3de-fa22f82b03c4" />


## Use a service to handle business logic

A service in NestJS is a place that handles business logic (core functionalities, decision-making rules and data manipulation specific to the app's purpose).

To enable a service for business logic:

1) Create the service using the following command:

nest generate service [service-name] or nest g s [service-name]

Use the service file (user.service.ts) to handle the business logic:

<img width="659" height="881" alt="Image" src="https://github.com/user-attachments/assets/ff469f10-e881-4e60-ba3a-b7def018f7ad" />

2) Import the service into the module and inject it into the controller's constructor. The controller would then call the service methods:

<img width="659" height="881" alt="Image" src="https://github.com/user-attachments/assets/4ed162e1-3355-46f4-a415-81ce635ae1da" />


## Test the endpoints using a tool like Postman or cURL

1) Make sure your server is running first:

npm run start:dev

<img width="1030" height="471" alt="Image" src="https://github.com/user-attachments/assets/96ff1846-24d2-42f6-9382-8da8ad22996b" />

2) Create user profile with cURL with the database running:

<img width="630" height="95" alt="Image" src="https://github.com/user-attachments/assets/09e4bedf-50d9-4c8d-ad47-1b630d394e6f" />

3) Test the endpoints (URL):

<img width="630" height="95" alt="Image" src="https://github.com/user-attachments/assets/dcda830c-5be8-449b-8934-85d5de32c178" />


## ✅ Reflection (nestjs-rest-api.md)


## What is the role of a controller in NestJS?

A controller is a decorator that handles incomin gHTTP requests and returns the responses to the client (in the case the frontend and mobile app). They are the entry point of an application, routing specific requests to specific methods using decorators like @Get(), @Post(), or @Put(), to execute code and manage data flow between the user and the application's business logic. 


## How should business logic be separated from the controller?

Business logic should be separated by moving them to dedicated service layers or domains. The controller's purpose is to handle HTTP requests and responses.

## Why is it important to use services instead of handling logic inside controllers?

Because we need to achieve separation of concerns, which creates cleaner, testable and easdily maintained code. Separation of concerns means each part of an app has distinct and unique responsibilities.

## How does NestJS automatically map request methods (GET, POST, etc.) to handlers?

It uses TypeScript decorators to collect and store metadat about controllers and methods. during the bootstrap phase, NestJs' internal routing system reads the metada to build a route that connects incoming HTTP requests to the controller methods. 