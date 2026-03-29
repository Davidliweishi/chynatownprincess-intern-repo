## Debugging & Managing Docker Containers
🎯 Goal
## Learn how to inspect, debug, and manage running Docker containers effectively.

✅ Why is this important?
When developing Focus Bear’s backend, you’ll need to inspect logs, restart services, and troubleshoot containers. Understanding Docker’s debugging tools will help you diagnose and fix issues quickly.

✅ Tasks

Research how to inspect running containers (docker ps, docker inspect)

1) 'docker ps' = command used to list all of the currently running containers and provides a quick overview:

<img width="817" height="101" alt="Image" src="https://github.com/user-attachments/assets/cdad714d-9e87-4fb3-8c0c-348b937e9009" />

2) 'docker inspect <container id or name>' = command provides a low-level information about the container in JSON format. Useful for debugging configurations, network settings, and volume mounts. 

<img width="817" height="416" alt="Image" src="https://github.com/user-attachments/assets/50af8e1b-3b13-4c9e-8d57-391abf43cad5" />

## Learn how to check logs for a running container (docker logs)

'docker logs' is a command used to view the standard output (stdout) and standard error (stderr) streams from a Docker container. They are used to debug and monitor applications within containers. 

<img width="817" height="416" alt="Image" src="https://github.com/user-attachments/assets/ce436795-b7ab-48eb-95ab-bb1e9c674968" />

There are different ways to read docker logs outputs:

1) docker logs -f <container_name_or_id> 
Follows the logs in real time - useful for live monitoring.

2) docker logs --tail 100 <container_name_or_id>
To display only specific lines of recent log lines. 


## Explore how to enter a running container (docker exec -it)

docker exec -it = executes a command in a running container. It is used to debug, inspect a container's environment and perform admin tasks without having to restarted the container again. 

Example: I'm going to list the files in a container's root directory using the following command:

docker exec <container_name_or_id> ls -l /

ls = list
-l / = long listing format: instead of just giving out the names, it shows tales with extra details for each of the listed items

<img width="774" height="416" alt="Image" src="https://github.com/user-attachments/assets/be0b99c8-1eb9-4bf4-8a86-4a776b64370d" />


## Understand how to remove, restart, and rebuild containers (docker stop, docker rm, docker-compose down && up)

1) 'docker stop' = gently shuts down one or more running container.

2) 'docker rm' = removes a container.

3) docker-compose down = stops and removes all containers, networks and images defined in your file. Unlike docker stop, the down process completely does a full clean of the resources created by 'docker compose up'.

4) docker compose up = command used to build (re)create, start and attach to containers for all services defined in a docker-compose.yml file. 



✅ Reflection (docker-debugging.md)

## How can you check logs from a running container?

You use the command 'docker logs -f <container_id_or_name>' to find a particular log about a file in your container. You can be as generic or specific about which or what file you want to read by simply writing different versions of the command (see examples given in the task questions above).

## What is the difference between docker exec and docker attach?

docker exec runs on a separate and new process inside a running container. 
docker attach connects your terminal to the current, existing primary process of a container.

Another difference is docker exec is used on day-to-day operations because you'll likely need to run a a new shell or container inside a container's environment. Whereas, docker attach is used occasionally in situations where you need direct access to the initial process that started the container. For example, you are observing real-time application logs or playing around with the application that requires terminal input. 

## How do you restart a container without losing data?

To restart while retaining data, you must first store the data outside of the container using volumes and/or bind mounts. 

Volume = consistent and persistent data storage for containers. 
Bind mounts = a way to link a file or directory from the host machine's filesystem directly into a running container. 

Main difference: docker volumes are fully created and managed by the Docker Engine, bind mounts allow you to link any specific file or directory on a host machine to a container - thus giving you full control over the host path. 

## How can you troubleshoot database connection issues inside a containerized NestJS app?

The most common issues relating to configurations and networking:

1) Not using service names for host: containers should use the database service name as the hostname, not 'localhost' (as an example)

2) Environment variables not defined correctly in your '.env' folder. Make sure they are correctly defined before validating it. 

3) Make sure ports are mapped: if you are running th eNestJSapp on your host machine, but the database in your container, you need to ensure that the DB port is exposed and your app connects to 'localhost'. If both are in Docker port mapping on the DB are not necessarily needed for container to container communication within the same network. 

In summary: Troubleshooting involves verifying Docker Compose network connectivity, using container names as hostname, ensuring the database is fully initialized before the app starts, and environment variable consistency. 