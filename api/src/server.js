const express = require('express');
const { config } = require('./config/index');

const app = express();

app.use(express.json());

app.get('/', (req, res) =>{
    res.send('hello world');
  });

app.listen(config.port, () => {
  console.log(`server: ${config.port}`);
});
