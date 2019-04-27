const mysql = require("mysql");

// Create connection
// if (process.env.JAWSDB_URL) {
//     var db = mysql.createConnection(process.env.JAWSDB_URL)
// } else {
    const db = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "ro4otR01OOTrrOtt8",
        database: "chatbots"
    });

// };

// Connect
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql connected...")
});

module.exports = db;
