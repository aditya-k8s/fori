const apis = require("./config/api-config");
const PORT = 9001;
var fs = require('fs-extra');
var http  = require('http')
const https = require('https');

 apis.app.listen(process.env.PORT || PORT, "" ,function() {
     console.log("server connected to port " + PORT);
 });
 
