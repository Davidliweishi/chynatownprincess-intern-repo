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

2. Update inde.js (Entry point)
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



