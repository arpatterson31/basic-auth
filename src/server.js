'use strict';

const express = require('express');
const cors = require('cors');

const app = express();

const authRoutes = require('./auth/routes/auth-routes.js');

const notFound = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Gurrl we up on ${port}`);
    });
  }
}