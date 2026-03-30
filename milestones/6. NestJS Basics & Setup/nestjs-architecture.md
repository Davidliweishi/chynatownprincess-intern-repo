## ✅ Reflection (nestjs-architecture.md)

## Research what modules, controllers, and providers are in NestJS

Modules = @Module
This decorator gives metadata that Nest uses to organise and manage app structure effectively and efficiently. 
<img width="487" height="216" alt="Image" src="https://github.com/user-attachments/assets/e783b33c-1fdc-42c4-a3b3-366b47fca2f5" />


Providers = @Injection
Services, repositories, factories, and helpers are all considered providers - they are all dependencies that can be injected.
<img width="487" height="216" alt="Image" src="https://github.com/user-attachments/assets/3ec67f0d-578b-4c1b-9910-e204f9d61b9a" />

Controllers = @Controller
Controllers are responsible for handling incoming requests and sending responses back to the client.
<img width="487" height="216" alt="Image" src="https://github.com/user-attachments/assets/0e09d95d-4184-4b47-aa05-080db84bb9d7" />

## Create a simple module with a controller and a service

1) Generate the module 
Command = nest generate module <module name>
<img width="569" height="45" alt="Image" src="https://github.com/user-attachments/assets/f3cba6b6-94ca-4415-831d-0aed1b29c778" />

<img width="569" height="119" alt="Image" src="https://github.com/user-attachments/assets/47292e9b-d373-4714-b07c-15bd7985d246" />

2) Generate the service 
Command = nest generate service <module name>
<img width="569" height="94" alt="Image" src="https://github.com/user-attachments/assets/45d45306-e676-4f7d-9c12-299218f18ca4" />

<img width="487" height="94" alt="Image" src="https://github.com/user-attachments/assets/e4ec344e-3ec7-4d9d-ad94-61dd25bc775f" />

## What is the purpose of a module in NestJS?

A module is a class annotated with the "@Module" decorator. It serves as the fundamental building block for organising app logic into resuable, cohesive and self-contained units. They encapsulate related components like controllers, providers(services) and other modules - helping to manage dependencies. 

## How does a controller differ from a provider?

Providers contain business logic, as well as data fetching and functional tasks. Whereas controllers handle incoming requests and return responses. 

## Why is dependency injection useful in NestJS?

Dependency injections provide module and test friendly code that is easily maintained. 

## How does NestJS ensure modularity and separation of concerns?

NestJS ensures both of these factors by organising code into self-contained and encapsulated modules (@Modules), which is what its' architecture centers around. 

It enforces strict rules around separation of concerns by using layered architecture features like controllers, providers, encapsulation and dependency injections. 