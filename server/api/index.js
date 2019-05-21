const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const admin = require("./admin.js");
const front = require("./front.js");
const settings = require('../settings');


const app = express();

app.locals.gds = require('json-fs-store')('server/db/gds');
app.locals.categories = require('json-fs-store')('server/db/categories');
app.locals.services = require('json-fs-store')('server/db/service');
app.locals.orders = require('json-fs-store')('server/db/orders');
app.locals.slides = require('json-fs-store')('server/db/slides');

module.exports = (PORT, isDev)=> {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  app.use(bodyParser({limit: '20mb'}));
  app.use(bodyParser.json());

  app.use(express.static(path.resolve(__dirname, '../../admin-ui/build')));

  admin(app);
  front(app);

  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../../admin-ui/build', 'index.html'));
  });


  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
    console.error(`Login: ${settings.admin.LOGIN}; Password: ${settings.admin.PASSWORD};`);
  });



};
