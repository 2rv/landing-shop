const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

module.exports = (PORT, isDev)=> {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
  app.use(bodyParser({limit: '20mb'}));
  app.use(bodyParser.json());

  app.use(express.static(path.resolve(__dirname, '../../react-ui/build')));

  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });


};
