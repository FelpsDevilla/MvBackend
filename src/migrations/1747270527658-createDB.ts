import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDB1747270527658 implements MigrationInterface {
    name = 'CreateDB1747270527658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "cpf" character varying(11) NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT 'false', "is_admin" boolean NOT NULL DEFAULT 'false', CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "archive" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "city" character varying, "original_date" date, "technique" character varying, "material" character varying, "description" character varying NOT NULL, "is_digitalized" boolean NOT NULL DEFAULT false, "image_path" character varying, "state" character varying, "donor" character varying, "context_history" character varying, "author_id" integer NOT NULL, "collection_id" integer NOT NULL, CONSTRAINT "PK_6493b19677ebfecfcf5281f4233" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "collections" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "PK_21c00b1ebbd41ba1354242c5c4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "authors" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "libary" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "state" character varying, "city" character varying, "original_date" date, "image_path" character varying, "book_path" character varying NOT NULL, "donor" character varying, "context_history" text, "digitalization_technique" character varying, "author_id" integer NOT NULL, "collection_id" integer NOT NULL, CONSTRAINT "PK_5f0562a6e34024ad2900e311e62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gallery" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "original_date" date, "image_path" character varying NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "PK_65d7a1ef91ddafb3e7071b188a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "archive" ADD CONSTRAINT "FK_b417270f6ab83e20418544b23a4" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "archive" ADD CONSTRAINT "FK_8f9c0a29fe819284c000b398090" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collections" ADD CONSTRAINT "FK_813ae2fec945b9587ff761ae7f7" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libary" ADD CONSTRAINT "FK_c0bc07a284dcf15b122f5fb2d1d" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "libary" ADD CONSTRAINT "FK_4c5b58c6ff882a1439259bd7466" FOREIGN KEY ("collection_id") REFERENCES "collections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gallery" ADD CONSTRAINT "FK_744a13a9efe373755cfda9d1338" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gallery" DROP CONSTRAINT "FK_744a13a9efe373755cfda9d1338"`);
        await queryRunner.query(`ALTER TABLE "libary" DROP CONSTRAINT "FK_4c5b58c6ff882a1439259bd7466"`);
        await queryRunner.query(`ALTER TABLE "libary" DROP CONSTRAINT "FK_c0bc07a284dcf15b122f5fb2d1d"`);
        await queryRunner.query(`ALTER TABLE "collections" DROP CONSTRAINT "FK_813ae2fec945b9587ff761ae7f7"`);
        await queryRunner.query(`ALTER TABLE "archive" DROP CONSTRAINT "FK_8f9c0a29fe819284c000b398090"`);
        await queryRunner.query(`ALTER TABLE "archive" DROP CONSTRAINT "FK_b417270f6ab83e20418544b23a4"`);
        await queryRunner.query(`DROP TABLE "gallery"`);
        await queryRunner.query(`DROP TABLE "libary"`);
        await queryRunner.query(`DROP TABLE "authors"`);
        await queryRunner.query(`DROP TABLE "collections"`);
        await queryRunner.query(`DROP TABLE "archive"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
