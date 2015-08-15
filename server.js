var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/cu.SLAB_USBtoUART", {
    baudrate: 9600
});

var request = require('request');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var newArray = [];
var generateBill = false;


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();


router.use(function(req, res, next) {
    console.log('Request');
    next();
});

serialPort.on('data', function(data) {
    //console.log(data.toString());
    //console.log('read');
    if (generateBill === false) {
        var y = data.toString();
        console.log(y);
        newArray.push(y);
    }
    //console.log(newArray);
});

router.get('/genbill', function(req, res) {
    generateBill = true;
    console.log(newArray);
    var temp = newArray.slice();
    var ipAddr = 'http://'+process.argv[2]+':1337/sendItemRFID';
    request.post(
        ipAddr, {
            form: {
                key: temp
            }
        },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
                res.json({
                    message: body
                });
            }
        }
    );
    newArray = [];
    generateBill = false;
    console.log('New bill');
});

app.use('/iot', router);

app.listen(port);
