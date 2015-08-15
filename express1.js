// var http = require('http');
// var url = require('url');

// var parseTime = function(dateString) {

//     return JSON.stringify({
//         "hour": 12,
//         "minute": 10,
//         "second": 5
//     })
// }

// var server = http.createServer(function(request, response) {
//     console.log('request');
//     var urlParams = url.parse(request.url, true);
//     if (urlParams.pathname === '/api/parsetime') {
//         timeResponse = parseTime(urlParams.query.iso);
//     }
//     response.writeHead('200', {
//         "Content-Type": "text/json"
//     });
//     response.write(timeResponse);
//     response.end();
// });

// server.listen(8000);

var express = require('express');
var app = express();

console.log('listening on 8080');

var router = express.Router();
var bodyParser = require('body-parser');

app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 

router.get('/parsetime', function(req, res) {
    var date = new Date();
    console.log(date);
    // res.send(date);
    res.end(date.toString());
});

router.post('/posttrial', function(req, res) {
    console.log(req.body);
    var testvar = req.body.name;
    res.end(req.body.name);
});


app.use('/servepage', express.static('/Users/abhimanyuarya/personal/mck/nodeBot'));
app.use('/api', router);

app.listen(8080);