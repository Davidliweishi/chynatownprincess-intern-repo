import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRoleColumn1713400000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_entity',
      new TableColumn({
        name: 'role',
        type: 'varchar',
        default: "'user'",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_entity', 'role');
  }
}
