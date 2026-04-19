## 9.2 Mocking API Calls in Jest #77

***

## Goal
## Learn how to mock API calls in Jest to test asynchronous code.

**Why is this important?**

**Focus Bear interacts with APIs for authentication, analytics, and more. Mocking API calls in tests ensures that components behave correctly without making real network requests.*

***

**Tasks**

**Research how to mock API calls in Jest using jest.fn() and jest.mock().*


**Purpose* : Mocking is used to isolate your code when your system is being tested. If a test is touchin or scanning too many things, it will be very hard to pinpoint exactly where or what something went wrong. Hence debugging will take twice as long. 

**What?*

**jest.fn()**: Creates a standalone mock function. it allows you to replace a real function with a fake that tracks calls, arguments and return values without actually executing the original code. 

Great for mocking specific API helper mehotds aka high level functions built on tope of core API methods to simplify common tasks and reduce boilderplate code. 

**jest.mock()**: Tracks calls to an existing function without necessarily replacing the entire behavior, usedule for asserting that an API call is being triggered. 

**How?*

Files you should test:

Services - All business logic, database operations and API calls
Controllers - Handle all requests, validate inputs, manage responses

1) test the mock in a .spec.ts file 

In this case we will use 'users.service.spec.ts'

p.s make sure @nestjs/testing is installed.

2) create a 'jest.config.ts' in your app's root folder

<img width="578" height="369" alt="Image" src="https://github.com/user-attachments/assets/bea0dd76-3d8e-42af-a094-f089c82fd133" />

3) Create a mock test with jest.fn():

users.service.spec.ts
<img width="578" height="741" alt="Image" src="https://github.com/user-attachments/assets/1bd23cf6-f3cd-4039-a622-7308766aa5b2" />

users.controller.spec.ts
<img width="578" height="741" alt="Image" src="https://github.com/user-attachments/assets/8d7e987d-24e5-4cb2-ab48-2496618b72d1" />

5) npm run test to test it:

<img width="578" height="115" alt="Image" src="https://github.com/user-attachments/assets/0348da37-9a10-4221-b35e-bf3ca3f09ae7" />

if it passes, yay!

If we were to do jest.mock() (which we dont need to as we are already mocking Nest JS), we use it to mock external libraries:

Here is an example code:

// users.service.spec.ts
import axios from 'axios';

// This mocks the entire axios module
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should fetch user from external API', async () => {
    const mockData = { id: 1, name: 'John' };
    
    // Setup the mock
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const result = await service.fetchUserFromAPI(1);

    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.example.com/users/1');
  });
});


Essentially we would then run the same command of 'npm run test' to check if it works or not. 

**Create a React component that fetches and displays data from an API.*

1. Create the React Componment File:

Create a new file src/App.js (or App.tsx for TypeScript):

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Step 1: Set up state variables
  const [users, setUsers] = useState([]);      // Store fetched data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);     // Track errors

  // Step 2: Set up the effect hook
  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array = run once on mount

  // Step 3: Create the fetch function
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Make the API call
      const res = await fetch('http://localhost:3001/users');
      
      // Check if response is okay
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      // Parse JSON
      const data = await res.json();
      
      // Update state with data
      setUsers(data);
    } catch (err) {
      // Handle errors
      setError(err.message || 'Unknown error');
    } finally {
      // Always turn off loading
      setLoading(false);
    }
  };

  // Step 4: Render different states
  return (
    <div className="App">
      <header className="App-header">
        <h1>📱 User Management</h1>
        
        {/* Loading state */}
        {loading && <p>Loading...</p>}
        
        {/* Error state */}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {/* No data state */}
        {!loading && !error && users.length === 0 && <p>No users found</p>}
        
        {/* Success state - display data */}
        {users.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;

2. Update index.js (Entry point)
Make sure the src/index.js imports the App component:

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

3. Ensure NestJS backend API is running:

// nest-js/src/users/users.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}

4. In NestJS 'src/main.ts', enable CORS:

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.register(helmet);
  await app.listen(3001);
  console.log('✅ Server running on http://localhost:3001');
}

bootstrap();

5. Run both servers

Terminal 1 - Start NestJS Backend:

cd nest-js
npm run start:dev
# Runs on http://localhost:3001

Terminal 2 - Start React Frontend:

cd frontend
npm start
# Runs on http://localhost:3000

6. What you should see:

<img width="756" height="638" alt="Image" src="https://github.com/user-attachments/assets/924a8b57-4e0b-404c-93dd-868aea3702a4" />


***

**Run the test and check that it passes.**

**BONUS STEP* 
7. Create/verify your jest.fn() in App.test.js
<img width="1512" height="970" alt="Image" src="https://github.com/user-attachments/assets/b99a0ce5-8319-412a-a171-9e9a5b0caea8" />

8. run 'npm test --App.test.js' to verify your jest.fn() and API calls are being fetched and displayed properly. Add 'screen.debug();' to help display the output information for verification if needed.

<img width="1512" height="970" alt="Image" src="https://github.com/user-attachments/assets/92824651-9f22-4894-ac51-4a4c803c1a3e" />

9. If all tests have passed, that means your jest test results for your React component has worked. 

*** 
**Reflections**

*Why is it important to mock API calls in tests?*

Mocking APIs are important as it creates fast, reliable and isolated tests the are not influenced by external services, allowing development to continue even if a backend is unfinished. In summary, it allow for faster development without needing to do testing at the last strage of a fully developed application and backend - saving time and technical debt later one. 

*What are some common pitfalls when testing asynchronous code?*

Async code = a programming technique that allows a long running tasks - like fetching data or reading files - to run in the background without blocking the main execution function in the app. 

Async code is difficult to test, therefore common pitfalls include flaky tests, false positive results, and hung test suites (aka testsets that stop responding or freeze during execution).

Other common pitfalls also include:

1. Mixing synchronous and async code
2. Blocking the event loop - test suit slows down because event loop (the ability to push pending async callbakcs onto a stack for execution when they are empty).
3. Untested error paths - only testing the successful resolution of a promised result, not the rejection itself. 


***

# Introduction to Unit Testing with Jest

# Goal
*Learn the basics of unit testing in React using Jest.*

✅ Why is this important?
Focus Bear relies on automated testing to ensure the stability of features across updates. Writing unit tests prevents regressions and improves code reliability.

✅ Tasks

# Research what Jest is and why unit tests are important.

*What is Jest?*

Jest = a popular Javascript testing framework. It is designed to test JS code with a focus on simplicity and developer experience. 

*What it does* 

It allows you to write and run unit tests - automated tests that verify your code if it works correctly.

*Why are unit tests important*

1. Catch bugs early and save you time and money on bug fixes
2. Enable refactoring and testing that doesn't break existing functionality. Without refactoring, testing is risky.
3. Reduce debugging ime
4. Improve code quality

***

# Set up Jest in your React project (if not already included).

* Jest is already set up and is in my package.json (/Users/cashies/Desktop/Computer/Internship/chynatownprincess-intern-repo/nest-js/package.json)

<img width="820" height="267" alt="Image" src="https://github.com/user-attachments/assets/be1d759f-9d16-475f-9693-041143d7d276" />

* Also verify this is set up in your frontend/React component (/Users/cashies/Desktop/Computer/Internship/frontend/package.json)

<img width="820" height="495" alt="Image" src="https://github.com/user-attachments/assets/118f58cd-03bf-48e2-b673-a221b0cac9aa" />

***

# Write a simple test for a utility function (e.g., a function that adds two numbers).

1. Create a file called 'sum.js' in your frontend's src folder (/Users/cashies/Desktop/Computer/Internship/frontend/src/utilities/sum.js)

<img width="820" height="235" alt="Image" src="https://github.com/user-attachments/assets/dc0f9456-f828-4d8a-b457-a298f2b489cd" />

2. Create a file called 'sum.test.js' in your frontend's src folder alongside 'sum.js' to enable testing (/Users/cashies/Desktop/Computer/Internship/frontend/src/utilities/sum.test.js)

<img width="820" height="235" alt="Image" src="https://github.com/user-attachments/assets/ca762680-8091-4310-b66d-21144474bb96" />

# Run the test and check that it passes.

3. Use command 'npm test sum.test.js'

<img width="820" height="363" alt="Image" src="https://github.com/user-attachments/assets/a6264d1b-33aa-43e8-9eab-c1cfa9f4a559" />

Push your test to GitHub.
*** 

# Reflection (in unit_tests.md):

* *Why is automated testing important in software development?*

It is important because:
1. It increases testing speed
2. It's efficient
3. It's more accurate (less likely to encounter human error in testing)
4. Enables faster release cycles while reducing long term costs in debugging or technical debt. 

* *What did you find challenging when writing your first Jest test?*

The hardest thing was actually figuring out that I'm not necessarily running tests out of my NestJS application (nest-js folder) which is my backend, so essentially I'm testing whether data is being fetched and displayed to the frontend as well. I had trouble seeing if Jest also ran from the backend as well (Jest apparently runs frontend and backend). However, I'm trying to refine it's ability to not scrape every file in order to make it work:

<img width="820" height="128" alt="Image" src="https://github.com/user-attachments/assets/16b16751-8933-4551-ac42-f1f7baf5737b" />

I'll need to work on this and standardise my approach to utilising both React and NestJS in relations to Jest tests. 