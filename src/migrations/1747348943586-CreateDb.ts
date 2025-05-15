import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1747348943586 implements MigrationInterface {
    name = 'CreateDb1747348943586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_active" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_admin" SET DEFAULT 'false'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_admin" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_active" SET DEFAULT false`);
    }

}
