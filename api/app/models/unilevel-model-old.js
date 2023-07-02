var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
var request = require('request');

var unilevelModel = {
   getUnilevel:getUnilevel,
   getlevelprofit:getlevelprofit

}

function getUnilevel(userdata,callbackprice) {
  console.log('module',userdata);
  var user_id= userdata['user_id'];
  return new Promise((resolve,reject) => {
    db.query("SELECT * FROM sp_users WHERE user_id ='"+user_id+"'",(error,rows,fields)=>{
        if(!!error) {
            dbFunc.connectionRelease;
            reject(error);
        } else {
          if (rows.length>0) {
              var url = "http://cbdn2020.com/restAPI/unilevel.php?userID="+user_id;//"http://devapp.uzyth.com/devapi/unilevel.php?userID="+userID;//////
              console.log(url);
              request({url:url,'Content-Type':'application/json;charset=utf-8'}, function (error, response, body) {
                  ///console.log(response);
                  if (!error ) {
                    res = response;
                    res = res.body;
                    res = JSON.parse(res); 
                    resolve(res); 
                  } else {
                    //dbFunc.connectionRelease;
                    reject(error);
                  }
                                                      
                });
          }else{
            dbFunc.connectionRelease;
            reject("Invalid user ID");
          }
        }
      });      
    });
}


function getlevelprofit(userdata) {
    var user_id= userdata['user_id'];

  return new Promise((resolve,reject) => {
      db.query("SELECT sp_profit_distribution.* FROM sp_profit_distribution order by id asc",(error,levelList,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {
              console.log('depositList length',levelList.length);
              
                db.query("SELECT  COALESCE((SELECT SUM(sp_profit_distribution.user_profit) FROM `sp_profit_distribution` WHERE sp_profit_distribution.user_id=?),0) as profit, COALESCE( SUM(sp_deposit.amount),0) as investments, COALESCE((SELECT COUNT(*) FROM sp_deposit WHERE sp_deposit.user_id=sp_users.user_id and sp_deposit.payment_status='1' GROUP by sp_users.user_id ),0) as totalUsers FROM sp_users,sp_deposit WHERE sp_users.sponsor_id=? and sp_deposit.user_id=sp_users.user_id and sp_deposit.payment_status='1'",[user_id,user_id],(error,myLevel,fields)=>{
                    if(!!error) {
                      dbFunc.connectionRelease;
                      reject({"success":false,"message":error.code});
                    } else {    
                      resolve({"success":true,"message":"success",data:{levelList:levelList,myLevel:myLevel}});
                    }              
                })
              }
            
      });
      
  });
}
module.exports = unilevelModel;

