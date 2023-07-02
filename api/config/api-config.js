var express = require("express");
var app = express();
var path  = require('path');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
var db = require('./database');
var dbfunc = require('./db-function');
var http  = require('http')
var bodyParser = require('body-parser');
var UserRoute = require('../app/routes/user.route');
var UnilevelRoute = require('../app/routes/unilevel.route');
var DepositRoute = require('../app/routes/deposit.route');
var CronRoute = require('../app/routes/cron.route');
var AdminapiRoute = require('../app/routes/adminapi.route');

var ProductRoute = require('../app/routes/product.route');
var BroadcastRoute = require('../app/routes/broadcast.route');
var ChimeRoute = require('../app/routes/chime.route');
var StripeRoute = require('../app/routes/stripe.route');

const https = require('https');
var fileupload=  require('express-fileupload');
path = require('path');

var AuthenticRoute = require('../app/routes/authentic.route');
var errorCode = require('../common/error-code')
var errorMessage = require('../common/error-methods')
var checkToken = require('./secureRoute');
var request = require('request');

app.use(fileupload());

const helmet = require('helmet')

// var schedule = require('node-schedule');
 
// var j = schedule.scheduleJob('*/1 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

//app.listen(port);

dbfunc.connectionCheck.then((data) =>{
    //console.log(data);
 }).catch((err) => {
     console.log(err);
 });
 app.use(helmet());
 app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', '*');
  next();
});
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true}));

var router = express.Router();
app.use('/api',router);
AuthenticRoute.init(router);

var secureApi = express.Router();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware

app.use('/secureApi',secureApi);
secureApi.use(checkToken);


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// index route
app.get('/', (req,res) => {
    res.send('hello world');
});

app.get('/dataddd', (req,res) => {
    res.send('dataddd');
});

var ApiConfig = {
  app: app
}

UserRoute.init(secureApi);
UnilevelRoute.unilevel(secureApi);
DepositRoute.deposit(secureApi);
AdminapiRoute.adminapi(secureApi);

CronRoute.cronDaily(router);
ProductRoute.product(secureApi);
BroadcastRoute.broadcast(secureApi);
ChimeRoute.chime(router);
StripeRoute.stripe(router);



//var cron = require('node-cron');
//cron.schedule('0 19 * * 1-5', () => {
//cron.schedule('*/2 * * * *', () => {
  // request("https://api.sixprofit.com/api/dailyBonus", function (error, response, body) {
  //      // console.log(body);
  //     console.log('running @6:00PM  Portugal time,exclude saturday Sunday');
  // });
//}); 

module.exports = ApiConfig;
