import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1747185767568 implements MigrationInterface {
    name = 'CreateDb1747185767568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "cpf" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL, "is_admin" boolean NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "libary" ("id" SERIAL NOT NULL, "city" character varying NOT NULL, "object_name" character varying NOT NULL, "original_date" TIMESTAMP NOT NULL, "legend" character varying NOT NULL, "image_path" character varying NOT NULL, "book_path" character varying NOT NULL, "state" character varying NOT NULL, "author_id" integer NOT NULL, "collection_id" integer NOT NULL, "donor" character varying NOT NULL, "context_history" character varying NOT NULL, "digitalization_technique" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_5f0562a6e34024ad2900e311e62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "archive" ("id" SERIAL NOT NULL, "object_name" character varying NOT NULL, "city" character varying NOT NULL, "original_date" TIMESTAMP NOT NULL, "technique" character varying NOT NULL, "material" character varying NOT NULL, "legend" character varying NOT NULL, "is_digitalized" boolean NOT NULL, "image_path" character varying NOT NULL, "state" character varying NOT NULL, "donor" character varying NOT NULL, "context_history" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "author_id" integer, "collection_id" integer, CONSTRAINT "PK_6493b19677ebfecfcf5281f4233" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collections" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" date NOT NULL, "updated_at" date NOT NULL, "author_id" integer, CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gallery" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "original_date" date NOT NULL, "image_path" character varying NOT NULL, "author_id" integer, CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "archive" ADD CONSTRAINT "FK_b417270f6ab83e20418544b23a4" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "archive" ADD CONSTRAINT "FK_8f9c0a29fe819284c000b398090" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "FK_813ae2fec945b9587ff761ae7f7" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gallery" ADD CONSTRAINT "FK_744a13a9efe373755cfda9d1338" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gallery" DROP CONSTRAINT "FK_744a13a9efe373755cfda9d1338"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "FK_813ae2fec945b9587ff761ae7f7"`);
        await queryRunner.query(`ALTER TABLE "archive" DROP CONSTRAINT "FK_8f9c0a29fe819284c000b398090"`);
        await queryRunner.query(`ALTER TABLE "archive" DROP CONSTRAINT "FK_b417270f6ab83e20418544b23a4"`);
        await queryRunner.query(`DROP TABLE "gallery"`);
        await queryRunner.query(`DROP TABLE "collections"`);
        await queryRunner.query(`DROP TABLE "authors"`);
        await queryRunner.query(`DROP TABLE "archive"`);
        await queryRunner.query(`DROP TABLE "libary"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
