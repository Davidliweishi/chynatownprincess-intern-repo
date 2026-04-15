import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

// Helper function to create encryption transformer instances
const createEncryptionTransformer = () => {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    console.warn('ENCRYPTION_KEY not set, encryption may not work');
  }
  return new EncryptionTransformer({
    key: key || 'default-key-for-migration-only',
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

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}