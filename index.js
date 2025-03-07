const cors = require('cors');
const cron = require('node-cron');
const express = require('express');
const port = process.env.PORT || 3333;
const server = express();
const { client, pool } = require('./database/db.js');

server.use(cors());
server.use(express.json());

let keys = [];

(async () => {
  cron.schedule('*/1 * * * *', async () => {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM comandas')
    console.log('buscou no Banco')
    client.release()

    keys = result.rows
      .map((value, index) => {
        return {
          document: value.chavecnpj,
          trade_name: value.chaveempresa,
          validation_date: value.chavedatavalidacao,
          sync_date: value.chavedatasincronizacao,
          received: value.chaverecebido
        }
      });
  })
})()

server.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM comandas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


server.listen(port, () => {
  console.log(`server running on port ${port}`)
})