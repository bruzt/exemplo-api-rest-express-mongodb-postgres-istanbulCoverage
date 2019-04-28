const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const registerRoutes = require('./controllers/registerRoutes');
const loginRoutes = require('./controllers/loginRoutes');
const authRoutes = require('./controllers/authRoutes');
const coverageRoute = require('./controllers/coverageRoute')


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// req.assert
app.use(expressValidator());

app.get('/', (req, res) => {
    res.send("OK");
});

// Rotas
app.use(
    authRoutes,
    coverageRoute,
    
    registerRoutes,
    loginRoutes
);

app.listen(3000);