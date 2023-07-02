const authenticService = require('../services/authentic.service');
const adminapiService = require('../services/adminapi.service');

var schema = require('../schema/loginValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');
const broadcastService = require('../services/broadcast.service');

const userService = require('../services/user.service');

var fs = require('fs');
var path = require('path');

const jwt = require('jsonwebtoken');
var base64Img = require('base64-img');

var CryptoJS = require("crypto-js");
const secretKey="!_@_fori_market_place_@_!"; 

function init(router) {
    router.route('/login')
        .post(authentic); 
    router.route('/signup')
          .post(signup); 
    router.route('/country')
        .get(country);
    router.route('/forgotPassword')
        .post(forgotPassword);     
    router.route('/resetPassword')
        .post(resetPassword); 
    router.route('/confirmation')
        .post(confirmation);         
    router.route('/addressCallback')
        .post(addressCallback);
    router.route('/addressCallback')
        .get(addressCallback);
    router.route('/emailVerify')
        .post(emailVerify);    
    router.route('/GetUsersMlm')
        .get(GetUsersMlm);                 
    router.route('/uploadchanelLogo')
        .post(uploadchanelLogo); 
    router.route('/changeProfilePic')
        .post(changeProfilePic);
    router.route('/getsteamingList')
        .get(getsteamingList)  
    router.route('/uploadCoverImg')
        .post(uploadCoverImg); 
    router.route('/myChannel/:channel_name/:user_id?')
        .get(myChannel);
    router.route('/popularChannels')
        .get(popularChannels);
    router.route('/sociallogin')
        .post(sociallogin); 
    router.route('/getAllSreamingChannel/:start?/:limit?')
        .get(getAllSreamingChannel);
    router.route('/getAllChannel/:start?/:limit?')
        .get(getAllChannel);      
    router.route('/publicBroadcastingDetails/:broadcast_id')
        .get(publicBroadcastingDetails);
    router.route('/globalSearch/:searchStr?')
        .get(globalSearch);      
    router.route('/publicBroadcastingContentDetails/:broadcast_id')
        .get(publicBroadcastingContentDetails);    
    router.route('/recentSales')
        .get(recentSales);    
                      
    router.route('/addBankDetail/')
        .post(addBankDetail); 

    router.route('/getInfluencerProfileDetail/:username')
        .get(getInfluencerProfileDetail); 
  router.route('/influencerDetail/')
        .post(influencerDetail);               

}


function influencerDetail(req,res) {
 // console.log(req);
  let reqData = req.body;
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
    var arg=decryptedData;
  console.log('influencerDetail',arg)
   if (!arg.user_id || arg.user_id=='' || !arg.designation || arg.designation=='' || !arg.fb_link || arg.fb_link=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
  arg['welcome_video']="";
  if (req.files ) {
    

  let chanellogo = req.files.welcome_video;
    logoName ='upload/'+ new Date().getTime()+'_'+chanellogo.name;
    uploadPath ='/var/www/html/lash/'+logoName;
    console.log(uploadPath,uploadPath);
    chanellogo.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
      arg['welcome_video']=logoName;

      userService.influencerDetail(arg).then((data) => {
        res.send(data);
        // res.json({
        //     "success":true,
        //     "data":data,
        //     "message":"Success"
        //   });
      }).catch((err) => {
        //mail.mail(err);
         console.log('err',err);
         //res.send(err);
         res.json({
           "success":false,
           "message":err
         });
      });
    });
   }else{
      userService.influencerDetail(arg).then((data) => {
        res.send(data);
        // res.json({
        //     "success":true,
        //     "data":data,
        //     "message":"Success"
        //   });
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

function getInfluencerProfileDetail(req,res) {
  let arg = req.params;
  console.log('getInfluencerProfileDetail',arg)
   if (!arg.username || arg.username=='') {
      return res.json({
         "success":false,
         "body":"",
         "message":"All field required"
       });
   }
    
  userService.getInfluencerProfileDetail(arg).then((data) => {
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
function addBankDetail(req,res) {
  var reqData=req.body;
     // console.log('addBankDetail',req)
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
    arg['business_doc']="";

    if (req.files) { //|| Object.keys(req.files).length === 0
        console.log("File missing")
      //  return res.status(400).send('No files were uploaded.');
      let chanellogo = req.files.business_doc;
      logoName ='upload/doc/'+ new Date().getTime()+'_'+chanellogo.name;
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
    }else{
      adminapiService.addBankDetail(arg).then((data) => {
         res.json(data);
        }).catch((err) => {
          //mail.mail(err);
           console.log('err',err);
           //res.send(err);
           res.json(err);
        });
    }
}
function recentSales(req,res) {
   
  authenticService.recentSales(req).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json({ "success":false,"body":err});
  });
   
}
function globalSearch(req,res) {
    var req=req.params;
    if (!req.searchStr || req.searchStr=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"Search String required"
       });
    }

  authenticService.globalSearch(req).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json({ "success":false,"body":err});
  });
   
}
function publicBroadcastingContentDetails(req,res) {
    var req=req.params;
    if (!req.broadcast_id || req.broadcast_id=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":json_format.errorMessage
       });
    }

  authenticService.publicBroadcastingContentDetails(req).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json({ "success":false,"body":err});
  });
   
}
function publicBroadcastingDetails(req,res) {
    var req=req.params;
    if (!req.broadcast_id || req.broadcast_id=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":json_format.errorMessage
       });
    }

  authenticService.publicBroadcastingDetails(req).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json({ "success":false,"body":err});
  });
   
}
function getAllChannel(req,res) {
    var req=req.params;

  authenticService.getAllChannel(req).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json({ "success":false,"body":err});
  });
   
}
function getAllSreamingChannel(req,res) {
    var req=req.params;

  authenticService.getAllSreamingChannel(req).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json({ "success":false,"body":err});
  });
   
}

function popularChannels(req,res) {
  broadcastService.popularChannels().then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json({ "success":false,"body":err});
  });
   
}
function sociallogin(req,res) {
  var req=req.body;
  console.log('router',req);
    if (!req.username || req.username=="" || !req.id || req.id=="" || !req.social_type || req.social_type=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":json_format.errorMessage
       });
   }

   authenticService.sociallogin(req).then((data) => {
   if(data) {
      var username = data.username;
      const token = jwt.sign({username},'spnov2019',{ expiresIn: 60*60*24 });
      res.json({
        "success":true,
        "data":data,
        "token":token
      });
    }
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });

}
function myChannel(req,res) {
   var reqData=req.params;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.channel_name || reqData.channel_name=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All details required"
       });
    }

  broadcastService.myChannel(reqData).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json({ "success":false,"body":err});
  });
   
}

function getsteamingList(req,res) {
  authenticService.getsteamingList().then((data) => {
   if(data) {
      res.json({
        "success":true,
        "body":data,
      });
    }
  }).catch((err) => {
   // mail.mail(err);
    res.json({ "success":false,"body":err});
  });
   
}

function authentic(req,res) {
  //var authenticData=req.body;
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
    var authenticData=decryptedData
  console.log('router',authenticData);
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, authenticData, "authentic");
   if (json_format.valid == false) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":json_format.errorMessage
       });
   }

   authenticService.authentic(authenticData).then((data) => {
   if(data) {
      var username = data.username;
      const token = jwt.sign({username},'spnov2019',{ expiresIn: 60*60*24 });
      res.json({
        "success":true,
        "data":data,
        "token":token
      });
    }
  }).catch((err) => {
    mail.mail(err);
    res.json(err);
  });

}

function forgotPassword(req,res) {
  var postdata=req.body;
  
  //Validating the input entity
   if (postdata['email']=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"Email is required"
       });
   }
   console.log(postdata);
   authenticService.forgotPassword(postdata['email']).then((data) => {
   if(data) {
      res.json({
        "success":true,
        "data":[],
        "message":data,
      });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function emailVerify(req,res) {
  var postdata=req.body;
  
  //Validating the input entity
   if (postdata['email']=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"Email is required"
       });
   }
   console.log(postdata);
   authenticService.emailVerify(postdata['email']).then((data) => {
   if(data) {
      res.json({
        "success":true,
        "data":[],
        "message":data,
      });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

function resetPassword(req,res) {
  var postdata=req.body;
  
  //Validating the input entity
   if (!postdata['confPassword'] || !postdata['newPassword'] || !postdata['forgotten_password_code']|| postdata['confPassword']=="" || postdata['newPassword']=="" || postdata['forgotten_password_code']==""  ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All filed is required",
         "message":"All filed is required"
       });
   }
   console.log(postdata);
   authenticService.resetPassword(postdata).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function confirmation(req,res) {
  var postdata=req.body;
  
  //Validating the input entity
   if (!postdata['activation_code'] || !postdata['activation_code']   ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"",
         "message":"Activation code is required"
       });
   }
   console.log(postdata);
   authenticService.confirmation(postdata).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

function signup(req,res) {
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
    signUpData=decryptedData
    //var signUpData=req.body;
  //Validating the input entity
   var json_format = iValidator.json_schema(schema.postSchema, signUpData, "signUpData");
   if (json_format.valid == false) {
     //return res.status(422).send(json_format.errorMessage);
    return res.json({
         "success":false,
         "data":json_format.errorMessage
       });
   }

   authenticService.signup(signUpData).then((data) => {
    if(data) {
       res.json({
         "success":true,
         "data":data
       });
     }
   }).catch((err) => {
     mail.mail(err);
     res.json(err);
   });

}

function country(req,res) {
  authenticService.country().then((data) => {
   if(data) {
      res.json({
        "success":true,
        "data":data,
      });
    }
  }).catch((err) => {
    mail.mail(err);
    res.json({ "success":false,"data":err});
  });
   
}

function addressCallback(req,res) {
  var postdata=req.body;   
   console.log(postdata);
   authenticService.addressCallback(postdata).then((data) => {
   if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

/************05-12-2019******************/
function GetUsersMlm(req,res) {
   /**/
   authenticService.GetUsersMlm().then((data) => {
   if(data) {
      res.json({
        "success":true,
        "data":data,
      });
    }
  }).catch((err) => {
    mail.mail(err);
    res.json({ "success":false,"data":err});
  });

}

function uploadchanelLogo(req,res) {
  let uploadPath;
  var reqData=req.body;
 // console.log(req.params);
  //console.log(req.files);
  if (!reqData.user_id || reqData.user_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  /*if (!req.files || Object.keys(req.files).length === 0) {
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

    */
    if (reqData.cover_image) {
      var base64Data = reqData.cover_image.replace(/^data:image\/png;base64,/, "");

      logoName ='upload/'+ new Date().getTime()+'_channelImage.png';
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

      reqData['chanellogo']=logoName;
      broadcastService.uploadchanelLogo(reqData).then((data) => {
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
function changeProfilePic(req,res) {
  let uploadPath;
  var reqData=req.body;
  console.log(req.params);
  //console.log(req.files);
  if (!reqData.user_id || reqData.user_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
  /*if (!req.files || Object.keys(req.files).length === 0) {
    console.log("File missing")
    return res.status(400).send('No files were uploaded.');
  }

  let profile_pic = req.files.profile_pic;
    ProfilePicpath ='upload/profile/'+ new Date().getTime()+'_'+profile_pic.name;
    uploadPath ='/var/www/html/lash/'+ProfilePicpath;
    console.log(uploadPath,uploadPath);
    profile_pic.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    */
     var base64Data = reqData.profile_pic.replace(/^data:image\/png;base64,/, "");

    logoName ='upload/profile/'+reqData.user_id+'_profile_pic.png';
    uploadPath ='/var/www/html/lash/'+logoName;
    // delete file named  Synchronously
    if (fs.existsSync(uploadPath)) {
      fs.unlinkSync(uploadPath);
      console.log('File deleted!');
    }
    
    require("fs").writeFile(uploadPath, base64Data, 'base64', function(err) {
      console.log('base64Img>>>>>',err)
      if (err) {
        return res.json({
           "success":false,
           "message":"Uploaded file error"
         });
      }
    });

    reqData['profile_pic']=logoName;
    userService.changeProfilePic(reqData).then((data) => {
      if(data) {
        res.json(data);
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });  
  //});
}

function uploadCoverImg(req,res) {
  let uploadPath;
  var reqData=req.body;
  console.log('uploadCoverImg>>>>>>',req.body);
  //console.log(req.files);
  if (!reqData.channel_id || reqData.channel_id=='') {
      return res.json({
         "success":false,
         "message":"channel_id detail required"
       });
    }
    var base64Data = reqData.cover_image.replace(/^data:image\/png;base64,/, "");

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

    reqData['cover_image']=logoName;
    broadcastService.uploadCoverImg(reqData).then((data) => {
      if(data) {
        res.json(data);
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });

    // base64Img.base64(reqData.cover_image,'upload', new Date().getTime()+'_bannerImage.png', function(err, resData) {
    //   console.log('base64Img>>>>>',resData)
    //   var filepathArr= resData.split('/');
    //   var filepath= filepathArr[filepathArr.length-1];
    // })

 /* if (!req.files || Object.keys(req.files).length === 0) {
    console.log("File missing")
    return res.status(400).send('No files were uploaded.');
  }

  let chanellogo = req.files.cover_image;
    logoName ='upload/'+ new Date().getTime()+'_'+chanellogo.name;
    uploadPath ='/var/www/html/lash/'+logoName;
    console.log(uploadPath,uploadPath);
    chanellogo.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
    reqData['cover_image']=logoName;
    broadcastService.uploadCoverImg(reqData).then((data) => {
      if(data) {
        res.json(data);
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });*/
  //});
}
/*****************ENd*************/
module.exports.init = init;



