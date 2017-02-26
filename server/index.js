import express from 'express';
const app = express()
import React from 'react';
var ReactDOMServer = require('react-dom/server');
import App from '../src/App';

app.use(function (req, res, next) {
  var html = ReactDOMServer.renderToString(
    <App />
  )
  res.send(html)
})
app.listen(9000)