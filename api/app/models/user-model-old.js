var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const uuid = require('uuidv4').default;
const bcrypt = require('bcrypt');
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');
const excel = require('node-excel-export');

var stripe = require('stripe')('sk_test_cKXLMHtkXrR4E04TEeRZmmLk');

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
  createExcel:createExcel

}

function getAllUser(arg) {
  return new Promise((resolve,reject) => {
        //To calculate Total Count use MySQL count function
    db.query("Select count(*) as TotalCount from sp_users", function(err, rows) {
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
      db.query("SELECT isDelete, user_id,first_name,last_name, username,email,phone,gender,profile_pic,city,state,country,active from sp_users where "+searchStr+" "+filter+" isAdmin= ?   order by username asc  ", ['0'], function (err, res) {
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
    return new Promise((resolve,reject) => {
        db.query("SELECT u.*,c.name as countryName FROM sp_users as u ,sp_country as c WHERE c.countryId=u.country and u.user_id =?",[id.id],(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                reject(error);
            } else {
              rows[0]['userDetail']=[]
              db.query("Select `name`, `value` from sp_users_detail  WHERE name!='two_fa_secret' and user_id = ?", [id.id], function (err, res) {
                  if(err) {
                      reject({"success":false,"message":err.code});
                  }
                  else{
                      if(res.length!=0)
                      { 
                        rows[0]['userDetail']=res;
                        resolve(rows);
                      }else{
                        resolve(rows);
                      }
                  }
              });  
              dbFunc.connectionRelease;
              
            }
       });
    });  
}

function addUser(user) {
    var user_id=uuid();
   // console.log('--addUser---');
    return new Promise((resolve,reject) => {
      db.query("INSERT INTO sp_users(user_id,username,sponsor_id,email,password)VALUES("+user_id+","+user.username+"','"+user.sponsor_id+"','"+user.email+"','"+user.password+"')",(error,rows,fields)=>{
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
        db.query("UPDATE sp_users set username='"+user.username+"',email='"+user.email+"',first_name='"+user.first_name+"',last_name='"+user.last_name+"' WHERE user_id='"+id+"'",(error,rows,fields)=>{
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
       db.query("SELECT active FROM sp_users WHERE user_id=?",[id],(error,rows,fields)=>{
          if(!!error) {
              dbFunc.connectionRelease;
              reject(error);
          } else {
            if(rows.length>0){
              var active = rows[0].active;
              if (active==1) {  active = 0 } else {  active = 1}
              db.query("UPDATE sp_users set active=? WHERE user_id=?",[active,id],(error,rows,fields)=>{
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
        //db.query("DELETE FROM sp_users WHERE user_id='"+id+"'",(error,rows,fields)=>{
        db.query("UPDATE sp_users set isDelete=? WHERE user_id=?",['1',id],(error,rows,fields)=>{

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
        db.query("Select sp_users.user_id,sp_users.username,sp_users.email,sp_users.password from sp_users  WHERE user_id = ?", [userData.user_id], function (err, res) {
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
                        db.query("UPDATE `sp_users` SET password=? where user_id=?", [hash,user_id], function (err, row) {
                          if(err) {
                            reject({"success":false,"message":error.code});
                          }
                        });    
                        db.query("UPDATE `sp_forgot_password` SET ? where user_id=?", [updateUserData,user_id], function (err, row) {
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
        db.query("Select sp_users.user_id,sp_users.username,sp_users.email from sp_users  WHERE user_id = ?", [userData.user_id], function (err, res) {
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
                        db.query("Select user_id,email from sp_users  WHERE email = ?", [userData.confemail], function (err, res) {
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
                            db.query("UPDATE `sp_users` SET email=? where user_id=?", [userData.confemail,user_id], function (err, row) {
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
    db.query("Select sp_users.user_id,sp_users.username,sp_users.email from sp_users  WHERE user_id = ?", [userData.user_id], function (err, res) {
      if(err) {
          reject({"success":false,"message":error.code});
      }
      else{
        if(res.length!=0)
        {   
          var profile_pic=userData.profile_pic;
          var user_id=res[0].user_id;
          if(userData.profile_pic){
            db.query("UPDATE `sp_users` SET profile_pic=? where user_id=?", [profile_pic,user_id], function (err, row) {
                if(err) {
                   reject({"success":false,"message":error.code});
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
        db.query("Select `first_name`, `last_name` ,sp_users.user_id,sp_users.username,sp_users.email from sp_users  WHERE user_id = ?", [userData.user_id], function (err, res) {
            if(err) {
                reject({"success":false,"message":error.code});
            }
            else{
                if(res.length!=0)
                {   
                    const updateUserData ={};
                    var email=res[0].email;
                    var user_id=res[0].user_id;                      
                    updateUserData['first_name'] =userData.first_name;
                    updateUserData['last_name'] =userData.last_name;
                    updateUserData['phone'] =userData.phone;
                    updateUserData['dob'] =userData.dob;
                    updateUserData['passport_no'] =userData.passport_no;
                    updateUserData['country'] =userData.country;
                    var values = [];
                      if (userData.userDetail) {
                        var userDetail =JSON.parse(userData.userDetail);  
                        db.query("Select `name`, `value` from sp_users_detail  WHERE (name ='address' or name='location') and user_id = ?", [userData.user_id], function (err, res) {
                        if(err) {
                            reject({"success":false,"message":err.code});
                        }
                        else{
                            if(res.length!=0)
                            { 
                                                            
                              for (var key in userDetail) {
                                //values.push([user_id, key,userDetail[key]]);
                                console.log('values err',"["+user_id+","+ key+","+userDetail[key]+"]");
                                db.query("UPDATE `sp_users_detail` SET value=? where user_id=? and name=?", [userDetail[key],user_id,key], function (err, row) {
                                    if(err) {
                                       reject({"success":false,"message":err.code});
                                    }
                                });
                              }
                              
                            }else{
                              for (var key in userDetail) {
                                 values.push([user_id, key,userDetail[key]]);
                              }
                              db.query("INSERT INTO `sp_users_detail` (user_id,name, value) VALUES ? ", [values], function (err, row) {
                                  if(err) {
                                     console.log('values err',err);
                                     reject({"success":false,"message":err.code});
                                  }
                              });
                            }
                          }
                        });    
                      }
                      db.query("UPDATE `sp_users` SET ? where user_id=?", [updateUserData,user_id], function (err, row) {
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
    db.query("Select user_id from sp_users WHERE user_id = ?", [userData.user_id], function (err, res) {
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
              db.query("Select `name`, `value` from sp_users_detail  WHERE name='two_fa_secret' and  user_id = ?", [userData.user_id], function (err, rows) {
                if(err) {
                  console.log('values err',err);
                    reject({"success":false,"message":err.code});
                }
                else{
                    if(rows.length!=0)
                    { 
                      db.query("UPDATE sp_users_detail SET  value= ? WHERE name='two_fa_secret' and user_id = ?", [secret.base32, userData.user_id], function (err, rows) {
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
                      db.query("INSERT INTO `sp_users_detail` (user_id,name, value) VALUES (?,?,?) ", [userData.user_id,'two_fa_secret',secret.base32], function (err, row) {
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

    db.query("Select (SELECT value FROM `sp_users_detail` WHERE name='two_fa_secret' and user_id=?) as two_fa_secret, user_id,two_fa_actived,email,active,username,isAdmin,profile_pic from sp_users WHERE user_id = ?", [arg.user_id,arg.user_id], function (err, res) {
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
                    db.query("UPDATE sp_users SET two_fa_actived = ? WHERE user_id = ?", ['1', id], function (err, rows) {
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
    db.query("Select user_id,value as two_fa_secret from sp_users_detail WHERE name='two_fa_secret' and user_id = ?", [arg.user_id], function (err, res) {
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
                  db.query("UPDATE sp_users SET two_fa_actived=? WHERE user_id = ?", ['0', id], function (err, rows) {
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
  
    db.query("SELECT id,question   FROM `sp_security_questions` ", function (err, res) {
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
    db.query("SELECT q.id,q.question   FROM `sp_security_questions` as q ,sp_security_questions_ans as a WHERE q.id=a.question_id and a.user_id=?",[param.user_id] ,function (err, res) {
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
    db.query("SELECT id,question   FROM `sp_security_questions` where id=?", [param.question_id],function (err, res) {
        if(err) {
          reject({"success":false,"message":err.code});
        }
        else{
            db.query("SELECT id   FROM `sp_security_questions_ans` where user_id=?", [param.user_id],function (err, res) {
                if(err) {
                   reject({"success":false,"message":err.code});
                }
                else{
                    db.query("UPDATE sp_users SET security_question = ? where user_id=?", ['1',param.user_id], function (err, ress) {
                    });
                    if(res.length>0)
                    {
                       db.query("UPDATE `sp_security_questions_ans` SET question_id = ?,ans=? where id=?", [param.question_id,param.ans,res[0].id], function (err, rows) {
                            if(err) {
                                reject({"success":false,"message":err.code});
                            }
                            else{
                                
                              resolve({"success":true,data:[],"message":"Security Question Updated Successfully"});

                            }
                        });
                    }else{
                        db.query("INSERT INTO `sp_security_questions_ans`( `user_id`, `question_id`, `ans`) VALUES (?,?,?)", [param.user_id,param.question_id,param.ans], function (err, rows) {
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
    db.query("SELECT id   FROM `sp_security_questions_ans` where user_id=?  and question_id=? and  ans=?", [param.user_id,param.question_id,param.ans],function (err, res) {
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
    db.query("SELECT id FROM `sp_security_questions_ans` where user_id=?", [param.user_id],function (err, res) {
        if(err) {
           reject({"success":false,"message":err.code});
        }
        else{
            if(res.length>0)
            {
              db.query("UPDATE sp_users SET security_question = ? where user_id=?", ['0',param.user_id], function (err, ress) {
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
      db.query("SELECT sp_users.username,sp_users.email,sp_country.name as country FROM `sp_users`,sp_country where sp_country.countryId=sp_users.country and sp_users.active=? order by username asc", [1],function (err, res,fields) {
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
module.exports = userModel;

