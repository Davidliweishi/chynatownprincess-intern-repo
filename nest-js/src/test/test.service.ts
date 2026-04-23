import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  // Mock database
  private users = [
    { id: 1, name: 'John', email: 'john@example.com', age: 25 },
    { id: 2, name: 'Jane', email: 'jane@example.com', age: 28 }
  ];

  getUserName(userId: number): string {
    // Breakpoint can pause here if you Step Into
    console.log(`Service: Looking for user ${userId}`);
    
    const user = this.users.find(u => u.id === userId);
    
    if (!user) {
      return 'Unknown User';
    }
    
    return user.name;
  }

  getUserData(userId: number) {
    // Another function to step into
    console.log(`Service: Fetching full data for user ${userId}`);
    
    const user = this.users.find(u => u.id === userId);
    
    if (!user) {
      return null;
    }
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      premium: false
    };
  }
}