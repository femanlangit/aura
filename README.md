# Aura Movie Catalogue

Aura is a browser-based movie catalogue and review application built with HTML, CSS, JavaScript, Node.js, Express.js, and MySQL.

This repository is used as a continuing worked example in Web Technology Applications (WTA). The wta-week-7 tag preserves the Aura version used in the Weeks 6–7 worked example on functional completeness and reliability.

## Current Features

Aura currently allows users to:

- browse the persisted movie catalogue;
- search movies using a complete or partial title;
- filter movies by genre;
- sort movie results by title from A to Z or Z to A;
- combine supported discovery criteria;
- select a movie and view its stored information;
- view reviews related to the selected movie;
- view the number of reviews for the selected movie;
- view the average rating calculated from its saved reviews;
- submit and save movie ratings and reviews;
- edit saved reviews; and
- delete saved reviews.

The Weeks 6–7 implementation also:

- validates supported request information in the backend;
- distinguishes meaningful successful, empty, invalid, and not-found outcomes;
- prevents unusable review data and identifiers from reaching dependent operations;
- handles unexpected backend and database failures through centralized error-handling middleware; and
- returns a safe technical-error response without exposing internal error details.

The application uses one connected frontend, Express.js backend, and MySQL database across these workflows.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL
- `mysql2`

## Project Structure

```text
aura/
├── database/
│   └── aura_setup.sql
├── db/
│   └── database.js
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── routes/
│   ├── movieRoutes.js
│   └── reviewRoutes.js
├── services/
│   ├── movieService.js
│   └── reviewService.js
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

The `database/aura_setup.sql` file creates the database structure and sample data used by this version of Aura.

The `db/database.js` file manages the application's connection to MySQL.

## Set Up the Project

### 1. Install the dependencies

From the Aura project folder, run:

```bash
npm install
```

### 2. Create the database

Make sure MySQL is running.

From the Aura project folder, run:

```bash
mysql -u root -p < database/aura_setup.sql
```

Enter your MySQL password when prompted.

The setup script creates:

- the `aura_db` database;
- the `movies` and `reviews` tables;
- five sample catalogue movies; and
- two sample reviews for Interstellar.

### 3. Configure the database connection

Use `.env.example` as the guide for creating your local `.env` file.

Enter the MySQL settings for your own computer. Do not commit your `.env` file or database password to the repository.

### 4. Start Aura

Run:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## Weeks 6–7 Sample State

The provided database setup allows the completed Weeks 6–7 workflows to be observed and tested immediately.

For example:

- leaving the discovery criteria blank returns all five catalogue movies;
- partial title, genre, and supported sorting criteria can be used to narrow or arrange the returned collection;
- a valid criterion with no matching records produces an empty-result state rather than a technical failure;
- **Interstellar** has two saved reviews with ratings of 5 and 4. Aura displays an average rating of **4.5/5 based on 2 reviews**; and
- **Spirited Away** has no saved reviews. Aura displays **No reviews yet** instead of a misleading `0/5` rating.

The backend also validates review information and identifiers independently of the frontend and distinguishes expected application outcomes from unexpected technical failures.

These records are sample data for observing and testing the application's behavior.


## WTA Reference Checkpoint

The `wta-week-7` tag is the stable reference for the Aura version used in the WTA Weeks 6–7 worked example.

Learners may inspect this repository to see how the selected code shown in the worked example fits within the complete project. Aura is a reference implementation, not a template to copy. WTA projects should implement the workflows, validation rules, data operations, and outcomes required by their own established scope.

Later development may continue on the `main` branch without changing the tagged Weeks 6–7 reference.