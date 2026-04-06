import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActive1775182566541 implements MigrationInterface {
  name = 'AddIsActive1775182566541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "isActive"`);
  }
}
