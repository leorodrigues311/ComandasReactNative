const cron = require('node-cron');
const express = require('express');
const router = express.Router();

let keys = [{ teste: 'oi' }];

cron.schedule('* 2 * * * *', async () => {
  console.log('oi')
  keys.push({ teste: 'oi1' })
})

router.get('/', async (req, res, next) => {
  res.send(keys)
});

module.exports = router, cron;