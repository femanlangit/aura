# Aura Movie Catalogue

Aura is a browser-based movie catalogue and review application built with HTML, CSS, JavaScript, Node.js, Express.js, and MySQL.

This repository is used as a continuing worked example in Web Technology Application (WTA). Tagged checkpoints preserve the Aura versions used at different stages of the worked example so that later development does not change the earlier reference states.

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

### Weeks 8–9 Security Strengthening

The `wta-week-8-9-security` checkpoint extends the completed application where Aura's established behavior requires user identity and record-specific protection.

At this checkpoint, Aura also:

- authenticates prepared users using hashed passwords;
- remembers authenticated identity through a server-side session;
- requires authentication before a review can be submitted;
- associates saved reviews with their authenticated owner;
- restricts review editing and deletion to the review owner;
- distinguishes unauthenticated, forbidden, invalid, not-found, and technical-failure outcomes where applicable;
- keeps movie and review viewing publicly available; and
- adjusts review-management controls according to the authenticated user while retaining backend enforcement of the restriction.

This checkpoint deliberately stops after demonstrating the security decisions needed to make the relevant concepts concrete. It is not intended to demonstrate every possible account or security feature. Different WTA applications may require different protections based on their own established data, actions, and requirements.

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
├── middleware/
│   └── auth.js
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── routes/
│   ├── authRoutes.js
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

The database/aura_setup.sql file contains the database setup established for the earlier Aura implementation. Its readiness for reproducing the current application will be reviewed during later development.

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

## WTA Reference Checkpoints

### Weeks 6–7

The `wta-week-7` tag is the stable reference for the Aura version used in the WTA Weeks 6–7 worked example on functional completeness and reliability.

### Weeks 8–9 Security Strengthening

The `wta-week-8-9-security` tag is the stable reference for the Aura version used in the security-strengthening worked example.

Learners may inspect these tagged versions to see how the selected code shown in each worked example fits within the complete project at that stage.

Aura is a reference implementation, not a template to copy. WTA projects should examine their own established requirements, data, workflows, and implementation before deciding which strengthening changes are appropriate.

Later development may continue on the `main` branch without changing these tagged reference states.