import cors from 'cors';
import express from 'express';
import produtos from './routes/produtos.js'
import empresa from './routes/empresa.js'
import usuarios from './routes/usuarios.js'
import comandas from './routes/comandas.js'
import itens from './routes/itens.js'
const port = process.env.PORT || 3333;
const server = express();

process.env.TZ = 'America/Sao_Paulo'

server.use(cors())
server.use(express.json())
server.use('/produtos', produtos)
server.use('/empresa', empresa)
server.use('/usuarios', usuarios)
server.use('/comandas', comandas)
server.use('/itens', itens)

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


