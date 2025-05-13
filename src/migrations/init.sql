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
    name VARCHAR(255),
    description VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    author_id INT REFERENCES authors(id),
    description TEXT NOT NULL,
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS acervo (
    id SERIAL PRIMARY KEY,
    city VARCHAR(255),
    object_name VARCHAR(255) NOT NULL,
    creation_date DATE,
    legend TEXT NOT NULL,
    technique VARCHAR(255),
    material VARCHAR(255),
    is_digitalized BOOLEAN DEFAULT FALSE,
    state VARCHAR(255),
    author_id INT REFERENCES authors(id),
    collection_id INT REFERENCES collections(id),
    donor VARCHAR(255),
    context_history TEXT,
    image_path VARCHAR(500),
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS livraria (
    id SERIAL PRIMARY KEY,
    city VARCHAR(255),
    object_name VARCHAR(255) NOT NULL,
    original_date DATE,
    legend TEXT NOT NULL,
    state VARCHAR(255),
    author_id INT REFERENCES authors(id),
    digitalization_technique VARCHAR(255),
    collection_id INT REFERENCES collections(id),
    donor VARCHAR(255),
    context_history TEXT,
    image_path VARCHAR(500),
    book_path VARCHAR(500),
    created_at DATE DEFAULT CURRENT_DATE,
    updated_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    creation_date DATE,
    image_path VARCHAR(500)
);