## Learn how to handle background tasks asynchronously in a NestJS backend using BullMQ & Redis.

## ✅ Why is this important?
## Focus Bear’s backend processes time-consuming tasks (e.g., sending notifications, processing analytics, syncing data) in the background to keep the API responsive. BullMQ, powered by Redis, is used for managing these jobs efficiently.

## ✅ Tasks

## Research how BullMQ works and why it's useful for background processing

What is BullMQ?

BullMQ = a Node.js library used to manage background admin jobs using **Redis**.

(Redis = Remote Dicitonary Server = Open source, in-memory, NoSQL data structure store used as a DB, cache, message broker, and streaming engine. )

Instead of doing heavy work inside the main app (like sneding emails), you can send it to a queue, and a worker handles it. 


## Set up bullmq and @nestjs/bullmq in a NestJS service

**NOTE**: 

BullMQ in Nest uses @nestjs/bullmq and Redis. 

Basic set up pattern:

- Install packages
- Configure BullModule.forRoot() once
- Register a queue with BullModule.registerQueue()
- inject the queue in a service
- process jobs with a worker/processor.

1) Install Packages:
npm install @nestjs/bullmq bullmq

2) Configure BullMQ in 'app.module.ts':

Path to code demonstration:

<img width="569" height="659" alt="Image" src="https://github.com/user-attachments/assets/b2cb36ca-272b-4c28-be02-65174e303938" />

3) Register a queue in a feature module

create email.module.ts:

<img width="569" height="659" alt="Image" src="https://github.com/user-attachments/assets/527a4e01-234c-4964-93ea-10ab829fe2e0" />
Nest’s BullMQ integration uses registerQueue() to make a named queue available in that module.

4) nject the queue into a service

This is the part that adds background jobs.

Create email.service.ts

<img width="569" height="659" alt="Image" src="https://github.com/user-attachments/assets/1d98bd77-7325-4f61-af51-b5e5b83eb013" />


5) Create a processor/worker

Create email.processor.ts:
<img width="569" height="659" alt="Image" src="https://github.com/user-attachments/assets/b588b2dc-9bde-4b0d-bdce-9a9bf4ede375" />

6) Create a controller
<img width="1512" height="921" alt="Image" src="https://github.com/user-attachments/assets/3f59d20f-28cc-4c57-928f-aa3c059534a0" />

7) Call the service from a controller
<img width="569" height="659" alt="Image" src="https://github.com/user-attachments/assets/4d3428b2-dc21-441d-9fbb-7c0beec0a44c" />

8) Add the controller to the module
<img width="569" height="659" alt="Image" src="https://github.com/user-attachments/assets/36615bff-a093-4a00-ad9e-0f1bf1a33eb5" />

9) Start Redis

docker run -p 6379:6379 redis

10) Test it

Start Nest, then call:

curl -X POST http://localhost:3000/email/welcome \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com"}'

<img width="686" height="146" alt="Image" src="https://github.com/user-attachments/assets/0bf59d5e-f6e9-41c1-9ac8-f833351fdf61" />

## Create a simple job queue and process a background task

1) Make sure BullMQ is installed 
<img width="686" height="136" alt="Image" src="https://github.com/user-attachments/assets/85128350-d7b9-4f9b-b4b7-c04ba4eed6ea" />

2) Set up the Queue Module
<img width="686" height="505" alt="Image" src="https://github.com/user-attachments/assets/f4e28799-04c7-4e9d-9f65-2bc9cd0602f8" />

3) Configure BullMQ in AppModule
<img width="686" height="706" alt="Image" src="https://github.com/user-attachments/assets/635b437d-f705-4f55-abbc-ccdd1d36f50a" />

4) Create the Processor (Worker)
This is where the background task logic lives:
<img width="686" height="706" alt="Image" src="https://github.com/user-attachments/assets/422c0621-882c-466b-af8a-6eca5cbb4803" />

5) Add Jobs from a Service
<img width="686" height="706" alt="Image" src="https://github.com/user-attachments/assets/bc95e857-f7f3-4b82-81a8-16b82e67c2e3" />

6) Trigger from a Controller
<img width="686" height="706" alt="Image" src="https://github.com/user-attachments/assets/990f35a1-8b8c-4f9b-9c04-6354dcbcc3c5" />

<img width="645" height="85" alt="Image" src="https://github.com/user-attachments/assets/84f2a81c-1edb-4d17-8560-1f89c9b19736" />

Proving it's working:
<img width="1290" height="170" alt="Image" src="https://github.com/user-attachments/assets/872d5caf-1fcb-463e-8cb9-b19ba635bf38" />



## Explore how Redis stores and manages queued jobs

My project demo uses NestJS + BullMQ + Redis to handle background tasks (sending emails) in a reliable and scalable way.

1. Request comes in (Controller)

I send a request:

POST /email/welcome

The controller receives the email and passes it to the service.

2. Job is added to the queue (Service)

My service does something like:

this.emailQueue.add('send-welcome-email', { email });

 At this moment:

The job is not processed immediately
It is stored in Redis

3. Redis stores the job

Redis acts as the queue database:

Stores the job data (email)
Assigns a job ID
Places it in the waiting queue

Conceptually:

Queue: email
State: waiting
Job:
{
  name: "send-welcome-email",
  data: { email: "test@example.com" }
}

4. Worker picks up the job (Processor)

My processor:

@Processor('email')
export class EmailProcessor extends WorkerHost {
  async process(job: Job) {
    console.log('🔥 WORKER HIT:', job.name, job.data);
  }
}

BullMQ + Redis handle this automatically:

Worker asks Redis for jobs
Redis gives the next job

5. Job is processed in the background

Your worker runs independently of the HTTP request:

Simulates sending email
Logs output
Completes job

## ✅ Reflection (nestjs-bullmq.md)

## Why is BullMQ used instead of handling tasks directly in API requests?

Handling tasks directly in API requests means a user has to wait for everything to finish. It can mean slow response time and terrible scalability. With BullMQ it means faster response time and better user experience. 


## How does Redis help manage job queues in BullMQ?

Redis helps manage job queues in BullMQ by storing job data and tracking their progress. It keeps jobs organised in states such as waiting, active, completed, or failed, and ensures that workers can safely pick up and process jobs without duplication.

## What happens if a job fails? How can failed jobs be retried?

When a job fails, BullMQ marks it as failed and stores the error. Jobs can be retried automatically by setting retry attempts and delays, or manually if needed. This makes the system more reliable by allowing temporary issues to be resolved without losing tasks.

## How does Focus Bear use BullMQ for background tasks?

Focus Bear uses BullMQ to handle background tasks like sending emails, processing data, and running scheduled jobs. This keeps the main application fast while ensuring important tasks are completed reliably in the background.