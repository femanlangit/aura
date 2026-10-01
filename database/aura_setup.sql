CREATE DATABASE IF NOT EXISTS aura_db;

USE aura_db;


-- Users required for Aura's authentication and review ownership.
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);


-- Movies available through Aura's catalogue.
CREATE TABLE IF NOT EXISTS movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);


-- Reviews connect a movie with the authenticated user who submitted it.
CREATE TABLE IF NOT EXISTS reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL,
    review TEXT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


-- Prepared catalogue data used by the Aura reference application.
INSERT INTO movies
    (movie_id, title, genre, year, director, description)
VALUES
    (
        1,
        'Interstellar',
        'Science Fiction',
        2014,
        'Christopher Nolan',
        'A team of explorers travels through a wormhole in space in search of a new home for humanity.'
    ),
    (
        2,
        'Little Women',
        'Drama',
        2019,
        'Greta Gerwig',
        'Four sisters pursue their ambitions while navigating family, love, and change.'
    ),
    (
        3,
        'Spirited Away',
        'Animation',
        2001,
        'Hayao Miyazaki',
        'A young girl enters a mysterious spirit world and must find a way to save her parents.'
    ),
    (
        4,
        'Parasite',
        'Thriller',
        2019,
        'Bong Joon Ho',
        'A struggling family gradually becomes involved in the lives of a wealthy household.'
    ),
    (
        5,
        'The Grand Budapest Hotel',
        'Comedy',
        2014,
        'Wes Anderson',
        'A hotel concierge and a lobby boy become caught up in a dispute over a valuable painting.'
    );


-- Prepared users allow Aura's authentication and ownership workflows
-- to be exercised without requiring an account-registration feature.
INSERT INTO users
    (user_id, email, password_hash)
VALUES
    (
        1,
        'demo@aura.local',
        '$2b$12$e084c/QH.rHyhSzoVN/Qg.N7nRbwjXADI7mxWyXqbCoIb3FLqPy1e'
    ),
    (
        2,
        'viewer@aura.local',
        '$2b$12$kfS9MPxWrjfC3dQ3NXuyRujuw/eOTk88RRLzCzVu7dqMSGaUnsSdi'
    );


-- Prepared reviews provide existing public review data and ownership
-- relationships when Aura is first set up.
INSERT INTO reviews
    (review_id, movie_id, user_id, rating, review)
VALUES
    (
        1,
        1,
        1,
        5,
        'A memorable science fiction movie with a strong story.'
    ),
    (
        2,
        1,
        1,
        4,
        'A visually impressive film with an emotional story.'
    );