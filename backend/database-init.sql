CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       password VARCHAR(60) NOT NULL,
       email VARCHAR(255) NOT NULL UNIQUE,
       first_name VARCHAR(255) NOT NULL,
       last_name VARCHAR(255) NOT NULL,
       change_password BOOLEAN NOT NULL DEFAULT TRUE,
       phone_number VARCHAR(20) NOT NULL UNIQUE,
       role INTEGER NOT NULL DEFAULT 0
);

INSERT INTO users (password, email, first_name, last_name, change_password, phone_number, role) VALUES
    ('$2a$12$D4f1sEnP2sD9Fz7HcVzZaeJ7tkCjJf3xNp6pEABQK1TXu5BMO8O6i', 'user1@example.com', 'John', 'Doe', true, '1111111111', 0),
    ('$2a$12$Kj3fsFN9kSD82fnCxDHrReATePjcS1yJLuHOBQotpB.xk3ZBnX9Hu', 'user2@example.com', 'Alice', 'Johnson', true, '2222222222', 1),
    ('$2a$12$xeQWSEnpz9HrcCsDh22reuLHibPQceQyq.5gbzXuEZt.jCdQWm9zm', 'user3@example.com', 'Bob', 'Smith', true, '3333333333', 2),
    ('$2a$12$yyxAT4npL3SDhQHHX1vhreufBIbwx2bVkq0xTPH.k7XIXubkxQ7Su', 'user4@example.com', 'Carol', 'Taylor', true, '4444444444', 3),
    ('$2a$12$889rsnmpP1WR8AFjk89fewJgKihGT30BxPEhltQhFmYpYHpWvj9ui', 'user5@example.com', 'Dave', 'Wilson', true, '5555555555', 1);

select *
from users;