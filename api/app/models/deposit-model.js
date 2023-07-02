var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
var request = require('request');
const uuid = require('uuidv4').default;
const Cryptr = require('cryptr');
var stripe = require('stripe')('sk_test_cKXLMHtkXrR4E04TEeRZmmLk');

const cryptr = new Cryptr('sixprofitSecureLevel1');

var Publishablekey = 'pk_test_9LqE1yv4N81lrIeO56aVJKkJ';

const Coinpayments = require("coinpayments");
var options={key:"" ,secret:"" }


var depositModel = {
   createTransaction:createTransactionWithStripe,
   // transactionStatus:transactionStatus,
   depositHistory:depositHistory,
   getMyBalance:getMyBalance,
   myHistory:myHistory

}

function createTransactionWithStripe(argument) {
	console.log("argument",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {

		/*stripe.tokens.create({
		    card: {
		      number: argument['cardnum'],
		      exp_month: argument['expmon'],
		      exp_year: argument['expyear'],
		      cvc: argument['cvv']},
		},function(err, token) {
  			if(err){
  				console.log("Not working"+err)
  				reject({"success":false,"message":err});

			}else{*/
				var fromaddress= argument['trx_address'];
				//http://dev1.kindlebit.com/Development/trc20trx/gettransactionhistory.php?address=TRdoTa6RRfW2yTaqietaAsLGRf36h99KL5
				var url= "http://dev1.kindlebit.com/Development/trc20trx/gettransactionhistory.php?address="+fromaddress;
				request.get({url:url,'Content-Type':'application/json;charset=utf-8'}, function (err, httpResponse, data) {
					try {
						if (err) {
							console.log('history failed:', err);
						}else{  
							data = JSON.parse(data); 
							console.log('transaction  Status',data);
						}
					} catch (err) {
						console.log(err);
					}
				});	
				/*stripe.customers.createSource(dataArr['strip_id'],{source: token.id},function(err, card) {
					if(err) {
						console.log('err---------'+err);
						reject({"success":false,"message":err});
					}
					else
					{ 
						console.log('card---------',card);
						stripe.charges.create({
						  	amount: 100*100,
						  	currency: 'usd',
						  	customer: dataArr['strip_id'],
						},function(err, charge) {
					        if (err && err.type === 'StripeCardError') {
					            console.log(JSON.stringify(err, null, 2));
					            reject({"success":false,"message":err});
					        }else{
					        	//console.log('charge',charge);
					        	if (charge.paid==true) {

					        		charge['user_id']=argument.user_id
					        		saveTransaction(charge)
				       				resolve({"success":true,"message":'done','charge':charge});
				       			}
				    		}
				    	});


						/*	).then((charge) => {
							console.log('charge pbject----'+charge)
							   resolve({"success":true,"message":'done','charge':charge});
						// New charge created on a new customer
						}).catch((err) => {

							console.log('charge pbject err----'+err)
							   reject({"success":false,"message":err});
						// Deal with an error
						});   *

					}
						// asynchronously called
				});*/
  			//}
	    // asynchronously called
	  	//});
  	});

}
function saveTransaction(argument) {
	//console.log('createTransaction',argument);
  	var user_id= argument['user_id'];
	db.query("SELECT sp_users.email,sp_users.sponsor_id,sp_users.username FROM sp_users WHERE sp_users.user_id =?",[user_id],(error,rows,fields)=>{
        if(!!error) {
            dbFunc.connectionRelease;
            console.log('error',error);
            reject({"success":false,"message":error.code});
        } else {
			if (rows.length>0) {
				var deposit_id=uuid();
				var currency=argument.currency;
				var amount= argument.amount
				var txn_ID= argument.id
				var status_url= argument.receipt_url
				var payment_method= argument.payment_method
				var balance_transaction= argument.balance_transaction
		    	var txn= {}
		    	txn['id'] =deposit_id
                txn['user_id'] =user_id;
                txn['balance_transaction'] =balance_transaction;
                txn['status_url'] =status_url;
                txn['currency'] =currency;
				txn['payment_method'] =payment_method;
				txn['amount'] =amount/100;
				txn['fee'] =0;
				txn['txn_ID'] =txn_ID;
				txn['payment_status'] ='1';
				txn['livemode'] = argument.livemode;
				txn['card_detail'] = JSON.stringify(argument.payment_method_details);
				
		    	db.query("INSERT INTO `sp_deposit` set ?", [txn],(error,rows,fields)=>{
			        if(!!error) {
			            dbFunc.connectionRelease;
			            reject({"success":false,"message":error.code});
			        }
			    	db.query("UPDATE `sp_users` SET isPay=? where user_id =?", ['1',user_id], function (err, row) {
				        if(!!error) {
				            dbFunc.connectionRelease;
				            reject({"success":false,"message":error.code});
				        }
			    	});
			        addUserinTree(user_id);
		    	});
			}else{
				dbFunc.connectionRelease;
				reject({"success":false,"message":"Invalid user ID"});
			}
		}
	}); 
	      		
}

function addUserinTree(user_id) {
	if (user_id) {
		var url = "http://18.220.14.34/cbdn/api/unilevel.php?myID="+user_id;//"http://devapp.uzyth.com/devapi/unilevel.php?userID="+userID;//////                                            
		console.log('transactionStatus url',url);
		request.get({url:url,'Content-Type':'application/json;charset=utf-8'}, function (err, httpResponse, data) {
			try {
				if (err) {
					console.log('history failed:', err);
				}else{  
					data = JSON.parse(data); 
					console.log('transaction  Status',data);
				}
			} catch (err) {
				console.log(err);
			}
		});	
	}	

}
function depositHistory(argument) {
	var user_id= argument['user_id'];
  	return new Promise((resolve,reject) => {
  		db.query("SELECT (SELECT COALESCE (SUM(bonus),0) as profit FROM `sp_affiliate_bonus` WHERE deposit_id=sp_deposit.id ) as profit, sp_users.email,sp_users.username,sp_deposit.* FROM sp_users,sp_deposit WHERE sp_deposit.txn_ID!='' and  sp_deposit.user_id=sp_users.user_id and  sp_users.user_id =?",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            reject({"success":false,"message":error.code});
	        } else {

	        	resolve({"success":true,"message":"success",data:rows});
	        }
	    });    	

  	});
}

function getMyBalance(argument) {
	var user_id = argument['user_id'];
	return new Promise((resolve,reject) => {
		db.query("SELECT  COALESCE(SUM(dis.user),0) as herbalProduct,COALESCE(SUM(dis.charity),0) as charity,COALESCE(SUM(dis.server),0) as serverProfit,COALESCE(SUM(dis.company_admin),0) as company_admin,COALESCE(SUM(dis.user_profit),0) as userProfit,COALESCE(SUM(reinvest),0) as reinvest,(SELECT COALESCE(SUM(`amount`),0) as amount  FROM `sp_deposit` WHERE `user_id`=? and `payment_status`='1') as invenst , sp_users.username,sp_users.user_id FROM sp_users,sp_profit_distribution as dis WHERE dis.user_id=sp_users.user_id and sp_users.user_id =?",[user_id,user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            reject({"success":false,"message":error.code});
	        } else {
	        	console.log('getMyBalance',rows);
	        	resolve({"success":true,"message":"success",data:rows});
	        }
	    });    	

	});
}

function myHistory(argument) {
	console.log(myHistory,argument)
	var user_id= argument['user_id'];
  	return new Promise((resolve,reject) => {
  		var startNum = 0;
	    var LimitNum =25;

  		/*if(argument.page == ''){
	        var startNum = 0;
	        var LimitNum = 5;
	    }else{
	        //parse int Convert String to number 
	        var startNum = parseInt(argument.page)*5;
	        var LimitNum = 5;
	    }
	    totalPages(user_id,function(totalRec) {
	        var totalPage =0;
	        var currentPage =0;
	        if (totalRec>0) {
	            totalPage =Math.ceil(totalRec/LimitNum);
	            console.log('totalPage',totalPage)
	            currentPage = parseInt(argument.page);//+LimitNum;
	           // currentPage = Math.floor(currentPage/LimitNum);
	            console.log('currentPage',currentPage)
	        }

	  		 //store Total count in variable
	        let totalCount = rows[0].TotalCount
	        if(argument.start == '' || argument.limit == ''){
	            let startNum = 0;
	            let LimitNum = 25;
	        }
	        else{
	            //parse int Convert String to number 
	            var startNum = parseInt(argument.start);
	            var LimitNum = parseInt(argument.limit);
	        }
	    }*/
      /*if(argument.pType){
      	 if (argument.pType=='DEPOSIT') {
      	 	var sql="SELECT sp_deposit.id ,IF(sp_deposit.id IS NULL,0,'DEPOSIT') as type,sp_deposit.amount_received_USD as profit,sp_deposit.crdate FROM sp_deposit WHERE sp_deposit.user_id =? and sp_deposit.payment_status='1'";

      	 }
      	 if (argument.pType=='BONUS') {
      	 	var sql =" SELECT sp_daily_bonus.id ,IF(sp_daily_bonus.id IS NULL,0,'BONUS') as type,sp_daily_bonus.bonus_amount as profit,sp_daily_bonus.crdate FROM sp_daily_bonus WHERE sp_daily_bonus.user_id =?";
      	 }
      	 if (argument.pType=='WITHDRAW') {
      	 	
      	 }

      }
      console.log('filter',filter);
      var searchStr='';
      if(argument.searchStr){
        var searchStr= "( username like '%"+argument.searchStr+"%' or  email like '"+argument.searchStr+"%') and ";
        if(argument.searchStr==''){
            var searchStr='';
        }
      }*/

  		db.query("SELECT sp_deposit.id ,IF(sp_deposit.id IS NULL,0,'DEPOSIT') as type,sp_deposit.amount as profit,sp_deposit.crdate FROM sp_deposit WHERE sp_deposit.user_id =? and sp_deposit.payment_status='1'  UNION SELECT sp_profit_distribution.id ,IF(sp_profit_distribution.id IS NULL,0,'PROFIT') as type,sp_profit_distribution.user_profit as profit,sp_profit_distribution.crdate FROM sp_profit_distribution WHERE sp_profit_distribution.user_id =? UNION SELECT sp_profit_distribution.id ,IF(sp_profit_distribution.id IS NULL,0,'REINVEST') as type,sp_profit_distribution.reinvest as profit,sp_profit_distribution.crdate FROM sp_profit_distribution WHERE sp_profit_distribution.user_id =? order by crdate DESC limit ? OFFSET ?",[user_id,user_id,user_id,LimitNum,startNum],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            reject({"success":false,"message":error.code});
	        } else {

	        	resolve({"success":true,"message":"success",data:rows});
	        }
	    });    	

  	});
}


function getFee(arg,callback) {
	// 3PvFeFmbRdjhwz1Cs27w8ZdnCu7Lp7gs54 
	// var pvt_key =cryptr.encrypt("07cf87694b0700c04d9de73c21dfd18b18c90284847eab552d790984c02dcab9");
	// var pub_key= cryptr.encrypt("CedEa217e0b17C044f68fd63c52Cb00417a4C7e00845A27b2df969e131d780e3");
	// db.query("INSERT INTO `sp_payment_gateway`( `pub_key`,`pvt_key`) VALUES (?,?)",[pub_key,pvt_key],(error,rows,fields)=>{
 //        if(!!error) {
 //            dbFunc.connectionRelease;
 //            reject({"success":false,"message":error.code});
 //        }
	// });
	//return new Promise((resolve,reject) => {
		db.query("SELECT pub_key,pvt_key,gateway FROM `sp_payment_gateway`  ",(error,gateway,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	           return callback({"success":false,"message":error.code});
	        } else {
	        	db.query("SELECT deposit_fee,parent_profit,mini_deposit FROM sp_admin_fee_setting ",(error,fees,fields)=>{
			        if(!!error) {
			            dbFunc.connectionRelease;
			           return callback({"success":false,"message":error.code});
			        } else {
			        	return callback({"success":true,data:{gateway:gateway[0],fee:fees[0]}});
			        }
			    }); 
	        }
	    }); 
  		   	

  	//}); 
}
function totalPages(arg,callback) {
  		db.query("SELECT sp_deposit.id ,IF(sp_deposit.id IS NULL,0,'DEPOSIT') as type,sp_deposit.amount_received_USD as profit,sp_deposit.crdate FROM sp_deposit WHERE sp_deposit.user_id =? and sp_deposit.payment_status='1'  UNION SELECT sp_unilevel_bonus.id ,IF(sp_unilevel_bonus.id IS NULL,0,'BONUS') as type,sp_unilevel_bonus.bonus as profit,sp_unilevel_bonus.crdate FROM sp_unilevel_bonus WHERE sp_unilevel_bonus.user_id =? order by crdate DESC ",[arg.user_id,arg.user_id,arg.user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	           return callback({"success":false,"message":error.code});
	        } else {
	        	db.query("SELECT deposit_fee,parent_profit,mini_deposit FROM sp_admin_fee_setting ",(error,fees,fields)=>{
			        if(!!error) {
			            dbFunc.connectionRelease;
			           return callback({"success":false,"message":error.code});
			        } else {
			        	return callback({"success":true,data:{gateway:gateway[0],fee:fees[0]}});
			        }
			    }); 
	        }
	    }); 
}
function deleteCanceledDeposit(argument) {
	// db.query("UPDATE `sp_deposit` SET `payment_status`='2' WHERE TIMESTAMPDIFF(MINUTE,crdate,CURRENT_TIMESTAMP())>30 ",(error,rows,fields)=>{
 //        if(!!error) {
 //            dbFunc.connectionRelease;
 //            reject(error);
 //        }
 //   	});
 	// db.query("delete from `sp_deposit` WHERE TIMESTAMPDIFF(MINUTE,crdate,CURRENT_TIMESTAMP())>30 ",(error,rows,fields)=>{
  //       if(!!error) {
  //           dbFunc.connectionRelease;
  //           reject(error);
  //       }
  //  	});
   	db.query("delete from `sp_deposit` WHERE txn_ID='' and TIMESTAMPDIFF(MINUTE,crdate,CURRENT_TIMESTAMP())>30 ",(error,rows,fields)=>{
        if(!!error) {
            dbFunc.connectionRelease;
            reject(error);
        }
   	});
}
module.exports = depositModel;

