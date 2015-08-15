var express = require('express');
var app = express();
var path = require('path');
var cameraMod = require('./cammod.js');
app.use(express.static(__dirname + '/public'));

app.get('/camera', function (req, res) {
  cameraMod.captureImage().then(function(){
  res.sendFile(path.join(__dirname, './public', 'cam.jpeg'));
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s .. do /camera for image', host, port);
});


