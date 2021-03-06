const mongoose = require('mongoose');
const express = require('express');
const sgMail = require('@sendgrid/mail');
const app = express();
const routerApi = require('./src/routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./src/handlers/errors.handler');
require('dotenv').config();

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

const port = process.env.PORT;

app.listen(port, () => console.log('Active port', port));

/* Endpoint: http://localhost:5000 */
app.get('/', (req, res) => {
  res.send('Practica SendGrid - Twilio');
});

/* mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Success connection with mongo'))
  .catch((error) => console.error(error)); */

/* ========================TWILIO======================== */
// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

/* -----SMS----- */
client.messages
  .create({
    body: 'Prueba de Twilio por SMS. Grupo Ing de Software miercoles en la mañana',
    from: '+15716216984',
    to: '+573182200072',
  })
  .then((message) => console.log(`Mensaje Enviado por SMS ${message.sid}`));

/* ========================SENDGRID======================== */

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'jaimepalozgm@gmail.com', // Change to your recipient
  from: 'jaimea.parral@autonoma.edu.co', // Change to your verified sender
  subject: 'Asunto: Prueba Twilio grupo Miercoles',
  html: `<html>
  <head>
    <title></title>
  </head>
  <body>
  <div>
      Hola mundo
  </div>
    <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
      <div class="Unsubscribe--addressLine">
        <p class="Unsubscribe--senderName"
          style="font-size:12px;line-height:20px"
        >
          {{Sender_Name}}
        </p>
        <p style="font-size:12px;line-height:20px">
          <span class="Unsubscribe--senderAddress">{{Sender_Address}}</span>, <span class="Unsubscribe--senderCity">{{Sender_City}}</span>, <span class="Unsubscribe--senderState">{{Sender_State}}</span> <span class="Unsubscribe--senderZip">{{Sender_Zip}}</span>
        </p>
      </div>
      <p style="font-size:12px; line-height:20px;">
        <a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="font-family:sans-serif;text-decoration:none;">
          Unsubscribe
        </a>
        -
        <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:sans-serif;text-decoration:none;">
          Unsubscribe Preferences
        </a>
      </p>
    </div>
  </body>
</html>`,
};
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });

/* Respuestas a solicitudes http en formato JSON */
app.use(express.json());

/* Permitir hacer el llamado de los request */
routerApi(app);
