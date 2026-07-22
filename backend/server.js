const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= HOME =================

app.get("/", (req, res) => {
    res.send("Server Working");
});

// ================= SIGNUP =================

app.post("/signup", (req, res) => {

    const {
        name,
        email,
        phone,
        college,
        course,
        skills,
        password
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !college || !course || !skills || !password) {
        return res.status(400).send("All fields are required");
    }

    // Check if email already exists
    const checkSql = "SELECT * FROM users WHERE email = ?";

    db.query(checkSql, [email], (err, result) => {

        if (err) {
            console.error("❌ Database Error (Check Email):", err);
            return res.status(500).send("Database Error: " + (err.sqlMessage || err.message));
        }

        if (result.length > 0) {
            return res.send("Email already registered");
        }

        // Insert new user
        const insertSql = `
            INSERT INTO users
            (name, email, phone, college, course, skills, password)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
            insertSql,
            [name, email, phone, college, course, skills, password],
            (err) => {

                if (err) {
                    console.error("❌ Database Error (Insert User):", err);
                    return res.status(500).send("Database Error: " + (err.sqlMessage || err.message));
                }

                console.log("✅ User registered successfully:", email);
                res.send("Signup Successful");

            }
        );

    });

});
// ================= LOGIN =================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }

    const sql = `
        SELECT * FROM users
        WHERE email = ? AND password = ?
    `;

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            console.error("❌ Database Error (Login):", err);
            return res.status(500).send("Database Error: " + (err.sqlMessage || err.message));
        }

        if (result.length > 0) {
            console.log("✅ User logged in successfully:", email);
            res.send("Login Successful");
        } else {
            res.send("Invalid Email or Password");
        }

    });

});

// ================= GET ALL USERS =================

app.get("/users", (req, res) => {
    const sql = "SELECT id, name, email, phone, college, course, skills FROM users";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("❌ Database Error (Fetch Users):", err);
            return res.status(500).send("Database Error: " + (err.sqlMessage || err.message));
        }
        
        res.json(result);
    });
});

// ================= START SERVER =================

const PORT = process.env.PORT || 3000;

// Only start listening when run directly (e.g. `node server.js`).
// Platforms like Vercel import `app` as a serverless handler instead.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server Running on Port ${PORT}`);
    });
}

module.exports = app;