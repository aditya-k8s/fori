
const stripeService = require('../services/stripe.service');
var schema = require('../schema/loginValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
const secretKey="!_@_fori_market_place_@_!"; 


function stripe(router) {
    router.route('/createSubscription')
        .post(createSubscription);
    router.route('/createCustomer')
        .post(createCustomer);  
    router.route('/getSubscription')
        .post(getSubscription); 
    router.route('/cancelSubscription')
      .post(cancelSubscription);      
    router.route('/createPaymentIntent')
        .post(createPaymentIntent);
    router.route('/paymentTransfer')
        .post(paymentTransfer);  
    router.route('/createCustomerCheckout')
        .post(createCustomerCheckout);  
     router.route('/paymentIntentData')
        .post(paymentIntentData);
    router.route('/saveCard')
        .post(saveCard); 
     router.route('/getCard/:user_id')
        .get(getCard);      
     router.route('/paymentSavedCard')
        .post(paymentIntentsCvv);
      router.route('/refund')
        .post(refund);  
     
        
}
function refund(req,res) {
  var reqData=req.body;  
  console.log('refund',reqData)
  if (!reqData.user_id || reqData.user_id==''|| !reqData.payment_intent || reqData.payment_intent=='') {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.refund(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });
}
function paymentIntentsCvv(req,res) {
  var reqData=req.body;  
   // Decrypt
    if ( !reqData.data || reqData.data=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"POST parameter required"
       });
    }
    var bytes  = CryptoJS.AES.decrypt(reqData.data, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData)
    reqData=decryptedData
  console.log('paymentIntentsCvv',reqData)
  if (!reqData.user_id || reqData.user_id==''|| !reqData.payment_method || reqData.payment_method=='' || !reqData.customer || reqData.customer=='' ) {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.paymentIntentsCvv(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });
}
function getCard(req,res) {
  var reqData=req.params; 
  if (!reqData.user_id || reqData.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.getCard(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });
}
function saveCard(req,res) {
  var reqData=req.body;
  if (!reqData.user_id || reqData.user_id=='' || !reqData.custom_id || reqData.custom_id=='' || !reqData.payment_menthod_id || reqData.payment_menthod_id=='') {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.saveCard(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });
}
function paymentIntentData(req,res) {

  var reqData=req.body;
  // Decrypt
  //console.log('paymentIntentData----------',req)
  var bytes  = CryptoJS.AES.decrypt(reqData.data, secretKey);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
 console.log(decryptedData)
 reqData=decryptedData

  if (!reqData.user_id || reqData.user_id=='' || !reqData.currency || reqData.currency=='' || !reqData.amount || reqData.amount=='') {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.paymentIntentData(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });
}
function paymentTransfer(req,res) {
  var reqData=req.body;
  if (!reqData.user_id || reqData.user_id=='' || !reqData.amount || reqData.amount=='') {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.paymentTransfer(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });
}
function createPaymentIntent(req,res) {
  var reqData=req.body;
  if (!reqData.user_id || reqData.user_id=='' || !reqData.amount || reqData.amount=='') {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.createPaymentIntent(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });
}
function cancelSubscription(req,res) {
    console.log('cancelSubscription>>>>>>>>>>>>>>>>>>>>>>>>>',req.body);
    var reqData=req.body;
     // Decrypt
    if ( !reqData.data || reqData.data=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"Invalid request data"
       });
    }
    var bytes  = CryptoJS.AES.decrypt(reqData.data, secretKey);
    var reqData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(reqData)
  if (!reqData.user_id || reqData.user_id=='' || !reqData.subscriptionId || reqData.subscriptionId=='') {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.cancelSubscription(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}
function getSubscription(req,res) {
console.log('getSubscription>>>>>>>>>>>>>>>>>>>>>>>>>',req.body);
var reqData=req.body;
     // Decrypt
    if ( !reqData.data || reqData.data=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"Invalid request data"
       });
    }
    var bytes  = CryptoJS.AES.decrypt(reqData.data, secretKey);
    var reqData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(reqData)

      if (!reqData.user_id || reqData.user_id=='') {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.getSubscription(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}

function createCustomer(req,res) {
    console.log('createCustomer>>>>>>>>>>>>>>>>>>>>>>>>>',req.body);
  var reqData=req.body;
     // Decrypt
    if ( !reqData.data || reqData.data=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"Invalid request data"
       });
    }
    var bytes  = CryptoJS.AES.decrypt(reqData.data, secretKey);
    var reqData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(reqData)
  if (!reqData.email || reqData.email=='') {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }

  stripeService.createCustomer(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}



function createCustomerCheckout(req,res) {
    console.log('createCustomerCheckout>>>>>>>>>>>>>>>>>>>>>>>>>',req.body);
  var reqData=req.body;
  if (!reqData.name || reqData.name==''){//} || !reqData.cardToken || reqData.cardToken=='') {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.createCustomerCheckout(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}

function createSubscription(req,res) {
  var reqData=req.body;
     // Decrypt
         console.log('createSubscription>>>>>>>>>>>>>>>>>>>>>>>>>',req.body);

    if ( !reqData.data || reqData.data=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"Invalid request data"
       });
    }
    var bytes  = CryptoJS.AES.decrypt(reqData.data, secretKey);
    var reqData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(reqData)
  if (!reqData.user_id || reqData.user_id=='' || !reqData.customerId || reqData.customerId=='') {
      return res.json({
         "success":false,
         "data":"All parameter detail required"
       });
    }
  stripeService.createSubscription(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}

module.exports.stripe = stripe;
