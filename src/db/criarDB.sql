CREATE DATABASE "MvDB"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS authors_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE IF NOT EXISTS collections_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    author_id int,
    description TEXT,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (author_id) REFERENCES authors_table(id)
);

CREATE TABLE IF NOT EXISTS acervo_table (
    id SERIAL PRIMARY KEY,
    city VARCHAR,
    object_name VARCHAR,
    creation_date DATE,
    legend TEXT,
    technique VARCHAR,
    material VARCHAR,
    digitalized BOOLEAN,
    state VARCHAR,
    author_id INT,
    collection_id INT,
    donor VARCHAR,
    context_history TEXT,
    thumbnail_url VARCHAR,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (author_id) REFERENCES authors_table(id),
    FOREIGN KEY (collection_id) REFERENCES collections_table(id)
);

CREATE TABLE IF NOT EXISTS livraria_table (
    id SERIAL PRIMARY KEY,
    city VARCHAR,
    object_name VARCHAR,
    creation_date DATE,
    legend TEXT,
    state VARCHAR,
    author_id INT,
    digitalization_technique VARCHAR,
    collection_id INT,
    donor VARCHAR,
    context_history TEXT,
    thumbnail_url VARCHAR,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (author_id) REFERENCES authors_table(id),
    FOREIGN KEY (collection_id) REFERENCES collections_table(id)
);

CREATE TABLE IF NOT EXISTS users_table (
    cpf INT PRIMARY KEY,
    name VARCHAR,
    passwrd VARCHAR,
    active BOOLEAN,
    is_admin BOOLEAN
);