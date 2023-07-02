
const depositService = require('../services/deposit.service');
var schema = require('../schema/loginValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


const jwt = require('jsonwebtoken');

function deposit(router) {
    router.route('/depositAddress')
        .post(depositAddress);     
    router.route('/createTransaction')
        .post(createTransaction);  
    router.route('/transactionStatus')
        .post(transactionStatus);         
    router.route('/depositHistory/:user_id')
        .get(depositHistory);
    router.route('/getMyBalance/:user_id')
        .get(getMyBalance); 
    router.route('/myHistory/:user_id/:page')
        .get(myHistory);      

           
}

function depositAddress(req,res) {
  var depositData=req.body;
  
  //Validating the input entity
   //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
   if (!depositData.user_id || depositData.user_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"User detail required"
       });
   }

   depositService.depositAddress(depositData).then((data) => {
   if(data) {
      res.json({
        "success":true,
        "data":data,
      });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function createTransaction(req,res) {
  var depositData=req.body;
  console.log(depositData);
  //Validating the input entity
   //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
   if (!(depositData.amount) || depositData.amount=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All field required"
       });
   }
   
   depositService.createTransaction(depositData).then((data) => {
   if(data) {
      res.json({
        "success":true,
        "data":data,
      });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function transactionStatus(req,res) {
  var depositData=req.body;
  
   if (!depositData.user_id || depositData.user_id=='' || !depositData.txn_id || depositData.txn_id=='') {
      return res.json({
         "success":false,
         "data":"All field required"
       });
   }

   depositService.transactionStatus(depositData).then((data) => {
   if(data) {
      res.json({
        "success":true,
        "data":data,
      });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function depositHistory(req,res) {
  var depositData=req.params;
  
   if (!depositData.user_id || depositData.user_id=='') {
      return res.json({
         "success":false,
         "data":"All field required"
       });
   }

   depositService.depositHistory(depositData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function myHistory(req,res) {
  var depositData=req.params;
  
   if (!depositData.user_id || depositData.user_id=='' || !depositData.page || depositData.page=='') {
      return res.json({
         "success":false,
         "data":"All field required"
       });
   }

   depositService.myHistory(depositData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

function getMyBalance(req,res) {
  var depositData=req.params;
  
   if (!depositData.user_id || depositData.user_id=='') {
      return res.json({
         "success":false,
         "data":"All field required"
       });
   }

   depositService.getMyBalance(depositData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

module.exports.deposit = deposit;
