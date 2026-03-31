## Focus Bear’s backend runs inside Docker containers. Learning how to containerize NestJS ensures your development setup mirrors production, reducing environment-related issues.

## Tasks:

## Research how to create a Dockerfile for a NestJS app

How to create a Dockerfile for an NestJS App:

1) First, create a .dockerignore file in your project's root directory to exclude unimportant files. This keeps your application lightweight.

<img width="528" height="139" alt="Image" src="https://github.com/user-attachments/assets/906097d5-a04b-41ce-8239-ab695f02042e" />


2) Create a file named 'Dockerfile' in the root directory of your project and create a sample set up like the one below in that file:
<img width="528" height="474" alt="Image" src="https://github.com/user-attachments/assets/c1a00db1-66a4-4cb6-9157-86d6d7df3474" />
Code from: https://docs.nestjs.com/deployment

This is a basic set up creates all the needed components to start up a Node.js environment. 

3) Now that you have ignored all the unnecessary files and set up your simple code, you can now build a Docker image by using the following command in your terminal:

docker build -t my-nestjs-app .

<img width="620" height="411" alt="Image" src="https://github.com/user-attachments/assets/4204b337-b245-4e0b-ba9d-6eff74eec320" />

4) After building the image, you can now run it as a container by using the following command:

docker run -p 3000:3000 my-nestjs-app

<img width="620" height="411" alt="Image" src="https://github.com/user-attachments/assets/9d7052ea-0f1e-416e-a929-8bf1ede19669" />

<img width="620" height="411" alt="Image" src="https://github.com/user-attachments/assets/451e3222-bed7-4f89-a6bf-d966dd073ccb" />




## Understand multi-stage builds for smaller, optimized images

Why use multi-builds? 

Because it allows your images to contain only the final version of it, without everything else like build tools, source fiels,etc. Without multi-stage builds, your final image will contain everything, making it heavy and containing unnecessary file exposures.  

How do you do that? 

use multiple 'FROM' statements in a Dockerfile, where each 'FROM begins a new stage. You can selectively copy artifacts from one stage to another, leaving everything you don't want behind. 

<img width="1244" height="639" alt="Image" src="https://github.com/user-attachments/assets/7847984c-a46c-49f8-a94d-cbfeb19e80f3" />

## Modify docker-compose.yml to run NestJS alongside PostgreSQL

To run both NestJS and PostgreSQL together in Docker Compose, we need to define two services in the 'docker-compose.yml' file for both of them.

<img width="648" height="967" alt="Image" src="https://github.com/user-attachments/assets/eb55fbf5-47bb-436a-a5a8-657fca93bae7" />

<img width="648" height="116" alt="Image" src="https://github.com/user-attachments/assets/5d2cf716-8383-4a60-9f60-403e7d48cc48" />

## Test the setup by running both containers and checking API connectivity

1) Check that both are running:

docker ps

<img width="648" height="126" alt="Image" src="https://github.com/user-attachments/assets/9e4bea4d-34ad-446d-a96e-599ccd9f3ff5" />

2) Test the NestJS API is reachable:

curl http://localhost:3000

<img width="648" height="52" alt="Image" src="https://github.com/user-attachments/assets/9a6bd1aa-8f2c-462c-a1d4-838b0090af73" />

3) Now check if NestJs API is connected to PostgreSQL:

docker logs nestjs

docker exec -it postgres-db psql -U postgres -d focusbear

<img width="648" height="236" alt="Image" src="https://github.com/user-attachments/assets/c8e0703b-47ac-4789-8d24-bf9bf385b15e" />

then type "\conninfo"

<img width="648" height="137" alt="Image" src="https://github.com/user-attachments/assets/163919e2-1311-4d04-8c2d-c9e2bdec54f3" />

This now confirms that the database is running. 


## ✅ Reflection (docker-nestjs.md)

## How does a Dockerfile define a containerized NestJS application?

A Dockerfile acts as instructions that tells Docker how to build your application into a container image.

To execute this, it comes in two stages:

1) one stage for installing development dependencies and building TypeScript code.

2) one and final, lightweight stage that only contains Javascript output and production dependencies needed at runtime. 

## What is the purpose of a multi-stage build in Docker?

Its primary purpose is to help you build smaller, more compact, lightweight and efficient final images. 

This approach separates the heavy build enviroment from the run time environment, creating smaller and more security-safe image sizes. 

## How does Docker Compose simplify running multiple services together?

Simplification happens by using a single YML file (docker-compile.yml) to help define an entire stack, which manages the whole stack from one place and with one command. 


## How can you expose API logs and debug a running container?

We expose API logs via two primary commands:

1) docker logs <container_name_or_id>

find the container name or id and then use the above command

Other variations of the above command:

# Basic logs
docker logs <container_name_or_id>

# Follow logs in real time (like tail -f)
docker logs -f <container_name_or_id>

# Show last 50 lines only
docker logs --tail 50 <container_name_or_id>

# Show logs with timestamps
docker logs -t <container_name_or_id>


2) docker exec = used for interacting directly with a running container to insepct the system, check configurations and manually run commands. 

More variations of the above command:

# Open a shell inside the container
docker exec -it <container_name_or_id> sh

# Run a single command without entering the container
docker exec <container_name_or_id> ls /usr/src/app

# Check environment variables inside the container
docker exec <container_name_or_id> env

# Check if PostgreSQL connection details are correct
docker exec <container_name_or_id> env | grep DATABASE

