CREATE TYPE privacy_enum AS ENUM ('private', 'public');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    shelf_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    privacy privacy_enum NOT NULL DEFAULT 'public'
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL, -- fk
    book_name VARCHAR(30) NOT NULL,
    author_name VARCHAR(30) NOT NULL,
    review VARCHAR(1300),
    spine_color VARCHAR(50) NOT NULL,
    spine_design VARCHAR(50) NOT NULL,

    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);