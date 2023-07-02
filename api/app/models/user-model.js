var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const uuid = require('uuidv4').default;
const bcrypt = require('bcrypt');
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');
const excel = require('node-excel-export');

var stripe = require('stripe')('sk_test_cKXLMHtkXrR4E04TEeRZmmLk');

const fs = require('fs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('stripe#KeyAccess2021');
 

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
var userModel = {
  getAllUser:getAllUser,
  addUser:addUser,
  updateUser:updateUser,
  deleteUser:deleteUser,
  getUserById:getUserById,
  updateUserStatus:updateUserStatus,
  changePassword:changePassword,
  changeProfilePic:changeProfilePic,
  updatePersonalDetail:updatePersonalDetail,
  changeEmail:changeEmail,
  twoFactAuthEnable:twoFactAuthEnable,
  twoFactAuthDisable:twoFactAuthDisable,
  twoFactAuthVerify:twoFactAuthVerify,
  questionList:questionList ,
  myQuestion:myQuestion ,
  myQuesAns: myQuesAns,
  verifySecurityQues:  verifySecurityQues,
  SecQuestiondisable: SecQuestiondisable,
  createExcel:createExcel,
  addEditfollower:addEditfollower,
  saveGatewayDetails:saveGatewayDetails,
  getPaymentGateway:getPaymentGateway,
  followingsStoreList:followingsStoreList,
  userInterest:userInterest,
  getUserInterest:getUserInterest,
  getInterestList:getInterestList,
  updateUserType:updateUserType,
  gettimeslot:gettimeslot,
  supportRequest:supportRequest,
  getRecommendationList:getRecommendationList,
  updateUserdeviceInfo:updateUserdeviceInfo,
  sendPushNitification:sendPushNitification,
  influencerDetail: influencerDetail,
  getInfluencerDetail:getInfluencerDetail,
  updateInfluencerDetail:updateInfluencerDetail,
  uploadInfluencerBanner:uploadInfluencerBanner,
  getInfluencerList:getInfluencerList,
  addInfluencerCategory:addInfluencerCategory,
  myFavoriteStore:myFavoriteStore,
  saveMyfavoriteStore:saveMyfavoriteStore,
  categoryStoreCount:categoryStoreCount,
  storelistCat:storelistCat,
  getInfluencerProfileDetail:getInfluencerProfileDetail,
  getRequestList:getRequestList,
  delSupportRequest:delSupportRequest,
  getInfluencerRequest:getInfluencerRequest,
  addInfluencerRequest:addInfluencerRequest,
  searchInfluencerList:searchInfluencerList,
  cancelInfluencerRequest:cancelInfluencerRequest,
  acceptRequestByInfluencer:acceptRequestByInfluencer,
  merchantCancelInfluRequest:merchantCancelInfluRequest


}
function merchantCancelInfluRequest(arg) {
    return new Promise((resolve,reject) => {
      var updateData= {}
      updateData['status'] =3;
      db.query("SELECT id FROM ll_influencer_broadcast_request where broadcast_id=? ",[arg.broadcast_id],(error,rows,fields)=>{
        if(!!error) {
          dbFunc.connectionRelease;
          reject({"success":false,"message":error.code});
        } else { 
          if (rows.length>0) {
            db.query("update ll_influencer_broadcast_request SET ? where broadcast_id=?", [updateData,arg.broadcast_id], function (error, row) {
              if(!!error) {
                  dbFunc.connectionRelease;
                   console.log('error',error);
                  reject({"success":false,"message":error.code});
              }else{            
                resolve({"success":true,"message":"Request cancelled successfully",body:row}); 
              }
            });
          }else{
            resolve({"success":false,"message":"Invalid request_id",body:[]}); 
          }
        }  
      });  
      
  });
}
function acceptRequestByInfluencer(arg) {
    return new Promise((resolve,reject) => {
      var updateData= {}
      updateData['status'] =2;
      db.query("SELECT id,broadcast_id,influencer_id FROM ll_influencer_broadcast_request where id=? ",[arg.request_id],(error,rows,fields)=>{
        if(!!error) {
          dbFunc.connectionRelease;
          reject({"success":false,"message":error.code});
        } else { 
          if (rows.length>0) {
            var broadcast_id=rows[0].broadcast_id;
            var influencer_id=rows[0].influencer_id
            db.query("update ll_influencer_broadcast_request SET status=2 where id=?", [arg.request_id], function (error, row) {
              if(!!error) {
                  dbFunc.connectionRelease;
                   console.log('error',error);
                  reject({"success":false,"message":error.code});
              }else{  
              //SELECT * FROM `ll_product_broadcasting`.`Influencer_id`          
                 db.query("update ll_product_broadcasting SET Influencer_id=? where channel_id=?", [influencer_id,broadcast_id], function (error, row) {
                  if(!!error) {
                      dbFunc.connectionRelease;
                       console.log('error',error);
                      reject({"success":false,"message":error.code});
                  }
                });
                resolve({"success":true,"message":"Request accepted successfully",body:row}); 
              }
            });
          }else{
            resolve({"success":false,"message":"Invalid request_id",body:[]}); 
          }
        }  
      });  
      
  });
}
function cancelInfluencerRequest(arg) {
    return new Promise((resolve,reject) => {
      var updateData= {}
      updateData['status'] =1;
      db.query("SELECT id FROM ll_influencer_broadcast_request where id=? ",[arg.request_id],(error,rows,fields)=>{
        if(!!error) {
          dbFunc.connectionRelease;
          reject({"success":false,"message":error.code});
        } else { 
          if (rows.length>0) {
            db.query("update ll_influencer_broadcast_request SET status=1 where id=?", [arg.request_id], function (error, row) {
              if(!!error) {
                  dbFunc.connectionRelease;
                   console.log('error',error);
                  reject({"success":false,"message":error.code});
              }else{            
                resolve({"success":true,"message":"Request cancelled successfully",body:row}); 
              }
            });
          }else{
            resolve({"success":false,"message":"Invalid request_id",body:[]}); 
          }
        }  
      });  
      
  });
}
function searchInfluencerList(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT ll_users.user_id, ll_users.username,ll_users.first_name,ll_users.last_name,ll_users.profile_pic FROM ll_users,ll_user_influencer WHERE ll_users.user_id=ll_user_influencer.user_id and ll_users.isDelete='0' and (ll_users.username like '%"+arg.searchStr+"%' or ll_users.first_name like '%"+arg.searchStr+"%' or ll_users.last_name like '%"+arg.searchStr+"%' or ll_users.email like '%"+arg.searchStr+"%')",(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject ({"success":false,"message":error.code});
          } else {
            if(rows.length>0){              
              resolve({"success":true,"message":"Success",body:rows});
 
            }else{  
              reject ({"success":false,"message":"No record found"});

            }
          }
       }); 
    })
}
function getInfluencerRequest(arg) {
    return new Promise((resolve,reject) => {
      console.log('ll_influencer_broadcast_request',arg);
        db.query("SELECT ll_influencer_broadcast_request.id as request_id,ll_influencer_broadcast_request.*,ll_product_broadcasting.*  FROM ll_influencer_broadcast_request,ll_product_broadcasting  where ll_product_broadcasting.channel_id=ll_influencer_broadcast_request.broadcast_id and   ll_influencer_broadcast_request.influencer_id=? and ll_influencer_broadcast_request.status=0 order by ll_influencer_broadcast_request.id desc",[arg.user_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              console.log(error)
              reject({"success":false,"message":error.code});
            } else {  
                resolve({"success":true,"message":"success",body:rows});
            }
            
        });
    });
    
}
function addInfluencerRequest(arg) {
    return new Promise((resolve,reject) => {
      var updateData= {}
      updateData['influencer_id'] =arg.influencer_id
      updateData['user_id'] =arg.user_id
      updateData['broadcast_id'] =arg.broadcast_id
      db.query("SELECT id FROM ll_influencer_broadcast_request where user_id=? and broadcast_id=? and status=0 ",[arg.user_id,arg.broadcast_id],(error,rows,fields)=>{
        if(!!error) {
          dbFunc.connectionRelease;
          reject({"success":false,"message":error.code});
        } else { 
          if (rows.length<=0) {
            db.query("INSERT ll_influencer_broadcast_request SET ?", [updateData], function (error, row) {
              if(!!error) {
                  dbFunc.connectionRelease;
                   console.log('error',error);
                  reject({"success":false,"message":error.code});
              }else{            
                resolve({"success":true,"message":"Request sent successfully",body:row}); 
              }
            });
          }else{
            resolve({"success":true,"message":"Request already sent",body:[]}); 
          }
        }  
      });  
      
  });
}
function storelistCat(arg) {
    return new Promise((resolve,reject) => {
      var category='';//ll_users_channels.category  
      var user_id=" and ll_favorite_store.status=0 ";
      if (arg.category) {
        var catArr=[]
        var cat = arg.category;
        if (cat.length>0) {
            for(var i=0;i<cat.length;i++){
                console.log(cat[i]);
                //catArr.push(cat[i]);
             var OR='';
              if (i<=cat.length-2) {
                OR='or';
              }  
              category+=' FIND_IN_SET('+cat[i]+', ll_users_channels.category )  '+OR;
            }
            //catArr=catArr.toString();
            category=" where "+category;//"ll_users_channels.category IN ("+catArr+")";
          }

        }
        if (arg.user_id) {
          user_id=" and ll_favorite_store.status=0  and  ll_favorite_store.user_id='"+arg.user_id+"'";

        }
        //console.log('category------',category,'user_id------',user_id);
        //console.log("SELECT ll_users_channels.*,(SELECT COUNT(id) FROM ll_favorite_store WHERE ll_favorite_store.store_id=ll_users_channels.id "+user_id+") as isFav  FROM `ll_main_category`,ll_users_channels "+category+" GROUP by ll_users_channels.id")
       db.query("SELECT ll_users_channels.*,(SELECT COUNT(id) FROM ll_favorite_store WHERE ll_favorite_store.store_id=ll_users_channels.id "+user_id+") as isFav  FROM `ll_main_category`,ll_users_channels "+category+" GROUP by ll_users_channels.id",(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              console.log(error)
              reject ({"success":false,"message":error.code});
          } else {
            if(rows.length>0){              
              resolve({"success":true,"message":"Success",body:rows});
 
            }else{
              reject ({"success":false,"message":"No record found"});

            }
          }
       }); 
    })
}
function categoryStoreCount(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT ll_main_category.id,ll_main_category.category_name,COUNT(ll_users_channels.id) as channelcount FROM `ll_main_category` left JOIN ll_users_channels on FIND_IN_SET(ll_main_category.id,ll_users_channels.category) where ll_main_category.status=0 GROUP by ll_main_category.id",(error,rows,fields)=>{
          if(!!error) {
            dbFunc.connectionRelease;
            reject ({"success":false,"message":error.code});
          } else {
            if(rows.length>0){              
              resolve({"success":true,"message":"Success",body:rows});
            }else{
              reject ({"success":false,"message":"No record found"});
            }
          }
       }); 
    })
}
function myFavoriteStore(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT ll_users_channels.* FROM ll_users_channels,ll_favorite_store WHERE ll_users_channels.id=ll_favorite_store.store_id and ll_favorite_store.status=0 and ll_favorite_store.user_id=?",[arg.user_id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject ({"success":false,"message":error.code});
          } else {
            if(rows.length>0){              
              resolve({"success":true,"message":"Success",body:rows});
 
            }else{
              reject ({"success":false,"message":"No record found"});

            }
          }
       }); 
    })
}
function saveMyfavoriteStore(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT * FROM ll_favorite_store WHERE user_id=? and store_id=?",[arg.user_id,arg.store_id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject(error);
          } else {
            if(rows.length<=0){
              reData= {}
              //`user_id`, `designation`, `following_size`, `social_link`, `banner`, `category`, `subcategory`,
              reData['user_id']=arg.user_id
              reData['store_id']=arg.store_id
              db.query("INSERT INTO ll_favorite_store set ?",[reData], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     console.log(err);
                     reject ({"success":false,"message":err.code});
                    }
                  resolve({"success":true,"message":"Details added successfully",body:rows});


                }); 
            }else{
              var status=0;
              if (rows[0].status==0) {
                status=1;
              }
              reData= {}
              //`user_id`, `designation`, `following_size`, `social_link`, `banner`, `category`, `subcategory`,
              reData['user_id']=arg.user_id
              reData['store_id']=arg.store_id
              reData['status']=status
              db.query("UPDATE ll_favorite_store set ? where user_id=?",[reData,arg.user_id], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     console.log(err);
                     reject ({"success":false,"message":err.code});
                    }
                  resolve({"success":true,"message":"Details updated successfully",body:rows});


                }); 
            }
          }
       }); 
    })
}

function getInfluencerList(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT * FROM ll_users,ll_user_influencer WHERE ll_users.user_id=ll_user_influencer.user_id and ll_users.isDelete='0'",(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject ({"success":false,"message":error.code});
          } else {
            if(rows.length>0){              
              resolve({"success":true,"message":"Success",body:rows});
 
            }else{  
              reject ({"success":false,"message":"No record found"});

            }
          }
       }); 
    })
}
function addInfluencerCategory(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT * FROM ll_user_influencer WHERE user_id=?",[arg.user_id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject(error);
          } else {
            if(rows.length<=0){
              var catArr=[]
              var cat = arg.category;
                for(var i=0;i<cat.length;i++){
                    console.log(cat[i]);
                    catArr.push(cat[i]);
                }
                catArr=catArr.toString();
                catArr=catArr;

                console.log(catArr);
              reData= {}
              //`user_id`, `designation`, `following_size`, `social_link`, `banner`, `category`, `subcategory`,
              reData['user_id']=arg.user_id;
              reData['category']=catArr;
              reData['subcategory']=arg.subcategory
              db.query("INSERT INTO ll_user_influencer set ?",[reData], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     console.log(err);
                     reject ({"success":false,"message":err.code});
                    }
                  resolve({"success":true,"message":"Category saved successfully",body:rows});


                }); 
            }else{
              var catArr=[]
              var cat = arg.category;
                for(var i=0;i<cat.length;i++){
                    console.log(cat[i]);
                    catArr.push(cat[i]);
                }
                catArr=catArr.toString();
                  catArr=catArr;

                console.log(catArr);
              reData= {}
              //`user_id`,sfddsfd yrytytyt fff rrr `designation`, `following_size`, `social_link`, `banner`, `category`, `subcategory`,
              reData['user_id']=arg.user_id
              reData['category']=catArr
              reData['subcategory']=arg.subcategory
              db.query("UPDATE ll_user_influencer set ? where user_id=?",[reData,arg.user_id], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     console.log(err);
                     reject ({"success":false,"message":err.code});
                    }
                  resolve({"success":true,"message":"Category updated successfully",body:rows});


                }); 
            }
          }
       }); 
    })
}
function sendPushNitification(arg) {
  // body... send to id, messge type send_by
  var request = require('request');

var admin = require("firebase-admin");

var serviceAccount = require("./fori-302810-firebase-adminsdk-hrh41-93c2439e2b.json");
if (!admin.apps.length) {

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
}

   return new Promise((resolve,reject) => {

  var headers = {
      'Authorization': 'key=AAAADjHLmj0:APA91bFAvCqOgf857J59HdYZUM5VJ9FkAQjUS1WW32a4jX3Vtenxhr_lHsmGG8kC5nfXiqPLCeLMEfAtBFOA2umPXhPcqcssPBWmjx0it9xkNQBUzdfXrNf5FL4B0ubTzDojoeiFa2Jp',
      'Content-Type': 'application/json'
  };
  db.query("SELECT device_token, (Select username from ll_users where user_id=?) as username FROM ll_users WHERE user_id=? and device_token!=''",[arg.user_id,arg.send_to],(error,rows,fields)=>{
    if(!!error) {
        dbFunc.connectionRelease;
        reject(error);
    } else {
      if(rows.length>0){
        var device_token=rows[0].device_token;
        var username=rows[0].username;
        var msgArr=[{"title": username+ " Join", "body": username+ " join the broadcast"},
                    {"title":  username+ " - New Order", "body": username+ " purchase the product"},
                    {"title": "Share the Broadcast", "body": "testing notification channel"},
                    {"title": "New Join", "body": "testing notification channel"}]
        var notif= msgArr[0];
        if (arg.msg_type=='newjoin') {
          notif= msgArr[0];     
        }
        if (arg.msg_type=='newpurchase') {
          notif= msgArr[1];     
        }  
        if (arg.msg_type=='shared') {
          notif= msgArr[2];     
        }              
         console.log('notif---',notif,'device_token',device_token);
        /*var dataString = { "notification":notif,"to" : device_token};
        console.log('dataString---',dataString);
        var options = {
            url: 'https://fcm.googleapis.com/fcm/send',
            method: 'POST',
            headers: headers,
            json: dataString
        };

        request(options, function (error, response, body) {
              //if (!error && response.statusCode == 200) {
                console.log('carbonClickPayment----erorr-?',error)
               // console.log('carbonClickPayment----respose-?',response)
                console.log('carbonClickPayment-----?',body) // Print the shortened url.
                resolve({"success":true,'data':body,"message":"Success"});

              //}
        });*/
      var payload = {
        notification:notif
      };

       var options = {
        priority: "high",
      };
      admin.messaging().sendToDevice(device_token, payload, options)
      .then(function(response) {
      console.log("Successfully sent message:", response);
                  resolve({"success":true,'data':response,"message":"Success"});

      })
      .catch(function(error) {
      console.log("Error sending message:", error);
                  resolve({"success":true,'data':error,"message":"Success"});

      });
        /*var options = { 
          method: 'POST',
          url: 'https://fcm.googleapis.com/fcm/send',
        headers:
        { 
        'content-type': 'application/json',
        authorization: 'key=AAAADjHLmj0:APA91bFAvCqOgf857J59HdYZUM5VJ9FkAQjUS1WW32a4jX3Vtenxhr_lHsmGG8kC5nfXiqPLCeLMEfAtBFOA2umPXhPcqcssPBWmjx0it9xkNQBUzdfXrNf5FL4B0ubTzDojoeiFa2Jp' },
        body:
        { "notification": notif,
        "to":  device_token,priority: 'high'},
        json: true };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

            console.log('sendPushNitification-----',body) // Print the shortened url.
            resolve({"success":true,'data':body,"message":"Success"});
        });*/
      }
    }    

})
});

}
//influencerDetail
function influencerDetail(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT id FROM ll_user_influencer WHERE user_id=?",[arg.user_id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject(error);
          } else {
            if(rows.length<=0){
              
              reData= {}
              //`user_id`, `designation`, `following_size`, `social_link`, `banner`, `category`, `subcategory`,
              reData['user_id']=arg.user_id
              reData['designation']=arg.designation
              reData['following_size']=arg.following_size
              reData['insta_link']=arg.insta_link
              reData['fb_link']=arg.fb_link
              reData['welcome_video']=arg.welcome_video
              db.query("INSERT INTO ll_user_influencer set ?",[reData], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     console.log(err);
                     reject ({"success":false,"message":err.code});
                    }
                  resolve({"success":true,"message":"Profile information saved successfully",body:rows});


                }); 
            }else{
              reData= {}
              //`user_id`, `designation`, `following_size`, `social_link`, `banner`, `category`, `subcategory`,
              reData['user_id']=arg.user_id
              reData['designation']=arg.designation
              reData['following_size']=arg.following_size
              reData['insta_link']=arg.insta_link
              reData['fb_link']=arg.fb_link
              reData['welcome_video']=arg.welcome_video
              
              db.query("UPDATE ll_user_influencer set ? where user_id=?",[reData,arg.user_id], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     console.log(err);
                     reject ({"success":false,"message":err.code});
                    }
                  resolve({"success":true,"message":"Details updated successfully",body:rows});


                }); 
            }
          }
       }); 
    })
}

function getInfluencerDetail(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT ll_user_influencer.* FROM ll_user_influencer WHERE user_id=?",[arg.user_id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject ({"success":false,"message":err.code});
          } else {
            if(rows.length>0){              
              resolve({"success":true,"message":"Success",body:rows});
 
            }else{
              reject ({"success":false,"message":"No record found"});

            }
          }
       }); 
    })
}
function getInfluencerProfileDetail(arg) {
    return new Promise((resolve,reject) => {
              var username =arg.username.replace(/ |@|!/gi, "");

       db.query("SELECT (SELECT count(id) FROM ll_channel_followers WHERE user_id=ll_users.user_id and status='1') as totalFolower,ll_user_influencer.*,ll_users.* ,(SELECT GROUP_CONCAT(ll_main_category.category_name) FROM ll_main_category WHERE  FIND_IN_SET(ll_main_category.id,ll_user_influencer.category) ) as category_name FROM ll_user_influencer,ll_users WHERE ll_user_influencer.user_id=ll_users.user_id and (ll_users.username like '%"+username+"%' or ll_users.user_id=?) limit 1",[arg.username],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject ({"success":false,"message":err.code});
          } else {
                         
              resolve({"success":true,"message":"Success",body:rows});
 
            
          }
       }); 
    })
}

function updateInfluencerDetail(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT id FROM ll_users WHERE user_id=?",[arg.user_id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject ({"success":false,"message":error.code});

          } else {
            if(rows.length>0){
              
              reData= {}
              //`user_id`, `designation`, `following_size`, `social_link`, `banner`, `category`, `subcategory`,
              reData['user_id']=arg.user_id
              reData['designation']=arg.designation
              reData['following_size']=arg.following_size
              reData['insta_link']=arg.insta_link
              reData['fb_link']=arg.fb_link
              db.query("UPDATE ll_user_influencer set ? where user_id=?",[reData,arg.user_id], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     console.log(err);
                     reject ({"success":false,"message":err.code});
                    }
                  resolve({"success":true,"message":"Details updated successfully",body:rows});


                }); 
            }else{
               reject ({"success":false,"message":"Invalid user ID"});
            }
          }
       }); 
    })
}

function uploadInfluencerBanner(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT id FROM ll_users WHERE user_id=?",[arg.user_id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject ({"success":false,"message":error.code});

          } else {
            if(rows.length>0){
              
              reData= {}
              //`user_id`, `designation`, `following_size`, `social_link`, `banner`, `category`, `subcategory`,
              reData['user_id']=arg.user_id
              reData['banner']=arg.banner
              db.query("UPDATE ll_user_influencer set ? where user_id=?",[reData,arg.user_id], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     console.log(err);
                     reject ({"success":false,"message":err.code});
                    }
                  resolve({"success":true,"message":"Details updated successfully",body:rows});


                }); 
            }else{
               reject ({"success":false,"message":"Invalid user ID"});
            }
          }
       }); 
    })
}
function updateUserdeviceInfo(arg) {
    return new Promise((resolve,reject) => {
       db.query("SELECT id FROM ll_users WHERE user_id=?",[arg.user_id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject(error);
          } else {
            if(rows.length>0){
              var device_type = arg.device_type;
              var device_token = arg.device_token;

              reData= {}
              reData['user_id']=arg.user_id
              reData['device_type']=arg.device_type
              reData['device_token']=arg.device_token
              reData['device_name']=arg.device_name
              db.query("INSERT INTO ll_user_login_device set ?",[reData], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     console.log(err);
                     reject(err);
                    }
                });   
              
              db.query("UPDATE ll_users set device_type=?,device_token=? WHERE user_id=?",[device_type,device_token,arg.user_id],(error,rows,fields)=>{
                if(!!error) {
                  dbFunc.connectionRelease;
                  console.log(err);
                  reject(error);
                } else {
                  dbFunc.connectionRelease;
                  resolve(rows);
                }
              });   
            }else{
              reject(rows);
            }
          }
       }); 
    })
}

function getRecommendationList(arg) {
    return new Promise((resolve, reject) => {
            //GROUP_CONCAT(tages) as tags
            console.log('getRecommendationList module');
            var LimitNum = 4
            var startNum = 0;
            if(arg.start == '' || arg.limit == ''){
                  startNum = 0;
                  LimitNum = 4;
            }else{
                 //parse int Convert String to number 
                  startNum = parseInt(arg.start);
                  LimitNum = parseInt(arg.limit); 
            }
            db.query(`SELECT tages FROM ll_user_interest where user_id=? `,[arg.user_id], (error, rows, fields) => {
            if (error) {
                reject({"success":false,"message":error.code});
            } else {
                console.log('rows',rows);
                if (rows.length>0) {
                    var query = "and ( "
                    ortxt="or";
                    for (var i = 0; i < rows.length; i++) {
                        var tag= rows[i].tages;
                        if(rows.length-1==i){
                            ortxt="";
                        }
                       query+=" FIND_IN_SET('"+tag+"', channelTag)  "+ortxt;
                    }

                    query+=' ) GROUP by channel_id';
                    //and ( FIND_IN_SET('demo', channelTag) OR FIND_IN_SET('34', channelTag) OR FIND_IN_SET('fori', channelTag) OR FIND_IN_SET('test', channelTag) ) GROUP by channel_id
                    db.query("SELECT FLOOR(HOUR(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) / 24) as days,  MOD(HOUR(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())), 24) as hours,   MINUTE(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) as minutes,  SECOND(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) as sec, SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW()) as timestamp,ll_product_broadcasting.*,(SELECT channel_logo FROM ll_users_channels WHERE ll_users_channels.id=ll_product_broadcasting.store_id) as channel_logo FROM ll_product_broadcasting where broadcast_status!='2' and broadcast_time>= CURDATE() "+query+" order by id desc  limit ? offset ?",[LimitNum,startNum], (error, rows, fields) => {
                        if (error) {
                            reject({"success":false,"message":error.code});
                        } else {
                      resolve({"success":true,'data':rows,"message":"Success"});
                        }
                    });
                
                } else {
                    resolve({"success":true,'data':[],"message":"success"});

                    // db.query(`SELECT FLOOR(HOUR(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) / 24) as days,  MOD(HOUR(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())), 24) as hours,   MINUTE(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) as minutes,  SECOND(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) as sec, SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW()) as timestamp,ll_product_broadcasting.*,(SELECT channel_logo FROM ll_users_channels WHERE ll_users_channels.user_id=ll_product_broadcasting.user_id) as channel_logo FROM ll_product_broadcasting where broadcast_status!='2' and broadcast_time>= CURDATE() order by id desc limit 4 `, (error, rows, fields) => {
                    //     if (error) {
                    //         reject({"success":false,"message":error.code});
                    //     } else {
                    //         resolve(rows);
                    //     }
                    // });
                }
               
            }
        });

        
       
    });
}
function supportRequest(arg) {
    console.log("supportRequest",arg);
    return new Promise((resolve, reject) => {
        //const tags=arg.tags;
        const user_id=arg.user_id;
        reData= {}
        reData['user_id']=arg.user_id
        var start_date=arg.start_date;
        var timeslot = (start_date.split("T"))[1].split('+');
        var schedule_date = start_date.split("T");
        reData['schedule_date']=schedule_date[0]
        reData['timeslot']=timeslot[0]
        reData['note']=arg.note
        reData['start_date']=arg.start_date
        reData['end_date']=arg.end_date
       

        db.query("SELECT first_name,last_name,email,id FROM ll_users WHERE user_id=?",[user_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length<=0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Invalid User! try with different user"});
            } else {
               reData['first_name']=rows[0].first_name
                reData['last_name']=rows[0].last_name
                reData['email']=rows[0].email
                reData['user_type']=rows[0].user_type
                db.query("INSERT INTO ll_support_request set ?",[reData], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     reject(err);
                    } else {
                        dbFunc.connectionRelease;
                        resolve({"success":true,"message":"Your request received successfully",body:rows});
                    }
                });   
            }
        });        
            
    });
}


function getRequestList(arg) {
    console.log("getRequestList");
    return new Promise((resolve, reject) => {
            db.query("SELECT * FROM ll_support_request WHERE user_id=? order by id desc limit 1",[arg.user_id], (error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } 
                resolve({"success":true,"message":"success",body:rows});      
                
            }); 
              
           
    });
}
function delSupportRequest(arg) {
    return new Promise((resolve,reject) => {
      
        db.query("DELETE FROM `ll_support_request` WHERE `user_id`=?", [arg.user_id], function (error, row) {

      if(!!error) {
          dbFunc.connectionRelease;
           console.log('error',error);
          reject({"success":false,"message":error.code});
        }else{            
            resolve({"success":true,"message":"Record deleted deleted successfully",body:row}); 
        }
    });
    });
    
}
function gettimeslot() {
    console.log("gettimeslot");
    return new Promise((resolve, reject) => {
            db.query("SELECT * FROM ll_time_slot WHERE status='0'", (error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } 
                resolve({"success":true,"message":"Success",body:rows});      
                
            }); 
              
           
    });
}
function updateUserType(arg) {
    console.log("updateUserType");
    return new Promise((resolve, reject) => {
            db.query("UPDATE `ll_users` SET `user_type`=? WHERE user_id=?",[arg.user_type,arg.user_id], (error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } 
                var msg="Updated"
                var  user_type=arg.user_type
                if (arg.user_type==1) {
                  msg= "You have been successfully login as Merchant account ";
                  user_type=0
                }
                if (arg.user_type==0) {
                  msg= "You have been successfully login as Shopper account ";
                  user_type=1

                }
                
                db.query("INSERT ll_users_detail( `user_id`,`name`, `value`) VALUES (?,?,?)",[arg.user_id,'user_type',arg.user_type], (err, rows) => {
                  if (err) {
                   dbFunc.connectionRelease;
                   reject(err);
                  }
                }); 
               // INSERT INTO `ll_user_logs`( `user_id`, `login_time`,  `text`, `user_type`)
                db.query("INSERT ll_user_logs( `user_id`,`text`, `user_type`) VALUES (?,?,?)",[arg.user_id,msg,arg.user_type], (err, rows) => {
                  if (err) {
                   dbFunc.connectionRelease;
                   reject(err);
                  }
                }); 
                resolve({"success":true,"message":msg,body:{user_type:arg.user_type}});      
                
            }); 
              
           
    });
}
function getInterestList() {
    console.log("getInterestList");
    return new Promise((resolve, reject) => {
            db.query("SELECT * FROM ll_user_interest_list WHERE status='0'", (error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } 
                resolve({"success":true,"message":"Success",body:rows});      
                
            }); 
              
           
    });
}
function getUserInterest(arg) {
    console.log("getUserInterest",arg);
    return new Promise((resolve, reject) => {
            db.query("SELECT * FROM ll_user_interest WHERE user_id=?",[arg.user_id], (error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } 
                resolve({"success":true,"message":"Success",body:rows});      
                
            }); 
              
           
    });
}
function userInterest(arg) {
    console.log("userInterest",arg);
    return new Promise((resolve, reject) => {
        const tags=arg.tags;
        const user_id=arg.user_id;
        //channel_name ="@"+channel_name.replace(/ |_|-|@|#|&|%|(|)|{|]|{|;|:|'|"|,|!/gi, "");
        //console.log(user.channel_name,'channel_name', channel_name);
        //`ll_user_interest`(`id`, `user_id`, `tages`,
         const tagarr = [];

          for (var i = 0; i < tags.length; i++) {
            var arr = [];
             arr.push(user_id,tags[i]);
             tagarr.push(arr);
          }
        db.query("SELECT * FROM ll_user_interest WHERE  user_id=?",[user_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length>0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Interest already shared by you!"});
            } else {
                db.query("SELECT id FROM ll_users WHERE user_id=?",[user_id], (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length<=0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"Invalid User! try with different user"});
                    } else {
                        db.query("INSERT INTO ll_user_interest(user_id, tages)VALUES ?",[tagarr], (err, rows) => {
                            if (err) {
                             dbFunc.connectionRelease;
                             reject(err);
                            } else {
                              
                              db.query("UPDATE `ll_users` SET `is_recommendation`='1' WHERE user_id=?",[user_id], (error, rows, fields) => {
                                if (error) {
                                    dbFunc.connectionRelease;
                                    reject(error);
                                } 
                              }); 
                                //console.log("Last ID:");
                                //console.log(rows.insertId);                                
                                dbFunc.connectionRelease;
                                resolve({"success":true,"message":"Your area of interest saved successfully",body:rows});
                            }
                        });   
                    }
                });        
            }
        });
    });
}

function followingsStoreList(user) {
    console.log("followingsStoreList",user);
    return new Promise((resolve, reject) => {
    
            db.query("SELECT ll_users_channels.id,ll_users_channels.channel_name,ll_users_channels.channel_org_name,ll_users_channels.channel_logo FROM `ll_channel_followers`, ll_users_channels WHERE ll_channel_followers.user_id=ll_users_channels.user_id and ll_channel_followers.follow_by_id=?",[user.user_id], (error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } else if(rows.length<=0) {
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Invalid User! try with different user"});
                } else {
                   resolve({"success":true,"message":"Success",body:rows});
                       
                }
            }); 
              
           
    });
}

function getPaymentGateway(user) {
    console.log("getPaymentGateway",user);
    return new Promise((resolve, reject) => {
      /*db.query("SELECT user_id FROM ll_product_broadcasting WHERE channel_id =?",[user.user_id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              console.log('error',error);
              reject ({"success":false,"message":error.code});
          } else {

            if (rows.length>0) { 
                   */
            db.query("SELECT user_id,stripe_id,public_key,private_key,payment_gateway FROM ll_payment_gateway WHERE user_id=?",[user.user_id], (error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } else if(rows.length<=0) {
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Invalid User! try with different user"});
                } else {
                  //const decryptedString = cryptr.decrypt(encryptedString);
                    rows[0].public_key=cryptr.decrypt(rows[0].public_key);;
                    //var private_key= user.private_key
                   resolve({"success":true,"message":"Success",body:rows});
                       
                }
            }); 
        /*  }else{
           reject({"success":false,"message":"Invalid Channel ID! try with different user"});


          }
          }
        }); */          
           
    });
}

function saveGatewayDetails(user) {
    console.log("saveGatewayDetails",user);
    return new Promise((resolve, reject) => {
        var user_id=user.user_id;
        db.query("SELECT ll_users.id FROM ll_users WHERE user_id=?",[user.user_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length<=0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Invalid User! try with different user"});
            } else {
              //const encryptedString = cryptr.encrypt('bacon');
              //const decryptedString = cryptr.decrypt(encryptedString);
                var public_key= "";
                var private_key= "";
                var payment_gateway =user.payment_gateway
                var   stripe_id="";
                if (user.public_key) {
                  public_key= cryptr.encrypt(user.public_key);
                }
                if (user.private_key) {
                  private_key= cryptr.encrypt(user.private_key);
                }
               if (user.stripe_id) {
                  stripe_id= cryptr.encrypt(user.stripe_id);
                }
                db.query("SELECT id FROM ll_payment_gateway WHERE user_id=? and payment_gateway=?",[user.user_id,payment_gateway], (error, rows, fields) => {
                  if (error) {
                      dbFunc.connectionRelease;
                      reject(error);
                  } else if(rows.length<=0) {
                      dbFunc.connectionRelease;
                      db.query("INSERT INTO ll_payment_gateway(user_id,payment_gateway,public_key,private_key,stripe_id)VALUES(?,?,?,?,?)",[user.user_id,payment_gateway,public_key,private_key,stripe_id], (err, rows) => {
                        if (err) {
                         dbFunc.connectionRelease;
                         reject(err);
                        } else {
                            console.log("Last ID:");
                            console.log(rows.insertId);                                
                            dbFunc.connectionRelease;
                            //isPay_account
                            db.query("update ll_users set isPay_account=? where user_id=?",['1',user_id], (err, rowsupdate) => {
                                if (err) {
                                 dbFunc.connectionRelease;
                                 reject(err);
                                } else {
                                    dbFunc.connectionRelease;
                                    resolve({"success":true,"message":"Payment gateway updated successfully",body:rows});
                                }
                            });
                        }
                    });                       
                  } else {
                    db.query("update ll_payment_gateway set user_id=?,payment_gateway=?,public_key=?,private_key=?,stripe_id=? where id=?",[user.user_id,payment_gateway,public_key,private_key,stripe_id,rows[0].id], (err, rows) => {
                        if (err) {
                         dbFunc.connectionRelease;
                         reject(err);
                        } else {
                            console.log("Last ID:");
                            console.log(rows.insertId);                                
                            dbFunc.connectionRelease;
                            //isPay_account
                            db.query("update ll_users set isPay_account=? where user_id=?",['1',user_id], (err, rowsupdate) => {
                                if (err) {
                                 dbFunc.connectionRelease;
                                 reject(err);
                                } else {
                                    dbFunc.connectionRelease;
                                    resolve({"success":true,"message":"Payment gateway added successfully",body:rows});
                                }
                            });
                        }
                    });
                  }
                })       
            }
        });        
           
    });
}
function addEditfollower(user) {
    console.log("addEditfollower",user);
    return new Promise((resolve, reject) => {
        var channel_name=user.channel_name;
        if (user.user_id==user.follow_by_id) {
           reject({"success":false,"message":"You can't follow your own channel"});
        }else{
        db.query("SELECT (SELECT count(id) FROM ll_channel_followers WHERE user_id=? and channel_id=? and status='1') as totalFolower, ll_channel_followers.* FROM ll_channel_followers WHERE (follow_by_id=? or user_id=?) and channel_id=?",[user.user_id,user.store_id,user.follow_by_id,user.user_id,user.store_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length>0) {
                dbFunc.connectionRelease;
                var status='1';
                var is_follow=1;
                var totalFolower=rows[0].totalFolower;
                var msg="You have been successfully following this channel"
                if (rows[0].status=='1') {
                 status='2';
                 is_follow=0
                 totalFolower=totalFolower-1;
                 msg= "Channel unfollow successfully."
                } else {
                 status='1';
                 is_follow=1;

                }
                db.query("update  ll_channel_followers set status=? where id=?",[status,rows[0].id], (err, rows) => {
                  if (err) {
                   dbFunc.connectionRelease;
                   reject(err);
                  } else {
                      dbFunc.connectionRelease;
                      resolve({"success":true,"message":msg,body:{is_follow:is_follow,totalFolower:totalFolower}});
                  }
              });   
            } else {
                db.query("SELECT (SELECT count(id) FROM ll_channel_followers WHERE user_id=? and channel_id=? and status='1') as totalFolower,(SELECT username FROM ll_users WHERE user_id=? ) as username,(SELECT email FROM ll_users WHERE user_id=? ) as email,ll_users.id FROM ll_users WHERE user_id=?",[user.user_id,user.store_id,user.user_id,user.user_id,user.follow_by_id], (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length<=0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"Invalid User! try with different user"});
                    } else {
                       var totalFolower=rows[0].totalFolower;
                       var email=rows[0].email;
                       var username=rows[0].username;
                        db.query("INSERT INTO ll_channel_followers(user_id, follow_by_id,channel_id)VALUES(?,?,?)",[user.user_id, user.follow_by_id,user.store_id], (err, rows) => {
                            if (err) {
                             dbFunc.connectionRelease;
                             reject(err);
                            } else {
                                console.log("Last ID:");
                                console.log(rows.insertId);                                
                                dbFunc.connectionRelease;
                                folloermail(username,email);
                                resolve({"success":true,"message":"You have been successfully following this channel ",body:{is_follow:1,totalFolower:totalFolower+1}});
                            }
                        });   
                    }
                });        
            }
        });
      }
    });
}
function getAllUser(arg) {
  return new Promise((resolve,reject) => {
        //To calculate Total Count use MySQL count function
    db.query("Select count(*) as TotalCount from ll_users", function(err, rows) {
      if(err){
        dbFunc.connectionRelease;
        reject(err.code);
      }else{
        //store Total count in variable
        let totalCount = rows[0].TotalCount
        if(arg.start == '' || arg.limit == ''){
            let startNum = 0;
            let LimitNum = 25;
        }
        else{
            //parse int Convert String to number 
            var startNum = parseInt(arg.start);
            var LimitNum = parseInt(arg.limit);
        }
      }
      var LimitNum =100
      var filter='';
      if(arg.typeUser){
        var filter= " active='"+arg.typeUser+"' and ";
        if(arg.typeUser==3 || arg.typeUser==''){
          var filter='';
        }
      }
      console.log('filter',filter);
      var searchStr='';
      if(arg.searchStr){
        var searchStr= "( username like '%"+arg.searchStr+"%' or  email like '"+arg.searchStr+"%') and ";
        if(arg.searchStr==''){
            var searchStr='';
        }
      }
      console.log('filter', filter);
      //console.log(startNum +"==  "+LimitNum);  limit ? OFFSET ?  ", ['0',LimitNum,startNum]
      db.query("SELECT (SELECT  IF(f.username IS NULL,'---',f.username) as username FROM ll_users f WHERE f.user_id=ll_users.sponsor_id LIMIT 1) as sponsor_name, isDelete, user_id,first_name,last_name, username,email,phone,gender,profile_pic,city,state,country,active from ll_users where "+searchStr+" "+filter+" isAdmin= ?   order by username asc  ", ['0'], function (err, res) {
          if(err) {
            dbFunc.connectionRelease;
            reject(err.code);
          }
          else{
            dbFunc.connectionRelease;
            resolve(res);

          }
      });

    });
        
  });
}

function getUserById(id) {
  console.log('user_id getUserById',id)
    return new Promise((resolve,reject) => {
        db.query("SELECT u.*,c.name as countryName FROM ll_users as u ,ll_country as c WHERE c.countryId=u.country and u.user_id =?",[id.id],(error,rows,fields)=>{
            if(!!error) {
              console.log('getUserById ',error)
                dbFunc.connectionRelease;
                reject(error);
            } else {
                console.log('user_id ',rows)

              if (rows.length>0) {


              rows[0]['userDetail']=[]
              rows[0]['channel_name']=""
              //db.query("Select `name`, `value` from ll_users_detail  WHERE name!='two_fa_secret' and user_id = ?", [id.id], function (err, res) {
               db.query("SELECT ll_users_channels.channel_name FROM `ll_users_channels` WHERE user_id=? limit 1", [id.id], function (err, res) {
                
                  if(err) {
                      reject({"success":false,"message":err.code});
                  }
                  else{
                      if(res.length>0)
                      { 
                        rows[0]['channel_name']=res[0].channel_name;
                        resolve(rows);
                      }else{
                        console.log('resolve ',rows)
                        resolve(rows);
                      }
                  }
              });  
              dbFunc.connectionRelease;
              
            }else{

                  reject("Invalid user_id ");  
            }
          }
       });
    });  
}

function addUser(user) {
    var user_id=uuid();
   // console.log('--addUser---');
    return new Promise((resolve,reject) => {
      db.query("INSERT INTO ll_users(user_id,username,sponsor_id,email,password)VALUES("+user_id+","+user.username+"','"+user.sponsor_id+"','"+user.email+"','"+user.password+"')",(error,rows,fields)=>{
          if(error) {
              dbFunc.connectionRelease;
              reject(error);
          } else {


          /*    stripe.customers.create(
                {
                  description: 'Customer for jenny.rosen@example.com',
                  email: user.email,
                },
                function(err, customer) {
                  // asynchronously called
                  console.log('--customer---');
                  if(err){
                    console.log('err',err);
                  }else{
                    console.log('customer',customer);
                  }
                }
              );*/
              dbFunc.connectionRelease;
              resolve(rows);
          }
      });
    });
}


function updateUser(id,user) {
    return new Promise((resolve,reject) => {
        db.query("UPDATE ll_users set username='"+user.username+"',email='"+user.email+"',first_name='"+user.first_name+"',last_name='"+user.last_name+"' WHERE user_id='"+id+"'",(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });    
    })
}
function updateUserStatus(id,user) {
    return new Promise((resolve,reject) => {
       db.query("SELECT active FROM ll_users WHERE user_id=?",[id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject(error);
          } else {
            if(rows.length>0){
              var active = rows[0].active;
              if (active==1) {  active = 0 } else {  active = 1}
              db.query("UPDATE ll_users set active=? WHERE user_id=?",[active,id],(error,rows,fields)=>{
                if(!!error) {
                  dbFunc.connectionRelease;
                  reject(error);
                } else {
                  dbFunc.connectionRelease;
                  resolve(rows);
                }
              });   
            }else{
              reject(rows);
            }
          }
       }); 
    })
}

function deleteUser(id) {
   return new Promise((resolve,reject) => {
        //db.query("DELETE FROM ll_users WHERE user_id='"+id+"'",(error,rows,fields)=>{
        db.query("UPDATE ll_users set isDelete=? WHERE user_id=?",['1',id],(error,rows,fields)=>{

            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
                dbFunc.connectionRelease;
                resolve(rows);
            }
       });    
    });
}


function changePassword(userData){
  var data={}  
  var lang='en';
  if (userData.lang) {
    var lang = userData.lang;
  }
  console.log('changePassword',userData);

  return new Promise((resolve, reject) => {
    if(userData.password==userData.confPassword){            
        db.query("Select ll_users.user_id,ll_users.username,ll_users.email,ll_users.password from ll_users  WHERE user_id = ?", [userData.user_id], function (err, res) {
            if(err) {
                reject({"success":false,"message":error.code});
            }
            else{
              if(res.length!=0)
              {   
                var oldPassword=res[0].password;
                var user_id=res[0].user_id;    
                const updateUserData ={};
                const updatePersnalData ={};
                if(userData.confPassword)
                  bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                      return next(err);
                    }
                    bcrypt.hash(userData.confPassword, salt, function (err, hash) {
                      if (err) {
                        return next(err);
                      }    
                      if(userData.confPassword)
                        updateUserData['password_selector'] =1;
                        db.query("UPDATE `ll_users` SET password=? where user_id=?", [hash,user_id], function (err, row) {
                          if(err) {
                            reject({"success":false,"message":error.code});
                          }
                        });    
                        db.query("UPDATE `ll_forgot_password` SET ? where user_id=?", [updateUserData,user_id], function (err, row) {
                          if(err) {
                            reject({"success":false,"message":error.code});
                          }
                          else{     
                            data['message']="Password Updated Successfully";
                            data['data']='';
                            data['success']=true;
                            resolve(data);                                
                          }
                        });
                      });       
                    });                    
                }else{
                  data['message']="Invalid user_id ";
                  data['data']='';
                  data['success']=false;
                  reject(data);  
                }
            }
        });
    }else{
        data['message']="Password does not match";
        data['data']='';
        data['success']=false;
        reject(data); 
    }
  });       
    
};


function changeEmail(userData){
  var data={}  
  var lang='en';
  if (userData.lang) {
    var lang = userData.lang;
  }
  console.log('changeEmail',userData);
  return new Promise((resolve, reject) => {
    if(userData.email==userData.confemail){            
        db.query("Select ll_users.user_id,ll_users.username,ll_users.email from ll_users  WHERE user_id = ?", [userData.user_id], function (err, res) {
            if(err) {
                reject({"success":false,"message":err.code});
            }
            else{
                if(res.length!=0)
                {   
                  var email=res[0].email;
                  var user_id=res[0].user_id;
                         
                    if(email==userData.confemail){
                        data['message']="Please use different email account";
                        data['data']='';
                        data['success']=false;
                        reject(data);  
                    }else{
                      //if(userData.confemail)
                        db.query("Select user_id,email from ll_users  WHERE email = ?", [userData.confemail], function (err, res) {
                        if(err) {
                          reject({"success":false,"message":err.code});
                        }
                        else{
                          if(res.length!=0)
                          {
                            data['message']="Email already exist";
                            data['data']='';
                            data['success']=false;
                            reject(data);  
                          }else{
                            db.query("UPDATE `ll_users` SET email=? where user_id=?", [userData.confemail,user_id], function (err, row) {
                              if(err) {
                                 reject({"success":false,"message":err.code});
                              }else{
                                  data['message']="Email Updated Successfully";
                                  data['data']='';
                                  data['success']=true;
                                  resolve(data);   
                              }
                            }); 
                          }
                        }
                      });
                           
                    }        
                    
                }else{
                    
                    data['message']="Invalid user_id Key";
                    data['data']='';
                    data['success']=false;
                    reject(data);  
                }
            }
        });
    }else{
        data['message']="email does not match";
        data['data']='';
        data['success']=false;
        reject(data); 
    }
    });       
    
};


function changeProfilePic(userData){
  var data={}  
  var lang='en';
  if (userData.lang) {
    var lang = userData.lang;
  }
  console.log('changeEmail',userData);

  return new Promise((resolve, reject) => {
    db.query("Select ll_users.user_id,ll_users.username,ll_users.email from ll_users  WHERE user_id = ?", [userData.user_id], function (err, res) {
      if(err) {
          console.log(err);
          reject({"success":false,"message":err.code});
      }
      else{
        if(res.length!=0)
        {   
          var profile_pic=userData.profile_pic;
          var user_id=res[0].user_id;
          if(userData.profile_pic){
            profile_pic="https://fori.kindlebit.com/"+profile_pic;
            db.query("UPDATE `ll_users` SET profile_pic=? where user_id=?", [profile_pic,user_id], function (err, row) {
                if(err) {
                  console.log(err);
                   reject({"success":false,"message":err.code});
                }else{
                    data['message']="Profile Picture Updated Successfully";
                    data['data']=userData;
                    data['success']=true;
                    resolve(data);   
                }
            });
          } else{
            data['message']="Please upload the profile picture";
            data['data']='';
            data['success']=false;
            reject(data);
          }   
        }else{
          data['message']="Invalid user_id Key";
          data['data']='';
          data['success']=false;
          reject(data);  
        }
      }
    });  
  });       
    
};

function updatePersonalDetail(userData){
    var data={}  
    var lang='en';
    if (userData.lang) {
        var lang = userData.lang;
    }

    //console.log('updatePersonalDetail',userData);
    return new Promise((resolve, reject) => {
        db.query("Select `first_name`, `last_name` ,ll_users.user_id,ll_users.username,ll_users.email ,(Select countryId from ll_country where name=? limit 1)  as countryId from ll_users  WHERE user_id = ?", [userData.country,userData.user_id], function (err, res) {
            if(err) {
              console.log(err)
                reject({"success":false,"message":err.code});
            }
            else{
                if(res.length!=0)
                {   
                  console.log('updatePersonalDetail',res,userData);
                    const updateUserData ={};
                    var email=res[0].email;
                    var user_id=res[0].user_id;                      
                    updateUserData['first_name'] =userData.first_name;
                    if (userData.last_name) {
                      updateUserData['last_name'] =userData.last_name;
                    }
                    //updateUserData['phone'] =userData.phone;
                    updateUserData['dob'] =userData.dob;
                   // updateUserData['passport_no'] =userData.passport_no;
                    updateUserData['country'] =res[0].countryId;//userData.country;
                    var values = [];
                      if (userData.userDetail) {
                        var userDetail =JSON.parse(userData.userDetail);  
                        db.query("Select `name`, `value` from ll_users_detail  WHERE (name ='address' or name='location') and user_id = ?", [userData.user_id], function (err, res) {
                        if(err) {
                            reject({"success":false,"message":err.code});
                        }
                        else{
                            if(res.length!=0)
                            { 
                                                            
                              for (var key in userDetail) {
                                //values.push([user_id, key,userDetail[key]]);
                                console.log('values err',"["+user_id+","+ key+","+userDetail[key]+"]");
                                db.query("UPDATE `ll_users_detail` SET value=? where user_id=? and name=?", [userDetail[key],user_id,key], function (err, row) {
                                    if(err) {
                                       reject({"success":false,"message":err.code});
                                    }
                                });
                              }
                              
                            }else{
                              for (var key in userDetail) {
                                 values.push([user_id, key,userDetail[key]]);
                              }
                              db.query("INSERT INTO `ll_users_detail` (user_id,name, value) VALUES ? ", [values], function (err, row) {
                                  if(err) {
                                     console.log('values err',err);
                                     reject({"success":false,"message":err.code});
                                  }
                              });
                            }
                          }
                        });    
                      }
                      db.query("UPDATE `ll_users` SET ? where user_id=?", [updateUserData,user_id], function (err, row) {
                          if(err) {
                             reject({"success":false,"message":err.code});
                          }else{
                              data['message']="Personal Detail Updated Successfully";
                              data['data']=updateUserData;
                              data['success']=true;
                              resolve(data);   
                          }
                      });    
                            
                    
                }else{
                    
                    data['message']="Invalid user_id Key";
                    data['data']='';
                    data['success']=false;
                    reject(data);  
                }
            }
        });
   
    });       
    
};
function twoFactAuthEnable(userData){
   return new Promise((resolve, reject) => {
    db.query("Select user_id from ll_users WHERE user_id = ?", [userData.user_id], function (err, res) {
      if(err) {
            console.log("error: ", err);
            reject({"success":false,"message":err.code});
         }
       else{ 
            var secret = speakeasy.generateSecret({length: 20});
           // console.log(secret.base32); // Save this value to your DB for the user
            QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
            //console.log(image_data); // A data URI for the QR code image
            if(res.length!=0)
            {
              db.query("Select `name`, `value` from ll_users_detail  WHERE name='two_fa_secret' and  user_id = ?", [userData.user_id], function (err, rows) {
                if(err) {
                  console.log('values err',err);
                    reject({"success":false,"message":err.code});
                }
                else{
                    if(rows.length!=0)
                    { 
                      db.query("UPDATE ll_users_detail SET  value= ? WHERE name='two_fa_secret' and user_id = ?", [secret.base32, userData.user_id], function (err, rows) {
                        if(err) {
                            console.log("error: ", err);
                            reject({"success":false,"message":err.code});
                        }
                        else{ 
                          var data={};
                          res[0]['qrcode']=image_data; 
                          resolve({"success":true,data:res,"message":"Success"});
                        }
                      }); 
                    }else{
                      db.query("INSERT INTO `ll_users_detail` (user_id,name, value) VALUES (?,?,?) ", [userData.user_id,'two_fa_secret',secret.base32], function (err, row) {
                          if(err) {
                             console.log('values err',err);
                             reject({"success":false,"message":err.code});
                          }else{
                            var data={};
                            res[0]['qrcode']=image_data; 
                            resolve({"success":true,data:res,"message":"Success"});
                          }
                      });
                    }
                  }
              });        

            }else{
                reject({"success":false,"message":"Invalid User Detail"});
            }

            });
            }
        }); 
   });  
};

  function twoFactAuthVerify(arg){
    return new Promise((resolve, reject) => {

    db.query("Select (SELECT value FROM `ll_users_detail` WHERE name='two_fa_secret' and user_id=?) as two_fa_secret, user_id,two_fa_actived,email,active,username,isAdmin,profile_pic from ll_users WHERE user_id = ?", [arg.user_id,arg.user_id], function (err, res) {
      if(err) {
            console.log("error: ", err);
            reject({"success":false,"message":err.code});
         }
       else{ 
   
            if(res.length!=0)
            {
                var secret=res[0].two_fa_secret;
                var id=res[0].user_id;
                console.log(secret +'-'+id);
                var verified = speakeasy.totp.verify({
                  secret: secret,
                  encoding: 'base32',
                  token: arg.authcode
                });
                 console.log('verified',verified);
                if (verified==true) {
                    db.query("UPDATE ll_users SET two_fa_actived = ? WHERE user_id = ?", ['1', id], function (err, rows) {
                      if(err) {
                          console.log("error: ", err);
                          reject({"success":false,"message":err.code});
                      }
                      else{ 
                          resolve({"success":true,data:res,"message":"Success"});
                      }
                    }); 
                }else{
                   reject({"success":false,"message":"Invalid security code"});
                }
            }else{
                reject({"success":false,"message":"Invalid User Detail"});
            }

           
            }
        }); 
    });     
};


function twoFactAuthDisable(arg){
  return new Promise((resolve, reject) => {
    db.query("Select user_id,value as two_fa_secret from ll_users_detail WHERE name='two_fa_secret' and user_id = ?", [arg.user_id], function (err, res) {
      if(err) {
            console.log("error: ", err);
            reject({"success":false,"message":err.code});
         }
       else{ 
            //console.log(image_data); // A data URI for the QR code image
            if(res.length!=0)
            {
              var secret=res[0].two_fa_secret;
                var id=res[0].user_id;
                console.log(secret +'-'+id);
                var verified = speakeasy.totp.verify({
                  secret: secret,
                  encoding: 'base32',
                  token: arg.authcode
                });
                console.log('verified',verified);
                if (verified==true) {
                  db.query("UPDATE ll_users SET two_fa_actived=? WHERE user_id = ?", ['0', id], function (err, rows) {
                    if(err) {
                      console.log("error: ", err);
                      reject({"success":false,"message":err.code});
                    }
                    else{ 
                      resolve({"success":true,data:res,"message":"Success"});
                    }
                  }); 
                }else{
                   reject({"success":false,"message":"Invalid security code"});
                }
            }else{
               reject({"success":false,"message":"Invalid User Detail"});
            }

           
            }
        });
    });     
};


function questionList(param) {
    var data={};
    var lang='en';
    if (param.lang) {
        var lang = param.lang;
    }
  return new Promise((resolve, reject) => {
  
    db.query("SELECT id,question   FROM `ll_security_questions` ", function (err, res) {
        if(err) {
          reject({"success":false,"message":err.code});
        }
        else{
          resolve({"success":true,data:res,"message":"Success"});
        }
    });
  });  
};

function myQuestion(param) {
    var data={};
    var lang='en';
    if (param.lang) {
        var lang = param.lang;
    }
  return new Promise((resolve, reject) => {  
    db.query("SELECT q.id,q.question   FROM `ll_security_questions` as q ,ll_security_questions_ans as a WHERE q.id=a.question_id and a.user_id=?",[param.user_id] ,function (err, res) {
        if(err) {
          reject({"success":false,"message":err.code});
        }
        else{
          resolve({"success":true,data:res,"message":"Success"});

        }
    });
  });  
};


function myQuesAns(param) {
    var data={};
    //console.log(param);
    var lang='en';
    if (param.lang) {
        var lang = param.lang;
    }
  return new Promise((resolve, reject) => {  
    db.query("SELECT id,question   FROM `ll_security_questions` where id=?", [param.question_id],function (err, res) {
        if(err) {
          reject({"success":false,"message":err.code});
        }
        else{
            db.query("SELECT id   FROM `ll_security_questions_ans` where user_id=?", [param.user_id],function (err, res) {
                if(err) {
                   reject({"success":false,"message":err.code});
                }
                else{
                    db.query("UPDATE ll_users SET security_question = ? where user_id=?", ['1',param.user_id], function (err, ress) {
                    });
                    if(res.length>0)
                    {
                       db.query("UPDATE `ll_security_questions_ans` SET question_id = ?,ans=? where id=?", [param.question_id,param.ans,res[0].id], function (err, rows) {
                            if(err) {
                                reject({"success":false,"message":err.code});
                            }
                            else{
                                
                              resolve({"success":true,data:[],"message":"Security Question Updated Successfully"});

                            }
                        });
                    }else{
                        db.query("INSERT INTO `ll_security_questions_ans`( `user_id`, `question_id`, `ans`) VALUES (?,?,?)", [param.user_id,param.question_id,param.ans], function (err, rows) {
                            if(err) {
                                reject({"success":false,"message":err.code});
                            }
                            else{
                                resolve({"success":true,data:[],"message":"Security Question Added Successfully"});
                            }
                        });
                    }
                }    
            });   
        }
    });
  });  
};

function verifySecurityQues(param) {
    var data={};
    //console.log(param);
    var lang='en';
    if (param.lang) {
        var lang = param.lang;
    }
  return new Promise((resolve, reject) => { 
    db.query("SELECT id   FROM `ll_security_questions_ans` where user_id=?  and question_id=? and  ans=?", [param.user_id,param.question_id,param.ans],function (err, res) {
        if(err) {
            reject({"success":false,"message":err.code});
        }
        else{
            if(res.length!=0)
            {
                resolve({"success":true,data:[],"message":"Security Question verified Successfully"});
                  
            }else{
                reject({"success":false,data:[],"message":"Question answer is not correct. Please try again"});
                   
            }
        }    
    });   
  });     
};
function SecQuestiondisable(param) {
    var data={};
    var lang='en';
    if (param.lang) {
        var lang = param.lang;
    }
  return new Promise((resolve, reject) => {  
    db.query("SELECT id FROM `ll_security_questions_ans` where user_id=?", [param.user_id],function (err, res) {
        if(err) {
           reject({"success":false,"message":err.code});
        }
        else{
            if(res.length>0)
            {
              db.query("UPDATE ll_users SET security_question = ? where user_id=?", ['0',param.user_id], function (err, ress) {
                  if(err) {
                    reject({"success":false,"message":err.code});
                  }
                  else{
                    resolve({"success":true,data:[],"message":"Security Question Disable Successfully"});
                  }
              });
            }
        }    
    });   
  });     
};

function folloermail(username,email) {
    db.query("SELECT * FROM `ll_mail_template` WHERE id=5 order by id asc ", function (err, tempres) {
        if(tempres.length>0) {
          var channelrows={}
            channelrows.message=tempres[0].template_body;
            channelrows.subject=tempres[0].template_subject;
            channelrows.username=username;
            channelrows.email=email;
           // channelrows.image_url=products[k].image_url
            console.log(channelrows);
            sentMail(channelrows, function(callbackres){
                console.log(callbackres);
            });

        }
    });
}

function createExcel(argument) {
  console.log('createExcel module',argument);  
  // You can define styles as json object
const styles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: 'FF000000'
      }
    },
    font: {
      color: {
        rgb: 'FFFFFFFF'
      },
      sz: 12,
      bold: true,
      underline: false
    }
  },
  cellPink: {
    fill: {
      fgColor: {
        rgb: 'FFFFCCFF'
      }
    }
  },
  cellGreen: {
    fill: {
      fgColor: {
        rgb: 'FF00FF00'
      }
    }
  }
};
 
//Array of objects representing heading rows (very top)
const heading = [
  //[{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
 // ['a2', 'b2', 'c2'] // <-- It can be only values
];
 
//Here you specify the export structure
const specification = {
      username: { // <- the key should match the actual data key
        displayName: 'UserName', // <- Here you specify the column header
        headerStyle: styles.headerDark, // <- Header style
        // cellStyle: function(value, row) { // <- style renderer function
        //   // if the status is 1 then color in green else color in red
        //   // Notice how we use another cell value to style the current one
        //   return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
        // },
         width: 120 // <- width in pixels
      },
      email: {
        displayName: 'Email',
        headerStyle: styles.headerDark,
        // cellFormat: function(value, row) { // <- Renderer function, you can access also any row.property
        //   return (value == 1) ? 'Active' : 'Inactive';
        // },
        width: '40' // <- width in chars (when the number is passed as string)
      },
      country: {
        displayName: 'Country',
        headerStyle: styles.headerDark,
        //cellStyle: styles.cellPink, // <- Cell style
        width: 120 // <- width in pixels
      }
    }
     
    // The data set should have the following shape (Array of Objects)
    // The order of the keys is irrelevant, it is also irrelevant if the
    // dataset contains more fields as the report is build based on the
    // specification provided above. But you should have all the fields
    // that are listed in the report specification

    return new Promise((resolve, reject) => {  
      db.query("SELECT ll_users.username,ll_users.email,ll_country.name as country FROM `ll_users`,ll_country where ll_country.countryId=ll_users.country and ll_users.active=? order by username asc", [1],function (err, res,fields) {
              if(err) {
                 reject({"success":false,"message":err.code});
              }
              else{ 
                var dataset=[]
                for (var i = 0; i < res.length; i++) {
                  dataset.push({username:res[i].username, email: res[i].email, country:res[i].country})
                }
                    // Create the excel report.
                    // This function will return Buffer
                    const report = excel.buildExport(
                      [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                        {
                          name: 'Report', // <- Specify sheet name (optional)
                          heading: heading, // <- Raw heading array (optional)
                          //merges: merges, // <- Merge cell ranges
                          specification: specification, // <- Report specification
                          data: dataset // <-- Report data
                        }
                      ]
                    );
                   
                   /*** Delete old reports****/
                    deleteOldReport();

                     /*** Create New report****/
                    var filename= Date.now()+".xlsx";
                    s3bucket.createBucket(function () {
                         var params = {
                          Bucket: BUCKET_NAME+"/sixprofit/reportSheet",
                          Key: filename,
                          ACL: 'public-read',
                          Body:report,

                         };
                        s3bucket.upload(params, function (err, data) {
                            if (err) {
                             console.log('error in callback');
                             console.log(err);
                            }
                          //console.log(data);
                          resolve({"success":true,data:data.Location,"message":"Success"}); 
                        });
                   });
                }
              });      
  });
}
function deleteOldReport(){
   var param = {
    Bucket: BUCKET_NAME,
    Prefix: 'sixprofit/reportSheet/'
  };
  s3bucket.listObjects(param, function(err, data) {
     if (data.Contents.length != 0){
        param = {Bucket: BUCKET_NAME};
        param.Delete = {Objects:[]};

        data.Contents.forEach(function(content) {
          param.Delete.Objects.push({Key: content.Key});
        });

       console.log('param' ,param);
        s3bucket.deleteObjects(param, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
        });
      }
  });
}

function sentMail(argument) {
     const nodemailer = require("nodemailer");

    var username = argument.username;///dog/gi;timeLeft
    var message = argument.message;
    var subject = argument.subject;
    console.log('sentMail followers',argument.email);
    message =message.replace('[username]',argument.username );


    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
     user: 'forikbs@gmail.com',
      pass: 'kindle@123#',
    },
  });

  // send mail with defined transport object 
  let info = transporter.sendMail({
    from: '"FORI"<forikbs@gmail.com>', // sender address
    to: argument.email, // list of receivers
    subject:subject, // Subject line
   // text: '', // plain text body
    html: message, // html body
  });

  console.log("Message sent: %s", info.messageId);

}
module.exports = userModel;

