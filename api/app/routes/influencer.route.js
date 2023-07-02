const influService = require('../services/influencer.service');

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
const BUCKET_NAME = '';

 let s3bucket = new AWS.S3({
       accessKeyId: USER_KEY,
       secretAccessKey: USER_SECRET,
       Bucket: BUCKET_NAME,
     });
function influencer(router) {
    router.route('/getInflueStoredStreaming/:user_id/:start?/:limit?')
        .get(getInflueStoredStreaming)
    router.route('/getInfluencerStreaming/:user_id/:start?/:limit?')
        .get(getInfluencerStreaming);
    router.route('/getInfluencerStreamingDetails/:user_id/:stream_id')
        .get(getInfluencerStreamingDetails);    


}
function getInfluencerStreamingDetails(req,res) {
	     console.log('getInfluencerStreamingDetails',postdata);

  var postdata=req.params; 
  if (!postdata.user_id || postdata.user_id=='' || !postdata.stream_id || postdata.stream_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
 
  influService.getInfluencerStreamingDetails(postdata).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });   
} 
function getInfluencerStreaming(req,res) {
	     console.log('getInfluencerStreaming',postdata);

  var postdata=req.params; 
  if (!postdata.user_id || postdata.user_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
 
  influService.getInfluencerStreaming(postdata).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });   
} 
function getInflueStoredStreaming(req,res) {
  var postdata=req.params; 
       console.log('getInflueStoredStreaming',postdata);

  if (!postdata.user_id || postdata.user_id=='') {
      return res.json({
         "success":false,
         "data":"User detail required"
       });
    }
 
  influService.getInflueStoredStreaming(postdata).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });   
} 


module.exports.influencer = influencer;
