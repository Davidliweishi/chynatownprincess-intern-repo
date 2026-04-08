import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddIsActive1775182566541 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
