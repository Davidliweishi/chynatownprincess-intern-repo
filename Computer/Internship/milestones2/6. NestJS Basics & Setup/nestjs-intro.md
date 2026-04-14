## What is NestJS? (Framework Overview)
🎯 Goal
## Understand the NestJS framework, how it differs from Express.js, and why it is used in backend development.

## ✅ Why is this important?
Focus Bear’s backend is built with NestJS, a framework that provides scalability, modularity, and maintainability. Understanding its core principles will help you contribute effectively.

✅ Tasks


## Explore NestJS’s modular architecture (Modules, Controllers, Services)


Modules = organises your code into managable, reuseable and maintainable components. They area annotated by '@Module()' decorator that group related components (controllers, services, etc.) into logical units. Every application has a root module(AppModule) that serves as the entry point, with additional features that have spefici functionalities like 'UsersModule' or 'AuthModule'.

Controllers = Responsible for handling incoming HTTP requests and returning responses to the client. 

Services = services are a part of the component called providers - which encapsulate the business logic interacct with dta sources, and perform the core functionality of the application. Services also happen to be the most common type of provider. 

Dependency Injection (DI) = NestJS has a built-in DI system that automatically manages the creation and sharing of dependencies. This makes components easier to test and manage. Providers get injected into controllers or other services via their constructors. 

## Understand why dependency injection is a key concept in NestJS

Dependency Injection = a core feature that promotes modular, testable, and maintainable code by managing component dependencies automatically. So instead of classes creating their own dependencies, NestJS provides them for you.

Dependencies = any object, value, function or services that a class needs to function. 

## Find out how decorators (@Controller(), @Injectable()) work in NestJS


## ✅ Reflection (nestjs-intro.md)

## What are the key differences between NestJS and Express.js?

Nest.Js = a Node.JS framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript by default, providing strong typing and moder JS features. 

Main differences:

- Express.JS can execute multiple operations independently of each othter using asynchrounous programming. 

- Nest employs the Express framwork by default. 

- Express doesn't require a specific structure, which can provide felxiblity for small or one persion development teams.
Nest however, offers ready to use app architecture, enabling developers and teams to create applications that are simple to test and use.

## Why does NestJS use decorators extensively?

To provide a clear, declarative and readable way to building applications, allowing for key architectural features like dependency injection, routing and metadata attachments. 

## How does NestJS handle dependency injection?

NestJS handles dependency injection through Inversion of Control (IoC) containers, which manages the creation and setting up fo dependencies between classes. 

<img width="786" height="306" alt="Image" src="https://github.com/user-attachments/assets/d351715e-a333-4450-8554-e694e220b894" />

## What benefits does modular architecture provide in a large-scale app?

Nest offers ready to use app architecture, enabling developers and teams to create applications that are simple to test and use. This is useful for larger scale apps because you can completely skip the initial admin of setting up the architecture and just go straight to work. 