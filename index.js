const express = require('express');
const { createReservation, updateReservation } = require('./controllers/reservation.controller')
const bodyParser = require('body-parser');
const local = require('./auth/strategies')
const passport = require('passport');
const { register, login } = require('./controllers/auth.controller');

require("dotenv").config();

const app = express();


const PORT = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('getEmailInfo API 1.0');
});


/* Authenticate user and provide them with the access and refresh token */
app.post('/auth/traditional', passport.authenticate(local))
app.get('/auth/discord', passport.authenticate('discord'));
app.post('/auth/register', register)
app.post('/auth/login', login)


/* Reservations  */
app.post('/reservation/create', createReservation)
app.put('/reservation/update', updateReservation)


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


