const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/formulario', (req, res) => {
  console.log('Datos recibidos:', req.body);
  res.status(200).json({ message: 'Datos recibidos.' });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

