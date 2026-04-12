## Logging & Error Handling in NestJS

**Goal**
Learn how to log application events and handle errors effectively in NestJS.

**Why is this important?*
Focus Bear’s backend relies on structured logging and error handling to monitor application health and diagnose issues. Proper logging improves debugging, while structured error handling ensures a better developer and user experience.

## Tasks

**Research how NestJS handles logging (nestjs-pino)**

How does NestJS do it?

Through the nestjs-pino package - serving a fast, strcutured alternative that works better than the framework's default built-in 'Logger'.

It works by wrapping aroung the Pino logging library, which is specifically designed to integrate with the NestJS dependency injection system and request lifecycle.

**Set up structured logging using nestjs-pino**

1) Set up and install the relevant dependencies:

npm install nestjs-pino pino-http pino
npm install --save-dev pino-pretty

<img width="596" height="281" alt="Image" src="https://github.com/user-attachments/assets/a630a7b7-1ef5-4cd6-934a-1e8aa125b749" />

<img width="596" height="281" alt="Image" src="https://github.com/user-attachments/assets/4d4f27b1-fa40-462e-92ca-fe6d29bb8542" />

2) Import LoggerModule into AppModule

Import the LoggerModule and configure it. You can use 'forRoot" for static config or 'forRootAsync' to inject services like 'ConfigService'.

<img width="596" height="460" alt="Image" src="https://github.com/user-attachments/assets/e233c3e6-711e-4d98-b24d-ad478aba4924" />

3) Replace the Default Logger in main.ts

This ensures NestJS's internal system logs (like app setup) is also using Pino. hence replace the default logger bootstrap:

<img width="596" height="489" alt="Image" src="https://github.com/user-attachments/assets/f115e2e0-2328-4691-9f6f-55c4237390a4" />

4) Use Logger in your Services

You can continue the standard '@nestjs/common' 'Logger' class, as 'nestjs-pino' acts as a drop-in replacement in the background. 

<img width="596" height="300" alt="Image" src="https://github.com/user-attachments/assets/422e10d7-a622-479f-9fa5-bb61727ffb4f" />

5) test it 

<img width="1181" height="658" alt="Image" src="https://github.com/user-attachments/assets/5e5716ab-2660-437e-80ab-bbabbbb3a588" />


**Understand global exception handling in NestJS (@nestjs/common.HttpExceptionFilter)**

What is Global Exception handling?

A feature that allows you to centralise error logic and return consistent JSON responses to the client. This is achieved by using the 'ExceptionFilter' interface and the '@Catch()' decorator from '@nestjs/common'

1) Create a custom filter 

Create a class that implements 'ExceptionFilter' to catch and format exceptions:

<img width="713" height="685" alt="Image" src="https://github.com/user-attachments/assets/2a98bd7f-68c0-485c-a278-7a87ba021cb2" />

2) Register the Filter Globally:

Two ways to enable global filtering:

Option 1: Using app.useGlobalFilters() (In main.ts)

This is the most straightforward method, though it does not allow dependency injection within the filter.

<img width="923" height="685" alt="Image" src="https://github.com/user-attachments/assets/fedd7a1e-317a-4a28-9258-b7b221b61d7c" />


Option 2: Using APP_FILTER (In AppModule)

This is the preferred method if your filter needs to inject other services (like a Logger), as it registers the filter within the Nest dependency injection container.

**Implement a custom exception filter to format API error responses**

Since we already create a custom filter upon set up, we are going to test it with an error:

<img width="807" height="789" alt="Image" src="https://github.com/user-attachments/assets/50d78f0a-8a18-42d1-a194-c944b25bbd44" />

We then run it:

<img width="807" height="77" alt="Image" src="https://github.com/user-attachments/assets/46cd0200-88f4-4b5a-9d56-e308e3a27699" />


## Reflection (nestjs-logging.md)

**What are the benefits of using nestjs-pino for logging?* 

Pino is asynchrounous, low-overhead logger that minimises CPU and memory usage. therefore it avoids the main event loop by offloading any logging operations to worker threads. It provides structred logging with automatic requet tracing, making it good for production applications. 

**How does global exception handling improve API consistency?*

Without a global exception handling, errors can look very different depending on where they are coming from. With a global filter, every error returns with the same structure, making it easier to identify and creates consistency. 

**What is the difference between a logging interceptor and an exception filter?*

A logging interceptor modifies the request/response lifecycle. Whereas an exception filter handles errors by catching exceptions and creating consistent error responses. 

**How can logs be structured to provide useful debugging information?*

Logs need to be consistent by including fields like timestamps, data requests and error details. All of which enables efficient debugging and tracing in production environments. 