
const broadcastService = require('../services/broadcast.service');
var schema = require('../schema/loginValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
const secretKey="!_@_fori_market_place_@_!"; 


function broadcast(router) {
    router.route('/createChannel')
        .post(createChannel);     
    router.route('/getChanneldetail/:user_id/')
        .get(getChanneldetail);  
    router.route('/adminGetChanneldetail/:user_id')
        .get(adminGetChanneldetail);      
    router.route('/updateChannel')
        .post(updateChannel);
    router.route('/verifyShopifyAuth')
        .post(verifyShopifyAuth);           
    router.route('/createStreamingChannel')
        .post(createStreamingChannel);
    router.route('/updateStreamingChannel')
        .post(updateStreamChannel);
    router.route('/getStreamingChannel/:channel_id')
        .get(getStreamingChannel);   
    router.route('/saveStreamingDetail')
        .post(saveStreamingDetail);
    router.route('/getMyStreamingChannel/:user_id/:store_id/:start?/:limit?')
        .get(getmyStreamingChannel);       
     router.route('/selectBroadcastingProduct')
        .post(selectBroadcastingProduct);
    router.route('/deleteStreamingChannel')
        .post(deleteStreamingChannel); 
    router.route('/updateBroadcastId')
        .post(updateBroadcastId);
     router.route('/getBroadcastDetails/:channel_id')
        .get(getBroadcastDetails);    
     router.route('/updateStreamingDetail')
        .post(updateStreamingDetail);               
     router.route('/getupcomingStreaming/:user_id/:start?/:limit?')
        .get(getupcomingStreaming);
      router.route('/getStoredStreaming/:user_id/:start?/:limit?')
        .get(getStoredStreaming);
      router.route('/getSyncStore/:user_id/')
        .get(getSyncStore);
      router.route('/deleteStore/:user_id/:store_id')
        .get(deleteStore);
      router.route('/getStoredetail/:user_id/:store_id?')
        .get(getStoredetail);
      router.route('/updateStoreStatus/:status/:store_id')
        .get(updateStoreStatus);   
      router.route('/getPublishedStore/:user_id')
        .get(getPublishedStore);
      router.route('/updateShopifyAuth')
        .post(updateShopifyAuth);
      router.route('/updateBroadcastStatus/:broadcast_id')
        .get(updateBroadcastStatus);            

}
function updateBroadcastStatus(req,res) {
    var reqData=req.params;
   if ( !reqData.broadcast_id || reqData.broadcast_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  broadcastService.updateBroadcastStatus(reqData).then((data) => {
    if(data) {
      res.json(data);
      
    }
  }).catch((err) => {
    res.json(err);
  });


}

function getPublishedStore(req,res) {
    var reqData=req.params;
   if ( !reqData.user_id || reqData.user_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  broadcastService.getPublishedStore(reqData).then((data) => {
    if(data) {
      res.json(data);
      
    }
  }).catch((err) => {
    res.json(err);
  });


}

function updateStoreStatus(req,res) {
    var reqData=req.params;
   if (!reqData.status || reqData.status=='' || !reqData.store_id || reqData.store_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  broadcastService.updateStoreStatus(reqData).then((data) => {
    if(data) {
      res.json(data);
      
    }
  }).catch((err) => {
    res.json(err);
  });


}
function getStoredetail(req,res) {
    var reqData=req.params;//|| !reqData.store_id || reqData.store_id==''
   if (!reqData.user_id || reqData.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  broadcastService.getStoredetail(reqData).then((data) => {
    if(data) {
      res.json(data);
      
    }
  }).catch((err) => {
    res.json(err);
  });


}
function deleteStore(req,res) {
  var reqData=req.params;
  console.log('deleteStore',reqData)
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='' || !reqData.store_id || reqData.store_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }

   broadcastService.deleteStore(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}  
function getSyncStore(req,res) {
  var reqData=req.params;
  console.log('getSyncStore',reqData)
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }

   broadcastService.getSyncStore(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}  
function getStoredStreaming(req,res) {
  var reqData=req.params;
  console.log('getStoredStreaming',reqData)
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }

   broadcastService.getStoredStreaming(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}    
function getupcomingStreaming(req,res) {
  var reqData=req.params;
  console.log('getupcomingStreaming',reqData)
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }

   broadcastService.getupcomingStreaming(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

function updateStreamingDetail(req,res) {
  var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.channel_id || reqData.channel_id=='' || !reqData.broadcast_time || reqData.broadcast_time=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }

   broadcastService.updateStreamingDetail(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function getBroadcastDetails(req,res) {
  var reqData=req.params;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.channel_id || reqData.channel_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }

   broadcastService.getBroadcastDetails(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function updateBroadcastId(req,res) {
  var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.channel_id || reqData.channel_id=='' || !reqData.broadcast_id || reqData.broadcast_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }

   broadcastService.updateBroadcastId(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function deleteStreamingChannel(req,res) {
  var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.channel_id || reqData.channel_id=='' || !reqData.user_id || reqData.user_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }

   broadcastService.deleteStreamingChannel(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

function selectBroadcastingProduct(req,res) {
  var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
   
    // if (!reqData.store_id || reqData.store_id=='') {
    //   //return res.status(422).send(json_format.errorMessage);
    //   return res.json({
    //      "success":false,
    //      "message":"Store Id  Required, Please create the store first"
    //    });
    // }
    if ( !reqData.channel_id || reqData.channel_id=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"Stream ID Required"
       });
    }
    if (!reqData.product_ids || reqData.product_ids=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"Please select at least one product"
       });
    }
    // if (!reqData.store_id || reqData.store_id=='' || !reqData.channel_id || reqData.channel_id=='' || !reqData.product_ids || reqData.product_ids=='') {
    //   //return res.status(422).send(json_format.errorMessage);
    //   return res.json({
    //      "success":false,
    //      "message":"All Fields Required"
    //    });
    // }
   broadcastService.selectBroadcastingProduct(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

function getmyStreamingChannel(req,res) {
  var reqData=req.params;
   if (!reqData.store_id || reqData.store_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"store_id required"
       });
    }
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }

   broadcastService.getmyStreamingChannel(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function saveStreamingDetail(req,res) {
  var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='' || !reqData.channel_id || reqData.channel_id=='' || !reqData.broadcast_time || reqData.broadcast_time=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }

   broadcastService.saveStreamingDetail(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function getStreamingChannel(req,res) {
    var reqData=req.params;
    console.log('getStreamingChannel',reqData)
   if (!reqData.channel_id || reqData.channel_id=='') {
      return res.json({
         "success":false,
         "message":"channel_id detail required"
       });
    }
  broadcastService.getStreamingChannel(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({ 
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });


}
function createStreamingChannel(req,res) {
  var reqData=req.body; 
  if (!reqData.store_id || reqData.store_id=='') {
      return res.json({
         "success":false,
         "data":"Please create the store first"
       });
    }
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='' || !reqData.stream_title || reqData.stream_title=='' || !reqData.stream_description || reqData.stream_description=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }

   broadcastService.createStreamingChannel(reqData).then((data) => {
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
function updateStreamChannel(req,res) {
  var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.channel_id || reqData.channel_id=='' || !reqData.stream_title || reqData.stream_title=='' || !reqData.stream_description || reqData.stream_description=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }

   broadcastService.updateStreamChannel(reqData).then((data) => {
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

function createChannel(req,res) {
  var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
  if(!reqData.user_id || reqData.user_id=='' || !reqData.channel_name || reqData.channel_name=='' || !reqData.description || reqData.description=='') {
    //return res.status(422).send(json_format.errorMessage);
    return res.json({
       "success":false,
       "data":"All Fields Required"
     });
  }
  broadcastService.createChannel(reqData).then((data) => {
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


function updateChannel(req,res) {
  var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.channel_id || reqData.channel_id=='' || !reqData.channel_name || reqData.channel_name=='' || !reqData.description || reqData.description=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }

   broadcastService.updateChannel(reqData).then((data) => {
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

function uploadchanelLogo(req,res) {
  let uploadPath;
  var reqData=req.body;
  console.log(req);
  console.log(req.params);
  console.log(req.files);
  if (!reqData.user_id || reqData.user_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("File missing")
    return res.status(400).send('No files were uploaded.');
  }

  let chanellogo = req.files.chanellogo;
    logoName ='upload/'+ new Date().getTime()+'_'+chanellogo.name;
    uploadPath ='/var/www/html/lash/'+logoName;
    console.log(uploadPath,uploadPath);
    chanellogo.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
    reqData['chanellogo']=logoName;
    broadcastService.uploadchanelLogo(reqData).then((data) => {
      if(data) {
        res.json(data);
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });
  });
}
function getChanneldetail(req,res) {
    var reqData=req.params;
   if (!reqData.user_id || reqData.user_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  broadcastService.getChanneldetail(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({ 
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });


}
function adminGetChanneldetail(req,res) {
    var reqData=req.params;
   if (!reqData.user_id || reqData.user_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  broadcastService.adminGetChanneldetail(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({ 
      //   "success":true,
      //   "data":data,
      // }); 
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

function verifyShopifyAuth(req,res) {
  var reqData=req.body;
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
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.store_id || reqData.store_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"Store ID required"
       });
    }
    if (!reqData.user_id || reqData.user_id=='' || !reqData.user_id || reqData.user_id=='' || !reqData.store_name || reqData.store_name=='' || !reqData.public_key || reqData.public_key=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }

   broadcastService.verifyShopifyAuth(reqData).then((data) => {
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

function updateShopifyAuth(req,res) {
  var reqData=req.body;
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
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.store_id || reqData.store_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"Store ID required"
       });
    }
    if (!reqData.user_id || reqData.user_id=='' || !reqData.user_id || reqData.user_id=='' || !reqData.store_name || reqData.store_name=='' || !reqData.public_key || reqData.public_key=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }

   broadcastService.updateShopifyAuth(reqData).then((data) => {
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
module.exports.broadcast = broadcast;


