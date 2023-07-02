const userService = require('../services/user.service');
const unilevelService = require('../services/unilevel.service');

path = require('path');

var schema = require('../schema/userValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');
var validator = require("email-validator");
const fs = require('fs');

const AWS = require('aws-sdk');
// const USER_KEY = 'AKIATUGJAROHLE7XBAX6';
// const USER_SECRET = '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';
// const BUCKET_NAME = 'uzyth';
const USER_KEY = 'AKIATUGJAROHBQOMXDGN';
const USER_SECRET = '2X1GqvtwzLPTJOxlb2GEgSrDXztdEmokaw4CB1/L';
const BUCKET_NAME = 'uzyth';

 let s3bucket = new AWS.S3({
       accessKeyId: USER_KEY,
       secretAccessKey: USER_SECRET,
       Bucket: BUCKET_NAME,
     });
function init(router) {
    router.route('/user')
        .get(getAllUsers)
        .post(addUser);
    router.route('/user/:id')
        .get(getUserById)
        .delete(deleteUser)
        .put(updateUser);
    router.route('/deleteUser/:user_id')
        .get(deleteUser);    
    router.route('/updateUserStatus/:id')
        .get(updateUserStatus);
    router.route('/changePassword')
        .post(changePassword);
    router.route('/changeEmail')
        .post(changeEmail);    
    // router.route('/changeProfilePic')
    //     .post(changeProfilePic);
    router.route('/updatePersonalDetail')
        .post(updatePersonalDetail);  
    router.route('/twoFactAuthEnable/')
        .post(twoFactAuthEnable);
    router.route('/twoFactAuthVerify/')
        .post(twoFactAuthVerify);
    router.route('/twoFactAuthDisable/')
        .post(twoFactAuthDisable); 
    router.route('/questionList/')
        .get(questionList); 
    router.route('/myQuestion/:user_id')
        .get(myQuestion); 
    router.route('/myQuesAns/')
        .post(myQuesAns); 
    router.route('/verifySecurityQues/')
        .post(verifySecurityQues); 
    router.route('/SecQuestiondisable/:user_id')
        .get(SecQuestiondisable);                                              
    router.route('/createExcel/')
        .get(createExcel);     
    router.route('/addEditfollower/')
        .post(addEditfollower); 

    router.route('/getPaymentGateway/:user_id')
        .get(getPaymentGateway);     
    router.route('/saveGatewayDetails/')
        .post(saveGatewayDetails);  
    router.route('/followingsStoreList/:user_id')
        .get(followingsStoreList);
    router.route('/userInterest/')
        .post(userInterest); 
    router.route('/getUserInterest/:user_id')
        .get(getUserInterest); 
    router.route('/getInterestList')
        .get(getInterestList); 
    router.route('/updateUserType/')
        .post(updateUserType); 
    router.route('/gettimeslot/')
        .get(gettimeslot);                     
    router.route('/supportRequest/')
        .post(supportRequest);
       
    router.route('/getRecommendationList/:user_id/:start?/:limit?')
        .get(getRecommendationList);    
    router.route('/updateUserdeviceInfo/')
        .post(updateUserdeviceInfo);  
    router.route('/sendPushNitification/')
        .post(sendPushNitification);
   
    router.route('/updateInfluencerDetai/')
        .post(updateInfluencerDetai);
    router.route('/getInfluencerDetail/:user_id')
        .get(getInfluencerDetail);
            

         
    router.route('/uploadInfluencerBanner')
        .post(uploadInfluencerBanner);  
    router.route('/getInfluencerList')
        .get(getInfluencerList);
    router.route('/addInfluencerCategory')
        .post(addInfluencerCategory);
    
    router.route('/storelistCat')
        .post(storelistCat); 
    router.route('/categoryStoreCount')
        .get(categoryStoreCount); 
    router.route('/saveMyfavoriteStore')
        .post(saveMyfavoriteStore);  

    router.route('/getRequestList/:user_id')
        .get(getRequestList);
    router.route('/delSupportRequest/:user_id')
        .get(delSupportRequest);    

    router.route('/sendInfluencerRequest')
        .post(addInfluencerRequest);  
    router.route('/getInfluencerRequest/:user_id')
        .get(getInfluencerRequest);
    router.route('/searchInfluencerList/:searchStr')
        .get(searchInfluencerList);    
    router.route('/cancelInfluencerRequest/:request_id')
        .get(cancelInfluencerRequest); 
    router.route('/acceptRequestByInfluencer/:request_id')
        .get(acceptRequestByInfluencer);
    router.route('/merchantCancelInfluRequest/:broadcast_id')
        .get(merchantCancelInfluRequest);          

        
}
function acceptRequestByInfluencer(req,res) {
  let arg = req.params;
  console.log('acceptRequestByInfluencer',arg)
   if (!arg.request_id || arg.request_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
  userService.acceptRequestByInfluencer(arg).then((data) => {
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
function merchantCancelInfluRequest(req,res) {
  let arg = req.params;
  console.log('searchInfluencerList',arg)
   if (!arg.broadcast_id || arg.broadcast_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
  userService.merchantCancelInfluRequest(arg).then((data) => {
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
function cancelInfluencerRequest(req,res) {
  let arg = req.params;
  console.log('searchInfluencerList',arg)
   if (!arg.request_id || arg.request_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
  userService.cancelInfluencerRequest(arg).then((data) => {
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
function searchInfluencerList(req,res) {
  let arg = req.params;
  console.log('searchInfluencerList',arg)
   if (!arg.searchStr || arg.searchStr=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
  userService.searchInfluencerList(arg).then((data) => {
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
function addInfluencerRequest(req,res) {
  let arg = req.body;
  console.log('addInfluencerRequest',arg)
   if (!arg.user_id || arg.user_id=='' || !arg.influencer_id || arg.influencer_id=='' || !arg.broadcast_id || arg.broadcast_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
  userService.addInfluencerRequest(arg).then((data) => {
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
function getInfluencerRequest(req,res) {
  let arg = req.params;
  console.log('getRequestList',arg)
   if (!arg.user_id || arg.user_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
  userService.getInfluencerRequest(arg).then((data) => {
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
function delSupportRequest(req,res) {
  let arg = req.params;
  console.log('getRequestList',arg)
   if (!arg.user_id || arg.user_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.delSupportRequest(arg).then((data) => {
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
function getRequestList(req,res) {
  let arg = req.params;
  console.log('getRequestList',arg)
   if (!arg.user_id || arg.user_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.getRequestList(arg).then((data) => {
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

function saveMyfavoriteStore(req,res) {
  let arg = req.body;
  console.log('saveMyfavoriteStore---',arg);
   if (!arg.user_id || arg.user_id=='' || !arg.store_id || arg.store_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  userService.saveMyfavoriteStore(arg).then((data) => {
      res.send(data);
      
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       res.json(err);
       
    });
}
function storelistCat(req,res) {
  let arg = req.body;
  console.log('storelistCat---',arg);
  // if (!arg.user_id || arg.user_id=='') {
  //   return res.json({
  //      "success":false,
  //      "data":"User detail required"
  //    });
  // }
  userService.storelistCat(arg).then((data) => {
      res.send(data);
      
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       res.json(err);
       
    });
}

function categoryStoreCount(req,res) {
  let arg = req.body;
  console.log('categoryStoreCount---',arg);
  userService.categoryStoreCount(arg).then((data) => {
      res.send(data);
      
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       res.json(err);
       
    });
}

function addInfluencerCategory(req,res) {
  let arg = req.body;
  console.log('addInfluencerCategory---',arg);
   if (!arg.user_id || arg.user_id=='' || !arg.category || arg.category=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  userService.addInfluencerCategory(arg).then((data) => {
      res.send(data);
      
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       res.json(err);
       
    });
}
function getInfluencerList(req,res) {
  let arg = req.params;
  userService.getInfluencerList(arg).then((data) => {
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
function uploadInfluencerBanner(req,res) {
  let uploadPath;
  var reqData=req.body;
 console.log(req.body);
  //console.log(req.files);
  if (!reqData.user_id || reqData.user_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
 
    if (reqData.banner_image) {
      var base64Data = reqData.banner_image.replace(/^data:image\/png;base64,/, "");

      logoName ='upload/'+ new Date().getTime()+'_bannerImage.png';
      uploadPath ='/var/www/html/lash/'+logoName;

      require("fs").writeFile(uploadPath, base64Data, 'base64', function(err) {
        console.log('base64Img>>>>>',err)
        if (err) {
          return res.json({
             "success":false,
             "message":"Uploaded file error"
           });
        }
      });

      reqData['banner']=logoName;
      userService.uploadInfluencerBanner(reqData).then((data) => {
        if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
      });
    }else{
      return res.json({
         "success":false,
         "data":"Please upload the image"
       });
    }
  //});
}
function getInfluencerDetail(req,res) {
  let arg = req.params;
  console.log('updateInfluencerDetai',arg)
   if (!arg.user_id || arg.user_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.getInfluencerDetail(arg).then((data) => {
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



function updateInfluencerDetai(req,res) {
  let arg = req.body;
  console.log('updateInfluencerDetai',arg)
   if (!arg.user_id || arg.user_id=='' || !arg.designation || arg.designation=='' || !arg.social_link || arg.social_link=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.updateInfluencerDetai(arg).then((data) => {
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

function sendPushNitification(req,res) {
  let arg = req.body;
  console.log('sendPushNitification',arg)
   if (!arg.user_id || arg.user_id=='' || !arg.send_to || arg.send_to=='' || !arg.msg_type || arg.msg_type=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.sendPushNitification(arg).then((data) => {
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

function updateUserdeviceInfo(req,res) {
  let arg = req.body;
  console.log('updateUserdeviceInfo',arg)
   if (!arg.user_id || arg.user_id==''|| !arg.device_token || arg.device_token=='' ) {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.updateUserdeviceInfo(arg).then((data) => {
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
function getRecommendationList(req,res) {
  let arg = req.params;
  console.log('getRecommendationList',arg)
   if (!arg.user_id || arg.user_id=='' ) {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.getRecommendationList(arg).then((data) => {
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

function supportRequest(req,res) {
  let arg = req.body;
   if (!arg.user_id || arg.user_id=='' || !arg.start_date || arg.start_date=='' || !arg.end_date || arg.end_date=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.supportRequest(arg).then((data) => {
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
/*function updateUserType(req,res) {
  let arg = req.body;
   if (!arg.user_id || arg.user_id=='' || !arg.email || arg.email=='' || !arg.first_name || arg.first_name=='' || !arg.timeslot || arg.timeslot=='' || !arg.schedule_date || arg.schedule_date=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.updateUserType(arg).then((data) => {
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
}*/
function gettimeslot(req,res) {    
  userService.gettimeslot().then((data) => {
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

function updateUserType(req,res) {
  let arg = req.body;
  console.log('updateUserType---------', arg);
   if (!arg.user_id || arg.user_id=='' || !arg.user_type || arg.user_type=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.updateUserType(arg).then((data) => {
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
function getInterestList(req,res) {    
  userService.getInterestList().then((data) => {
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

function userInterest(req,res) {
  let arg = req.body;
   if (!arg.user_id || arg.user_id=='' || !arg.tags || arg.tags=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.userInterest(arg).then((data) => {
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

function getUserInterest(req,res) {
  let arg = req.params;
   if (!arg.user_id || arg.user_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.getUserInterest(arg).then((data) => {
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

function followingsStoreList(req,res) {
  let arg = req.params;
   if (!arg.user_id || arg.user_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.followingsStoreList(arg).then((data) => {
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
function getPaymentGateway(req,res) {
  let arg = req.params;
   if (!arg.user_id || arg.user_id=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.getPaymentGateway(arg).then((data) => {
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
function saveGatewayDetails(req,res) {
  let arg = req.body;
   if (!arg.user_id || arg.user_id=='' || !arg.payment_gateway || arg.payment_gateway=='' || !arg.public_key || arg.public_key=='' ) {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.saveGatewayDetails(arg).then((data) => {
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


function addEditfollower(req,res) {
  let arg = req.body;
  if (!arg.store_id || arg.store_id=='' ) {
      return res.json({
         "success":false,
         "body":"",
         "message":"store_id field required"
       });
   }
   if (!arg.user_id || arg.user_id=='' || !arg.follow_by_id || arg.follow_by_id=='' ) {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.addEditfollower(arg).then((data) => {
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
function getAllUsers(req,res) {
  var arg=req.query;
  userService.getAllUser(arg).then((data) => {
      ///res.send(data);
      if(data) {
        res.json({
          "success":true,
          "data":data
        });
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json({
          "success":false,
          "data":err
        });
    });
}

function getUserById(req,res) {

  let userId = req.params;

  var json_format = iValidator.json_schema(schema.getSchema,userId,"user");
  if (json_format.valid == false) {
    return res.status(422).send(json_format.errorMessage);
  }

  userService.getUserById(userId).then((data) => {
      if(data) {
        res.json({
          "success":true,
          "data":data
        });
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json({
        "success":false,
        "data":err
      });
      
    });
}

function addUser(req,res) {
  var userData=req.body;
  //Validating the input entity
  console.log('addUser',userData);
   var json_format = iValidator.json_schema(schema.postSchema, userData, "user");
   if (json_format.valid == false) {
     return res.status(422).send(json_format.errorMessage);
   }

  userService.addUser(userData).then((data) => {
    res.json(data);
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}


function updateUser(req,res) {
   var userData=req.body;
   var id = req.params.id;
   userService.updateUser(id,userData).then((data)=>{
      res.json(data);
  }).catch((err)=>{
      //mail.mail(err);
      res.json(err);
   });
}
function updateUserStatus(req,res) {
    var getdata = req.params
   if (!getdata['id'] || !getdata['id']!=''   ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"",
         "message":"UserID is required"
       });
   }
   userService.updateUserStatus(getdata.id).then((data)=>{
      res.json({
          "success":true,
          "data":data,
          "message":"Status updated successfully"
        });
  }).catch((err)=>{
      //mail.mail(err);
      res.json({
          "success":false,
          "data":err,
          "message":"!!Error"
        });
   });
}


function deleteUser(req,res) {
  var delId = req.params.user_id;
  userService.deleteUser(delId).then((data)=>{
    if(data) {
        res.json({
          "success":true,
          "body":data,
          "message":"User deleted successfully"
        });
      }
  }).catch((err)=>{
     // mail.mail(err);
     
      res.json({
        "success":false,
        "data":err,
        "message":"!Error"
      });
      
  });
}

function changePassword(req,res) {
  var postdata=req.body;
  
  //Validating the input entity
   if (!postdata['confPassword'] || !postdata['password'] || !postdata['user_id']|| postdata['confPassword']=="" || postdata['password']=="" || postdata['user_id']==""  ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All field is required",
         "message":"All field is required"
       });
   }
   console.log(postdata);
   userService.changePassword(postdata).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function changeEmail(req,res) {
  var postdata=req.body;
  
  //Validating the input entity
   if(!postdata['confemail'] || !postdata['email'] || !postdata['user_id']|| postdata['confemail']=="" || postdata['email']=="" || postdata['user_id']==""  ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All field is required",
         "message":"All field is required"
      });
   }
   console.log(postdata);
   
  if (validator.validate(postdata['confemail'])) {
      console.log(postdata);
       userService.changeEmail(postdata).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
      });
    }else{
      return res.json({
         "success":false,
         "data":"",
         "message":"Invalid email address"
       });
   }

}

function changeProfilePic(req,res) {
  var postdata=req.body;
  //console.log('body',postdata);
  //console.log('files',req.files);
  //Validating the input entity
   if(!postdata['user_id'] || postdata['user_id']==""  ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"",
         "message":"user_id is required"
      });
   }
      postdata.profile_pic='';
      if (req.files) {
        let getFile = req.files.profile_pic;//mimetype
        var ext=path.extname(getFile['name']);
        var filename= Date.now()+'_'+postdata.user_id+ext;
        var fileData =getFile['data']; 
        s3bucket.createBucket(function () {
             var params = {
              Bucket: BUCKET_NAME+"/sixprofit/uploaded_media/"+postdata.user_id,
              Key: filename,
              ACL: 'public-read',
              Body:fileData,

             };
            s3bucket.upload(params, function (err, data) {
                if (err) {
                 console.log('error in callback');
                 console.log(err);
                }
              postdata.profile_pic=data.Location;
              userService.changeProfilePic(postdata).then((data) => {
                if(data) {
                  res.json(data);
                }
              }).catch((err) => {
                //mail.mail(err);
                res.json(err);
              });  
            });
       });
    }else{
      return res.json({
       "success":false,
       "data":"",
       "message":"Please upload the profie picture"
      });  
    }
    

}
function updatePersonalDetail(req,res) {
  var postdata=req.body;
  
  //Validating the input entity
   if(!postdata['first_name'] || !postdata['dob'] || !postdata['country']||  postdata['first_name']==""  || postdata['dob']=="" ||  postdata['country']=="" ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All field is required",
         "message":"All field is required"
      });
   }
   console.log(postdata);  
      userService.updatePersonalDetail(postdata).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
      });
    

}
function twoFactAuthEnable(req,res) {
  var postdata=req.body;
  
  //Validating the input entity
   if(!postdata['user_id'] || postdata['user_id']=="" ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":[],
         "message":"user detail is required"
      });
   }
   console.log(postdata);  
      userService.twoFactAuthEnable(postdata).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
      });
    

}

function twoFactAuthVerify(req,res) {
  var postdata=req.body;
  
  //Validating the input entity
   if(!postdata['user_id'] || !postdata['authcode']  || postdata['user_id']==""  || postdata['authcode']=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":[],
         "message":"All Fields Required"
      });
   }
   console.log(postdata);  
      userService.twoFactAuthVerify(postdata).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
      });
    

}
function twoFactAuthDisable(req,res) {
  var postdata=req.body;
  
  //Validating the input entity
   if(!postdata['user_id'] || !postdata['authcode']  || postdata['user_id']==""  || postdata['authcode']=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":[],
         "message":"All Fields Required"
      });
   }
   console.log(postdata);  
      userService.twoFactAuthDisable(postdata).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
      });
    

}
 
 function questionList(req,res) {
  var postdata=req.params; 
  userService.questionList(postdata).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });   
} 
function myQuestion(req,res) {
  var postdata=req.params;
  if(!postdata['user_id'] || postdata['user_id']=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":[],
         "message":"All Fields Required"
      });
  } 
  userService.myQuestion(postdata).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });   
} 

function myQuesAns(req,res) {
  var postdata=req.body; 
  //Validating the input entity
   if(!postdata['user_id'] || !postdata['question_id'] || !postdata['ans'] || postdata['ans']=="" || postdata['user_id']=="" || postdata['question_id']=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":[],
         "message":"All Fields Required"
      });
   }
  userService.myQuesAns(postdata).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });   
} 
function verifySecurityQues(req,res) {
  var postdata=req.body; 
  //Validating the input entity
   if(!postdata['user_id'] || !postdata['question_id'] || !postdata['ans'] || postdata['ans']=="" || postdata['user_id']=="" || postdata['question_id']=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":[],
         "message":"All Fields Required"
      });
   }
  userService.verifySecurityQues(postdata).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });   
} 
function SecQuestiondisable(req,res) {
  var postdata=req.params; 
  //Validating the input entity
   if(!postdata['user_id']  || postdata['user_id']=="" ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":[],
         "message":"All Fields Required"
      });
   }
  userService.SecQuestiondisable(postdata).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });   
} 
function createExcel(req,res) {
  var postdata=req.body; 
  userService.createExcel(postdata).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });   
} 


module.exports.init = init;



