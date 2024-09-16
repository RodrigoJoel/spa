CREATE DATABASE spa;

USE spa;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Insertar usuarios de ejemplo
INSERT INTO users (username, password) VALUES ('Rodrigo', 'Rodrigo1');
INSERT INTO users (username, password) VALUES ('Zarate', 'Zarate2');
INSERT INTO users (username, password) VALUES ('Jowy', 'Jowy3');
