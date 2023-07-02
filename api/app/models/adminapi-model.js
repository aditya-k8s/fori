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

	getAllusers:getAllusers,
	getAllProducts:getAllProducts,
	updateUserStatus:updateUserStatus , 

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
	//getTestimonial:getTestimonial,
	//updateTestimonial:updateTestimonial,

	getAllOrder:getAllOrder,
	getCategory:getCategory,
	addCategory:addCategory,
	updateCategory:updateCategory,
	getSubCategory:getSubCategory,
    addSubCategory:addSubCategory,
    updateSubCategory:updateSubCategory,
    delCategory:delCategory,
    delSubCategory:delSubCategory,
    getRecentusers:getRecentusers,
    getSaleorderGraph:getSaleorderGraph,
    addBankDetail:addBankDetail,
    updateBankDetails:updateBankDetails,
    getBankDetails:getBankDetails,
    delBankDetail:delBankDetail,
    getDeviceGraph:getDeviceGraph,
    getProductSaleGraph:getProductSaleGraph,
    getAvgOrderGraph:getAvgOrderGraph,
    getBroadcastGraph:getBroadcastGraph,
    getProductSaleReport:getProductSaleReport,
    getAllRequestList:getAllRequestList,
    getTestimonial:getTestimonial,
    addTestimonial:addTestimonial,
    updateStatusTestimonial:updateStatusTestimonial,
    delTestimonial:delTestimonial,
    getTestimonialDetail:getTestimonialDetail,
    getTestimonialBypage:getTestimonialBypage,
    getMerchantList:getMerchantList,
    getMerchantBalance:getMerchantBalance,
    payToMerchant:payToMerchant

}
function payToMerchant(arg) {
  	return new Promise((resolve,reject) => {
  		
  		db.query("SELECT SUM(ll_orders.total_amount) as total_amount FROM ll_orders,ll_product_broadcasting WHERE ll_product_broadcasting.channel_id=ll_orders.broadcast_id and ll_product_broadcasting.user_id=?",[arg.user_id], (error, rows, fields) => {
	        if (error) {
	            reject({"success":false,"message":error.code});
	        } else {
	        	if (rows[0].total_amount>0) {
			  		var updateData= {}
					updateData['paid_to_merchant'] =arg.amount
					updateData['merchant_id'] =arg.user_id
					
			      	db.query("INSERT ll_merchant_payment_report SET ?", [updateData], function (error, row) {

				        if(!!error) {
				            dbFunc.connectionRelease;
				             console.log('error',error);
				            reject({"success":false,"message":error.code});
				        }else{            
					        resolve({"success":true,"message":"Payment record added successfully",body:row}); 
				        }
					});
		      }else{
		      	resolve({"success":false,"message":"All Payment cleared",body:''}); 

		      }
			}
		});		
	    
      
  	});   
}
function getMerchantBalance(arg) {
  	return new Promise((resolve,reject) => {
  		
  		db.query("SELECT SUM(ll_orders.total_amount) as total_amount FROM ll_orders,ll_product_broadcasting WHERE ll_product_broadcasting.channel_id=ll_orders.broadcast_id and ll_product_broadcasting.user_id=?",[arg.user_id], (error, rows, fields) => {
	        if (error) {
	            reject({"success":false,"message":error.code});
	        } else {
		  		var updateData= {}
				updateData['total_amount'] =rows[0].total_amount
			  	db.query("SELECT SUM(paid_to_merchant) as paid_to_merchant FROM ll_merchant_payment_report WHERE  ll_merchant_payment_report.merchant_id=?",[arg.user_id], (error, rowsPaid, fields) => {
			        if(!!error) {
			            dbFunc.connectionRelease;
			             console.log('error',error);
			            reject({"success":false,"message":error.code});
			        }else{  
			            updateData['paid_amount'] =rowsPaid[0].paid_to_merchant
			            updateData['balance'] =rows[0].total_amount-rowsPaid[0].paid_to_merchant
          
				        resolve({"success":true,"message":"Success",body:updateData}); 
			        }
				});
			}
		});		
	    
      
  	});   
}
function getMerchantList(userdata) {
	console.log('getMerchantList',userdata);
  	return new Promise((resolve,reject) => {
  		 
    	db.query("SELECT (SELECT SUM(ll_orders.total_amount) FROM ll_orders,ll_product_broadcasting WHERE ll_product_broadcasting.channel_id=ll_orders.broadcast_id and ll_product_broadcasting.user_id=ll_users.user_id) as merchant_order, (SELECT SUM(ll_merchant_payment_report.paid_to_merchant) FROM ll_merchant_payment_report WHERE ll_merchant_payment_report.merchant_id=ll_users.user_id) as paid_to_merchant,ll_users.* FROM  ll_users LEFT JOIN `ll_user_logs` on ll_user_logs.user_id=ll_users.user_id WHERE ll_users.user_type='1' or ll_user_logs.user_type=1 GROUP by ll_users.user_id",(error,ll_users,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",body:ll_users});    
		    }
      });
      
  	});
}


function getTestimonialBypage(arg) {
    return new Promise((resolve, reject) => {
	    //GROUP_CONCAT(tages) as tags
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
	   
	    //and ( FIND_IN_SET('demo', channelTag) OR FIND_IN_SET('34', channelTag) OR FIND_IN_SET('fori', channelTag) OR FIND_IN_SET('test', channelTag) ) GROUP by channel_id
	    db.query("SELECT * FROM ll_testimonials where status=0 and isActive=1 and user_id=? order by id desc  limit ? offset ?",[arg.user_id,LimitNum,startNum], (error, rows, fields) => {
	        if (error) {
	            reject({"success":false,"message":error.code});
	        } else {
	        	if (rows.length>0) {
	      			resolve({"success":true,'data':rows,"message":"Success"});

	        	}else{
	        		reject({"success":false,'data':rows,"message":"No more records found"});

	        	}
	        }
	    });
           
    });
}
function delTestimonial(arg) {
  	return new Promise((resolve,reject) => {
      db.query("UPDATE `ll_testimonials` SET status=1 where id=?", [arg.testimonial_id], function (error, row) {

	    if(!!error) {
	        dbFunc.connectionRelease;
	         console.log('error',error);
	        reject({"success":false,"message":error.code});
		    }else{            
		        resolve({"success":true,"message":"Testimonial deleted successfully",body:row}); 
		    }
		});
      	

    });
		
}
function getTestimonialDetail(arg) {
  	return new Promise((resolve,reject) => {
  		//console.log('getTestimonialDetail',arg);
      	db.query("SELECT ll_testimonials.*  FROM ll_testimonials  where status=0 and id=? ",[arg.testimonial_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              console.log(error)
              reject({"success":false,"message":error.code});
            } else {  
                resolve({"success":true,"message":"success",body:rows});
            }
            
      	});
    });
		
}/**** Add main cateroy*****/
function getTestimonial(arg) {
  	return new Promise((resolve,reject) => {
  		console.log('getTestimonial',arg);
      	db.query("SELECT ll_testimonials.*  FROM ll_testimonials  where status=0 and user_id=? order by id desc",[arg.user_id],(error,rows,fields)=>{
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
function addTestimonial(arg) {
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		updateData['title'] =arg.title
		updateData['description'] =arg.description
		updateData['user_id'] =arg.user_id
		if (arg.testimonial_id) {
			db.query("UPDATE `ll_testimonials` SET ? where id=?", [updateData,arg.testimonial_id], function (error, row) {

		        if(!!error) {
		            dbFunc.connectionRelease;
		             console.log('error',error);
		            reject({"success":false,"message":error.code});
		        }else{            
			        resolve({"success":true,"message":"Testimonial updated successfully",body:row}); 
		        }
			});
		}else{
	      	db.query("INSERT ll_testimonials SET ?", [updateData], function (error, row) {

		        if(!!error) {
		            dbFunc.connectionRelease;
		             console.log('error',error);
		            reject({"success":false,"message":error.code});
		        }else{            
			        resolve({"success":true,"message":"Testimonial added successfully",body:row}); 
		        }
			});
	    }	
      
  	});   
}
function updateStatusTestimonial(arg) {
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		db.query("SELECT id FROM ll_testimonials where  id=? ",[arg.testimonial_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	            if (rows.length>0) { 
			      	db.query("UPDATE `ll_testimonials` SET `isActive`=IF(isActive=1, 0, 1) WHERE id=?", [arg.testimonial_id], function (error, row) {

				        if(!!error) {
				            dbFunc.connectionRelease;
				             console.log('error',error);
				            reject({"success":false,"message":error.code});
				        }else{            
					        resolve({"success":true,"message":"Testimonial status updated successfully",body:row}); 
				        }
					});
				}else{
	      			reject({"success":false,"message":"Testimonial does not exist"});
		
	      		}
      		}
      	});				
      
  	});
}

function getAllRequestList(arg) {
    console.log("getAllRequestList");
    return new Promise((resolve, reject) => {
            db.query("SELECT * FROM ll_support_request  where user_type=? order by id DESC", [arg.user_type],(error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } 
                resolve({"success":true,"message":"Success",body:rows});      
                
            }); 
              
           
    });
}
function getProductSaleReport(argument) {
	// 
	return new Promise((resolve,reject) => {
		var month= argument.month;
		var year= argument.year
		//day(ll_order_items.create_date)= day(now()) and
    	db.query("SELECT sum(ll_order_items.on_air_price) total,ll_order_items.create_date,day(ll_order_items.create_date) as hour FROM ll_order_items,ll_products WHERE ll_order_items.product_id=SUBSTRING_INDEX(ll_products.product_id,'/',-1) and  MONTH(ll_order_items.create_date)=? and YEAR(ll_order_items.create_date)=? group by DAY(ll_order_items.create_date)",[month,year],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              console.log('error',error);
              reject({"success":false,"message":error.code});
            } else {  

		        resolve({"success":true,"message":"success",body:rows});    
		    }
      });
      
  	});
}

function delBankDetail(arg) {
  	return new Promise((resolve,reject) => {
      
      	db.query("UPDATE `ll_financial_detail` SET status=1 where id=?", [arg.sub_category_id], function (error, row) {

	    if(!!error) {
	        dbFunc.connectionRelease;
	         console.log('error',error);
	        reject({"success":false,"message":error.code});
		    }else{            
		        resolve({"success":true,"message":"Sub-category deleted successfully",body:row}); 
		    }
		});
    });
		
}
//INSERT INTO `ll_financial_detail`( `user_id`, `bank_name`, `bank_address`, 
//`account`, `routing`, `business_name`, `business_address`, `business_doc`)
function getBankDetails(userdata) {
  	return new Promise((resolve,reject) => {
      
      	db.query("SELECT ll_financial_detail.* FROM ll_financial_detail where user_id=? and status=0 order by id desc",[userdata.user_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
                resolve({"success":true,"message":"success",body:rows});
            }
            
      	});
    });
		
}
function addBankDetail(arg) {
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		updateData['user_id'] =arg.user_id
		updateData['bank_name'] =arg.bank_name
		updateData['bank_address'] =arg.bank_address
		updateData['account'] =arg.account
		updateData['routing'] =arg.routing
		updateData['business_name'] =arg.business_name
		updateData['business_address'] =arg.business_address
		if (arg.business_doc!='') {
			updateData['business_doc'] =arg.business_doc
		}
		db.query("SELECT id FROM ll_financial_detail where account=? and user_id!=? ",[arg.account,arg.user_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	            if (rows.length<=0) {
	            	db.query("SELECT id FROM ll_financial_detail where account=? and user_id=? ",[arg.account,arg.user_id],(error,rows,fields)=>{
			            if(!!error) {
			              dbFunc.connectionRelease;
			              reject({"success":false,"message":error.code});
			            } else { 
				            if (rows.length<=0) {
						      	db.query("INSERT `ll_financial_detail` SET ?", [updateData], function (error, row) {

							        if(!!error) {
							            dbFunc.connectionRelease;
							             console.log('error',error);
							            reject({"success":false,"message":error.code});
							        }else{            
								        resolve({"success":true,"message":"Bank Details added successfully",body:row}); 
							        }
								});
							}else{

								db.query("UPDATE `ll_financial_detail` SET ? where id=?", [updateData,rows[0].id], function (error, row) {

							        if(!!error) {
							            dbFunc.connectionRelease;
							             console.log('error',error);
							            reject({"success":false,"message":error.code});
							        }else{            
								        resolve({"success":true,"message":"Bank Details updated successfully",body:row}); 
							        }

								});
							}	
						}
					});		
	      		}else{
				    reject({"success":false,"message":"Account Number already exist"});
	      		}
      		}
      	});	
      
  	});
}
function updateBankDetails(arg) {
	//`category_id`, `sub_category_name`,
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		updateData['user_id'] =arg.user_id
		updateData['bank_name'] =arg.bank_name
		updateData['bank_address'] =arg.bank_address
		updateData['account'] =arg.account
		updateData['routing'] =arg.routing
		updateData['business_name'] =arg.business_name
		updateData['business_address'] =arg.business_address
		updateData['business_doc'] =arg.business_doc
		db.query("SELECT id FROM ll_financial_detail where account=? and id!=? ",[arg.account,arg.id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	            if (rows.length<=0) {
			      	db.query("UPDATE `ll_financial_detail` SET ? where id=?", [updateData,arg.id], function (error, row) {

				        if(!!error) {
				            dbFunc.connectionRelease;
				             console.log('error',error);
				            reject({"success":false,"message":error.code});
				        }else{            
					        resolve({"success":true,"message":"Bank Details updated successfully",body:row}); 
				        }
					});
				}else{
	      			reject({"success":false,"message":"Account Number already exist"});
		
	      		}
      		}
      	});				
      
  	});
}

//
function getProductSaleGraph(argument) {
	// 
	return new Promise((resolve,reject) => {
  		var user_id= argument.user_id 
    	db.query("SELECT sum(ll_order_items.on_air_price) total,ll_order_items.create_date,HOUR(ll_order_items.create_date) as hour FROM ll_order_items,ll_products WHERE ll_order_items.product_id=SUBSTRING_INDEX(ll_products.product_id,'/',-1) and ll_products.user_id=? and month(ll_order_items.create_date)= month(now()) group by day(ll_order_items.create_date)",[user_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",body:rows});    
		    }
      });
      
  	});
}
//SELECT count(ll_product_broadcasting.id) total,ll_product_broadcasting.create_date,MONTH(ll_product_broadcasting.create_date) as month FROM ll_product_broadcasting WHERE (ll_product_broadcasting.user_id='df4a4808-6869-490c-b46d-1ae07faae372' or ll_product_broadcasting.Influencer_id='df4a4808-6869-490c-b46d-1ae07faae372')  group by MONTH(ll_product_broadcasting.create_date)
function getBroadcastGraph(argument) {
	// 
	return new Promise((resolve,reject) => {
  		var user_id= argument.user_id 
    	db.query("SELECT count(ll_product_broadcasting.id) total,ll_product_broadcasting.create_date,MONTH(ll_product_broadcasting.create_date) as month FROM ll_product_broadcasting WHERE (ll_product_broadcasting.user_id=? or ll_product_broadcasting.Influencer_id=?)  group by MONTH(ll_product_broadcasting.create_date)",[user_id,user_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",body:rows});    
		    }
      });
      
  	});
}
function getAvgOrderGraph(argument) {
	// 
	return new Promise((resolve,reject) => {
  		var user_id= argument.user_id 
    	db.query("SELECT avg(ll_orders.total_amount) total,ll_orders.create_date,HOUR(ll_orders.create_date) as hour FROM ll_orders WHERE ll_orders.user_id=? and month(ll_orders.create_date)= month(now())    group by day(ll_orders.create_date)",[user_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",body:rows});    
		    }
      });
      
  	});
}
function getDeviceGraph(argument) {
	// 
	return new Promise((resolve,reject) => {
  		 
    	db.query("SELECT count(device_type) total,device_type FROM ll_users  group by device_type",(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",body:rows});    
		    }
      });
      
  	});
}
function getSaleorderGraph(argument) {
	// 
	return new Promise((resolve,reject) => {
  		 
    	db.query("SELECT count(id) sale,year(create_date) year,month(create_date) month FROM `ll_orders`  group by year(create_date),month(create_date)",(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",body:rows});    
		    }
      });
      
  	});
}
function getRecentusers(userdata) {
  	return new Promise((resolve,reject) => {
  		 
    	db.query("SELECT ll_users.*,(Select channel_name from ll_users_channels where ll_users_channels.user_id=ll_users.user_id LIMIT 1) as channel_name FROM `ll_users` where isDelete='0' and id!=1 order by id DESC LIMIT 10",(error,ll_users,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",body:ll_users});    
		    }
      });
      
  	});
}


function delCategory(arg) {
  	return new Promise((resolve,reject) => {
      db.query("UPDATE `ll_main_category` SET status=1 where id=?", [arg.category_id], function (error, row) {

	    if(!!error) {
	        dbFunc.connectionRelease;
	         console.log('error',error);
	        reject({"success":false,"message":error.code});
		    }else{            
		        resolve({"success":true,"message":"Category deleted successfully",body:row}); 
		    }
		});
      	

    });
		
}
function delSubCategory(arg) {
  	return new Promise((resolve,reject) => {
      
      	db.query("UPDATE `ll_main_sub_category` SET status=1 where id=?", [arg.sub_category_id], function (error, row) {

	    if(!!error) {
	        dbFunc.connectionRelease;
	         console.log('error',error);
	        reject({"success":false,"message":error.code});
		    }else{            
		        resolve({"success":true,"message":"Sub-category deleted successfully",body:row}); 
		    }
		});
    });
		
}

function getSubCategory(userdata) {
  	return new Promise((resolve,reject) => {
      
      	db.query("SELECT ll_main_sub_category.* FROM ll_main_sub_category where status=0 order by id desc",(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
                resolve({"success":true,"message":"success",body:rows});
            }
            
      	});});
		
}
function addSubCategory(arg) {
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		updateData['sub_category_name'] =arg.sub_category_name
		updateData['category_id'] =arg.category_id
		db.query("SELECT sub_category_name FROM ll_main_sub_category where sub_category_name=? ",[arg.category_name],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	            if (rows.length<=0) {
			      	db.query("INSERT `ll_main_sub_category` SET ?", [updateData], function (error, row) {

				        if(!!error) {
				            dbFunc.connectionRelease;
				             console.log('error',error);
				            reject({"success":false,"message":error.code});
				        }else{            
					        resolve({"success":true,"message":"Category added successfully",body:row}); 
				        }
					});
	      		}else{
	      			reject({"success":false,"message":"Category name already exist"});
		
	      		}
      		}
      	});	
      
  	});
}
function updateSubCategory(arg) {
	//`category_id`, `sub_category_name`,
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		updateData['sub_category_name'] =arg.sub_category_name
		updateData['category_id'] =arg.category_id
		db.query("SELECT sub_category_name FROM ll_main_sub_category where sub_category_name=? and id!=? ",[arg.sub_category_name,arg.sub_category_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	            if (rows.length<=0) {
			      	db.query("UPDATE `ll_main_sub_category` SET ? where id=?", [updateData,arg.sub_category_id], function (error, row) {

				        if(!!error) {
				            dbFunc.connectionRelease;
				             console.log('error',error);
				            reject({"success":false,"message":error.code});
				        }else{            
					        resolve({"success":true,"message":"Category updated successfully",body:row}); 
				        }
					});
				}else{
	      			reject({"success":false,"message":"Category name already exist"});
		
	      		}
      		}
      	});				
      
  	});
}

/**** Add main cateroy*****/
function getCategory(userdata) {
  	return new Promise((resolve,reject) => {
  		var user_id=0;
      	var sql= "SELECT ll_main_category.* FROM ll_main_category where status=0 order by id desc";
      	if (userdata.user_id) {
      		user_id=userdata.user_id;
      		sql="SELECT ll_main_category.*,(SELECT COUNT(id) FROM ll_user_influencer WHERE find_in_set(ll_main_category.id,ll_user_influencer.category) and ll_user_influencer.user_id=?) as isSelect  FROM ll_main_category  where ll_main_category.status=0 order by ll_main_category.category_name asc";
      	}
      	console.log(sql)
      	db.query(sql,[user_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              console.log(error)
              reject({"success":false,"message":error.code});
            } else {  
                resolve({"success":true,"message":"success",body:rows});
            }
            
      	});});
		
}
function addCategory(arg) {
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		updateData['category_name'] =arg.category_name
		db.query("SELECT category_name FROM ll_main_category where category_name=? ",[arg.category_name],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	            if (rows.length<=0) {
			      	db.query("INSERT `ll_main_category` SET ?", [updateData], function (error, row) {

				        if(!!error) {
				            dbFunc.connectionRelease;
				             console.log('error',error);
				            reject({"success":false,"message":error.code});
				        }else{            
					        resolve({"success":true,"message":"Category added successfully",body:row}); 
				        }
					});
	      		}else{
	      			reject({"success":false,"message":"Category name already exist"});
		
	      		}
      		}
      	});	
      
  	});
}
function updateCategory(arg) {
  	return new Promise((resolve,reject) => {
  		var updateData= {}
		updateData['category_name'] =arg.category_name
		db.query("SELECT category_name FROM ll_main_category where category_name=? and id!=? ",[arg.category_name,arg.category_id],(error,rows,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else { 
	            if (rows.length<=0) {
			      	db.query("UPDATE `ll_main_category` SET ? where id=?", [updateData,arg.category_id], function (error, row) {

				        if(!!error) {
				            dbFunc.connectionRelease;
				             console.log('error',error);
				            reject({"success":false,"message":error.code});
				        }else{            
					        resolve({"success":true,"message":"Category updated successfully",body:row}); 
				        }
					});
				}else{
	      			reject({"success":false,"message":"Category name already exist"});
		
	      		}
      		}
      	});				
      
  	});
}

function updateUserStatus(arg) {
	console.log('updateUserStatus',arg);
  	return new Promise((resolve,reject) => {
  		
      	db.query("SELECT active FROM ll_users where user_id=?",[arg.user_id],(error,files,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
            	if (files.length>0) {
            		var status = files[0].active;
            		if (status==1) {
            			status=0
            		}else{
            			status=1
            		}
            			console.log('files',files);

			      	db.query("UPDATE `ll_users` SET active=? where user_id=?", [status,arg.user_id], function (error, row) {

				        if(!!error) {
				            dbFunc.connectionRelease;
				             console.log('error',error);
				            reject({"success":false,"message":error.code});
				        }else{
				        	
				        	resolve({"success":true,"message":"success",body:[]});
				        }
					});
				}
			}
		});			
      
  	});
}

function getAllOrder(userdata) {
	console.log('getAllusers',userdata);
  	return new Promise((resolve,reject) => {
  		 
    	db.query("SELECT ll_users.username,ll_users.profile_pic,ll_orders.* FROM ll_orders,`ll_users` where ll_orders.user_id=ll_users.user_id order by ll_orders.id desc",(error,ll_users,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",body:ll_users});    
		    }
      });
      
  	});
}
function getAllusers(userdata) {
	console.log('getAllusers',userdata);
  	return new Promise((resolve,reject) => {
  		 
    	db.query("SELECT ll_users.*,(Select channel_name from ll_users_channels where ll_users_channels.user_id=ll_users.user_id LIMIT 1) as channel_name FROM `ll_users` where isDelete='0' and id!=1 order by id asc",(error,ll_users,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",body:ll_users});    
		    }
      });
      
  	});
}


function getAllProducts(userdata) {
	console.log('getAllProducts',userdata);
  	return new Promise((resolve,reject) => {
  		 
    	db.query("SELECT * FROM `ll_products` where user_id=? order by id asc",[userdata.user_id],(error,ll_users,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
		        resolve({"success":true,"message":"success",body:ll_users});    
		    }
      });
      
  	});
}


function getfeeDetail(userdata) {
	console.log('getfeeDetail module',userdata);
  	return new Promise((resolve,reject) => {
  		 
    	
      
      	db.query("SELECT ll_admin_fee.* FROM ll_admin_fee order by id asc",(error,feeSetting,fields)=>{
            if(!!error) {
              dbFunc.connectionRelease;
              reject({"success":false,"message":error.code});
            } else {  
            console.log('updatefeeDetail module',feeSetting);            
                resolve({"success":true,"message":"success",body:feeSetting[0]});
            }
            
      	});});
		
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
		updateData['retail_fee'] =feedata.retail_fee
		updateData['subscription_fee'] =feedata.subscription_fee;
		// updateData['unilevel_investment'] =feedata.unilevel_investment;
		// updateData['unilevel_license'] =feedata.unilevel_license;
		
      	db.query("UPDATE `ll_admin_fee` SET ? where id=?", [updateData,1], function (error, row) {

	        if(!!error) {
	            dbFunc.connectionRelease;
	             console.log('error',error);
	            reject({"success":false,"message":error.code});
	        }else{
	        	
	        	db.query("SELECT ll_admin_fee.* FROM ll_admin_fee order by id asc",(error,feeSetting,fields)=>{
		            if(!!error) {
		              dbFunc.connectionRelease;
		              reject({"success":false,"message":error.code});
		            } else {              
		               resolve({"success":true,"message":"success",body:feeSetting[0]});
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

/*
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
*/
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

