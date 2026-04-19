import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddEncryptedFields1713398400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_entity', // your table name
      new TableColumn({
        name: 'phoneNumber', // or whatever field you're encrypting
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'phoneNumber');
  }
}