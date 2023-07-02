var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
var request = require('request');
const uuid = require('uuidv4').default;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('sixprofitSecureLevel1');

const Coinpayments = require("coinpayments");
var options={key:"" ,secret:"" }


var cronModel = {
   dailyBonus:dailyBonus

}

function dailyBonus(argument) {
	return new Promise((resolve,reject) => {
		console.log('dailyBonus');
		getFee(argument,function(callback){
			var daily_bonus_fee= callback['data'].daily_bonus_fee
			db.query("SELECT TIMESTAMPDIFF(HOUR,crdate,CURRENT_TIMESTAMP()) as hours, sp_deposit.* FROM sp_deposit  where payment_status='1'  HAVING hours>24  ",(error,depositList,fields)=>{
		        if(!!error) {
		            dbFunc.connectionRelease;
		          reject({"success":false,"message":error.code});
		        } else {
		        	console.log('depositList length',depositList.length);
		        	for (var i = 0; i < depositList.length; i++) {
		        		const crdate = depositList[i]['crdate'];  
		        		const depositid = depositList[i]['id']; 
		        		var b=0
		        		db.query("SELECT COUNT(*) as todayrun FROM `sp_daily_bonus` WHERE deposit_id=? and date(crdate)=date(NOW()) ",[depositid],(error,existdeposit,fields)=>{
		        			const amount = depositList[b]['amount_received_USD']; 
			        		const user_id = depositList[b]['user_id'];
			        		const deposit_id = depositList[b]['id']; 
			        		var dailyProfit= (amount)*daily_bonus_fee/100;
		        			if (existdeposit[0].todayrun==0) {
		        				sp_daily_bonus(user_id,deposit_id,dailyProfit,daily_bonus_fee);
		        			}
		        			b++;
		        		})
		        		resolve({"success":true,"message":"success",data:depositList});
		        	}
		        }	
			});
		});	  
	});
}

function sp_daily_bonus(user_id,deposit_id,dailyProfit,daily_bonus_fee) {		
	db.query("INSERT INTO `sp_daily_bonus`( `user_id`, `deposit_id`, `bonus_amount`, `bonus_per`) VALUES (?,?,?,?)",[user_id,deposit_id,dailyProfit,daily_bonus_fee],(error,rows,fields)=>{
	    if(!!error) {
	    	 console.log('error',error);
	         dbFunc.connectionRelease;
	         reject({"success":false,"message":error.code});
	    }
	    unilevelBonus(user_id)
	    dbFunc.connectionRelease;
	}); 
	       

}
function getFee(arg,callback) {
	
		
	db.query("SELECT daily_bonus_fee,deposit_fee,parent_profit,mini_deposit FROM sp_admin_fee_setting ",(error,fees,fields)=>{
        if(!!error) {
            dbFunc.connectionRelease;
           return callback({"success":false,"message":error.code});
        } else {
        	return callback({"success":true,data:fees[0]});
        }
    }); 
	       

}
function deleteCanceledDeposit(argument) {
 	db.query("delete from `sp_deposit` WHERE TIMESTAMPDIFF(MINUTE,crdate,CURRENT_TIMESTAMP())>30 ",(error,rows,fields)=>{
        if(!!error) {
            dbFunc.connectionRelease;
            reject(error);
        }
   	});
   	db.query("delete from `sp_deposit` WHERE txn_ID='' and TIMESTAMPDIFF(MINUTE,crdate,CURRENT_TIMESTAMP())>1 ",(error,rows,fields)=>{
        if(!!error) {
            dbFunc.connectionRelease;
            reject(error);
        }
   	});
}

function unilevelBonus(argument) {
	//return new Promise((resolve,reject) => {
		getlevel(argument,function(callback){
    		db.query("SELECT sp_daily_bonus.*, sp_users.sponsor_id FROM sp_users,sp_daily_bonus WHERE sp_users.user_id=sp_daily_bonus.user_id",(error,dialybonusList,fields)=>{
		        if(!!error) {
		            dbFunc.connectionRelease;
		          reject({"success":false,"message":error.code});
		        } else {
		        	for (var k = 0; k < dialybonusList.length; k++) {
		        		
		        		const id = dialybonusList[k]['id'];  
		        		var b=0
		        		db.query("SELECT COUNT(*) as todayrun FROM `sp_unilevel_bonus` WHERE daily_bonus_id=? and date(crdate)=date(NOW()) ",[id],(error,existdeposit,fields)=>{
			        		const amount = dialybonusList[b]['bonus_amount']; 
			        		const sponsor_id = dialybonusList[b]['sponsor_id'];
			        		const user_id = dialybonusList[b]['user_id'];
			        		const bonus_per=12;
			        		const daily_bonus_id = dialybonusList[b]['id'];  
			        		var unilevelProfit= (amount)*bonus_per/100;
			        		const level=1
			        		db.query("INSERT INTO `sp_unilevel_bonus`(status,`user_id`, `from_id`,daily_bonus_id, `level`, `bonus`, `bonus_percentage`) VALUES (?,?,?,?,?,?,?)",['1',sponsor_id,user_id,daily_bonus_id,level,unilevelProfit,bonus_per],(error,rows,fields)=>{
						        if(!!error) {
						        	 console.log('error',error);
						             dbFunc.connectionRelease;
						        }
					    	});
					    	b++
				    	});
        			}
        		}
        			
        	});	
		});	  
	//});
}
function getlevel(arg,callback) {
	
		
	db.query("SELECT level,value FROM sp_unilevel_profit ",(error,level,fields)=>{
        if(!!error) {
            dbFunc.connectionRelease;
           return callback({"success":false,"message":error.code});
        } else {
        	return callback({"success":true,data:level});
        }
    }); 
	       

}
module.exports = cronModel;

