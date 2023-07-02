const adminapiService = require('../services/adminapi.service');
//var schema = require('../schema/userValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');
const uuid = require('uuidv4').default;


var CryptoJS = require("crypto-js");
const secretKey="!_@_fori_market_place_@_!"; 

const fs = require('fs');
const AWS = require('aws-sdk');
const USER_KEY = 'AKIATUGJAROHBQOMXDGN';
const USER_SECRET = '2X1GqvtwzLPTJOxlb2GEgSrDXztdEmokaw4CB1/L';
const BUCKET_NAME = 'uzyth';

 let s3bucket = new AWS.S3({
       accessKeyId: USER_KEY,
       secretAccessKey: USER_SECRET,
       Bucket: BUCKET_NAME,
     });
//var S3Zipper = require ('aws-s3-zipper');

function adminapi(router) {
    router.route('/getAllusers/:user_id')
        .get(getAllusers);

  router.route('/updateUserStatus/:user_id')
        .get(updateUserStatus);
    router.route('/getfeeDetail/')
        .get(getfeeDetail);
    router.route('/updatefeeDetail/')
        .post(updatefeeDetail);    
    router.route('/downloadFile/')
        .get(downloadList)
        .post(uploadDownload); 
    router.route('/deleteFile/:id')
      .delete(deletefile)
      .get(getfile)
    router.route('/updateFile/:id')
      .get(updatefileStatus); 
    router.route('/dashboardStack')
      .get(dashboardStack);
    router.route('/topDeposit')
      .get(topDeposit);
    router.route('/depositReport')
      .get(depositReport);    
    router.route('/updateUnilevel/')
        .post(updateUnilevel);   
    router.route('/withdrawReport')
      .get(withdrawReport);   
    router.route('/profitReport')
      .get(directbonusReport);   
    router.route('/dailyprofitReport')
      .get(dailyprofitReport);  
    router.route('/resendmail/:user_id')
      .get(resendmail);        
    router.route('/getPackage/')
        .get(getPackage);  
    router.route('/updatePackage/')
        .post(updatePackage);   
    router.route('/updateFeeUnilevel/')
        .post(updateFeeUnilevel);       
           
    // router.route('/getTestimonial/')
    //     .get(getTestimonial); 
    // router.route('/updateTestimonial/')
    //     .post(updateTestimonial); 

    router.route('/getAllOrder/')
        .get(getAllOrder);
     
    router.route('/getCategory/:user_id?')
        .get(getCategory);
    router.route('/addCategory/')
        .post(addCategory);
    router.route('/updateCategory/')
        .post(updateCategory); 

    router.route('/getSubCategory/:category_id')
        .get(getSubCategory);
    router.route('/addSubCategory/')
        .post(addSubCategory);
    router.route('/updateSubCategory/')
        .post(updateSubCategory);         
    router.route('/delCategory/:category_id')
        .get(delCategory);
    router.route('/delSubCategory/:sub_category_id')
        .get(delSubCategory);
    router.route('/getRecentusers/')
        .get(getRecentusers); 
    router.route('/getSaleorderGraph/')
        .get(getSaleorderGraph);         

       

    router.route('/getBankDetails/:user_id')
        .get(getBankDetails);
    // router.route('/addBankDetail/')
    //     .post(addBankDetail);
    router.route('/updateBankDetails/')
        .post(updateBankDetails);         
    router.route('/delBankDetail/:id') 
        .get(delBankDetail); 
    router.route('/getDeviceGraph/')
        .get(getDeviceGraph);    
    router.route('/getProductSaleGraph/:user_id')
        .get(getProductSaleGraph);
    router.route('/getAvgOrderGraph/:user_id')
        .get(getAvgOrderGraph);
    router.route('/getBroadcastGraph/:user_id')
        .get(getBroadcastGraph);
    router.route('/getProductSaleReport/:month?/:year?')
        .get(getProductSaleReport);
    router.route('/getAllRequestList/:user_type')
        .get(getAllRequestList);

    router.route('/getTestimonial/:user_id')
        .get(getTestimonial);
    router.route('/addTestimonial/')
        .post(addTestimonial);
    router.route('/updateStatusTestimonial/')
        .post(updateStatusTestimonial); 
    router.route('/delTestimonial/:testimonial_id')
        .get(delTestimonial);    
    router.route('/getTestimonialDetail/:testimonial_id')
        .get(getTestimonialDetail); 
    router.route('/getTestimonialBypage/:user_id/:start?/:limit?')
        .get(getTestimonialBypage);
    router.route('/getMerchantList/')
        .get(getMerchantList);
    router.route('/getMerchantBalance/:user_id/')
        .get(getMerchantBalance); 
    router.route('/payToMerchant/')
        .post(payToMerchant);            

}
function payToMerchant(req,res) {
  let arg = req.body; 
   if (!arg.user_id || arg.user_id=='' || !arg.amount || arg.amount=="" ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }   
  adminapiService.payToMerchant(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getMerchantBalance(req,res) {
  let arg = req.params; 
   if (!arg.user_id || arg.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }   
  adminapiService.getMerchantBalance(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getMerchantList(req,res) {
  let arg = req.params; 
    
  adminapiService.getMerchantList(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getTestimonialBypage(req,res) {
  let arg = req.params; 
   if (!arg.user_id || arg.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }   
  adminapiService.getTestimonialBypage(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}

function getTestimonialDetail(req,res) {
  let arg = req.params; 
   if (!arg.testimonial_id || arg.testimonial_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }   
  adminapiService.getTestimonialDetail(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function delTestimonial(req,res) {
  let arg = req.params; 
   if (!arg.testimonial_id || arg.testimonial_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }   
  adminapiService.delTestimonial(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getTestimonial(req,res) {
  let arg = req.params; 
   if (!arg.user_id || arg.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }   
  adminapiService.getTestimonial(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function addTestimonial(req,res) {
  let arg = req.body;
   if (!arg.title || arg.title=='' || !arg.description || arg.description=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.addTestimonial(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);  
       res.json(err);
    });
}
function updateStatusTestimonial(req,res) {
  console.log(req)
  let arg = req.body;    
   if (!arg.testimonial_id || arg.testimonial_id=='' ) {
      return res.json({
         "success":false,   
         "data":"",
         "message":"All field required"
       });
   }
          
  adminapiService.updateStatusTestimonial(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getAllRequestList(req,res) {
  let arg = req.params;
   
   if (!arg.user_type || arg.user_type=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   } 
  adminapiService.getAllRequestList(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getProductSaleReport(req,res) {
  let arg = req.params;
   console.log('arg',arg);
  if (!arg.month || arg.month=='' || !arg.year || arg.year=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
  } 
  adminapiService.getProductSaleReport(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getBroadcastGraph(req,res) {
  let arg = req.params;
   if (!arg.user_id || arg.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.getBroadcastGraph(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getAvgOrderGraph(req,res) {
  let arg = req.params;
   if (!arg.user_id || arg.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.getAvgOrderGraph(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getProductSaleGraph(req,res) {
  let arg = req.params;
   if (!arg.user_id || arg.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.getProductSaleGraph(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getDeviceGraph(req,res) {
  let arg = req.params;    
  adminapiService.getDeviceGraph(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function delBankDetail(req,res) {
  let arg = req.params;
   if (!arg.id || arg.id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.delBankDetail(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getBankDetails(req,res) {
  let arg = req.params;   
   if (!arg.user_id || arg.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   } 
  adminapiService.getBankDetails(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}

//`user_id`, `bank_name`, `bank_address`, 
//`account`, `routing`,
function addBankDetail(req,res) {
  var reqData=req.body;
      console.log('addBankDetail',req)
   console.log('filess----',req.files)

     // Decrypt
    if ( !reqData.data || reqData.data=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"Invalid request data"
       });
    }
    var bytes  = CryptoJS.AES.decrypt(reqData.data, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData)
    var arg=decryptedData
   if (!arg.routing || arg.routing=='' || !arg.account || arg.account=='' || !arg.user_id || arg.user_id=='' || !arg.bank_name || arg.bank_name=='' || !arg.bank_address || arg.bank_address=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("File missing")
    return res.status(400).send('No files were uploaded.');
  }

  let chanellogo = req.files.business_doc;
    logoName ='upload/'+ new Date().getTime()+'_'+chanellogo.name;
    uploadPath ='/var/www/html/lash/'+logoName;
    console.log(uploadPath,uploadPath);
    chanellogo.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
  arg['business_doc']=logoName;
    
  adminapiService.addBankDetail(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
  })
}
function updateBankDetails(req,res) {
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
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData)
    var arg=decryptedData
   if (!arg.id || arg.id=='' || !arg.routing || arg.routing=='' || !arg.account || arg.account=='' || !arg.user_id || arg.user_id=='' || !arg.bank_name || arg.bank_name=='' || !arg.bank_address || arg.bank_address=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.updateBankDetails(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}

function getSaleorderGraph(req,res) {
  let arg = req.params;  
  adminapiService.getSaleorderGraph(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getRecentusers(req,res) {
  let arg = req.params;  
  adminapiService.getRecentusers(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function delCategory(req,res) {
  let arg = req.params;
   if (!arg.category_id || arg.category_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.delCategory(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function delSubCategory(req,res) {
  let arg = req.params;
   if (!arg.sub_category_id || arg.sub_category_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.delSubCategory(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getCategory(req,res) {
  let arg = req.params;    
  adminapiService.getCategory(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function addCategory(req,res) {
  let arg = req.body;
   if (!arg.category_name || arg.category_name=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.addCategory(arg).then((data) => {
     res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function updateSubCategory(req,res) {
  let arg = req.body;
   if (!arg.sub_category_id || arg.sub_category_id=='' || !arg.sub_category_name || arg.sub_category_name=='' || !arg.category_id || arg.category_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.updateSubCategory(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json(err);
    });
}
function getSubCategory(req,res) {
  let arg = req.params;  
   if ( !arg.category_id || arg.category_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }  
  adminapiService.getSubCategory(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       res.json(err);
    });
}
function addSubCategory(req,res) {
  let arg = req.body;
   if (!arg.sub_category_name || arg.sub_category_name=='' || !arg.category_id || arg.category_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.addSubCategory(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
       res.json(err);
    });
}
function updateCategory(req,res) {
  let arg = req.body;
   if (!arg.category_name || arg.category_name=='' || !arg.category_id || arg.category_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.updateCategory(arg).then((data) => {
      res.json(data);
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });
}
function getAllOrder(req,res) {
  
    
  adminapiService.getAllOrder().then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       res.json(err);
    });
}
function updateUserStatus(req,res) {
  let arg = req.params;
   if (!arg.user_id || arg.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.updateUserStatus(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
function getAllusers(req,res) {
  let arg = req.params;
   if (!arg.user_id || arg.user_id=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.getAllusers(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}

function getPackage(req,res) {
  let arg = req.body;
  adminapiService.getPackage(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "data":err
       });
    });
}

function updatePackage(req,res) {
  let arg = req.body;
   if (!arg.value  || !arg.unlock_user || arg.unlock_user==''  ||  !arg.pack_name || arg.pack_name==''  || arg.value<0 || !arg.parent || arg.parent=='' || !arg.grandparent || arg.grandparent=='' ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    if (arg.value<=0 ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"minimum deposit amount is 100"
       });
    }
  adminapiService.updatePackage(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}

function getfeeDetail(req,res) {
  let userId = req.params;
  adminapiService.getfeeDetail(userId).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "data":err
       });
    });
}

function updatefeeDetail(req,res) {
  let arg = req.body;
   if (!arg.retail_fee || arg.retail_fee==''  || arg.retail_fee<0 || !arg.subscription_fee || arg.subscription_fee=='' ) {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    // if (arg.mini_deposit<100 ) {
    //   return res.json({
    //      "success":false,
    //      "data":"",
    //      "message":"minimum deposit amount is 100"
    //    });
    // }
  adminapiService.updatefeeDetail(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}

function downloadList(req,res) {
  let arg = req.params;
 /* var config ={
        accessKeyId: 'AKIATUGJAROHBQOMXDGN',
        secretAccessKey: '2X1GqvtwzLPTJOxlb2GEgSrDXztdEmokaw4CB1/L',
        bucket: 'uzyth',
        region: "us-east-1",//region: "us-west-2",//
  };

  var zipper = new S3Zipper(config);
  zipper.filterOutFiles= function(file){
    console.log('file ', file);
      if(file.Key.indexOf('.tmp') >= 0) // filter out temp files
          return null;
      else 
        return file;
  };
  
  //zipper.filterOutFiles = files; //files is the set of files selected by User
  zipper.zipToFile ({
        s3FolderName: 'sixprofit/downloads'
        , startKey: 'keyOfLastFileIZipped' // could keep null
        , zipFileName: './myLocalFile.zip'
        , recursive: true
    }
    ,function(err,result){
        if(err)
            console.error(err);
        else{
            var lastFile = result.zippedFiles[result.zippedFiles.length-1];
            if(lastFile)
                console.log('last key ', lastFile.Key); // next time start from here
        }
  });*/

    adminapiService.downloadList(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "data":err
       });
    });
}
function downloadZip(req,res) {
  let arg = req.params;
 console.log('downloadZip');
  var request = require('request');
  const ZipStream = require('zip-stream');
  var zip = new ZipStream()
  zip.pipe(res);
  res.set('Content-Type', 'application/zip');
  res.set('Content-Disposition', 'attachment; filename=all.zip');
   
    adminapiService.downloadList(arg).then((data) => {
      var queue =data['data']
      function addNextFile() {
        var elem = queue.shift()
        var stream = request(elem.fileURL)
        zip.entry(stream, { name: elem.fileName }, err => {
            if(err)
                throw err;
            if(queue.length > 0)
                addNextFile()
            else
                zip.finalize()
        })
      }

      addNextFile()
    }).catch((err) => {
     
       console.log('err',err);
      
       res.json({
         "success":false,
         "data":err
       });
    });
}
function uploadDownload(req,res)  {
    var postdata=req.body;

    postdata.downloafile='';
      if (req.files) {
        let getFile = req.files.downloafile;//mimetype
        var ext=path.extname(getFile['name']);
        var filename= uuid()+ext;
        var fileData =getFile['data']; 
        s3bucket.createBucket(function () {
             var params = {
              Bucket: BUCKET_NAME+"/powerbit/downloads",
              Key: filename,
              ACL: 'public-read',
              Body:fileData,

             };
            s3bucket.upload(params, function (err, data) {
                if (err) {
                 console.log('error in callback');
                 console.log(err);
                }
              postdata.downloafile=data.Location;
              adminapiService.uploadDownload(postdata).then((data) => {
                if(data) {
                  res.json(data);
                }
              }).catch((err) => {
                res.json(err);
              });  
            });
       });
    }else{
      return res.json({
       "success":false,
       "data":"",
       "message":"Please upload the file"
      });  
    }
    

}
function updatefileStatus(req,res) {
  let arg = req.params;
   if (!arg.id || arg.id=='') {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.updatefileStatus(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
function deletefile(req,res) {
  let arg = req.params;
   if (!arg.id || arg.id=='') {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
    
  adminapiService.deletefile(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}


function getfile(req,res) {
  let arg = req.params;
   if (!arg.id || arg.id==''   ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
  adminapiService.getfile(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
function dashboardStack(req,res) {
  let arg = req.params;
  adminapiService.dashboardStack(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
function topDeposit(req,res) {
  let arg = req.params;
  adminapiService.topDeposit(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
function depositReport(req,res) {
  let arg = req.query;
  adminapiService.depositReport(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
function updateUnilevel(req,res) {
  let arg = req.body;
  adminapiService.updateUnilevel(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
function updateFeeUnilevel(req,res) {
  let arg = req.body;
  adminapiService.updateFeeUnilevel(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}

function withdrawReport(req,res) {
  let arg = req.params;
  adminapiService.withdrawReport(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
function directbonusReport(req,res) {
  let arg = req.query;
  adminapiService.directbonusReport(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
function dailyprofitReport(req,res) {
  let arg = req.params;
  adminapiService.dailyprofitReport(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
function resendmail(req,res) {
  let arg = req.params;
  if (!arg.user_id || arg.user_id==''   ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"UserID required"
       });
   }
  adminapiService.resendmail(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}
/*
function getTestimonial(req,res) {
  let arg = req.params;
  adminapiService.getTestimonial(arg).then((data) => {
      res.send(data);
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "message":err
       });
    });
}

function updateTestimonial(req,res) {
  let arg = req.body;
   if (!arg.id || arg.id==''   ) {
      return res.json({
         "success":false,
         "data":"",
         "message":"All field required"
       });
   }
   arg.image='';
    if (req.files) {
        let getFile = req.files.image;//mimetype
        var ext=path.extname(getFile['name']);
        var filename= uuid()+ext;
        var fileData =getFile['data']; 
        s3bucket.createBucket(function () {
             var params = {
              Bucket: BUCKET_NAME+"/powerbit/testimonial",
              Key: filename,
              ACL: 'public-read',
              Body:fileData,

             };
            s3bucket.upload(params, function (err, data) {
                if (err) {
                 console.log('error in callback');
                 console.log(err);
                }
              arg.image=data.Location;
              adminapiService.updateTestimonial(arg).then((data) => {
                if(data) {
                  res.json(data);
                }
              }).catch((err) => {
                res.json(err);
              });  
            });
        });
      }else{
        adminapiService.updateTestimonial(arg).then((data) => {
          res.send(data);
        }).catch((err) => {
          //mail.mail(err);
           console.log('err',err);
           //res.send(err);
           res.json({
             "success":false,
             "message":err
           });
        });      
    }
}
*/
module.exports.adminapi = adminapi;



