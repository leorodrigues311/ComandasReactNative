require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "inovasistemas",
    host: "inovasistemas.postgresql.dbaas.com.br",
    database: "inovasistemas",
    password: "Inova@123",
    port: 5432,
});

app.get("/comandas", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM comandas");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));