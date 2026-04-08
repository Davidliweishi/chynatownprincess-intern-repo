## 📌 Setting Up a NestJS Project
🎯 Goal
## Set up a NestJS development environment, understand its project structure, and run a basic application.

## ✅ Why is this important?
kjbihbijbibihbibihbi
Before contributing to Focus Bear’s backend, you need to be comfortable with NestJS’s project setup and know how to navigate its structure.

## Tasks 
## Research the steps to set up a new NestJS project

1) Install the Nest CLI: Open your terminal and install the CLI tool globally.

npm i -g @nestjs/cli

2) Create a New Project: Run the new command followed by your desired project name.

nest new my-nest-app

3) Navigate and Start: Move into the new directory and launch the application.

cd my-nest-app
npm run start:dev

4) Verify the Installation: Open your browser to http://localhost:3001. You should see a "Hello World!" message 

<img width="1512" height="228" alt="Image" src="https://github.com/user-attachments/assets/209d39fe-ea3f-421d-9dfa-07f59c3d0fb0" />

## Install required dependencies and initialize a NestJS project

<img width="1163" height="80" alt="Image" src="https://github.com/user-attachments/assets/7c8c8704-5be6-432d-8d92-359afd8290a5" />
Required project structure:
package.json
src/
node_modules/
nest-cli.json


<img width="1163" height="398" alt="Image" src="https://github.com/user-attachments/assets/c26909cf-aeb1-4f35-b6d8-5e5dfaa28674" />
Required Denpendencies:
@nestjs/core
@nestjs/common
@nestjs/cli
rxjs

The application running:
<img width="800" height="19" alt="Image" src="https://github.com/user-attachments/assets/eca2bec7-d423-4c03-8c80-b0d976fd9a5c" />

## Explore the default project structure (modules, controllers, services, main.ts)

## Run the development server and test a simple endpoint

<img width="800" height="555" alt="Image" src="https://github.com/user-attachments/assets/a6bdc7ba-a227-4280-a782-77eb3891a2e3" />
<img width="800" height="60" alt="Image" src="https://github.com/user-attachments/assets/00251f0d-b98f-4cf1-8305-7f37fab02de1" />


## ✅ Reflection (nestjs-setup.md)

nest-js file completely set up under file path: chynatownprincess-intern-repo/nest-js


## What files are included in a default NestJS project?

1) Root files: .gitignore, README.md, package.json and package-lock.json,etc.
2) SRC files
3) node modules
4) dist files 
5) test files


## How does main.ts bootstrap a NestJS application?

<img width="505" height="223" alt="Image" src="https://github.com/user-attachments/assets/3f56f863-de18-4b5d-8a4e-e9c240b859ab" />

It uses the Nestfactory to create and start a Nest app instance. 

## What is the role of AppModule in the project?

AppModule = the root of the angular application, used as the primary starting point to launch the application. 

## How does NestJS structure help with scalability?

It helps by using mudular architecture and built in features like dependency injection to manage application complexity. It promotes clean code and simplification of horizontal scaling features. 
