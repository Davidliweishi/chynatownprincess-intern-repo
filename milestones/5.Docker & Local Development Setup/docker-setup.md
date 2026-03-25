## Setting Up Docker and Docker Compose

1) Research how to install Docker and Docker Compose (if not installed)

2) Verify Docker installation and check running services

<img width="1511" height="879" alt="Image" src="https://github.com/user-attachments/assets/ae19367b-7205-4335-af4f-a17e53ad90f7" />

3) Learn key Docker commands (docker ps, docker stop, docker logs, etc.)

4) Explore how Docker Compose simplifies multi-container setups

## Reflection (docker-setup.md)

1) What is the difference between docker run and docker-compose up?

Docker run is a command line tool used for managing a single container. Whereas Docker compose is uses a YAML configuration file to define and manage multiple containers as a single, multiple-container application. 

2) How does Docker Compose help when working with multiple services?

Instead if a complex, multi service command (like docker run), it allows you to define it in one "docker-compose.yml' file, making the entire application stack easy to track and manage. 

3) What commands can you use to check logs from a running container?

"docker logs <container_id>" can be used to batch retrieve logs that are present at the time of code execution.

To view logs with time stamps - use "docker logs --timestamps <container_id>" or "docker logs -t <container_id>"


4) What happens when you restart a container? Does data persist?

If a container is restated, the process inside it wil be stopped and started again. Data written to the ephemeral storage layer will still persist during the restart