# Aura Movie Catalogue

Aura is a browser-based movie catalogue and review application built with HTML, CSS, JavaScript, Node.js, Express.js, and MySQL.

This repository is used as a continuing worked example in Web Technology Applications (WTA).

## Current Features

Aura currently allows users to:

- search the movie catalogue by title;
- view movie information stored in MySQL;
- submit and save movie ratings and reviews;
- edit and delete saved reviews;
- view reviews related to a selected movie;
- view the number of reviews for a selected movie; and
- view the average rating calculated from its saved reviews.

The application uses a frontend, an Express.js backend, and a MySQL database.

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

## Sample State

The provided database setup allows the Week 6 workflow to be observed immediately.

For example:

- **Interstellar** has two saved reviews with ratings of 5 and 4. Aura displays an average rating of **4.5/5 based on 2 reviews**.
- **Spirited Away** has no saved reviews. Aura displays **No reviews yet** instead of a misleading `0/5` rating.

These records are sample data for observing and testing the application's behavior.