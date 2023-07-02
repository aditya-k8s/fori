
const chimeService = require('../services/chime.service');
var schema = require('../schema/loginValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


var fs = require('fs');
var path = require('path');

const jwt = require('jsonwebtoken');

function chime(router) {
    router.route('/createMetting')
        .get(createMetting);  
    router.route('/attendeeMetting/:MeetingId?')
        .get(attendeeMetting);
    router.route('/uploadVideo/')
        .post(uploadVideo);  
    router.route('/getbroadcastvideos/:broadcast_id')
        .get(getbroadcastvideos);
    router.route('/deletebroadcastvideos/:id')
        .get(deletebroadcastvideos);   

    router.route('/savetext/')
        .post(savetext);  
    router.route('/gettext/:broadcast_id')
        .get(gettext);
    router.route('/deletetext/:id')
        .get(deletetext);                
            
                   
}

function savetext(req,res) {
  let uploadPath;
  var reqData=req.body;
  console.log('uploadCoverImg>>>>>>',req.body);
  //console.log(req.files);
  if (!reqData.broadcast_id || reqData.broadcast_id=='' || !reqData.text || reqData.text=='') {
      return res.json({
         "success":false,
         "message":"broadcast_id detail required"
       });
    }
    chimeService.savetext(reqData).then((data) => {
      if(data) {
        res.json(data);
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });
  
}
function gettext(req,res) {
  var reqData=req.params;
  console.log('gettext>>>>>>',req.params);
  //console.log(req.files);
  if (!reqData.broadcast_id || reqData.broadcast_id=='') {
      return res.json({
         "success":false,
         "message":"broadcast_id detail required"
       });
    }
    chimeService.gettext(reqData).then((data) => {
      if(data) {
        res.json(data);
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });

}
function deletetext(req,res) {
  var reqData=req.params;
  console.log('deletetext>>>>>>',req.params);
  //console.log(req.files);
  if (!reqData.id || reqData.id=='') {
      return res.json({
         "success":false,
         "message":"broadcast_id detail required"
       });
    }
    chimeService.deletetext(reqData).then((data) => {
      if(data) {
        res.json(data);
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });

}     
function createMetting(req,res) {
  console.log('createMetting',req.params)
     var reqData=req.params;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    chimeService.createMetting(reqData).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
    });
}
function attendeeMetting(req,res) {
  console.log('attendeeMetting',req.params)
     var reqData=req.params;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    chimeService.attendeeMetting(reqData).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
    });
}


function uploadVideo(req,res) {
  let uploadPath;
  var reqData=req.body;
  console.log('uploadCoverImg>>>>>>',req.body);
  //console.log(req.files);
  if (!reqData.broadcast_id || reqData.broadcast_id=='') {
      return res.json({
         "success":false,
         "message":"broadcast_id detail required"
       });
    }
  
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("File missing")
    return res.status(400).send('No files were uploaded.');
  }

  let chanellogo = req.files.video_file;
    var filename ='upload/videos/'+ new Date().getTime()+'_'+chanellogo.name;
    uploadPath ='/var/www/html/lash/'+filename;
    console.log(uploadPath,uploadPath);
    chanellogo.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
    reqData['video_file']=filename;
    chimeService.uploadvideo(reqData).then((data) => {
      if(data) {
        res.json(data);
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });
  });
}
function getbroadcastvideos(req,res) {
  var reqData=req.params;
  console.log('uploadCoverImg>>>>>>',req.params);
  //console.log(req.files);
  if (!reqData.broadcast_id || reqData.broadcast_id=='') {
      return res.json({
         "success":false,
         "message":"broadcast_id detail required"
       });
    }
    chimeService.getbroadcastvideos(reqData).then((data) => {
      if(data) {
        res.json(data);
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });

}
function deletebroadcastvideos(req,res) {
  var reqData=req.params;
  console.log('uploadCoverImg>>>>>>',req.params);
  //console.log(req.files);
  if (!reqData.id || reqData.id=='') {
      return res.json({
         "success":false,
         "message":"broadcast_id detail required"
       });
    }
    chimeService.deletebroadcastvideos(reqData).then((data) => {
      if(data) {
        res.json(data);
      }
    }).catch((err) => {
      //mail.mail(err);
      res.json(err);
    });

}       
module.exports.chime = chime;
