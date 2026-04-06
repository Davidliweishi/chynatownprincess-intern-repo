import { AppDataSource } from './data-source';
import { UserEntity } from './users/entities/user.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(UserEntity);

  await repo.save([
    { name: 'David', email: 'david@test.com' },
    { name: 'Alice', email: 'alice@test.com' },
  ]);

  await AppDataSource.destroy();
}

seed();
