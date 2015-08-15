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


var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/cu.SLAB_USBtoUART", {
    baudrate: 9600
});

var bodyParser = require('body-parser');
var Twitter = require('node-twitter');
var port = process.env.PORT || 8080;
var router = express.Router();

var twitter = new Twitter.RestClient(
    'vJiqXRgm8dpcBlbGfRsH3Tznu',
    'H9YoalLLrE2rnHOtu4gKTk2cD1rgA0vgphFo3ZrKAnDszhGAr4',
    '3278859702-38GEBehwbGVjkVa9h7hCpspRYR51MqZRyYPNvH4',
    'iIV6LMHHusjI3M2bBpTtau5Abq0P3CH92goGaLDJyJw42'
);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

router.use(function(req, res, next) {
    console.log('Request');
    next();
});

var tweeter = function() {
    console.log('in tweeter');
    var dateNow = new Date();
    twitter.statusesUpdate({
        status: (dateNow.getMilliseconds()).toString()
    }, function(err, data) {
        if (err) {
            console.error(err);
        } else {
            console.log(data);
        }
    });
}

serialPort.on('data', function(data) {
    tweeter();
});

router.get('/W', function(req, res) {
    serialPort.write('X', function(err, results) {
        console.log('results ' + results);
    });
    res.json({
        message: 'forward'
    });
});

router.get('/X', function(req, res) {
    serialPort.write('W', function(err, results) {
        console.log('results ' + results);
    });
    res.json({
        message: 'backward'
    });
});

router.get('/D', function(req, res) {
    serialPort.write('D', function(err, results) {
        console.log('results ' + results);
    });
    res.json({
        message: 'left'
    });
});

router.get('/A', function(req, res) {
    serialPort.write('A', function(err, results) {
        console.log('results ' + results);
    });
    res.json({
        message: 'right'
    });
});

router.get('/S', function(req, res) {
    serialPort.write('S', function(err, results) {
        console.log('results ' + results);
    });
    res.json({
        message: 'stop'
    });
});

router.get('/capture', function(req, res) {
    console.log('tweeting');
    var abc = 'http://10.0.0.1/camera';
    console.log(abc);
    twitter.statusesUpdateWithMedia({
            'status': 'chal raha hai 2',
            'media[]': abc
        },
        function(error, result) {
            if (error) {
                console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
            }
            if (result) {
                console.log(result);
            }
        }
    );
});


app.use('/bot1', router);
app.listen(port);