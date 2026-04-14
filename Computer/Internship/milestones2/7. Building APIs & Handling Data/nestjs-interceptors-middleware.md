## Learn how to use interceptors and middleware in NestJS to modify requests, responses, and handle cross-cutting concerns.

## ✅ Why is this important?
Focus Bear’s backend uses interceptors and middleware for tasks like logging, response transformation, and request preprocessing. Understanding these concepts will help you write cleaner and more efficient backend logic.



## Research the difference between interceptors and middleware in NestJS

Middleware = Runs before the route handler. It only has access to the request and response objects - it has no idea what handler will eventually process the request. 

Interceptors = runs before AND after the route handler. This is the key difference - inteceptors can see botht eh incomeing request and outgoing response.


## Explore built-in interceptors like ClassSerializerInterceptor

ClassSerializerInterceptor = autmoatically transforms your response objects based on decorators from the class-transformer library. It controls what gets sent back to the user from your API. 

how to use it:

1) Mark fields you want to hide in your entity 

<img width="565" height="394" alt="Image" src="https://github.com/user-attachments/assets/501bdaf7-9d70-4712-a313-6f47b6d26d8c" />

2) Apply the interceptor 

<img width="853" height="519" alt="Image" src="https://github.com/user-attachments/assets/a118e15c-f383-431e-9f99-6ae09f596db1" />

3)  Return the entity class, not a plain object

<img width="1119" height="855" alt="Image" src="https://github.com/user-attachments/assets/63a6c4e5-6021-40cf-8a09-35c7f8a810ac" />



## Implement a simple logging interceptor to log request and response data

To implement a simple logging interceptor, we must first define a class that implements the framework's interceptor interface, capture teh request details before they reach teh handler, and log response data after the handler completes. 

1) Create a 'logging.interceptor.ts' file and implement the logic that captures both the request and response data:

Path to demonstration: chynatownprincess-intern-repo/nest-js/src/common/common/interceptors/logging.interceptor.ts

2) Register a global interceptor with "APP_INTERCEPTOR" in app.module.ts so every route is covered without any per-controller decoration.

Path to demostration: chynatownprincess-intern-repo/nest-js/src/app.module.ts

## Create a middleware function and apply it globally or to specific routes

1) Create a 'logger.middleware.ts' file and populate it with the right logic:

Path to demonstration: chynatownprincess-intern-repo/nest-js/src/common/common/middleware/logger.middleware.ts

2) Go back to app.module.ts and modify the code so that it takes in middleware and applies it globally:

Path to demonstration: chynatownprincess-intern-repo/nest-js/src/app.module.ts


## ✅ Reflection (nestjs-interceptors-middleware.md)

## What is the difference between an interceptor and middleware in NestJS?

Middleware = Runs before the route handler. It only has access to the request and response objects - it has no idea what handler will eventually process the request. 

Interceptors = runs before AND after the route handler. This is the key difference - inteceptors can see botht eh incomeing request and outgoing response.

## When would you use an interceptor instead of middleware?

Middleware is better usee for working with raw HTTP layer - before NEstJS processes a request:

- Logging basic reequest information (method, url, ip)
- Authentication token extraction
- CORS headers
- Rate limiting
- Compression (helmet, compression)

Interceptors is better used for when you need access to NEstJS internals and response body:

- Transform the response shape (e.g wrapping every response in {data: ...})
- Logging the actual response body returned by your handler
- Caching
- Timing how long a handler took
- Error transformation 

## How does LoggerErrorInterceptor help?

It helps because it automatically captures, logs and processes errors as they move through an app's request/response workflow. We can think of it as a safety net to ensure all of these errors are recorded consistently without overcrowding the app's business logic. 