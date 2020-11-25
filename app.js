const express = require('./config/express');
const app = express();
const cors = require('cors');

app.use(cors());

app.listen(3000, () => console.log('Rodando na porta 3000'));

module.exports = app