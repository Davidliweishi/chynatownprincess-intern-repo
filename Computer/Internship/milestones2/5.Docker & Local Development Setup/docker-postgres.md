## Running PostgreSQL in Docker

Goal
## Set up and run a PostgreSQL database in Docker for local development.

✅ Why is this important?
Focus Bear’s backend uses PostgreSQL as its primary database. Running it in Docker ensures a consistent development environment without installing PostgreSQL directly on your machine.

✅ Tasks

## Research how to run PostgreSQL in a Docker container

1) Opwn your terminal and pull the PostgreSQL image from Docker hub. 

Command = docker pull postgres:16.2

<img width="1273" height="686" alt="Image" src="https://github.com/user-attachments/assets/c85d2ae9-12b8-4e7d-97a5-e7ae04783e68" />

I pulled postgres three times to test if the image was really getting pulled. 

2) Run the PostgreSQL Container using the command:

docker run --name postgres-container -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres

3) Verify the Setup:

docker ps

4) Any data stored in the container will be lost if the container is removed. To persist data, you need to mount a volume:

docker run --name postgres-container -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydatabase -p 5432:5432 -v pgdata:/var/lib/postgresql/data -d postgres

5) Set up yout docker-compose.yml file:

Start the container with:

docker-compose up -d

## Set up a docker-compose.yml file to run PostgreSQL

<img width="1273" height="391" alt="Image" src="https://github.com/user-attachments/assets/cab971d5-9137-4a8c-b961-0a0899889320" />

<img width="1296" height="453" alt="Image" src="https://github.com/user-attachments/assets/cc44d61a-b1e1-4ce7-8692-2029fb380c18" />

## Connect to the running PostgreSQL instance using a database client (e.g., pgAdmin, psql)

Use command to run to database:

docker exec -it postgres-db psql -U myuser -d mydatabase

(replace myuser and mydatabbase with what you declared in your docker-compose.yml)

<img width="1273" height="120" alt="Image" src="https://github.com/user-attachments/assets/56ac1e1c-edaf-4b8d-b1c1-273a14799968" />

## Explore how volumes persist PostgreSQL data across container restarts

Inputting some data to test persistence:
<img width="1273" height="299" alt="Image" src="https://github.com/user-attachments/assets/42bc2328-942b-423e-bf1a-fe40c3741429" />

Data persisted:
<img width="1273" height="265" alt="Image" src="https://github.com/user-attachments/assets/96419ae5-7b48-45cb-a5c2-9f399d1bd7f8" />


## ✅ Reflection (docker-postgres.md)

## What are the benefits of running PostgreSQL in a Docker container?

The Key benefits are:

1) Simplicity of deployment and configuration:

The official PostgreSQL docker image has all the necessary tools, allowing you to create a fully functional database. Therefore, this eliminates the need to manually install and set up.

## How do Docker volumes help persist PostgreSQL data?

It helps by providing a storage location on the host machine (aka my computer) that is complete independent from the container's filesystem. 

When the container is stopped, removed, or even (rarely) broken/corrupted, the data remains safely stored in the volume and can be connected to a new container. Therefore, allowing the database to resume operations without data loss. 

## How can you connect to a running PostgreSQL container?

1) Make sure the container is connected to an established port on your host machine using "-p" flag. 

2) Use the 'psql' command to connect from your host terminal. 


