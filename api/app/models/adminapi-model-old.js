var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
var request = require('request');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('sixprofitSecureLevel1');

const Coinpayments = require("coinpayments");
var options={key:"" ,secret:"" }

const uuid = require('uuidv4').default;
var mail = require('./../../common/mailer.js');

/*
var S3Zipper = require ('aws-s3-zipper');
const AWS = require('aws-sdk');
const USER_KEY = 'AKIATUGJAROHBQOMXDGN';
const USER_SECRET = '2X1GqvtwzLPTJOxlb2GEgSrDXztdEmokaw4CB1/L';
const BUCKET_NAME = 'uzyth';

 let s3bucket = new AWS.S3({
       accessKeyId: USER_KEY,
       secretAccessKey: USER_SECRET,
       Bucket: BUCKET_NAME,
     });
*/
var adminapiModel = {
	getfeeDetail:getfeeDetail,
	updatefeeDetail:updatefeeDetail,
	downloadList: downloadList, 
	uploadDownload:uploadDownload,
	updatefileStatus:updatefileStatus , 
	deletefile:deletefile,
	getfile:getfile,
	dashboardStack:dashboardStack,
	topDeposit:topDeposit,
	depositReport:depositReport,
	updateUnilevel:updateUnilevel,
	withdrawReport:withdrawReport,
	directbonusReport:directbonusReport,
	dailyprofitReport:dailyprofitReport,
	resendmail:resendmail,
	getPackage:getPackage,
	updatePackage:updatePackage,
	updateFeeUnilevel:updateFeeUnilevel,
	getTestimonial:getTestimonial,
	updateTestimonial:updateTestimonial

}




function getfeeDetail(userdata) {
	console.log('updatefeeDetail module',userdata);
  	return new Promise((resolve,reject) => {
  		 
    	db.query("SELECT * FROM `sp_unilevel_profit` order by level asc",(error,levelSetting,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
      
		      	db.query("SELECT sp_admin_fee_setting.* FROM sp_admin_fee_setting order by id asc",(error,feeSetting,fields)=>{
		            if(!!error) {
		              dbFunc.connectionRelease;
		              reject({"success":false,"message":error.code});
		            } else {  
		            console.log('updatefeeDetail module',feeSetting);            
		                resolve({"success":true,"message":"success",data:feeSetting[0],level:levelSetting});
		            }
		            
		      	});
		    }
      });
      
  	});
}

function getPackage(userdata) {
	console.log('getPackage module',userdata);
  	return new Promise((resolve,reject) => {
  		 
    	db.query("SELECT * FROM `sp_package` order by id asc",(error,package,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",data:package});
		    }
      });
      
  	});
}
function updatePackage(packdata) {
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		updateData['pack_name'] =packdata.pack_name
		updateData['parent'] =packdata.parent;
		updateData['grandparent'] =packdata.grandparent;
		updateData['unlock_user'] =packdata.unlock_user;
		updateData['value'] =packdata.value ;
		const packID =packdata.pack_id;
		// updateData['unilevel_license'] =feedata.unilevel_license;
		
      	db.query("UPDATE `sp_package` SET ? where id=?", [updateData,packID], function (error, row) {

	        if(!!error) {
	            dbFunc.connectionRelease;
	             console.log('error',error);
	            reject({"success":false,"message":error.code});
	        }else{
	        	
	        	db.query("SELECT sp_package.* FROM sp_package order by id asc",(error,feeSetting,fields)=>{
		            if(!!error) {
		              dbFunc.connectionRelease;
		              reject({"success":false,"message":error.code});
		            } else {              
		               resolve({"success":true,"message":"success",data:feeSetting});
		            }
		            
		      	});
	        }
		});
      
  	});
}
function updatefeeDetail(feedata) {
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		updateData['daily_bonus_fee'] =feedata.daily_bonus_fee
		updateData['mini_deposit'] =feedata.mini_deposit;
		updateData['deposit_fee'] =feedata.deposit_fee;
		updateData['parent_profit'] =feedata.parent_profit;
		updateData['withdraw_fee'] =feedata.withdraw_fee;
		// updateData['unilevel_investment'] =feedata.unilevel_investment;
		// updateData['unilevel_license'] =feedata.unilevel_license;
		
      	db.query("UPDATE `sp_admin_fee_setting` SET ? where id=?", [updateData,1], function (error, row) {

	        if(!!error) {
	            dbFunc.connectionRelease;
	             console.log('error',error);
	            reject({"success":false,"message":error.code});
	        }else{
	        	
	        	db.query("SELECT sp_admin_fee_setting.* FROM sp_admin_fee_setting order by id asc",(error,feeSetting,fields)=>{
		            if(!!error) {
		              dbFunc.connectionRelease;
		              reject({"success":false,"message":error.code});
		            } else {              
		               resolve({"success":true,"message":"success",data:feeSetting[0]});
		            }
		            
		      	});
	        }
		});
      
  	});
}
function updateUnilevel(userdata) {
    //console.log(userdata);
    var data={};
    var udata={};
    	
	return new Promise((resolve,reject) => {
		if(userdata.level_1==1){
			var udata={};
			udata['users']= userdata.users_1;
        	udata['max_profit']= userdata.max_profit_1;
        	udata['reg_slots']= userdata.reg_slots_1;
			udata['value']= userdata.value_1;
			udata['plan_text']= userdata.plan_text_1;
			udata['amount_cal']= userdata.amount_cal_1;
			udata['amount']= new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(userdata.amount_cal_1);
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,1], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		if(userdata.level_2==2){
			var udata={};
			udata['users']= userdata.users_2;
        	udata['max_profit']= userdata.max_profit_2;
        	udata['reg_slots']= userdata.reg_slots_2;
			udata['amount']= new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(userdata.amount_cal_2);
			udata['value']= userdata.value_2;
			udata['plan_text']= userdata.plan_text_2;
			udata['amount_cal']= userdata.amount_cal_2;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,2], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		if(userdata.level_3==3){
			var udata={};
			udata['users']= userdata.users_3;
        	udata['max_profit']= userdata.max_profit_3;
        	udata['reg_slots']= userdata.reg_slots_3;
			udata['value']= userdata.value_3;
			udata['plan_text']= userdata.plan_text_3;
			udata['amount_cal']= userdata.amount_cal_3;
			udata['amount']= new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(userdata.amount_cal_3);
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,3], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		if(userdata.level_4==4){
			var udata={};
			udata['users']= userdata.users_4;
        	udata['max_profit']= userdata.max_profit_4;
        	udata['reg_slots']= userdata.reg_slots_4;
			udata['value']= userdata.value_4;
			udata['plan_text']= userdata.plan_text_4;
			udata['amount_cal']= userdata.amount_cal_4;
			udata['amount']= new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(userdata.amount_cal_4);
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,4], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}if(userdata.level_5==5){
			var udata={};
			udata['users']= userdata.users_5;
        	udata['max_profit']= userdata.max_profit_5;
        	udata['reg_slots']= userdata.reg_slots_5;
			udata['value']= userdata.value_5;
			udata['plan_text']= userdata.plan_text_5;
			udata['amount_cal']= userdata.amount_cal_5;
			udata['amount']= new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(userdata.amount_cal_5);
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,5], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}if(userdata.level_6==6){
			var udata={};
			udata['users']= userdata.users_6;
        	udata['max_profit']= userdata.max_profit_16;
        	udata['reg_slots']= userdata.reg_slots_6;
			udata['value']= userdata.value_6;
			udata['plan_text']= userdata.plan_text_6;
			udata['amount_cal']= userdata.amount_cal_6;
			udata['amount']= new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(userdata.amount_cal_6);
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,6], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}if(userdata.level_7==7){
			var udata={};
			udata['users']= userdata.users_7;
        	udata['max_profit']= userdata.max_profit_7;
        	udata['reg_slots']= userdata.reg_slots_7;
			udata['value']= userdata.value_7;
			udata['plan_text']= userdata.plan_text_7;
			udata['amount_cal']= userdata.amount_cal_7;
			udata['amount']= new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(userdata.amount_cal_7);
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,7], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		if(userdata.level_8==8){
			var udata={};
			//udata['level']=  userdata.level_Default;
			udata['users']= userdata.users_8;
        	udata['max_profit']= userdata.max_profit_8;
        	udata['reg_slots']= userdata.reg_slots_8;
			udata['value']= userdata.value_8;
			udata['plan_text']= userdata.plan_text_8;
			udata['amount_cal']= userdata.amount_cal_8;
			udata['amount']= new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(userdata.amount_cal_8);
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,8], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		
		if(userdata.level_9==9){
			var udata={};
			udata['users']= userdata.users_9;
        	udata['max_profit']= userdata.max_profit_9;
        	udata['reg_slots']= userdata.reg_slots_9;
			udata['value']= userdata.value_9;
			udata['plan_text']= userdata.plan_text_9;
			udata['amount_cal']= userdata.amount_cal_9;
			udata['amount']= new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(userdata.amount_cal_9);
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,9], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		
		if(userdata.level_10==10){
			var udata={};
			udata['users']= userdata.users_10;
        	udata['max_profit']= userdata.max_profit_10;
        	udata['reg_slots']= userdata.reg_slots_10;
			udata['value']= userdata.value_10;
			udata['plan_text']= userdata.plan_text_10;
			udata['amount_cal']= userdata.amount_cal_10;
			udata['amount']= new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(userdata.amount_cal_10);
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,10], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		
    	resolve({"success":true,"message":"Unilevel Setting Updated Successfully",data:[]});

	});         		

}

function updateFeeUnilevel(userdata) {
    var data={};
    var udata={};
	return new Promise((resolve,reject) => {
		if(userdata.level_1==1){
			var udata={};
			udata['renovation_fee']= userdata.value_1;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,1], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		if(userdata.level_2==2){
			var udata={};
			udata['renovation_fee']= userdata.value_2;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,2], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		if(userdata.level_3==3){
			var udata={};
			udata['renovation_fee']= userdata.value_3;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,3], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		if(userdata.level_4==4){
			var udata={};
			udata['renovation_fee']= userdata.value_4;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,4], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}if(userdata.level_5==5){
			var udata={};
			udata['renovation_fee']= userdata.value_5;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,5], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}if(userdata.level_6==6){
			var udata={};
			udata['renovation_fee']= userdata.value_6;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,6], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}if(userdata.level_7==7){
			var udata={};
			udata['renovation_fee']= userdata.value_7;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,7], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		if(userdata.level_8==8){
			var udata={};
			udata['renovation_fee']= userdata.value_8;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,8], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		
		if(userdata.level_9==9){
			var udata={};
			udata['renovation_fee']= userdata.value_9;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,9], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		
		if(userdata.level_10==10){
			var udata={};
			udata['renovation_fee']= userdata.value_10;
			db.query("UPDATE `sp_unilevel_profit` SET ? where level=?", [udata,10], function (err, rows) {
				dbFunc.connectionRelease;
			});
		}
		
    	resolve({"success":true,"message":"Unilevel Setting Updated Successfully",data:[]});

	});         		

}
function getlevelDetail(userdata) {
	console.log('updatefeeDetail module',userdata);
  	return new Promise((resolve,reject) => {
      	db.query("SELECT sp_admin_fee_setting.* FROM sp_admin_fee_setting order by id asc",(error,feeSetting,fields)=>{
            if(!!error) {
              	dbFunc.connectionRelease;
              	reject({"success":false,"message":error.code});
            } else {  
            	console.log('updatefeeDetail module',feeSetting);            
                resolve({"success":true,"message":"success",data:feeSetting[0]});
            }
            
      	});
      
  	});
}

function downloadList(userdata) {
	console.log('downloadList module',userdata);
	//Bucket: BUCKET_NAME+"/sixprofit/downloads",

  	return new Promise((resolve,reject) => {
      	db.query("SELECT sp_downloads.* FROM sp_downloads order by id asc",(error,files,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
               //console.log('downloadList module',files);            
                resolve({"success":true,"message":"success",data:files});
            }
            
      	});
      
  	});
}
function uploadDownload(fileData) {
	console.log('uploadDownload module',fileData);
  	return new Promise((resolve,reject) => {
  		if (fileData.file_id>0) {
  			db.query("UPDATE `sp_downloads` SET fileName=?,`fileURL`=? WHERE ID=?",[fileData.fileName,fileData.downloafile,fileData.file_id],(error,rows,fields)=>{
		        if(!!error) {
		        	 console.log('error',error);
		            dbFunc.connectionRelease;
		        }
		        resolve({"success":true,"message":"success",data:[]});
	    	});
  		}else{
	      	db.query("SELECT count(*) as isExist FROM sp_downloads where fileName=? and status='1'",[fileData.fileName],(error,files,fields)=>{
	            if(!!error) {
	              dbFunc.connectionRelease;
	              reject({"success":false,"message":error.code});
	            } else {  
	            	if (files[0].isExist==0) {
			            db.query("INSERT INTO `sp_downloads`(fileName,`fileURL`,status) VALUES (?,?,?)",[fileData.fileName,fileData.downloafile,'1'],(error,rows,fields)=>{
					        if(!!error) {
					        	 console.log('error',error);
					            dbFunc.connectionRelease;
					        }
					        resolve({"success":true,"message":"success",data:[]});
				    	});
		        	}else{
		        		reject({"success":false,"message":"Same filename already exist"});
		        		dbFunc.connectionRelease;
		        	}
	            }
	            
	      	});
      	}
      
  	});
}

function updatefileStatus(arg) {
	console.log('updatefileStatus',arg);
  	return new Promise((resolve,reject) => {
  		
      	db.query("SELECT status FROM sp_downloads where id=?",[arg.id],(error,files,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
            	if (files.length>0) {
            		var status = files[0].status;
            		if (status=='1') {
            			status='0'
            		}else{
            			status='1'
            		}
            			console.log('files',files);

			      	db.query("UPDATE `sp_downloads` SET status=? where id=?", [status,arg.id], function (error, row) {

				        if(!!error) {
				            dbFunc.connectionRelease;
				             console.log('error',error);
				            reject({"success":false,"message":error.code});
				        }else{
				        	
				        	resolve({"success":true,"message":"success",data:[]});
				        }
					});
				}
			}
		});			
      
  	});
}
function deletefile(arg) {
  	return new Promise((resolve,reject) => {
      	db.query("DELETE FROM `sp_downloads` WHERE id=?", [arg.id], function (error, row) {
	        if(!!error) {
	            dbFunc.connectionRelease;
	             console.log('error',error);
	            reject({"success":false,"message":error.code});
	        }else{
	        	
	        	resolve({"success":true,"message":"success",data:[]});
	        }
		});
      
  	});
}

function getfile(arg) {
  	return new Promise((resolve,reject) => {
      db.query("SELECT * FROM sp_downloads where id=?",[arg.id],(error,file,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	        	
	        	resolve({"success":true,"message":"success",data:file});
	        }
		});
      
  	});
}
function dashboardStack(arg) {
  	return new Promise((resolve,reject) => {

		db.query("SELECT (SELECT COALESCE(SUM(amount),0) as totalwithdraw FROM `sp_withdraw` WHERE payment_status='1' ) as totalwithdraw,(SELECT COALESCE (SUM(company_admin),0) as profit FROM `sp_profit_distribution` ) as depositFee, (SELECT COALESCE (SUM(reinvest),0) as profit FROM `sp_profit_distribution`) as reinvest,(SELECT COALESCE(SUM(amount),0) as deposit FROM `sp_deposit` WHERE `payment_status`='1') as monthlyDeposit, (SELECT COUNT(*) as inactive FROM sp_users where active=0) as inactive, COUNT(*) as totalUser FROM sp_users where active=1",(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	        	rows[0]['totalDeposit']=rows[0]['monthlyDeposit'] ;//btcTOusd;
	        	resolve({"success":true,"message":"success",data:rows[0]});
	        }
		});
				
      
  	});
}
function topDeposit(arg) {
  	return new Promise((resolve,reject) => {
  		
  		db.query("SELECT COALESCE(SUM(d.total_amount_usd),0) as totalpurchase,sp_users.username FROM `sp_deposit` d,sp_users WHERE sp_users.user_id=d.user_id and  d.payment_status='1'  GROUP by d.user_id  ORDER BY totalpurchase DESC LIMIT 1",(error,toppurchase,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
				db.query("SELECT COALESCE(SUM(d.bonus),0) as deposit,sp_users.profile_pic,sp_users.username FROM `sp_affiliate_bonus` d,sp_users WHERE sp_users.user_id=d.user_id and  d.status='1'  GROUP by d.user_id  ORDER BY deposit DESC LIMIT 10",(error,rows,fields)=>{
		            if(!!error) {
		              dbFunc.connectionRelease;
		              reject({"success":false,"message":error.code});
		            } else { 
			        	
			        	resolve({"success":true,"message":"success",data:{toppurchase:toppurchase[0],topDeposit:rows}});
			        }
				});
			}
		});			
      
  	});
}

function depositReport(arg) {
	var searchStr='';
	if(arg.searchStr){
        searchStr= " ( sp_users.username like '%"+arg.searchStr+"%' or  sp_deposit.user_id like '"+arg.searchStr+"%'  or  sp_deposit.update_date like '"+arg.searchStr+"%') and ";
        if(arg.searchStr==''){
            searchStr='';
        }
    }
  	return new Promise((resolve,reject) => {
		db.query("SELECT sp_users.profile_pic,sp_users.username,sp_deposit.* FROM `sp_deposit` ,sp_users WHERE "+searchStr+" sp_users.user_id=sp_deposit.user_id group by sp_deposit.id order by sp_deposit.update_date DESC ",(error,rows,fields)=>{
            if(!!error) {
            	console.log(error)
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	        	
	        	resolve({"success":true,"message":"success",data:rows});
	        }
		});
      
  	});
}

function withdrawReport(arg) {
  	return new Promise((resolve,reject) => {
		db.query("SELECT sp_users.profile_pic,sp_users.username,sp_withdraw.* FROM `sp_withdraw` ,sp_users WHERE sp_users.user_id=sp_withdraw.user_id group by sp_withdraw.id order by sp_withdraw.crdate DESC  ",(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	        	
	        	resolve({"success":true,"message":"success",data:rows});
	        }
		});
      
  	});
}
function directbonusReport(arg) {
	var searchStr='';
	if(arg.searchStr){
        searchStr= "( sp_users.username like '%"+arg.searchStr+"%' or  sp_profit_distribution.user_id like '"+arg.searchStr+"%' or  sp_profit_distribution.update_date like '"+arg.searchStr+"%') and ";
        if(arg.searchStr==''){
            searchStr='';
        }
    }

  	return new Promise((resolve,reject) => {
		db.query("SELECT sp_users.profile_pic,sp_users.username,sp_profit_distribution.* FROM `sp_profit_distribution` ,sp_users WHERE "+searchStr+"  sp_users.user_id=sp_profit_distribution.user_id  group by sp_profit_distribution.id order by sp_profit_distribution.update_date DESC ",(error,rows,fields)=>{
            if(!!error) {
            	console.log(error);
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	        	resolve({"success":true,"message":"success",data:rows});
	        }
		});
      
  	});
}
function dailyprofitReport(arg) {
  	return new Promise((resolve,reject) => {
  		//getUserLevel(arg);
		db.query("SELECT sp_users.profile_pic,sp_users.username,sp_daily_bonus.* FROM `sp_daily_bonus` ,sp_users WHERE sp_users.user_id=sp_daily_bonus.user_id group by sp_daily_bonus.id order by sp_daily_bonus.update_date DESC ",(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	        	
	        	resolve({"success":true,"message":"success",data:rows});
	        }
		});
      
  	});
}


function getTestimonial(arg) {
	return new Promise((resolve,reject) => {
		db.query("SELECT * FROM `sp_testimonial` order by id desc",(error,res,fields)=>{
	        if(!!error) {
	           	dbFunc.connectionRelease;
	           	reject({"success":false,"message":error.code});
	        } else {
	   
			   	resolve({"success":true,data:res});
			}
			    
	    }); 
  		   	
  	});
}
function updateTestimonial(argdata) {
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		updateData['title'] =argdata.title
		updateData['text'] =argdata.text;
		updateData['image'] =argdata.image;
		const id =argdata.id;
		// updateData['unilevel_license'] =feedata.unilevel_license;
		
      	db.query("UPDATE `sp_testimonial` SET ? where id=?", [updateData,id], function (error, row) {

	        if(!!error) {
	            dbFunc.connectionRelease;
	             console.log('error',error);
	            reject({"success":false,"message":error.code});
	        }else{
	        	
	        	db.query("SELECT sp_testimonial.* FROM sp_testimonial order by id asc",(error,res,fields)=>{
		            if(!!error) {
		              dbFunc.connectionRelease;
		              reject({"success":false,"message":error.code});
		            } else {              
		               resolve({"success":true,"message":"success",data:res});
		            }
		            
		      	});
	        }
		});
      
  	});
}
function getFee(arg,callback) {
	db.query("SELECT pub_key,pvt_key,gateway FROM `sp_payment_gateway`  ",(error,gateway,fields)=>{
        if(!!error) {
            dbFunc.connectionRelease;
           return callback({"success":false,"message":error.code});
        } else {
   
		    return callback({"success":true,data:gateway[0]});
		}
		    
    }); 
  		   	

}


function resendmail (userData) {
  	return new Promise((resolve,reject) => { 
    	console.log('resendmail ',userData.user_id);
    	var data={};
       	db.query("SELECT * FROM `sp_mail_template` WHERE id=1 order by id asc ", function (err, tempres) {

               db.query("Select email,username from sp_users where user_id = ?  ", [userData.user_id], function (err, res) {
                   	if(err) {
						dbFunc.connectionRelease;
              			reject({"success":false,"message":err});
                   	}
                   else{
                       	if(res.length!=0){
                           	var activation_code=uuid();
                           	userData.activation_code=activation_code; 
                           	userData.email=res[0].email;
                           	userData.username=res[0].username;
                           	db.query("UPDATE `sp_users` SET active=?, activation_code=? where user_id=?",[0,activation_code,userData.user_id] , function (err, res) {

                               if(err) {
                                   	dbFunc.connectionRelease;
              						reject({"success":false,"message":err});
                               }
                               else{
                                    userData.message=tempres[0].template_body;
                                    userData.subject=tempres[0].template_subject;
                                    mail.mail(userData);
                                    resolve({"success":true,"message":"Mail Sent successfully!!",data:[]});
                               }
                           });
                       }else{
              				reject({"success":false,"message":"Invald User Detail"});
                       }
                   }

               });

         });    
        
    }); 


};


module.exports = adminapiModel;

