## 📌 Debugging with VS Code & Breakpoints
## 🎯 Goal
Learn how to use VS Code’s debugger to step through NestJS code and inspect application state.

## ✅ Why is this important?
**Focus Bear’s backend has complex logic that can be difficult to debug with just console logs. Using breakpoints allows for deeper insight into how data flows through the application.**

## ✅ Tasks

**Research how to configure VS Code debugging for a NestJS project**

VS Code has a built-in debugger that works with Node.js
To begin, you need a launch.json configuration file to tell VS Code how to debug your app.


**Set up a launch configuration (launch.json) for debugging** 

**Setup Process*

1. Install the Node debugger (built into VS code)

2. Create .vscode/launch.json configuration 

<img width="737" height="715" alt="Image" src="https://github.com/user-attachments/assets/334fb1af-1998-4fd5-8fa0-a6ae4c1f33d3" />

3. Update your package.json 

{
  "scripts": {
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "build": "nest build"
  }
}

<img width="737" height="488" alt="Image" src="https://github.com/user-attachments/assets/5823bf06-b029-487e-b825-ae1539aa701e" />

4. Choose between "Launch" and "Attach"

Launch = Starts a new process, debugger authomatically connects to your app and stops when it stops also. 

Configurations:

{
  "request": "launch",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "start:debug"]
}

* When to use: 

- during development 
- testing a specific feature
- when you want one command to start everything
- most common use case

***

Attach = Connect to Running Process

NestJS is already running and it attaches itself to it. When you stop debugging, it will keep running.

Configuration:

{
  "request": "attach",
  "port": 9229,
  "restart": true
}

* When to use:

- DEbugging a long running process
- When the app is already statted in another terminal
- You need to keep the app running between debug sessions. 
- Debugging production issues
- when 'launch' isn't working properly

**You can have both in your launch.json!**

{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "NestJS Debug (Launch)",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start:debug"],
      "console": "integratedTerminal"
    },
    {
      "name": "NestJS Debug (Attach)",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "restart": true
    }
  ]
}

<img width="646" height="488" alt="Image" src="https://github.com/user-attachments/assets/8c752c4a-2163-4aa0-949b-832ffc605106" />

5. Configure your debugger to understand NEstJS Project Structure

NestJS code is written in TypeScript. When you attempt to run it, it's compiled to JavaScript. Therefore, we have to bridge this gap and make the app and debugger understand eachother. 

How to do this?

We use Source Maps - files that map compiled JavaScript back to TypeScript:

1. Configure your Source Maps by first adding the following fields to 'launch.json':

{
  "name": "NestJS Debug",
  "type": "node",
  "request": "launch",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "start:debug"],
  "console": "integratedTerminal",
  "sourceMaps": true,              // ← Enable source maps
  "outFiles": [
    "${workspaceFolder}/dist/**/*.js"   // ← Where compiled code is located
  ],
  "preLaunchTask": "npm: build"    // ← Optional: build before debugging
}

<img width="646" height="488" alt="Image" src="https://github.com/user-attachments/assets/46976eab-fe14-494d-a350-ceb610da1e73" />

2. Make sure your TypeScript config generates source maps in 'tsconfig.json'

<img width="646" height="637" alt="Image" src="https://github.com/user-attachments/assets/e6598229-ed59-4f92-a445-299ebddd4d5b" />

**Place breakpoints in a service and controller to inspect request handling**

1. Now test your setup by creating a breakpoint in a controller (test.controller.ts):

<img width="528" height="301" alt="Image" src="https://github.com/user-attachments/assets/2ef2fd9e-dda3-415c-b20e-8dee36c57f39" />

2. Update your module with the relevant code (test.module.ts)

<img width="528" height="301" alt="Image" src="https://github.com/user-attachments/assets/ab649554-7e4a-4b82-8e9e-807e4a81bdf3" />

3. Update 'app.module.ts'

<img width="882" height="897" alt="Image" src="https://github.com/user-attachments/assets/66b55285-e735-47ec-9f4e-fdc3c7a6c8fc" />

4. Test it:

- Press F5 to start debug
- Click in the gutter (Left margin) next to 'console.log('Checkpoint 1') to set a red breakpoint dot
- Make the request:

   curl http://localhost:3001/test
   # or if you amended existing controller:
   curl http://localhost:3001/auth/test

<img width="882" height="431" alt="Image" src="https://github.com/user-attachments/assets/fe438687-f7a2-420a-8822-7147ec266996" />


- Debugger pauses at your breakpoint 

<img width="882" height="897" alt="Image" src="https://github.com/user-attachments/assets/b68acb03-208e-4d3f-9d32-7b8e1bf3638b" />

- We should see our TypeScript in the editor (not compiled JS)


**Step through function execution and observe variable values**

Stepping means moving through your code line-by-line while the debugger is paused. You control the execution flow and can see exactly what happens at each step.

<img width="834" height="978" alt="Image" src="https://github.com/user-attachments/assets/5e95791d-1061-4456-8dae-23b61ef8766d" />



✅ Reflection (nestjs-debugging-vscode.md)

**How do breakpoints help in debugging compared to console logs?**

Breakpoints are good at helping us pause a code execution and inspect all the variables in real time, wihout modifying the code. Console logs require that you manually review individual lines of code clutter the terminal and cannot be changed without restarting. Therefore, breakpoints are a more efficient and ergonomic way of debugging. 

**What is the purpose of launch.json, and how does it configure debugging?**

Launch.json is VS Code's way of telling the debugger how to start your app and connect it. Without launch.json, VS Code wouldn't know how to start your app or connect breakpoints to the right code, making debugging impossible; you can have multiple configurations for different debugging scenarios (NestJS app, tests, attaching to running processes), and it works by reading the config when you press F5, executing the specified command, setting up source map mappings, and then listening for breakpoints in your code.


**How can you inspect request parameters and responses while debugging?**

When debugging, you can inspect request parameters and responses by setting breakpoints in your controller or service methods and then using the Variables panel on the left to view all parameters (like @Param(), @Query(), @Body(), @Request()), or by typing expressions in the Debug Console to evaluate them interactively (e.g., id, createUserDto.email, users.length).

You can also expand complex objects and arrays by clicking the arrow in the Variables panel, and set Watch expressions to track specific values across multiple breakpoints. The best approach is setting one breakpoint before calling the service to inspect the input data, then another after the service returns to inspect the output, allowing you to see exactly what's being sent and received at each step of the request-response cycle, including parameter values, request headers, authenticated user information, and the exact object structure being returned.

**How can you debug background jobs that don’t run in a typical request-response cycle?**

Background jobs (scheduled tasks, queued jobs, event listeners, WebSocket handlers) are harder to debug than HTTP requests because they run on a schedule or in response to events rather than on-demand, so the best strategies are:

1) Console logs for tasks that run frequently, logging at key points to track execution in the terminal

2) Breakpoints on startup by setting breakpoints in scheduled task methods and waiting for the cron schedule to trigger (set breakpoint in the method, start app with debugger, wait for schedule)

3) Manual HTTP trigger (Best) by extracting the job logic into a separate method and creating an HTTP endpoint to call it manually for debugging (e.g., POST /tasks/cleanup that calls the same runCleanup() method as the cron job, letting you set breakpoints and trigger them on-demand)