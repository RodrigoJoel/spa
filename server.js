/*const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'rodrigo', // Cambia esto si tu usuario de MySQL es diferente
  password: '', // Cambia esto si tienes una contraseña
  database: 'spa'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para manejar el formulario de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Consulta para verificar las credenciales
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error en el servidor.');
      return;
    }

    if (results.length > 0) {
      res.send('Login exitoso.');
    } else {
      res.send('Credenciales inválidas.');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});*/

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'rodrigo', // Cambia esto si tu usuario de MySQL es diferente
  password: '', // Cambia esto si tienes una contraseña
  database: 'spa'
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Ruta para manejar el formulario de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Consulta para obtener el usuario y la contraseña cifrada
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error en el servidor.');
      return;
    }

    if (results.length > 0) {
      const user = results[0];

      // Compara la contraseña ingresada con la contraseña cifrada
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error('Error al comparar la contraseña:', err);
          res.status(500).send('Error en el servidor.');
          return;
        }

        if (result) {
          res.send('Login exitoso.');
        } else {
          res.send('Credenciales inválidas.');
        }
      });
    } else {
      res.send('Credenciales inválidas.');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Cifra la contraseña
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error al cifrar la contraseña:', err);
      res.status(500).send('Error en el servidor.');
      return;
    }

    // Guarda el usuario y la contraseña cifrada en la base de datos
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        res.status(500).send('Error en el servidor.');
        return;
      }

      res.send('Registro exitoso.');
    });
  });
});

const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const accountSid = 'ACab8a6ae0da531c8b4d4113621df604bc'; // Tu Account SID
const authToken = '92059759ca94a69f60830ed392e439e3'; // Reemplaza con tu Auth Token
const client = twilio(accountSid, authToken);
const twilioNumber = 'whatsapp:+14155238886'; // Número de WhatsApp de Twilio

app.post('/confirmar-reserva', (req, res) => {
  const userPhoneNumber = req.body.telefono; // Obtener el número de teléfono del formulario

  // Validar el formato del número de teléfono (asegúrate de que esté en formato WhatsApp)
  const recipientNumber = `whatsapp:${userPhoneNumber}`;

  // Cuerpo del mensaje
  const messageBody = `
Asunto: Confirmación de Turno

Hola!!!

Tu turno ha sido confirmado. Será un placer atenderte. Por favor, llega unos minutos antes de la hora programada.

¡Te esperamos!

Saludos,
Spa Sentirse Bien! :)
`;

  // Enviar mensaje
  client.messages
    .create({
      body: messageBody,
      from: twilioNumber,
      to: recipientNumber
    })
    .then(message => {
      console.log('Mensaje enviado con SID:', message.sid);
      res.send('Reserva confirmada y mensaje enviado.');
    })
    .catch(error => {
      console.error('Error al enviar el mensaje:', error);
      res.status(500).send('Error al confirmar la reserva.');
    });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
