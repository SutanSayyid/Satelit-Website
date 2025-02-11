const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yourpassword",
    database: "satelit_dashboard"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to database");
});

app.get("/api/projects", (req, res) => {
    db.query("SELECT * FROM projects", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
