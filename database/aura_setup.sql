CREATE DATABASE IF NOT EXISTS aura_db;

USE aura_db;

CREATE TABLE IF NOT EXISTS movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    genre VARCHAR(100),
    year INT,
    director VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    rating INT,
    review TEXT,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);

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

INSERT INTO reviews
    (movie_id, rating, review)
VALUES
    (
        1,
        5,
        'A memorable science fiction movie with a strong story.'
    ),
    (
        1,
        4,
        'A visually impressive film with an emotional story.'
    );