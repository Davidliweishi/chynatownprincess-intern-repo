## ✅ Tasks

## Research how to use the NestJS CLI

NestJS CLI = a command line interface (CLI) that helps initialise, develop and maintain your Nest applications. 

## Generate a new controller, service, and module using the CLI

1) Generate a new module:

nest g module <name> or nest g mo <name>

This creates a new directory and the module file, and automatically adds it to the imports array of the root AppModule.

2) Generate a new service 

nest generate service [name] or nest g s [name]

<img width="571" height="831" alt="Image" src="https://github.com/user-attachments/assets/eed69247-7916-4e02-9a1d-fdf49078e0d8" />

3) Generate a new controller

nest generate controller [name] or nest g controller [name]

<img width="571" height="831" alt="Image" src="https://github.com/user-attachments/assets/05fd0a61-b55d-45c3-9c8d-24c551c79bdd" />


## Explore additional CLI commands like nest generate and nest build


1) nest build = compiles your application's source files into an output directorym ready for production deployment. 

There are variations of key options and commands:

--watch (-w): runs in watch mode, automatically recompiling when source files change. Often used with 'npm run start:dev' for development

--builder (-b): Specifices the compiler to use, such as 'tsc' (Typescript compiler_ or ')

--path (-p): Specifies the path to the tsconfig.json

--config (-c): Specifies the path to the nest-cli.json configuration file.

--webpack: Uses webpack for compilation 

--
## Understand how the CLI helps with the modular architecture of NestJS

NestJS CLI facilitates modular architectures by automating the creation and configuration of an app's building blocks. This ensures consistency and promotes best practses in code organisation. 


## ✅ Reflection (nestjs-cli.md)

## How does the NestJS CLI help streamline development?

NestJS CLI helps streamline development by:

1) automating project structure and maintainese updates with new providers and controllers - making architecture more consistent. 

2) Automated development workflow - ensures automatic reloads during developmemtn (npm run start:dev)

3) Rapid scaffolding and generation - ability to create boilerplates quickly. 


## What is the purpose of nest generate?

nest generate automatically scaffolds and sets boilderplate code including modules, controllers, services and other entities. 

## How does using the CLI ensure consistency across the codebase?

Because it automates and scaffolds boilerplate code, it creates standard code structures and TypeScript code. Hence, why it would be considered consistent. 

## What types of files and templates does the CLI create by default?

1) Configuration files
2) Source Code and assets
3) Documentation and testing files