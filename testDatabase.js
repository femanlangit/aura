const pool = require("./db/database");

async function testDatabaseQuery() {
    try {
        const [rows] = await pool.query(
            "SELECT movie_id, title FROM movies"
        );

        console.log("Database query successful.");
        console.log(rows);
    } catch (error) {
        console.error("Database query failed.");
        console.error("Code:", error.code);
        console.error("Message:", error.message);
    } finally {
        await pool.end();
    }
}

testDatabaseQuery();