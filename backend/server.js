
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());


// =========================
// MYSQL
// =========================

const db = mysql.createConnection({
    host: "localhost",
    user: "u401308408_roott",
    password: "HaShImI1234",
    database: "u401308408_Hashimi"
});

db.connect((err) => {

    if (err) {

        console.log("Gabim:", err);
        return;

    }

    console.log("MySQL u lidh!");

});


// =========================
// HOME
// =========================

app.get("/", (req, res) => {

    res.json({
        message: "Serveri po punon!"
    });

});


// =========================
// LOGIN
// =========================

app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Plotëso email-in dhe password-in!"
        });

    }

    const sql = `
        SELECT id, emaili, password
        FROM login
        WHERE emaili = ? AND password = ?
    `;

    db.query(
        sql,
        [email, password],
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Gabim në server!"
                });

            }

            if (results.length === 0) {

                return res.status(401).json({
                    success: false,
                    message: "Email ose password është gabim!"
                });

            }

            const user = results[0];

            return res.json({
                success: true,
                message: "Login u krye me sukses!",
                user: user
            });

        }
    );

});


// =========================
// UPLOAD IMAGE
// =========================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        const extension = file.originalname
            .split(".")
            .pop();

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 100000) +
            "." +
            extension;

        cb(null, uniqueName);

    }

});

const upload = multer({
    storage: storage
});


// =========================
// FOLDERI UPLOADS PUBLIK
// =========================

app.use(
    "/uploads",
    express.static("uploads")
);


// =========================
// GET - SHFAQ APLIKACIONET
// =========================

app.get("/aplikacionet", (req, res) => {
    const sql = `
        SELECT
            id,
            title,
            category,
            description,
            image,
            linku AS link
        FROM aplikacionet
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gabim gjatë marrjes së aplikacioneve"
            });
        }

        res.json(result);
    });
});


// =========================
//  APLIKACION
// =========================

app.post(
    "/aplikacionet",
    upload.single("foto"),
    (req, res) => {
        const { title, category, description, link } = req.body;

        if (!title || !category || !description) {
            return res.status(400).json({
                success: false,
                message: "Plotëso të gjitha fushat"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Zgjidh një file"
            });
        }

        const image = req.file.filename;

        const sql = `
            INSERT INTO aplikacionet
            (title, category, description, image, linku)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [
                title,
                category,
                description,
                image,
                link || null
            ],
            (err, result) => {
                if (err) {
                    console.log(err);

                    return res.status(500).json({
                        success: false,
                        message: "Gabim gjatë ruajtjes"
                    });
                }

                return res.json({
                    success: true,
                    message: "Aplikacioni u shtua me sukses",
                    id: result.insertId
                });
            }
        );
    }
);


// =========================
// EDITO APLIKACION
// =========================

app.put(
    "/aplikacionet/:id",
    upload.single("foto"),
    (req, res) => {
        const { id } = req.params;
        const { title, category, description, link } = req.body;

        if (!title || !category || !description) {
            return res.status(400).json({
                success: false,
                message: "Plotëso të gjitha fushat"
            });
        }

        let sql;
        let values;

        if (req.file) {
            // Kur zgjedhet file i ri
            sql = `
                UPDATE aplikacionet
                SET
                    title = ?,
                    category = ?,
                    description = ?,
                    image = ?,
                    linku = ?
                WHERE id = ?
            `;

            values = [
                title,
                category,
                description,
                req.file.filename,
                link || null,
                id
            ];
        } else {
            // Kur nuk zgjedhet file i ri
            sql = `
                UPDATE aplikacionet
                SET
                    title = ?,
                    category = ?,
                    description = ?,
                    linku = ?
                WHERE id = ?
            `;

            values = [
                title,
                category,
                description,
                link || null,
                id
            ];
        }

        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Gabim gjatë editimit"
                });
            }

            return res.json({
                success: true,
                message: "Aplikacioni u editua me sukses"
            });
        });
    }
);


// =========================
// DELETE - FSHI APLIKACION
// =========================

app.delete("/aplikacionet/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM aplikacionet
        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Gabim gjatë fshirjes së aplikacionit"
                });

            }

            res.json({
                success: true,
                message: "Aplikacioni u fshi me sukses"
            });

        }
    );

});




// ==================================================
// KONTAKTET
// ==================================================


// =========================
// POST - RUAJ KONTAKT
// =========================

app.post("/kontakti", (req, res) => {

    const {
        emri,
        email,
        telefoni,
        mesazhi
    } = req.body;

    if (!emri || !email || !telefoni || !mesazhi) {

        return res.status(400).json({
            success: false,
            message: "Plotëso të gjitha fushat"
        });

    }

    const sql = `
        INSERT INTO kontakti
        (emri, email, telefoni, mesazhi)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            emri,
            email,
            telefoni,
            mesazhi
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Gabim gjatë ruajtjes së kontaktit"
                });

            }

            res.json({
                success: true,
                message: "Mesazhi u dërgua me sukses",
                id: result.insertId
            });

        }
    );

});


// =========================
// GET - SHFAQ KONTAKTET
// =========================

app.get("/kontakti", (req, res) => {

    const sql = `
        SELECT *
        FROM kontakti
        ORDER BY id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gabim gjatë marrjes së kontakteve"
            });

        }

        res.json(result);

    });

});


// =========================
// PUT - SHENO SI TE LEXUAR
// =========================

app.put("/kontakti/:id/lexuar", (req, res) => {

    const { id } = req.params;

    const sql = `
        UPDATE kontakti
        SET lexuar = TRUE
        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        (err) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    success: false,
                    message: "Gabim gjatë shënimit si të lexuar"
                });

            }

            res.json({
                success: true,
                message: "Mesazhi u shënua si i lexuar"
            });

        }
    );

});

// =========================
// DELETE - FSHI KONTAKT
// =========================

app.delete("/kontakti/:id", (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM kontakti
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                success: false,
                message: "Gabim gjatë fshirjes së kontaktit"
            });

        }

        res.json({
            success: true,
            message: "Kontakti u fshi me sukses"
        });

    });

});






// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveri po punon në portin ${PORT}`);
});

