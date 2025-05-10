import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDB1746829040014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS authors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255)
            );

            CREATE TABLE IF NOT EXISTS collections (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                author_id INT REFERENCES authors(id),
                description TEXT,
                created_at DATE,
                updated_at DATE
            );

            CREATE TABLE IF NOT EXISTS acervo (
                id SERIAL PRIMARY KEY,
                object_name VARCHAR(255) NOT NULL,
                original_date DATE NOT NULL,
                city VARCHAR(255),
                legend TEXT,
                technique VARCHAR(255),
                material VARCHAR(255),
                is_digitalized BOOLEAN,
                state VARCHAR(255),
                author_id INT REFERENCES authors(id),
                collection_id INT REFERENCES collections(id),
                donor VARCHAR(255),
                context_history TEXT,
                image_path VARCHAR(255),
                created_at DATE,
                updated_at DATE
            );

            CREATE TABLE IF NOT EXISTS livraria (
                id SERIAL PRIMARY KEY,
                city VARCHAR(255),
                object_name VARCHAR(255),
                original_date DATE,
                legend TEXT,
                state VARCHAR(255),
                author_id INT REFERENCES authors(id),
                digitalization_technique VARCHAR(255),
                collection_id INT REFERENCES collections(id),
                donor VARCHAR(255),
                context_history TEXT,
                image_path VARCHAR(255),
                created_at DATE,
                updated_at DATE
            );

            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                cpf VARCHAR((11) NOT NULL UNIQUE,
                name VARCHAR(255),
                password VARCHAR(255),
                is_active BOOLEAN DEFAULT FALSE,
                is_admin BOOLEAN DEFAULT FALSE
            );

            CREATE TABLE IF NOT EXISTS gallery (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                original_date DATE,
                image_path VARCHAR(255)
            );`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS gallery;
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS livraria;
            DROP TABLE IF EXISTS acervo;
            DROP TABLE IF EXISTS collections;
            DROP TABLE IF EXISTS authors;
        `);
    }

}
