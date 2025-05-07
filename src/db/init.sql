\set secretPassword `echo "$POSTGRES_PASSWORD"`

CREATE USER "MvDB" WITH PASSWORD :'secretPassword';

CREATE DATABASE "MvDB"
    WITH
    OWNER = "MvDB"
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE IF NOT EXISTS collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    author_id INT REFERENCES authors(id),
    description TEXT,
    created_at DATE,
    updated_at DATE
);

CREATE TABLE IF NOT EXISTS acervo (
    id SERIAL PRIMARY KEY,
    city VARCHAR,
    object_name VARCHAR,
    creation_date DATE,
    legend TEXT,
    technique VARCHAR,
    material VARCHAR,
    is_digitalized BOOLEAN,
    state VARCHAR,
    author_id INT REFERENCES authors(id),
    collection_id INT REFERENCES collections(id),
    donor VARCHAR,
    context_history TEXT,
    image_path VARCHAR,
    created_at DATE,
    updated_at DATE
);

CREATE TABLE IF NOT EXISTS livraria (
    id SERIAL PRIMARY KEY,
    city VARCHAR,
    object_name VARCHAR,
    creation_date DATE,
    legend TEXT,
    state VARCHAR,
    author_id INT REFERENCES authors(id),
    digitalization_technique VARCHAR,
    collection_id INT REFERENCES collections(id),
    donor VARCHAR,
    context_history TEXT,
    image_path VARCHAR,
    created_at DATE,
    updated_at DATE
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR,
    password VARCHAR,
    is_active BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE
);