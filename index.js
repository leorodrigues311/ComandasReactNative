const cors = require('cors');
const cron = require('node-cron');
const express = require('express');
const port = process.env.PORT || 3333;
const server = express();
const { client, pool } = require('./database/db.js');

process.env.TZ = 'America/Sao_Paulo'

server.use(cors())
server.use(express.json())
server.use('/routes/produtos', produtos)
server.use('/routes/empresa', empresa)
server.use('/routes/usuarios', usuarios)
server.use('/routes/comandas', comandas)

server.get('/', async (req, res) => {
  res.status(200).send()
})
/*
server.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comandas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/
server.listen(port, () => {
  console.log(`server running on port ${port}`)
})


