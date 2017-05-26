const { NODE_ENV } = process.env;
const path = require('path');
const express = require('express');
const logger = require('morgan');
const static = require('serve-static');
const attachReactAppServer = require('./middlewares/react-app');

const app = express();
app.use(logger(NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use('/static', static(path.join(__dirname, 'static')));

// Se for utilizar alguns dos middlewares a seguir, é necessário
// instalá-los primeiro (yarn add body-parser cookie-parser), e
// referenciá-los no início do arquivo. Eles são necessários,
// respectivamente, para interpretar o conteúdo de uma requisição POST,
// PUT ou PATCH, e para trabalhar com cookies (caso utilize middlewares
// de sessão ou de mensagens flash).
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());


// Aplicação react
attachReactAppServer(app);


// Adicione aqui as suas rotas
//
// app.use('/my-route', (req, res) => res.sendStatus(200));


// Error handler inútil :P
app.use((err, req, res, next) => res.sendStatus(err.status || 500));

module.exports = app;
