# Mocking Dependencies & Database Interactions in NestJS

**Tasks*

**Research how to mock dependencies using jest.mock() and NestJS’s @nestjs/testing utilities**

As mentioned in nestjs-unit-tests.md:

'jest.mock()' does 3 things:

1. Replaces an entire module with a fake one
2. Prevents real API calls, database queires, or file I/O during tests
Tracks all calls so you can verify what happened. 

To use jest.mock.md:

1. Pass your module path to 'jest.mock()'. Jest will automatically turn all exports into mock functions. 

I am using a new file called users-email-verification.spec.ts to test this:

<img width="831" height="658" alt="Image" src="https://github.com/user-attachments/assets/9e43029e-27b6-40e4-9579-d7d2d5dd9d04" />

Make sure that your user.service.ts is set up to verify the factors:
<img width="831" height="658" alt="Image" src="https://github.com/user-attachments/assets/84ac2a6e-56e2-460b-be01-eb1c9e03928e" />

test it:
<img width="831" height="183" alt="Image" src="https://github.com/user-attachments/assets/eaa18605-4623-44f4-9222-3ab3e48c7964" />

*** 

Examples of @nestjs/testing for mocking dependencies:

Found in users.service.spec.ts

<img width="831" height="730" alt="Image" src="https://github.com/user-attachments/assets/082c686b-afc5-403f-b216-ebc7c7e14c16" />


**Mock a service inside a controller test**

1. Create a simple mock with jest.fn() in your controller.sec.ts file:

<img width="551" height="730" alt="Image" src="https://github.com/user-attachments/assets/9624888b-ab07-4c37-afbf-ebe66dd6777a" />

2. Provide the testing modules in your test file

<img width="551" height="429" alt="Image" src="https://github.com/user-attachments/assets/a4d7334e-9abc-4ece-96ef-68c9df1aceb1" />

3. test it 

<img width="551" height="223" alt="Image" src="https://github.com/user-attachments/assets/8e7738ea-1cb9-40c2-97f0-1c63ce861323" />


**Mock a database repository (TypeORM Repository) in a service test**

Why?

You can mock  a TypeORM repo so your service tests don't need a real database.

1. Use a service.spec.ts file

2. Make sure you are testing a repo:
<img width="551" height="343" alt="Image" src="https://github.com/user-attachments/assets/a996332c-a9ed-44d5-bb83-0c0bb02d87e5" />

3. test it

<img width="551" height="249" alt="Image" src="https://github.com/user-attachments/assets/3e12cce4-639b-44ab-9d87-d97a7d3563b2" />


**Explore when to use jest.spyOn() vs jest.fn() in mocks**

When to use either?

1. jest.spyOn() = when you want to spy/watch an existing function and control what it is returning:

it('should return all users', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce([mockUser]);
    const result = await service.findAll();
    expect(result).toEqual([mockUser]);
  });

In this code, you are watching it and expect it to return all users

2. jest.fn() = when you created a fake function  from scratch

 beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          // this here means you are testing a repository
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

The repo object doens't exist. Therefore, you are creating them from scratch.

***

# Reflection (nestjs-mocking.md)

**Why is mocking important in unit tests?*

It isolates your code under a test condition and creates a controlled environment to safely see what it is doing. It ensures your code is safe, reliable and maintainable. 

**How do you mock a NestJS provider (e.g., a service in a controller test)?*

You can mock a NestJS provider with the following methods:

- overrideProvider(): Best for replacing entire providers
- useValue: Pass a plain object with mocked methods
- useClass: Use a mock class implementation
- useFactory: Dynamically create mock instances
- jest.spyOn(): Spy on real methods or track calls
- jest.fn().mockResolvedValue(): Mock async methods


**What are the benefits of mocking the database instead of using a real one?*

You can safely and predicatably mock a database without affecting the real thing. It creates more consistent output and creates rapid development cycles, providing more rapid feedback. There is also no contamination of code, preventing one test from interering with another. 

**How do you decide what to mock vs. what to test directly?*

Decision is based on whether you want to trade off between test speed/isolation vs test realism. 

1. What to Mock:

- External API calls - never make real network calls, they are slow and unreliable. 

- Database/Persistenace - unless using in-memeory database, mock DB calls to avoid stressful tests that brak when in parallel. 

- Non-deterministic behaviors - code that depends on the current time, random numbers or env variables. 

2. What to Test Directly (Use Real Objects)

- Use real objects when they are fast, stable, and deterministic to gain high confidence in the code. 

- Domain Logic/Business Rules: Test your core logic directly to ensure it works, rather than just testing that it calls other methods.

- Simple Value Objects/POJOs: Data objects (e.g., User, Order) that hold data but have no behavior.

- Stable Utilities: Small, trusted utility classes (e.g., date formatters) that have no side effects.

- Your Own Code (Internal Units): Avoid mocking your own internal services, as this couples tests to implementation details rather than behavior