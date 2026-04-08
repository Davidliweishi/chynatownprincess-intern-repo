✅ Tasks

## Research how dependency injection works in NestJS

## Understand the role of providers and the @Injectable() decorator

Providers define how to create and inject dependencies

@Injectable makrs a class as managable by the DI container, allowing it to have dependencies. 


## Explore how services are injected into controllers

Services are commonly injected isung a constructor injection, where the service interface is defined as a parameter in the constructor and stored in a rpivate, read-only field. 

## Investigate different provider scopes (SINGLETON, REQUEST, TRANSIENT)



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