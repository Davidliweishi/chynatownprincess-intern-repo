✅ Tasks

## Research how dependency injection works in NestJS

NestJS uses a dependency injection (DI) container to create and supply class dependencies automatically. Instead of a controller manually creating a service with `new UsersService()`, Nest creates the service instance and injects it through the constructor. This reduces tight coupling and makes code easier to test and maintain.


## Understand the role of providers and the @Injectable() decorator

Providers define how to create and inject dependencies

@Injectable makers a class as managable by the DI container, allowing it to have dependencies. 

Example:

<img width="377" height="261" alt="Image" src="https://github.com/user-attachments/assets/ac43c153-9879-4e69-9044-b3e533569169" />


## Explore how services are injected into controllers

Services are commonly injected isung a constructor injection, where the service interface is defined as a parameter in the constructor and stored in a rpivate, read-only field. 

I practiced constructor injection in my NestJS user feature. The controller depends on UsersService, and Nest automatically supplies it:

<img width="493" height="364" alt="Image" src="https://github.com/user-attachments/assets/3aef043e-4eef-4cec-8f96-4f5f158233a0" />

## Investigate different provider scopes (SINGLETON, REQUEST, TRANSIENT)


In my project, UsersService in src/users/users.service.ts uses the default singleton scope. I did not add a custom scope, so Nest creates one shared instance for the application.

<img width="493" height="88" alt="Image" src="https://github.com/user-attachments/assets/674472bc-285b-4c8b-b292-5da873672d25" />

✅ Reflection (nestjs-dependency-injection.md)
## How does dependency injection improve maintainability?

DI (dependency injection) allows for maintainability by having components that receive dependencies externally rather than being hard coded into a container. This loosens coupling between classes, as well as making unit testing easier. 


## What is the purpose of the @Injectable() decorator?

Its purpose is create and manage instances for a particular class. It also allows the framework to read into a class's constrructor so it knows what dependencies need to be resolved and automatically inject when the class requests it. 

## What are the different types of provider scopes, and when would you use each?

There are three main scopes:

1) Singleton - an instance is created and shared across an entire application. Best used for stateless servioces like logging, configuration or HTTP clients. 

2) Request - a new instance is created for each incoming request and destroyed aftwards. Bet used for when you need to store request -specific data.

3) Transient - a new instance is created everytime the dependency is injected. Great for lightweight, stateful objets. where each entity needs itw own isolated copy.

## How does NestJS automatically resolve dependencies?

When NestJS deals with a class, it reads the constructor's TypeScript metaadata to discover what types are needed. It proceeds to look up each type as a token in the module, resolves any dependencies those providers have, and injects the fully constructed instances into the constructor.

ergkijeogijejg
