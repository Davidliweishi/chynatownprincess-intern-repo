import 'dotenv/config';
import { DataSource } from 'typeorm';
import { UserEntity } from './users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [UserEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // IMPORTANT
});
