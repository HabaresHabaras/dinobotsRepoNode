const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ro4otR01OOTrrOtt8",
    database: "chatbots"
});

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql connected...")
});

module.exports = db;
