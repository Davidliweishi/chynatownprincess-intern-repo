import { AppDataSource } from './database/data-source';
import { UserEntity } from './users/entities/user.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(UserEntity);
  await repo.save([
    { name: 'David', email: 'david@test.com', password: 'password1234' },
    { name: 'Alice', email: 'alice@test.com', password: 'password1234' },
  ]);

  await AppDataSource.destroy();
}

seed();
