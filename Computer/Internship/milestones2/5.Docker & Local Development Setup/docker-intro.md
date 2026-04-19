## 📌 What is Docker and Why Use It?
## 🎯 Goal
## Understand what Docker is, how it differs from traditional development setups, and why Focus Bear uses it.

## ✅ Why is this important?
## Focus Bear’s backend runs in Docker containers to ensure consistency across development and production. Understanding Docker is essential for local development and debugging.

## ✅ Tasks

## Research what Docker is and how it differs from virtual machines

Docker is an open-source platform that uses operating system level virtualization to package applications and their dependencies into isolated units called "containers".

## Understand the benefits of using Docker in a backend development environment

Environmental consistency: Docker containers can encapsulate your code, runtime, system tools to run identically on a developer's laptop, testing environments and production servers. 

Quick and easy setup: New developers can be onboarded quickly and create projects in minutes. 

Isolation of conflict: Each container runs in an isolated environment, preventing conflicts between different applications and services. 

Explore how containers help maintain consistency across different environments

Review how Focus Bear uses Docker in backend services
✅ Reflection (docker-intro.md)
## How does Docker differ from a virtual machine?

The main difference is the architecture of both processes. Virtual machines virtualize the entire physical hardware stack. While Docker containers virtualize only the operating system and share the host machine's kernel. 

## Why is containerization useful for a backend like Focus Bear’s?

1) Consistency across environments allow code to run identically on a developer's computer, in CI/CD pipelines and in production. 

2) Simplified dependency management allows each service to bundle its own runtime, libraries and configuration. No conflicts between services that need different versions of the same dependency. 

3) Faster onboarding means new developers can compose and create entire local environments. All of that would run in a matter of minutes. 

4) How do containers help with dependency management?

Containers solve dependency conflicts by bundling each service with its own runtime and libraries, so services never interfere with each other. Dependencies are declared explicitly in a Dockerfile, ensuring everyone — local dev, CI, and production — runs identical environments. Since images are versioned artifacts, the exact dependencies used in any release are frozen and reproducible indefinitely.

## What are the potential downsides of using Docker?

Docker adds complexity, resource overhead, and a learning curve that may outweigh its benefits for simpler projects. Key gotchas include slow builds without caching, tricky container networking, security risks from misconfigured containers, and data loss if volumes aren't set up correctly. It's a powerful tool, but one that needs the team's buy-in and understanding to use effectively.