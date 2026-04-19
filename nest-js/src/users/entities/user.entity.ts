import 'dotenv/config';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

// Load encryption key from .env at runtime
const getEncryptionKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_KEY is not set in environment variables');
  }
  return key;
};

const createEncryptionTransformer = () => {
  return new EncryptionTransformer({
    key: getEncryptionKey(),
    algorithm: 'aes-256-cbc',
    ivLength: 16,
  });
};

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Exclude()
  @Column({
    type: 'text',
    transformer: createEncryptionTransformer(),
  })
  password!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({
    type: 'text',
    nullable: true,
    transformer: createEncryptionTransformer(),
  })
  secretNote!: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
    transformer: createEncryptionTransformer(),
  })
  phoneNumber!: string | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}