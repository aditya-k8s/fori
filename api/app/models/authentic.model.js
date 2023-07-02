var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');
const uuid = require('uuidv4').default;
var mail = require('./../../common/mailer.js');
var stripe = require('stripe')('sk_test_cKXLMHtkXrR4E04TEeRZmmLk');
/*const TronWeb = require('tronweb');
const tronWeb = new TronWeb({
    fullNode: 'https://api.shasta.trongrid.io',
    solidityNode: 'https://api.shasta.trongrid.io',
    eventServer: 'https://api.shasta.trongrid.io',
    privateKey: '357c733ba80f2d8fcafb6b2e7e8ab30052a99a3d4a021e8e877f5faadf5a76b6'
  }
);
*/
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});


var authenticModel = {
    authentic: authentic,
    signup: signup,
    country: country,
    forgotPassword:forgotPassword,
    resetPassword:resetPassword,
    confirmation:confirmation,
    emailVerify:emailVerify,
    GetUsersMlm:GetUsersMlm,
    getsteamingList:getsteamingList,
    sociallogin:sociallogin,
    getAllSreamingChannel:getAllSreamingChannel,
    getAllChannel:getAllChannel,
    publicBroadcastingDetails:publicBroadcastingDetails,
    globalSearch:globalSearch,
    publicBroadcastingContentDetails:publicBroadcastingContentDetails,
    recentSales:recentSales
}
//
function recentSales(arg) {
    return new Promise((resolve, reject) => {
        db.query("SELECT ll_order_items.create_date,ll_products.product_title,ll_products_images.image_url,(SELECT broadcast_id FROM `ll_orders` WHERE ll_orders.order_id=ll_order_items.order_id limit 1) as broadcast_id FROM ll_order_items,ll_products_images, ll_products WHERE ll_order_items.product_id=SUBSTRING_INDEX(ll_products.product_id,'/',-1) and SUBSTRING_INDEX( ll_products_images.product_id,'/',-1)=ll_order_items.product_id GROUP by ll_order_items.order_id LIMIT 4", (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
               // console.log(rows);
               resolve({"success":true,"message":'done','body':rows});
            }   
        })    
    });    

}
function globalSearch(arg) {
    return new Promise((resolve, reject) => {
        //console.log("SELECT channel_id as id,channel_name, cover_image as channel_logo, COALESCE(IF (id IS NOT NULL,'broadcast',0)) as type FROM `ll_product_broadcasting` WHERE channelTag like '%"+arg.searchStr+"%' UNION SELECT id,title as channel_name, banner_image as channel_logo, COALESCE(IF (id IS NOT NULL,'broadcast',0)) as type FROM `ll_products_streaming_content` WHERE title like '%"+arg.searchStr+"%' UNION SELECT id,ll_users_channels.channel_name,channel_logo ,COALESCE(IF (id IS NOT NULL,'channel',0)) as type   FROM ll_users_channels WHERE channel_name like '%"+arg.searchStr+"%' ");
        db.query("SELECT ll_product_broadcasting.channel_id as id,ll_products.product_title as channel_name, ll_products.product_title as channel_logo, COALESCE(IF (ll_products.id IS NOT NULL,'broadcast',0)) as type FROM `ll_products`,ll_product_broadcasting where SUBSTRING_INDEX(ll_products.product_id,'/',-1) IN (ll_product_broadcasting.product_id) and ll_products.channelTag like '%"+arg.searchStr+"%' UNION SELECT channel_id as id,channel_name, cover_image as channel_logo, COALESCE(IF (id IS NOT NULL,'broadcast',0)) as type FROM `ll_product_broadcasting` WHERE channelTag like '%"+arg.searchStr+"%' UNION SELECT id,title as channel_name, banner_image as channel_logo, COALESCE(IF (id IS NOT NULL,'broadcast',0)) as type FROM `ll_products_streaming_content` WHERE title like '%"+arg.searchStr+"%' UNION SELECT id,ll_users_channels.channel_name,channel_logo ,COALESCE(IF (id IS NOT NULL,'channel',0)) as type   FROM ll_users_channels WHERE channel_name like '%"+arg.searchStr+"%' ",[arg.searchStr,arg.searchStr,arg.searchStr], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
               // console.log(rows);
               resolve({"success":true,"message":'done','body':rows});
            }   
        })    
    });    

}
function publicBroadcastingContentDetails(arg) {
     console.log('publicBroadcastingContentDetails',arg);
    return new Promise((resolve, reject) => {
        db.query("SELECT SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW()) as timestamp,(SELECT description FROM `ll_products_streaming_content` WHERE id=ll_product_broadcasting.channel_id limit 1 ) as description, (SELECT  count(id) FROM ll_channel_followers WHERE ll_channel_followers.user_id=ll_product_broadcasting.user_id and ll_channel_followers.status='1' ) as followers, ll_product_broadcasting.*,ll_users_channels.`channel_name` as main_channelName, ll_users_channels.`channel_org_name` as main_channel_org_namee,ll_users_channels.id as main_channelID FROM ll_product_broadcasting,ll_users_channels WHERE ll_users_channels.user_id=ll_product_broadcasting.user_id and  (channel_id=? or  broadcast_id=?) order by id desc limit 1",[arg.broadcast_id,arg.broadcast_id], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                if(rows.length<=0) {
                    console.log(rows);
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Error! Please create the channel"});
                } else {
                    var product_id=rows[0].product_id;
                    var user_id=rows[0].user_id;
                     console.log(product_id,user_id)
                    //product_id= product_id.replace(/\'/gi,'')
                   // console.log(product_id);
                    db.query("SELECT DISTINCT prod.product_id,prod.*,SUBSTRING_INDEX(prod.product_id,'/',-1) as product_id_int, (SELECT ll_products_images.image_url FROM ll_products_images WHERE ll_products_images.product_id=prod.product_id limit 1) as image_url FROM `ll_products` prod where SUBSTRING_INDEX(prod.product_id,'/',-1) IN ("+product_id+")  and prod.user_id=? order by id desc",[user_id],(error,productList,fields)=>{
                        if (error) {
                            reject(error);
                        } else {
                            console.log('productList',productList)

                            if(productList.length>0) {
                                dbFunc.connectionRelease;
                                rows[0]['productList']=productList;
                                for (var i = 0; i < productList.length; i++) {
                                    var product_id= productList[i].product_id_int;
                                    console.log('product_id',product_id);
                                    var j=0;
                                    var s=0;
                                    db.query("SELECT DISTINCT product_id,varnt.* FROM `ll_products_variants` varnt where SUBSTRING_INDEX(varnt.product_id,'/',-1) =? order by id desc",[product_id],(error,variants,fields)=>{
                                        if (error) {
                                            reject(error);
                                        } else {
                                            if(variants.length>0) {
                                                for (var k = 0; k < variants.length; k++) {
                                                    productList[j]['variants']=variants;
                                                }
                                            }
                                            
                                            db.query("SELECT DISTINCT product_id,images.image_url FROM `ll_products_images` images where SUBSTRING_INDEX(images.product_id,'/',-1) =?",[product_id],(error,images,fields)=>{
                                                if (error) {
                                                    reject(error);
                                                } else {
                                                    if(images.length>0) {
                                                        for (var d = 0; d < images.length; d++) {
                                                            productList[s]['images']=images;
                                                        }
                                                    }
                                                    console.log('s',s,'j',j,productList.length-1);
                                                    if (s==productList.length-1) {
                                                        //rows[h]['subcat']=catrows[j];
                                                        resolve({"success":true,"message":'done','body':rows[0]});
                                                    }
                                                    s++;
                                                }    
                                            });                                                   
                                            j++;  
                                        }
                                    }); 
                                }           
                                //resolve({"success":true,"message":"success",'body':rows[0]});
                            } else {
                                rows[0]['productList']=productList;
                                resolve({"success":true,"message":"success",'body':rows[0]});                  
                            }
                        }
                    });
                    //resolve({"success":true,"message":"success",'body':rows[0]});                  
                }
            }
        });
    });
}
function publicBroadcastingDetails(arg) {
     console.log('publicBroadcastingDetails',arg);
    return new Promise((resolve, reject) => {
        db.query("SELECT  (SELECT  count(id) FROM ll_channel_followers WHERE ll_channel_followers.user_id=ll_product_broadcasting.user_id and ll_channel_followers.status='1' ) as followers,   (SELECT username FROM ll_users WHERE ll_users.user_id=ll_product_broadcasting.user_id limit 1) as merchant_name,ll_product_broadcasting.*,ll_product_broadcasting.store_pickup as pickupStore FROM ll_product_broadcasting WHERE (channel_id=? or  broadcast_id=?) order by id desc limit 1",[arg.broadcast_id,arg.broadcast_id], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                if(rows.length<=0) {
                    console.log(rows);
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Error! Please create the channel"});
                } else {
                    var product_id=rows[0].product_id;
                    var user_id=rows[0].user_id;
                     console.log(product_id,user_id)
                    //product_id= product_id.replace(/\'/gi,'')
                   // console.log(product_id);
                    db.query("SELECT DISTINCT prod.product_id,prod.*,SUBSTRING_INDEX(prod.product_id,'/',-1) as product_id_int, (SELECT ll_products_images.image_url FROM ll_products_images WHERE ll_products_images.product_id=prod.product_id limit 1) as image_url FROM `ll_products` prod where SUBSTRING_INDEX(prod.product_id,'/',-1) IN ("+product_id+")  and prod.user_id=? order by id desc",[user_id],(error,productList,fields)=>{
                        if (error) {
                            reject(error);
                        } else {
                            console.log('productList',productList)

                            if(productList.length>0) {
                                dbFunc.connectionRelease;
                                rows[0]['productList']=productList;
                                for (var i = 0; i < productList.length; i++) {
                                    var product_id= productList[i].product_id_int;
                                    console.log('product_id',product_id);
                                    var j=0;
                                    var s=0;
                                    db.query("SELECT DISTINCT product_id,varnt.* FROM `ll_products_variants` varnt where SUBSTRING_INDEX(varnt.product_id,'/',-1) =? order by id desc",[product_id],(error,variants,fields)=>{
                                        if (error) {
                                            reject(error);
                                        } else {
                                            if(variants.length>0) {
                                                for (var k = 0; k < variants.length; k++) {
                                                    productList[j]['variants']=variants;
                                                }
                                            }
                                            
                                            db.query("SELECT DISTINCT product_id,images.image_url FROM `ll_products_images` images where SUBSTRING_INDEX(images.product_id,'/',-1) =? ",[product_id],(error,images,fields)=>{
                                                if (error) {
                                                    reject(error);
                                                } else {
                                                    if(images.length>0) {
                                                        for (var d = 0; d < images.length; d++) {
                                                            productList[s]['images']=images;
                                                        }
                                                    }
                                                    console.log('s',s,'j',j,productList.length-1);
                                                    if (s==productList.length-1) {
                                                        //rows[h]['subcat']=catrows[j];
                                                        resolve({"success":true,"message":'done','body':rows[0]});
                                                    }
                                                    s++;
                                                }    
                                            });                                                   
                                            j++;  
                                        }
                                    }); 
                                }           
                                //resolve({"success":true,"message":"success",'body':rows[0]});
                            } else {
                                rows[0]['productList']=productList;
                                resolve({"success":true,"message":"success",'body':rows[0]});                  
                            }
                        }
                    });
                    //resolve({"success":true,"message":"success",'body':rows[0]});                  
                }
            }
        });
    });
}
function getAllChannel(arg) {
    return new Promise((resolve, reject) => {
        var LimitNum = 8
        var startNum = 0;
        if(arg.start == '' || arg.limit == ''){
              startNum = 0;
              LimitNum = 8;
        }else{
             //parse int Convert String to number 
              startNum = parseInt(arg.start);
              //LimitNum = parseInt(arg.limit); 
        }
        db.query("SELECT  ll_users.first_name,ll_users.last_name,ll_users.profile_pic,ll_users_channels.channel_logo,ll_users_channels.id as channel_id,ll_users_channels.channel_name as channel_name,(SELECT  count(id) FROM ll_channel_followers WHERE ll_channel_followers.user_id=ll_users.user_id and ll_channel_followers.channel_id=ll_users_channels.id and ll_channel_followers.status='1' ) as followers FROM ll_users,ll_users_channels where ll_users_channels.user_id=ll_users.user_id and ll_users_channels.status='2' order by ll_users.id desc  limit ? offset ?",[LimitNum,startNum], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
               
                    dbFunc.connectionRelease;
                
                    resolve({"success":true,"message":"success",'body':rows});                  
                
                       
            }
        });
    });
}
function getAllSreamingChannel(arg) {
    return new Promise((resolve, reject) => {
        var LimitNum = 8
        var startNum = 0;
        if(arg.start == '' || arg.limit == ''){
              startNum = 0;
              LimitNum = 8;
        }else{
             //parse int Convert String to number 
              startNum = parseInt(arg.start);
              //LimitNum = parseInt(arg.limit); 
        }

        if (arg.user_id && arg.user_id!='') {
            db.query(`SELECT tages FROM ll_user_interest where user_id=?  `,[arg.user_id], (error, rows, fields) => {
                if (error) {
                    reject({"success":false,"message":error.code});
                } else {
                    console.log('rows',rows);
                    if (rows[0].result>0) {
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
                         db.query("SELECT  SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW()) as timestamp,ll_product_broadcasting.*,(SELECT channel_logo FROM ll_users_channels WHERE ll_users_channels.user_id=ll_product_broadcasting.user_id and ll_users_channels.id=ll_product_broadcasting.channel_id) as channel_logo FROM ll_product_broadcasting where broadcast_status!='2' and broadcast_time>= CURDATE() "+query+" order by id desc limit ? offset ?",[LimitNum,startNum], (error, rows, fields) => {
                            if (error) {
                                reject({"success":false,"message":error.code});
                            } else {
                                resolve({"success":true,"message":"success",'body':rows});                  

                            }
                        });
                         //resolve({"success":true,'data':[],"message":"Account doesn’t exist"});
                    
                    } else {

                        db.query(`SELECT  SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW()) as timestamp,ll_product_broadcasting.*,(SELECT channel_logo FROM ll_users_channels WHERE ll_users_channels.user_id=ll_product_broadcasting.user_id and ll_users_channels.id=ll_product_broadcasting.channel_id) as channel_logo FROM ll_product_broadcasting where broadcast_status!='2' and broadcast_time>= CURDATE()  order by id desc limit ? offset ?`,[LimitNum,startNum], (error, rows, fields) => {
                            if (error) {
                                reject({"success":false,"message":error.code});
                            } else {
                                resolve({"success":true,"message":"success",'body':rows});                  

                            }
                        });
                    }
                   
                }
            });
            

        }else{
            db.query(`SELECT  SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW()) as timestamp,ll_product_broadcasting.*,(SELECT channel_logo FROM ll_users_channels WHERE ll_users_channels.user_id=ll_product_broadcasting.user_id and ll_product_broadcasting.channel_id=ll_users_channels.id) as channel_logo FROM ll_product_broadcasting where broadcast_status!='2' and broadcast_time>= CURDATE()  order by id desc limit ? offset ?`,[LimitNum,startNum], (error, rows, fields) => {
                if (error) {
                    reject({"success":false,"message":error.code});
                } else {
                    resolve({"success":true,"message":"success",'body':rows});                  

                }
            });
        }
    });
}

function sociallogin(authenticData) {
     console.log('nodel',authenticData);
    return new Promise((resolve, reject) => {
        db.query("SELECT ll_users.*,(SELECT COUNT(id) FROM ll_shopify_auth WHERE ll_shopify_auth.user_id=ll_users.user_id) as shopifyverify FROM ll_users WHERE username =? or email =? or social_id=?",[authenticData.username,authenticData.email,authenticData.id], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                 if(rows.length<=0) {
                    dbFunc.connectionRelease;
                    var strip_id =0;// customer.id;
                    var user_id=uuid();
                    var user={};
                    var activation_code=uuid();
                    user.user_id=user_id;
                    user.activation_code=activation_code;
                    user.email=authenticData.email;
                    user.username=authenticData.username;
                    user.social_id=authenticData.id;
                    user.profile_pic=authenticData.profile_pic
                    user.first_name=authenticData.firstName
                    user.last_name=authenticData.lastName;
                    user.social_type=authenticData.social_type;
                    user.active=1;
                                                          
                    db.query("INSERT INTO ll_users set ?", [user], (err, rowsinsert) => {
                        if (err) {
                             dbFunc.connectionRelease;
                             reject(err);
                             console.log("Last ID error",err);
                        } else {
                            console.log("Last ID:");
                            console.log(rowsinsert.insertId);
                            //getKey(user_id);
                            //db.query("SELECT * FROM `ll_mail_template` WHERE id=1 order by id asc ", function (err, tempres) {
                               // user.message=tempres[0].template_body;
                               // user.subject=tempres[0].template_subject;
                            // sentMail(user, function(callbackres){
                            //     console.log(callbackres);
                            // });
                            db.query("SELECT ll_users.*,(SELECT COUNT(id) FROM ll_shopify_auth WHERE ll_shopify_auth.user_id=ll_users.user_id) as shopifyverify FROM ll_users WHERE user_id=?",[user_id], (error, rows, fields) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    rows[0]['influencer_details']= "";
                                    resolve(rows);
                                }
                            });   
                        }

                    });
                } else {
                    var active= rows[0].active
                    var isDelete= rows[0].isDelete;
                    if (active==1 && isDelete=='0' ) {
                        var user={};
                        var user_id= rows[0].user_id;
                        var usersDetail= rows[0];

                        user.username=authenticData.username;
                        user.social_id=authenticData.id;
                        user.profile_pic=authenticData.profile_pic;
                        user.first_name=authenticData.firstName
                        user.last_name=authenticData.lastName;
                        user.social_type=authenticData.social_type;
                        user.active=1;
                                                              
                        db.query("UPDATE ll_users set ? where user_id=?", [user,user_id], (err, rows) => {
                            if (err) {
                                 dbFunc.connectionRelease;
                                 reject(err);
                                 console.log("Last ID error",err);
                            } else {
                                console.log("Last ID:");
                                console.log(rows.insertId);
                                //getKey(user_id);
                                //db.query("SELECT * FROM `ll_mail_template` WHERE id=1 order by id asc ", function (err, tempres) {
                                   // user.message=tempres[0].template_body;
                                   // user.subject=tempres[0].template_subject;
                                // sentMail(user, function(callbackres){
                                //     console.log(callbackres);
                                // });
                                usersDetail[0]['influencer_details']= "";
                                resolve(usersDetail);

                            }

                        });
                    } else {
                        reject({"success":false,"message":"Yuor account is deactivated, please contact with support"});
                    }
                            
                
                }

            }
        });
    });

}
function authentic(authenticData) {
     console.log('nodel',authenticData);
    return new Promise((resolve, reject) => {
        db.query("SELECT ll_users.*,COALESCE((SELECT IF(id IS NULL,0,1) FROM ll_shopify_auth WHERE ll_shopify_auth.user_id=ll_users.user_id and ll_shopify_auth.is_delete=0 limit 1 ),0) as shopifyverify FROM ll_users WHERE username =? or email =?",[authenticData.username,authenticData.username], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                 if(rows.length<=0) {
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Error! Invalid Email"});
                } else {
                    bcrypt.compare(authenticData.password, rows[0].password, function (err, isMatch) {
                        if (err) {
                            reject(error);
                        } else if (isMatch) {
                            var active=rows[0].active;
                            var isDelete=rows[0].isDelete;
                            var user_id=rows[0].user_id;
                            
                            rows[0]['deposit_amount']= 1000;
                            rows[0]['influencer_details']= [];
                            if (isDelete=='1') {  
                                reject({"success":false,"message":"Error! Invalid Email"});

                            }else{
                                if (active==1) {
                                    db.query("SELECT * FROM ll_user_influencer WHERE user_id=?",[user_id],(error,influencer_details)=>{
                                      if(!!error) {
                                          dbFunc.connectionRelease;
                                          reject(error);
                                      } else {
                                        
                                        if(influencer_details.length>0) {
                                            rows[0]['influencer_details']= influencer_details[0];
                                        }
                                        console.log(rows)
                                        resolve(rows);
                                        }            
                                    });        
                                } else {
                                    reject({"success":false,"message":"Please verify your email first"});
                                }
                            }
                            
                        }
                        else {
                            reject({"success":false,"message":"Password doesn’t match"});
                        }
                    });
                }

            }
        });
    });

}


function signup(user) {
   
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
               /* if(user.sponsor_id=='') {
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Error! Sponsor ID required"});
                } else {
                    /*db.query("SELECT * FROM ll_users WHERE username=?",[user.sponsor_id], (error, rows, fields) => {
                        if (error) {
                            dbFunc.connectionRelease;
                            reject(error);
                        } else if(rows.length<=0) {
                            dbFunc.connectionRelease;
                            reject({"success":false,"message":"Error! Invalid Sponsor ID"});
                        } else {*/
                            user.password = hash;
                           // var sponsor_id=rows[0].user_id;
                           var username =user.username;
                            username =username.replace(/ |@|#|&|%|(|)|{|]|{|;|:|'|"|,|!/gi, "");
                            var first_name =user.first_name;
                            var last_name = user.last_name;
                            var shopper_name = user.shopper_name;

                            first_name =first_name.replace(/ |@|#|&|%|(|)|{|]|{|;|:|'|"|,|!/gi, "");
                            last_name =last_name.replace(/ |@|#|&|%|(|)|{|]|{|;|:|'|"|,|!/gi, "");

                            db.query("SELECT * FROM ll_users WHERE username=? or username=?",[user.username,username], (error, rows, fields) => {
                                if (error) {
                                    dbFunc.connectionRelease;
                                    reject(error);
                                } else if(rows.length>0) {
                                    dbFunc.connectionRelease;
                                    reject({"success":false,"message":"Username already exist! Try with different Username"});
                                } else {
                                    db.query("SELECT * FROM ll_users WHERE email=?",[user.email], (error, rows, fields) => {
                                        if (error) {
                                            dbFunc.connectionRelease;
                                            reject(error);
                                        } else if(rows.length>0) {
                                            dbFunc.connectionRelease;
                                            reject({"success":false,"message":"Email already exist ! try with different Email"});
                                        } else {
                                             var user_id=uuid();

                                             var activation_code=uuid();
                                             user.activation_code=activation_code; 
                                             /////////////////Create User Into strip/////////////////////
                                              /*stripe.customers.create(
                                                    {
                                                      description: 'Customer for jenny.rosen@example.com',
                                                      email: user.email,
                                                    },
                                                    function(err, customer) {
                                                      // asynchronously called 
                                                      //console.log('--customer---'); 
                                                      if(err){
                                                        console.log('err',err);
                                                      }else{*/
                                                       var strip_id =0;// customer.id;
                                                       var user_type='0';
                                                        if (user.user_type) {
                                                            user_type=user.user_type;
                                                        }   
                                                        db.query("INSERT INTO ll_users(first_name, last_name,shopper_name, phone, user_id, username,email,password,activation_code,active,country,user_type)VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",[first_name, last_name, shopper_name,user.phone, user_id,username,user.email,user.password,activation_code,0,user.country,user_type], (err, rows) => {
                                                        if (err) {
                                                             dbFunc.connectionRelease;
                                                             reject(err);
                                                             console.log("Last ID error");
                                                           } else {
                                                        console.log("Last ID:");
                                                        console.log(rows.insertId);
                                                        //getKey(user_id);
                                                        db.query("SELECT * FROM `ll_mail_template` WHERE id=1 order by id asc ", function (err, tempres) {
                                                            user.message=tempres[0].template_body;
                                                            user.subject=tempres[0].template_subject;
                                                            sentMail(user, function(callbackres){
                                                                console.log(callbackres);
                                                            });
                                                        //mail.mail(user);
                                                        //mail.mail(err);
                                                    });
                                                    dbFunc.connectionRelease;
                                                 resolve(rows);
                                                }
                                              });
                                             /*           
                                            }
                                          }
                                        );*/
                                     }
                                  });        
                                }
                            });
                       /* }
                    });        
                }*/
            })
        });
    });
}

/*function getKey(userID) {
    console.log('userID',userID);


    tronWeb.createAccount().then(createaddress => {
       
        const publicKeyval =createaddress.publicKey;
        const publicKey = key.encrypt(publicKeyval, 'base64');
        console.log('encryptedpublicKey: ', publicKey);
        const decryptedpublicKey = key.decrypt(publicKey, 'utf8');
        console.log('decryptedpublicKey: ', decryptedpublicKey);

        const privateKeyVal =createaddress.privateKey;
        const privateKey = key.encrypt(privateKeyVal, 'base64');
        console.log('encryptedprivateKey: ', privateKey);
        const decryptedprivateKey = key.decrypt(privateKey, 'utf8');
        console.log('decryptedprivateKey: ', decryptedprivateKey);

        
        console.log('address',createaddress.address.base58);
        console.log('publicKey',createaddress.publicKey);
        console.log('privateKey',createaddress.privateKey);

         db.query("INSERT INTO sp_users_key(user_id,pvt_key,pub_key)VALUES(?,?,?)",[userID,privateKey,publicKey ], (err, rows) => {
            if (err) {
                dbFunc.connectionRelease;
                //reject(err);
                console.log("Last ID error");
            } else {
                console.log("Last ID:");
                console.log(rows.insertId);
            }
             dbFunc.connectionRelease;
        });
        db.query("UPDATE `ll_users` SET trx_address=? where user_id=?", [createaddress.address.base58,userID], function (err, row) {               
             dbFunc.connectionRelease;
        });  
    }).catch(error => {
        console.error(error);  
    });
}*/
function emailVerify(email) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT count(*) as result FROM ll_users where email=? `,[email], (error, rows, fields) => {
            if (error) {
                reject({"success":false,"message":error.code});
            } else {
                console.log('rows',rows);
                if (rows[0].result>0) {
                     resolve({"success":true,'data':[],"message":"Account doesn’t exist"});
                } else {
                      reject({"success":false,"message":"Account doesn’t exist"});
                }
               
            }
        });
    });

}
function country() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ll_country  where active=0 order by name asc `, (error, rows, fields) => {
            if (error) {
                reject({"success":false,"message":error.code});
            } else {
                resolve(rows);
            }
        });
    });
}

function getsteamingList(arg) {
    return new Promise((resolve, reject) => {
       /* if (arg.user_id && arg.user_id!='') {
            //GROUP_CONCAT(tages) as tags
            db.query(`SELECT tages FROM ll_user_interest where user_id=?  `,[arg.user_id], (error, rows, fields) => {
            if (error) {
                reject({"success":false,"message":error.code});
            } else {
                console.log('rows',rows);
                if (rows[0].result>0) {
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
                    db.query("SELECT FLOOR(HOUR(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) / 24) as days,  MOD(HOUR(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())), 24) as hours,   MINUTE(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) as minutes,  SECOND(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) as sec, SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW()) as timestamp,ll_product_broadcasting.*,(SELECT channel_logo FROM ll_users_channels WHERE ll_users_channels.user_id=ll_product_broadcasting.user_id) as channel_logo FROM ll_product_broadcasting where broadcast_status!='2' and broadcast_time>= CURDATE() "+query+" order by id desc limit 4 ", (error, rows, fields) => {
                        if (error) {
                            reject({"success":false,"message":error.code});
                        } else {
                            resolve(rows);
                        }
                    });
                     //resolve({"success":true,'data':[],"message":"Account doesn’t exist"});
                
                } else {

                    db.query(`SELECT FLOOR(HOUR(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) / 24) as days,  MOD(HOUR(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())), 24) as hours,   MINUTE(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) as minutes,  SECOND(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) as sec, SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW()) as timestamp,ll_product_broadcasting.*,(SELECT channel_logo FROM ll_users_channels WHERE ll_users_channels.user_id=ll_product_broadcasting.user_id) as channel_logo FROM ll_product_broadcasting where broadcast_status!='2' and broadcast_time>= CURDATE() order by id desc limit 4 `, (error, rows, fields) => {
                        if (error) {
                            reject({"success":false,"message":error.code});
                        } else {
                            resolve(rows);
                        }
                    });
                }
               
            }
        });

        }else{*/

            db.query(`SELECT FLOOR(HOUR(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) / 24) as days,
    MOD(HOUR(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())), 24) as hours,
    MINUTE(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) as minutes,
    SECOND(TIMEDIFF(ll_product_broadcasting.broadcast_time, NOW())) as sec, SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW()) as timestamp,ll_product_broadcasting.*,(SELECT channel_logo FROM ll_users_channels WHERE ll_users_channels.id=ll_product_broadcasting.store_id) as channel_logo FROM ll_product_broadcasting where (broadcast_status!='2' or broadcast_status!='0') and broadcast_time>= CURDATE() order by id desc limit 4 `, (error, rows, fields) => {
                if (error) {
                    reject({"success":false,"message":error.code});
                } else {
                    resolve(rows);
                }
            });
       /* }*/
    });
}
function GetUsersMlm() {
    return new Promise((resolve, reject) => { 
				
        db.query(`SELECT user_id as id ,username as name, sponsor_id as pid , IF(profile_pic IS NULL,"http://cbdn2020.com/uploads/nouser.jpeg ",profile_pic) as img FROM ll_users `, (error, rows, fields) => {
            if (error) {
                reject({"success":false,"message":error.code});
            } else {
				
                resolve(rows);
            }
        });
    });
}


function forgotPassword(email){
    //console.log('forgotPassword model',email); 
    return new Promise((resolve, reject) => {
        db.query("Select user_id,email,username from ll_users WHERE email = ?", [email], function (err, res) {
            if(err) {
                // console.log("error: ", err);
                reject({"success":false,"message":err.code});
            }else{ 
            //console.log(image_data); // A data URI for the QR code image
            if(res.length!=0)
            {
                //console.log('res',res); 
                var userData={};
                userData.user_id=res[0].user_id;
                userData.email=res[0].email;
                userData.username=res[0].username;
                var forgotten_password_code='F_'+uuid();
                var id=uuid();
                userData.forgotten_password_code=forgotten_password_code
                var forgotten_password_time=new Date().getTime();
                console.log('userData',userData); 
                db.query("UPDATE `ll_forgot_password` SET password_selector=? where user_id=?", [1,res[0].user_id], function (err, row) {               
                });
                db.query("INSERT INTO `ll_forgot_password`(`id`, `user_id`, `password_selector`, `forgotten_password_code`, `forgotten_password_time`) VALUES (?,?,?,?,?)", [id,res[0].user_id,0,forgotten_password_code,forgotten_password_time ], function (err1, rows) {
                    if(err1) {
                        console.log("error: ", err1);
                        reject({"success":false,"message":err1.code});
                    }
                    else{ 
                        //console.log('rows',rows); 
                        //result(null, res); 
                        db.query("SELECT * FROM `ll_mail_template` WHERE id=2 order by id asc ", function (err, tempres) {
                           //console.log('tempres',tempres); 
                            userData.message=tempres[0].template_body;
                            userData.subject=tempres[0].template_subject;
                             forgotPasswordMail(userData, function(callbackres){
                                 console.log(callbackres);
                             });
                            //mail.mail(userData);
                        });
                        
                    }
                }); 
                
                resolve("Reset Password Link Sent in Your Register Mail Successfully!");
            }else{
                reject({"success":false,"message":"Email account not exist"});
            }

           
            }
        });
    }); 
};
function addressCallback(callbackData) {
    if (callbackData['ipn_type']=='deposit') {

        var amount     = callbackData['amount'];
        var address    = callbackData['address'];
        var confirms   = callbackData['confirms'];
        var status     = callbackData['status'];
        var status_text= callbackData['status_text'];
        var txn_ID     = callbackData['txn_id'];
        var fee        =0
        var payment_status ='0'
        if (status>=100) {
            fee     = callbackData['fee'];
            payment_status='1'
        }
        if (status<0) {
            payment_status='2'
        }
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM sp_deposit WHERE address=?`,[address], (error, rows, fields) => {
                if (error) {
                    reject({"success":false,"message":error.code});
                } else {
                    
                    db.query('INSERT INTO `sp_deposit`( `amount`, `fee`, `txn_ID`, `payment_status`, `confirmation`) VALUES (?,?,?,?,?)',[amount,fee,txn_ID,payment_status,confirmation], (error, rows, fields) => {
                        if (error) {
                            reject({"success":false,"message":error.code});
                        } else {

                        }
                    });
                    resolve(callbackData);
                }
            });
        });

    }
}


function resetPassword(userData){
    var data={}  
    var lang='en';
    if (userData.lang) {
        var lang = userData.lang;
    }
       console.log('resetPassword',userData);

     return new Promise((resolve, reject) => {
    if(userData.newPassword==userData.confPassword){            
        db.query("Select fp.password_selector,fp.id,ll_users.user_id,ll_users.username,ll_users.email,ll_users.password,fp.forgotten_password_time from ll_forgot_password as fp,ll_users  WHERE ll_users.user_id=fp.user_id and fp.password_selector=0 and fp.forgotten_password_code = ?", [userData.forgotten_password_code], function (err, res) {
            if(err) {
                reject({"success":false,"message":error.code});
            }
            else{
                if(res.length!=0)
                {   
                    var oldPassword=res[0].password;
                    var id=res[0].id;
                    var user_id=res[0].user_id;
                    var forgotten_password_selector=res[0].password_selector;
                    if (forgotten_password_selector!=1) {
                        const updateUserData ={};
                        const updatePersnalData ={};
                        if(userData.newPassword)
                            bcrypt.genSalt(10, function (err, salt) {
                                if (err) {
                                    return next(err);
                                }
                                bcrypt.hash(userData.newPassword, salt, function (err, hash) {
                                    if (err) {
                                        return next(err);
                                    }

                            
                                if(userData.newPassword)
                                    updateUserData['forgotten_password'] =hash;
                                    updateUserData['password_selector'] =1;
                                    db.query("UPDATE `ll_users` SET password=? where user_id=?", [hash,user_id], function (err, row) {
                                        if(err) {
                                           reject({"success":false,"message":error.code});
                                        }
                                    });    
                                    db.query("UPDATE `ll_forgot_password` SET ? where id=?", [updateUserData,id], function (err, row) {
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
                       
                        data['message']="Forgotten Password link expired";
                        data['data']='';
                        data['success']=false;
                        reject(data);  
                    }
                    
                }else{
                    
                    data['message']="Invalid forgotten_password_code Key";
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

function confirmation (userData){
    console.log('confirmation',userData);
    var data={}  
    var lang='en';
    if (userData.lang) {
        var lang = userData.lang;
    }
    return new Promise((resolve, reject) => {
        //sql.query("SELECT * FROM `uzyth_mail_template` WHERE id=11 order by id asc ", function (err, tempres) {

        db.query("Select TIMESTAMPDIFF(HOUR,crdate,CURRENT_TIMESTAMP()) as hours,active, user_id,username,email,sponsor_id from ll_users  WHERE activation_code = ?", [userData.activation_code], function (err, res) {
            if(err) {
               reject({"success":false,"message":err.code});
            }
            else{
                if(res.length!=0)
                {   
                    var active=res[0].active;
                    var userID=res[0].user_id;
                    var username=res[0].username;
                    var sendTO = res[0].sponsor_id;
                    var email=res[0].email;
                    var hours=res[0].hours;
                    var hoursLeft= 24-hours;
                    if (active==0 || active==2) { 
                        if (hoursLeft>=0) {
                            const updateUserData ={};
                            if(userData.activation_code)
                                updateUserData['active'] =1;
                            db.query("UPDATE `ll_users` SET ? where user_id=?", [updateUserData,userID], function (err, row) {
                                if(err) {
                                    reject({"success":false,"message":err.code});
                                }
                                else{  
                                    data['success']=true;
                                    data['message']="Email confirmed Successfully";
                                    data['data']=[];
                                    resolve(data);   
                                }                                    
                            });    

                        }else{
                            data['success']=false;
                            data['message']="Email verification code expired";
                            data['data']=[];
                            reject(data);
                         }    
                    }else{
                        data['success']=false;
                        data['message']="Email already verified";
                        data['data']=[];
                        reject(data);
                    }
                }else{
                    data['success']=false;
                    data['message']="Invalid Activation Key";
                    data['data']=[];
                    reject(data);
                }
            }
        });
    });
    
};
function forgotPasswordMail(argument) {
  //console.log("forgot",argument);
  /*
  Domain: sixprofit.com
Server Name: email-smtp.us-east-1.amazonaws.com
Port: 25, 465 or 587
Use Transport Layer Security (TLS): Yes 

SMTP Username: AKIAWNK6GV2IEIIU3XAR
SMTP Password: BLb7card2qrxAdPzYK6A045ziZ9qNdzSljxwHbasqd6M*/

  const nodemailer = require("nodemailer");

    var username = argument.username;///dog/gi;timeLeft
    var message = argument.message;
    console.log('forgotPasswordMail',argument.email);
    message =message.replace('[username]',username );
    message =message.replace('[username]',username );
    message =message.replace( '[forgotten_password_code]',argument.forgotten_password_code);
    message =message.replace( '[forgotten_password_code]',argument.forgotten_password_code);
    message =message.replace( '[forgotten_password_code]',argument.forgotten_password_code);

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
    subject:argument.subject, // Subject line
    html: message, //html body
  });

  console.log("Message sent: %s", info.messageId);
 /*   const AWS = require("aws-sdk");
    var username = argument.username;///dog/gi;timeLeft
  var message = argument.message;
  console.log('sentMail',argument.email);
  message =message.replace('[username]',username );
  message =message.replace('[username]',username );
  message =message.replace( '[forgotten_password_code]',argument.forgotten_password_code);
  message =message.replace( '[forgotten_password_code]',argument.forgotten_password_code);
AWS.config.update({ "accessKeyId": "AKIAWNK6GV2IOYEUGELK", "secretAccessKey": "a6dWK7/9bPlHW13mHvepIVdSHkp5DxoUstvtpGqT", "region": "us-east-1" });

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
const params = {
  Destination: {
    ToAddresses: [argument.email] // Email address/addresses that you want to send your email
  },
  // ConfigurationSetName: <<ConfigurationSetName>>,
  Message: {
    Body: {
      Html: {
        // HTML Format of the email
        Charset: "UTF-8",
        Data:message,//"<html><body><table align='center' border='0' width='600px' style='width:600px; margin:auto; font-family: 'Open Sans', sans-serif; padding:0; border:0px; table-layout: fixed;' cellpadding='0' cellspacing='0'><tr><td class='center' align='center' valign='top'><center><table cellpadding='0' cellspacing='0' width='600' style='width:100%; table-layout:fixed;'><tbody><tr><td style='height:35px; line-height:35px;'> &nbsp;</td></tr></tbody></table><table cellpadding='0' cellspacing='0' width='600' bgcolor='#656586' style='width:100%; table-layout:fixed; background:#f3f3f3; border: solid 1px #cccccc;'><tbody><tr><td><table cellpadding='0' cellspacing='0'><tbody><tr><th style='height:30px; line-height:30px; padding: 0; margin: 0;'>&nbsp;</th></tr><tr><th><table cellpadding='0' cellspacing='0' style='width:100%;'><tbody><tr><td width='30' style='width:30px;'></td><td width='540' style='width:540px;'><table cellpadding='0' cellspacing='0' style='width:100%;'><tbody><tr><td style='border: 1px solid #2ee7dc; background: #2ee7dc;'><p style='font-size: 24px; line-height: 45px; font-weight: 500; margin:0px; color: #fff; text-align: center;'><img src='https://app.uzyth.com/assets/images/logo.png' style='height:80px;' /></p></td></tr><tr><td style='height:20px; line-height:20px; padding: 0; margin: 0;'>&nbsp;</td></tr><tr><td><table cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse;'><tbody><tr><td style='padding: 7px 12px 6px 12px; width:140px;'><p style='font-size: 16px; color: #222222; font-weight: 500;'>Hello  "+argument.username+",</p><p style='font-size: 16px; color: #222222; font-weight: 500;'>Thank you for choosing  Uzyth!</p><p style='font-size: 16px; color: #222222; font-weight: 500;'>Please click the link below to reset password</p><p style='font-size: 16px; color: #222222; font-weight: 500;'><a href='https://app.uzyth.com/#/reset-password/"+argument.forgotten_password_code+"'>https://app.uzyth.com/#/reset-password/"+argument.forgotten_password_code+"</a></p><br /><p style='font-size: 16px; color: #222222; font-weight: 500;'>If the above link can not click. Please copy the link to the browser's address bar to open it.</p><p>If you have not made this operation, may be someone else mistakenly, please ignore this message.</p><p style='font-size: 16px; color: #222222; font-weight: 500;'>This message is sent by system, do not reply.</p><br /><p style='font-size: 16px; color: #222222; font-weight: 500;'>Uzyth.com  Team</p></td></tr></tbody></table></td></tr><tr><td style='height:30px; line-height:30px; padding: 0; margin: 0;'>&nbsp;</td></tr></tbody></table></td><td width='30' style='width:30px;'></td></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></center></td></tr></table></body></html>",
        //Data: "<html><body><h1>Hello  "+argument.username+"</h1><p style='color:red'>Please click on change password link: </p> <p><a href='http://app.uzyth.com/#/reset-password/"+argument.forgotten_password_code+"'>Reset Password</a></p></body></html>"
      },
      Text: {
        Charset: "UTF-8",
        Data: "Hello Charith Sample description time 1517831318946"
      }
    },
    Subject: {
      Charset: "UTF-8",
      Data: argument.subject,//"Reset Password"
    }
  },
  Source: "info@sixprofit.com"
};

const sendEmail = ses.sendEmail(params).promise();

sendEmail
  .then(data => {
    console.log("email submitted to SES", data);
  })
  .catch(error => {
    console.log(error);
});*/
}

function sentMail(argument) {
     const nodemailer = require("nodemailer");

    var username = argument.username;///dog/gi;timeLeft
    var message = argument.message;
    console.log('sentMail',argument.email);
    message =message.replace('[username]',username );
    message =message.replace('[username]',username );
    message =message.replace( '[activation_code]',argument.activation_code);
    message =message.replace( '[activation_code]',argument.activation_code);
    message =message.replace( '[activation_code]',argument.activation_code);


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
    subject:argument.subject, // Subject line
   // text: '', // plain text body
    html: message, // html body
  });

  console.log("Message sent: %s", info.messageId);
 /*const AWS = require("aws-sdk");
  var username = argument.username;///dog/gi;timeLeft
  var message = argument.message;
  console.log('sentMail',argument.email);
  message =message.replace('[username]',username );
  message =message.replace('[username]',username );
  message =message.replace( '[activation_code]',argument.activation_code);
  message =message.replace( '[activation_code]',argument.activation_code);
  message =message.replace( '[activation_code]',argument.activation_code);

AWS.config.update({ "accessKeyId": "AKIAWNK6GV2IOYEUGELK", "secretAccessKey": "a6dWK7/9bPlHW13mHvepIVdSHkp5DxoUstvtpGqT", "region": "us-east-1" });

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
const params = {
  Destination: {
    ToAddresses: [argument.email] // Email address/addresses that you want to send your email
  },
  // ConfigurationSetName: <<ConfigurationSetName>>,
  Message: {
    Body: {
      Html: {
        // HTML Format of the email
        Charset: "UTF-8",
        Data:message,//"<html><body><table align='center' border='0' width='600px' style='width:600px; margin:auto; font-family: 'Open Sans', sans-serif; padding:0; border:0px; table-layout: fixed;' cellpadding='0' cellspacing='0'><tr><td class='center' align='center' valign='top'><center><table cellpadding='0' cellspacing='0' width='600' style='width:100%; table-layout:fixed;'><tbody><tr><td style='height:35px; line-height:35px;'> &nbsp;</td></tr></tbody></table><table cellpadding='0' cellspacing='0' width='600' bgcolor='#656586' style='width:100%; table-layout:fixed; background:#f3f3f3; border: solid 1px #cccccc;'><tbody><tr><td><table cellpadding='0' cellspacing='0'><tbody><tr><th style='height:30px; line-height:30px; padding: 0; margin: 0;'>&nbsp;</th></tr><tr><th><table cellpadding='0' cellspacing='0' style='width:100%;'><tbody><tr><td width='30' style='width:30px;'></td><td width='540' style='width:540px;'><table cellpadding='0' cellspacing='0' style='width:100%;'><tbody><tr><td style='border: 1px solid #2ee7dc; background: #2ee7dc;'><p style='font-size: 24px; line-height: 45px; font-weight: 500; margin:0px; color: #fff; text-align: center;'><a href='https://app.uzyth.com/#/confirmation/"+argument.activation_code+"'><img src='http://devapp.uzyth.com/assets/images/logo.png' style='height:80px;' /></a></p></td></tr><tr><td style='height:20px; line-height:20px; padding: 0; margin: 0;'>&nbsp;</td></tr><tr><td><table cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse;'><tbody><tr><td style='padding: 7px 12px 6px 12px; width:140px;'><p style='font-size: 16px; color: #222222; font-weight: 500;'>Hello "+argument.username+",</p><p style='font-size: 16px; color: #222222; font-weight: 500;'>Thank you for choosing https://app.uzyth.com</p><p style='font-size: 16px; color: #222222; font-weight: 500;'>This message is sent by system, do not reply.</p><p style='font-size: 16px; color: #222222; font-weight: 500;'>Please click on the link below to complete the registration:</p><br /><p style='word-break: break-all; font-size: 16px; color: #222222; font-weight: 500;'><a href='https://app.uzyth.com/#/confirmation/"+argument.activation_code+"'>Email Activation Link</a></p><br /><p style='font-size: 16px; color: #222222; font-weight: 500;'>If the above link can not click. Please copy the link to the browser's address bar to open it.If you have not made this operation, may be someone else mistakenly, please ignore this message.</p><br /><p style='font-size: 16px; color: #222222; font-weight: 500;'>https://app.uzyth.com</p></td></tr></tbody></table></td></tr><tr><td style='height:30px; line-height:30px; padding: 0; margin: 0;'>&nbsp;</td></tr></tbody></table></td><td width='30' style='width:30px;'></td></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></center></td></tr></table></body></html> ",
        //Data: "<html><body><h1>Hello  "+argument.username+"</h1><p style='color:red'>Please click on confirmation link: </p> <p><a href='http://app.uzyth.com/#/confirmation/"+argument.activation_code+"'>Confirm your mail</a></p></body></html>"
      },
      Text: {
        Charset: "UTF-8",
        Data: "Hello Charith Sample description time 1517831318946"
      }
    },
    Subject: {
      Charset: "UTF-8",
      Data: argument.subject,//"Registration Confirmation Mail"
    }
  },
  Source: "info@sixprofit.com"
};

const sendEmail = ses.sendEmail(params).promise();

sendEmail
  .then(data => {
    console.log("email submitted to SES", data);
  })
  .catch(error => {
    console.log(error);
});*/
}
module.exports = authenticModel;



