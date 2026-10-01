# Aura Movie Catalogue

Aura is a browser-based movie catalogue and review application built with HTML, CSS, JavaScript, Node.js, Express.js, and MySQL.

This repository is used as a continuing worked example in Web Technology Application (WTA). Tagged checkpoints preserve the Aura versions used at different stages of the worked example so that later development does not change the earlier reference states.

## Current Features

Aura allows users to:

- browse the persisted movie catalogue;
- search movies using a complete or partial title;
- filter movies by genre;
- sort movie results by title from A to Z or Z to A;
- combine supported discovery criteria;
- select a movie and view its stored information;
- view reviews related to the selected movie;
- view the number of reviews for the selected movie;
- view the average rating calculated from saved reviews; and
- view saved reviews without signing in.

Prepared users can also sign in to:

- submit and save movie ratings and reviews;
- edit reviews they own; and
- delete reviews they own.

The application uses one connected frontend, Express.js backend, and MySQL database across these workflows.

## Weeks 8–9 Application Strengthening

The Weeks 8–9 implementation builds on the functionally complete application established during Weeks 6–7.

Aura has been reviewed and strengthened where its actual implementation justified changes.

### Security

Aura:

- authenticates prepared users using hashed passwords;
- remembers authenticated identity through a server-side session;
- requires authentication before a review can be submitted;
- associates saved reviews with their authenticated owner;
- restricts review editing and deletion to the review owner;
- distinguishes unauthenticated, forbidden, invalid, not-found, and technical-failure outcomes where applicable;
- keeps movie and review viewing publicly available; and
- adjusts review-management controls according to the authenticated user while retaining backend enforcement of the restriction.

### Configuration

Aura:

- obtains database connection values from environment configuration;
- obtains its session secret from environment configuration;
- allows the application port to be supplied through the environment while retaining `3000` as the local default;
- documents required environment variables through `.env.example`; and
- keeps the local `.env` file out of the repository.

### Maintainability

Review modification previously repeated the same review-ID, existence, and ownership checks across update and delete routes.

The current implementation places that shared responsibility in reusable review-ownership middleware while keeping review-content validation separate and retaining ownership protection in the database operations.

### Integrated Verification

The completed application was internally verified using selected end-to-end user journeys covering:

- public movie discovery and retrieval;
- authenticated review creation and later retrieval;
- owner review update and later retrieval; and
- prevention of another authenticated user modifying an owned review.

The selected journeys passed during the final internal end-to-end testing of the application.

### Deployment Readiness

Aura's runtime, configuration, database setup, repository resources, and local-development assumptions were reviewed before the application moves to manual deployment.

The database setup resource now reproduces the schema, ownership relationships, prepared users, catalogue data, and starting review data required by the current application.

The setup was verified using a separate fresh database rather than relying only on the database accumulated during development.

Aura has not yet been deployed at this checkpoint. Manual deployment and external testing follow after Milestone 2.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- MySQL
- `mysql2`
- `express-session`
- `bcrypt`
- `dotenv`

## Project Structure

```text
aura/
├── database/
│   └── aura_setup.sql
├── db/
│   └── database.js
├── middleware/
│   ├── auth.js
│   └── reviewOwnership.js
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

## Set Up the Project

### 1. Install the Dependencies

Make sure Node.js and MySQL are available on the computer where Aura will run.

From the Aura project folder, run:

```bash
npm install
```

The required Node.js packages are represented by the project's package files. The local `node_modules` folder does not need to be copied from another developer's computer.

### 2. Create the Database

Make sure MySQL is running.

From the Aura project folder, run:

```bash
mysql -u root -p < database/aura_setup.sql
```

Enter your MySQL password when prompted.

The setup script creates the `aura_db` database and prepares:

- the `users`, `movies`, and `reviews` tables;
- the relationships required for movie reviews and review ownership;
- two prepared users for Aura's authentication and ownership workflows;
- five prepared catalogue movies; and
- two prepared Interstellar reviews.

The prepared data represents Aura's required reference starting state. Temporary records created during development and testing are not part of the setup resource.

### 3. Configure the Application

Use `.env.example` as the guide for creating your local `.env` file.

The application expects configuration for:

```text
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
SESSION_SECRET
PORT
```

Provide values appropriate to the environment where Aura is being prepared.

Do not commit the local `.env` file or actual credentials and secrets to the repository.

### 4. Start Aura

From the project folder, run:

```bash
npm start
```

With the provided local port configuration, Aura is available at:

```text
http://localhost:3000
```

Another environment may supply a different port without requiring the application source code to be rewritten.

### Prepared Reference Accounts

Aura does not include account registration because registration is outside the scope of this reference application.

The prepared accounts allow the authentication and review-ownership workflows to be exercised after setup.

Use the prepared credentials provided with the WTA worked example when those workflows need to be tested.

## WTA Reference Checkpoints

### Weeks 6–7

The `wta-week-7` tag is the stable reference for the Aura version used in the WTA Weeks 6–7 worked example on functional completeness and reliability.

### Weeks 8–9 Security Strengthening

The `wta-week-8-9-security` tag is the stable reference for the Aura version used in Part 1 of the Weeks 8–9 worked example.

### Weeks 8–9 Final Strengthening and Deployment Readiness

The final Weeks 8–9 tag preserves the Aura version after the remaining application-strengthening work, internal end-to-end testing, and deployment-readiness preparation are complete.

Learners may inspect these tagged versions to see how selected code shown in each worked example fits within the complete project at that stage.

Aura is a reference implementation, not a template to copy. WTA projects should examine their own established requirements, data, workflows, implementation, and dependencies before deciding which strengthening or deployment-readiness changes are appropriate.

Later development may continue on the `main` branch without changing these tagged reference states.