var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
const bcrypt = require('bcrypt');
const uuid = require('uuidv4').default;
var mail = require('./../../common/mailer.js');
var request = require('request');


var broadcastModel = {
    createChannel: createChannel,
    getChanneldetail: getChanneldetail,

    uploadchanelLogo:uploadchanelLogo,
    verifyShopifyAuth:verifyShopifyAuth,
    updateChannel:updateChannel,
    adminGetChanneldetail:adminGetChanneldetail,
    createStreamingChannel:createStreamingChannel,
    updateStreamChannel:updateStreamChannel,
    getStreamingChannel:getStreamingChannel,
    saveStreamingDetail:saveStreamingDetail,
    getmyStreamingChannel:getmyStreamingChannel,
    uploadCoverImg:uploadCoverImg,
    selectBroadcastingProduct:selectBroadcastingProduct,
    myChannel:myChannel,
    popularChannels:popularChannels,
    deleteStreamingChannel:deleteStreamingChannel,
    updateBroadcastId:updateBroadcastId,
    getBroadcastDetails:getBroadcastDetails,
    updateStreamingDetail:updateStreamingDetail,
    getupcomingStreaming:getupcomingStreaming,
    getStoredStreaming:getStoredStreaming,
    getSyncStore:getSyncStore,
    deleteStore:deleteStore,
    getStoredetail:getStoredetail,
    updateStoreStatus:updateStoreStatus,
    getPublishedStore:getPublishedStore,
    updateShopifyAuth:updateShopifyAuth,
    updateBroadcastStatus:updateBroadcastStatus
}


function updateBroadcastStatus(arg) {
    console.log('updateBroadcastStatus',arg);
    return new Promise((resolve, reject) => {
        db.query("SELECT id FROM ll_product_broadcasting WHERE ll_product_broadcasting.channel_id =? ",[arg.broadcast_id],(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                console.log('error',error);
                reject ({"success":false,"message":error.code});
            } else {
                if (rows.length>0) {
            
                    var tbdata= {}
                    tbdata['broadcast_status']='1';
                    db.query("update `ll_products_streaming_content` set status=1 where id=?", [arg.broadcast_id],(error,rows,fields)=>{
                        if(!!error) {
                            dbFunc.connectionRelease;
                            reject ({"success":false,"message":error.code});
                        }

                    }); 
                    db.query("update `ll_product_broadcasting` set ? where channel_id=?", [tbdata,arg.broadcast_id],(error,rows,fields)=>{
                        if(!!error) {
                            dbFunc.connectionRelease;
                            reject ({"success":false,"message":error.code});
                        }
                        resolve({"success":true,"message":"broadcast_id updated successfully",body:rows});

                    });   
                            
                }else{
                    dbFunc.connectionRelease;
                    reject ({"success":false,"message":"Invalid channel_id ID"});
                }
            }
        });
    });
}
function getBroadcastDetails(arg) {
     console.log('getBroadcastDetails',arg);
    return new Promise((resolve, reject) => {
        db.query("SELECT  ll_product_broadcasting.* FROM ll_product_broadcasting WHERE channel_id =? and is_delete='0' order by id desc ",[arg.channel_id], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                if(rows.length<=0) {
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Error! Please create the channel"});
                } else {
                    var product_id= rows[0].product_id;
                     rows[0]['product_id_link']="";
                    if (product_id && product_id!="") {
                        var prodarr = product_id.split(",");
                       
                        var product_id_link=""
                        var comma="";
                        for (var i = 0; i < prodarr.length; i++) {
                            if (i< prodarr.length-1) {
                                comma=",";
                            }else{
                                comma="";
                            }
                            product_id_link+="gid://shopify/Product/"+prodarr[i]+comma;
                        }
                        rows[0]['product_id_link']=product_id_link;
                    }
                   
                    resolve({"success":true,"message":"success",'body':rows});                  
                }
            }
        });
    });
}

function updateBroadcastId(arg) {
    console.log('updateBroadcastId',arg);
    return new Promise((resolve, reject) => {
        var id= arg['channel_id'];
        db.query("SELECT id FROM ll_product_broadcasting WHERE ll_product_broadcasting.channel_id =? and ll_product_broadcasting.user_id=?",[id,arg['user_id']],(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                console.log('error',error);
                reject ({"success":false,"message":error.code});
            } else {
                if (rows.length>0) {
            
                    var tbdata= {}
                    tbdata['broadcast_id']=arg['broadcast_id'];
                    
                    db.query("update `ll_product_broadcasting` set ? where channel_id=?", [tbdata,id],(error,rows,fields)=>{
                        if(!!error) {
                            dbFunc.connectionRelease;
                            reject ({"success":false,"message":error.code});
                        }
                        resolve({"success":true,"message":"broadcast_id updated successfully",body:rows});

                    });   
                            
                }else{
                    dbFunc.connectionRelease;
                    reject ({"success":false,"message":"Invalid channel_id ID"});
                }
            }
        });
    });
}
function deleteStreamingChannel(argument) {
    console.log('deleteStreamingChannel',argument);
    return new Promise((resolve, reject) => {
        var id= argument['channel_id'];
        db.query("SELECT id FROM ll_products_streaming_content WHERE ll_products_streaming_content.id =? and ll_products_streaming_content.user_id=?",[id,argument['user_id']],(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                console.log('error',error);
                reject ({"success":false,"message":error.code});
            } else {
                if (rows.length>0) {
            
                    var tbdata= {}
                    tbdata['is_delete']='1';
                    
                    db.query("update `ll_product_broadcasting` set ? where channel_id=?", [tbdata,id],(error,rows,fields)=>{
                        if(!!error) {
                            dbFunc.connectionRelease;
                            reject ({"success":false,"message":error.code});
                        }
                    });
                    db.query("update `ll_products_streaming_content` set ? where id=?", [tbdata,id],(error,rows,fields)=>{
                        if(!!error) {
                            dbFunc.connectionRelease;
                            reject ({"success":false,"message":error.code});
                        }
                        resolve({"success":true,"message":"Channel deleted successfully",body:rows});

                    });
                            
                }else{
                    dbFunc.connectionRelease;
                    reject ({"success":false,"message":"Invalid channel_id ID"});
                }
            }
        });
    });
}
function popularChannels(arg) {
    console.log('popularChannels',arg);
    return new Promise((resolve, reject) => {
        db.query("SELECT  ll_users.first_name,ll_users.last_name,ll_users.profile_pic,ll_users_channels.channel_logo,ll_users_channels.id as channel_id,ll_users_channels.channel_name as channel_name,(SELECT  count(id) FROM ll_channel_followers WHERE ll_channel_followers.user_id=ll_users.user_id and ll_channel_followers.channel_id=ll_users_channels.id and ll_channel_followers.status='1' ) as followers FROM ll_users,ll_users_channels where ll_users_channels.user_id=ll_users.user_id and ll_users_channels.status='2' order by ll_users.id desc  limit 4", (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
               
                if(rows.length<=0) {
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Error! Please create the channel"});
                } else {
                    resolve({"success":true,"message":"success",'body':rows});                  
                }
                       
            }
        });
    });
}


function myChannel(arg) {
     console.log('myChannel',arg);
    return new Promise((resolve, reject) => {
        if (arg.user_id) {
            var sqlq="SELECT  (SELECT  COALESCE(IF (ll_channel_followers.id IS NOT NULL,1,0)) FROM ll_channel_followers WHERE ll_channel_followers.user_id=ll_users_channels.user_id and ll_channel_followers.channel_id=ll_users_channels.id and ll_channel_followers.follow_by_id='"+arg.user_id+"' and ll_channel_followers.status='1' limit 1) as is_follow, ll_users_channels.* ,(SELECT  concat(first_name,' ',last_name) FROM ll_users WHERE ll_users.user_id=ll_users_channels.user_id ) as username,(SELECT  profile_pic FROM ll_users WHERE ll_users.user_id=ll_users_channels.user_id ) as profile_pic,(SELECT  count(id) FROM ll_channel_followers WHERE ll_channel_followers.user_id=ll_users_channels.user_id and ll_channel_followers.channel_id=ll_users_channels.id and ll_channel_followers.status='1') as followers FROM ll_users_channels WHERE (channel_name=? or channel_org_name =?) order by id desc limit 1";
        }else{
            var sqlq="SELECT  COALESCE(IF (ll_users_channels.id IS NOT NULL,0,0)) as is_follow, ll_users_channels.* ,(SELECT  concat(first_name,' ',last_name) FROM ll_users WHERE ll_users.user_id=ll_users_channels.user_id ) as username,(SELECT  profile_pic FROM ll_users WHERE ll_users.user_id=ll_users_channels.user_id ) as profile_pic,(SELECT  count(id) FROM ll_channel_followers WHERE ll_channel_followers.user_id=ll_users_channels.user_id and ll_channel_followers.status='1') as followers FROM ll_users_channels WHERE (channel_name=? or channel_org_name =?) order by id desc limit 1";
        }
        db.query(sqlq,[arg.channel_name,arg.channel_name], (error, rows, fields) => {
            if (error) {
                console.log(error)
                reject(error);
            } else {
                if(rows.length<=0) {
                    console.log(rows);
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Error! Please create the channel"});
                } else {
                    var user_id=rows[0].user_id;
                    var store_id=rows[0].id;
                    db.query("SELECT  ll_users.first_name,ll_users.last_name,ll_users.profile_pic FROM ll_channel_followers,ll_users WHERE ll_users.user_id=ll_channel_followers.follow_by_id and ll_channel_followers.user_id =? and ll_channel_followers.channel_id=? and ll_channel_followers.status='1' order by ll_channel_followers.id desc limit 3",[user_id,store_id], (error, rowsFollower, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            db.query("SELECT  ll_product_broadcasting.*,(SELECT description FROM `ll_products_streaming_content` WHERE id=ll_product_broadcasting.channel_id limit 1) as description FROM ll_product_broadcasting WHERE user_id =? and is_delete='0'  and store_id=? order by id desc",[user_id,store_id], (error, rowsBroad, fields) => {
                                if (error) {
                                    reject(error);
                                } else {
                                    if(rowsBroad.length<=0) {
                                        dbFunc.connectionRelease;
                                        rows[0]['broadcasts']=rowsBroad;
                                        rows[0]['followers_list']=rowsFollower;
                                         resolve({"success":true,"message":"success",'body':rows[0]});
                                    } else {
                                        rows[0]['broadcasts']=rowsBroad;
                                        rows[0]['followers_list']=rowsFollower;
                                        resolve({"success":true,"message":"success",'body':rows[0]});                  
                                    }
                                }
                            });
                        }
                     });       
                    //resolve({"success":true,"message":"success",'body':rows[0]});                  
                }
            }
        });
    });
}
function getStreamingChannel(arg) {
     console.log('ll_products_streaming_content',arg);
    return new Promise((resolve, reject) => {
        db.query("SELECT  ll_products_streaming_content.* FROM ll_products_streaming_content WHERE id =? and is_delete='0' order by id desc limit 1",[arg.channel_id], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                if(rows.length<=0) {
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Error! Please create the channel"});
                } else {
                    resolve({"success":true,"message":"success",'body':rows[0]});                  
                }
            }
        });
    });
}
function publicStreamingChannel(arg) {
     console.log('myChannel',arg);
    return new Promise((resolve, reject) => {
        db.query("SELECT  ll_users_channels.* ,(SELECT  count(id) FROM ll_channel_followers WHERE ll_channel_followers.user_id=ll_users_channels.user_id and ll_channel_followers.status='1') as followers FROM ll_users_channels WHERE (channel_name=? or channel_org_name =?) order by id desc limit 1",[arg.channel_name,arg.channel_name], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                if(rows.length<=0) {
                    console.log(rows);
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Error! Please create the channel"});
                } else {
                    var user_id=rows[0].user_id;
                    db.query("SELECT  ll_product_broadcasting.* FROM ll_product_broadcasting WHERE user_id =? and is_delete='0' order by id desc",[user_id], (error, rowsBroad, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            if(rowsBroad.length<=0) {
                                dbFunc.connectionRelease;
                                rows[0]['broadcasts']=rowsBroad;
                                 resolve({"success":true,"message":"success",'body':rows});
                            } else {
                                rows[0]['broadcasts']=rowsBroad;
                                resolve({"success":true,"message":"success",'body':rows});                  
                            }
                        }
                    });
                    //resolve({"success":true,"message":"success",'body':rows[0]});                  
                }
            }
        });
    });
}

function getupcomingStreaming(argument) {
     console.log('getupcomingStreaming',argument);
    return new Promise((resolve, reject) => {

        var LimitNum = 8
        var startNum = 0;
        if(argument.start == '' || argument.limit == ''){
              startNum = 0;
              LimitNum = 8;
        }else{
             //parse int Convert String to number                     
              startNum = parseInt(argument.start);
              LimitNum = parseInt(argument.limit); 
        }  

        // and (ll_product_broadcasting.broadcast_status!='2' or ll_product_broadcasting.broadcast_status!='1') and 
        db.query("SELECT  ll_products_streaming_content.*,ll_product_broadcasting.broadcast_status,ll_product_broadcasting.channel_id,ll_product_broadcasting.broadcast_time,SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW())  as timestamp, (SELECT channel_logo FROM `ll_users_channels` WHERE id=ll_product_broadcasting.store_id and user_id=ll_products_streaming_content.user_id) as channel_logo FROM ll_products_streaming_content,ll_product_broadcasting WHERE  ll_product_broadcasting.broadcast_time>=NOW() AND  ll_product_broadcasting.channel_id=ll_products_streaming_content.id and  ll_products_streaming_content.user_id =? and ll_products_streaming_content.is_delete='0' order by ll_products_streaming_content.id desc  limit ? offset ?",[argument.user_id,LimitNum,startNum], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve({"success":true,"message":"success",'body':rows});                  
                
            }
        });
    });
}
function getStoredStreaming(argument) {
     console.log('getStoredStreaming',argument);
    return new Promise((resolve, reject) => {

        var LimitNum = 8
        var startNum = 0;
        if(argument.start == '' || argument.limit == ''){
              startNum = 0;
              LimitNum = 8;
        }else{
             //parse int Convert String to number 
              startNum = parseInt(argument.start);
              LimitNum = parseInt(argument.limit); 
        }

        db.query("SELECT  ll_products_streaming_content.*,ll_product_broadcasting.broadcast_time,SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW())  as timestamp, (SELECT channel_logo FROM `ll_users_channels` WHERE user_id=ll_products_streaming_content.user_id) as channel_logo FROM ll_products_streaming_content,ll_product_broadcasting WHERE ll_product_broadcasting.channel_id=ll_products_streaming_content.id and ll_product_broadcasting.broadcast_status='2' and  ll_products_streaming_content.user_id =? and ll_products_streaming_content.is_delete='0' order by ll_products_streaming_content.id desc  limit ? offset ?",[argument.user_id,LimitNum,startNum], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve({"success":true,"message":"success",'body':rows});                  
                
            }
        });
    });
}

function getmyStreamingChannel(arg) {
     console.log('getmyStreamingChannel',arg);
    return new Promise((resolve, reject) => {
        var LimitNum = 8
        var startNum = 0;
        if(arg.start == '' || arg.limit == ''){
              startNum = 0;
              LimitNum = 8;
        }else{
             //parse int Convert String to number 
              startNum = parseInt(arg.start);
              LimitNum = parseInt(arg.limit); 
        }

        db.query("SELECT  (SELECT GROUP_CONCAT(ll_influencer_broadcast_request.influencer_id) as influencer_ids  FROM ll_influencer_broadcast_request  where  broadcast_id=ll_products_streaming_content.id and status=0 ) as requestSentTo,(SELECT count(id)  FROM ll_influencer_broadcast_request  where  broadcast_id=ll_products_streaming_content.id  and status=0) as isRequestSent, ll_products_streaming_content.*,(SELECT channel_logo FROM `ll_users_channels` WHERE id=ll_products_streaming_content.store_id limit 1) as channel_logo,IF(ll_product_broadcasting.product_id!='',ll_products_streaming_content.status,3) as status,ll_product_broadcasting.*,ll_products_streaming_content.id as id FROM ll_products_streaming_content LEFT JOIN ll_product_broadcasting on ll_product_broadcasting.channel_id=ll_products_streaming_content.id WHERE ll_products_streaming_content.user_id =? and ll_products_streaming_content.store_id=? and ll_products_streaming_content.is_delete='0' order by ll_products_streaming_content.id desc  limit ? offset ?",[arg.user_id,arg.store_id,LimitNum,startNum], (error, rows, fields) => {
            if (error) {
                reject(error);
            } else {
                db.query("update  ll_users_channels set isActive=0 where user_id=? ",[arg.user_id], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     reject(err);
                    }
                }); 
                db.query("update  ll_users_channels set isActive=1 where id=?",[arg.store_id], (err, rows) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     reject(err);
                    }
                });  
                if(rows.length<=0) {
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Error! Please create the channel"});
                } else {
                    resolve({"success":true,"message":"success",'body':rows});                  
                }
            }
        });
    });
}

function getChanneldetail(arg) {
     console.log('nodel',arg);
    return new Promise((resolve, reject) => {
        
            db.query("SELECT  ll_users_channels.*,(SELECT COUNT(id) FROM ll_shopify_auth WHERE ll_shopify_auth.user_id=ll_users_channels.user_id) as shopifyverify FROM ll_users_channels WHERE user_id =? and isDeleted=0 order by id desc limit 1",[arg.user_id], (error, rows, fields) => {
                if (error) {
                    reject(error);
                } else {
                    if(rows.length<=0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"Error! Please create the channel"});
                    } else {
                        resolve({"success":true,"message":"success",'body':rows[0]});                  
                    }
                }
            });
        
    });
}

function adminGetChanneldetail(arg) {
     console.log('nodel',arg);
    return new Promise((resolve, reject) => {
        db.query("SELECT id FROM ll_users WHERE user_id=? and isAdmin='1'",[arg.user_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length<=0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Invalid User! try with different user"});
            } else {
                db.query("SELECT * FROM ll_users_channels order by id desc", (error, rows, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        if(rows.length<=0) {
                            dbFunc.connectionRelease;
                            reject({"success":false,"message":"Error! No records found"});
                        } else {
                            resolve({"success":true,"message":"success",'body':rows});                  
                        }
                    }
                });
            }
        })        
    });
}
function createChannel(user) {
    console.log("createChannel",user);
    return new Promise((resolve, reject) => {
        var channel_name=user.channel_name;
        console.log('channel_name',channel_name);
        channel_name ="@"+channel_name.replace(/ |_|-|@|#|&|%|(|)|{|]|{|;|:|'|"|,|!/gi, "");
        console.log(user.channel_name,'channel_name', channel_name);
        if (user.store_id && user.store_id!='0') {
            var channel_name=user.channel_name;
            console.log('channel_name --------+++',channel_name);
            channel_name ="@"+channel_name.replace(/ |_|-|@|#|&|%|(|)|{|]|{|;|:|'|"|,|!/gi, "");
            console.log(user.channel_name,'channel_name', channel_name);
            db.query("SELECT * FROM ll_users_channels WHERE channel_name=? and isDeleted=0 and user_id!=? ",[channel_name,user.user_id], (error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);  
                } else if(rows.length>0) {
                    dbFunc.connectionRelease;
                    console.log("message","Channel already exist!");

                    reject({"success":false,"message":"Channel already exist!"});
                } else {
                    db.query("SELECT id FROM ll_users_channels WHERE id=?",[user.store_id], (error, rows, fields) => {
                        if (error) {
                            dbFunc.connectionRelease;
                            reject(error);
                        } else if(rows.length<=0) {
                            dbFunc.connectionRelease;
                            reject({"success":false,"message":"Invalid channel name! try with different user"});
                        } else {
                            const updateChanelData ={};
                            if(user.channel_name)
                                updateChanelData['channel_name'] =channel_name;
                            if(user.channel_name)
                                updateChanelData['channel_org_name'] =user.channel_name;
                            if(user.description)
                                updateChanelData['description'] =user.description;
                            
                            db.query("update  ll_users_channels set ? where id=?",[updateChanelData,user.store_id], (err, rows) => {
                                if (err) {
                                 dbFunc.connectionRelease;
                                 reject(err);
                                } else {
                                    dbFunc.connectionRelease;
                                    resolve({"success":true,"message":"Channel Update successfully",body:rows});
                                }
                            });   
                        }
                    });        
                }
            });

        }else{



            db.query("SELECT * FROM ll_users_channels WHERE channel_name=? and isDeleted=0 and user_id!=?",[channel_name,user.user_id], (error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } else if(rows.length>0) {
                    dbFunc.connectionRelease;
                    reject({"success":false,"message":"Channel already exist!"});
                } else {
                    db.query("SELECT id FROM ll_users_channels WHERE user_id=? and isDeleted=0",[user.user_id], (error, rows, fields) => {
                        if (error) {
                            dbFunc.connectionRelease;
                            reject(error);
                        } else if(rows.length>0) {
                            dbFunc.connectionRelease;
                            //reject({"success":false,"message":"Channel already exist!"});
                             const updateChanelData ={};
                            if(user.channel_name)
                                updateChanelData['channel_name'] =channel_name;
                            if(user.channel_name)
                                updateChanelData['channel_org_name'] =user.channel_name;
                            if(user.description)
                                updateChanelData['description'] =user.description;
                            
                            db.query("update  ll_users_channels set ? where id=?",[updateChanelData,user.store_id], (err, rows) => {
                                if (err) {
                                 dbFunc.connectionRelease;
                                 reject(err);
                                } else {
                                    dbFunc.connectionRelease;
                                    resolve({"success":true,"message":"Channel Update successfully",body:rows});
                                }
                            });  
                        } else {
                            db.query("INSERT INTO ll_users_channels(user_id, channel_name, channel_org_name, description, channel_logo)VALUES(?,?,?,?,?)",[user.user_id, channel_name, user.channel_name, user.description,""], (err, rows) => {
                                if (err) {
                                 dbFunc.connectionRelease;
                                 reject(err);
                                } else {
                                    console.log("Last ID:");
                                    console.log(rows.insertId);                                
                                    dbFunc.connectionRelease;
                                    resolve({"success":true,"message":"Channel created successfully",body:rows});
                                }
                            });   
                        }
                    });        
                }
            });
        }
    });
}

function updateChannel(user) {
    console.log("updateChannel",user);
    return new Promise((resolve, reject) => {
        var channel_name=user.channel_name;
        console.log('channel_name',channel_name);
        channel_name ="@"+channel_name.replace(/ |_|-|@|#|&|%|(|)|{|]|{|;|:|'|"|,|!/gi, "");
        console.log(user.channel_name,'channel_name', channel_name);
        db.query("SELECT * FROM ll_users_channels WHERE channel_name=? and isDeleted=0 and id!=?",[channel_name,user.channel_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length>0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Channel already exist!"});
            } else {
                db.query("SELECT id FROM ll_users_channels WHERE id=?",[user.channel_id], (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length<=0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"Invalid channel name! try with different user"});
                    } else {
                        const updateChanelData ={};
                        if(userData.channel_name)
                            updateChanelData['channel_name'] =channel_name;
                        if(userData.channel_name)
                            updateChanelData['channel_org_name'] =user.channel_name;
                        if(userData.description)
                            updateChanelData['description'] =user.description;
                        
                        db.query("update  ll_users_channels set ? where id=?",[updateChanelData,user.channel_id], (err, rows) => {
                            if (err) {
                             dbFunc.connectionRelease;
                             reject(err);
                            } else {
                                dbFunc.connectionRelease;
                                resolve({"success":true,"message":"Channel Update successfully",body:rows});
                            }
                        });   
                    }
                });        
            }
        });
    });
}
function uploadchanelLogo(user) {
    console.log("uploadchanelLogo",user);
    return new Promise((resolve, reject) => {
        var user_id=user.user_id;
        db.query("SELECT * FROM ll_users_channels WHERE id=?",[user.store_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length<=0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Channel doesn’t exist! Try with different channel ID"});
            } else {

                db.query("update ll_users_channels set channel_logo=? where id=?",[user.chanellogo,user.store_id], (err, rowsdata) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     reject(err);
                    } else {
                        console.log("Last ID:");
                        dbFunc.connectionRelease;
                        rows[0]['channel_logo']=user.chanellogo;
                        resolve({"success":true,"message":"Channel image uploaded successfully",body:rows});
                    }
                });   
            }
                       
            
       }); 
    });
}
function deleteStore(argument) {
    console.log('deleteStore',argument);
    return new Promise((resolve, reject) => {
        var id= argument['store_id'];
        db.query("SELECT id FROM ll_users_channels WHERE ll_users_channels.id =? and ll_users_channels.user_id=?",[id,argument['user_id']],(error,rows,fields)=>{
            if(!!error) {
                dbFunc.connectionRelease;
                console.log('error',error);
                reject ({"success":false,"message":error.code});
            } else {
                if (rows.length>0) {
            
                    var tbdata= {}
                    tbdata['isDeleted']=1;
                    
                    // db.query("update `ll_users_channels` set ? where channel_id=?", [tbdata,id],(error,rows,fields)=>{
                    //     if(!!error) {
                    //         dbFunc.connectionRelease;
                    //         reject ({"success":false,"message":error.code});
                    //     }
                    // });
                    db.query("update `ll_shopify_auth` set is_delete=1 where channel_id=?", [id],(error,rows,fields)=>{
                        if(!!error) {
                            dbFunc.connectionRelease;
                            reject ({"success":false,"message":error.code});
                        }

                    });
                    db.query("update `ll_users_channels` set ? where id=?", [tbdata,id],(error,rows,fields)=>{
                        if(!!error) {
                            dbFunc.connectionRelease;
                            reject ({"success":false,"message":error.code});
                        }
                        resolve({"success":true,"message":"Channel deleted successfully",body:rows});

                    });
                            
                }else{
                    dbFunc.connectionRelease;
                    reject ({"success":false,"message":"Invalid channel_id ID"});
                }
            }
        });
    });
}

function getStoredetail(arg) {
    console.log('getStoredetail----------->',arg);
    return new Promise((resolve, reject) => {
        if (arg.user_id) {
            db.query("SELECT  ll_shopify_auth.*,ll_users_channels.* FROM ll_users_channels left join ll_shopify_auth on ll_shopify_auth.channel_id=ll_users_channels.id WHERE  ll_users_channels.user_id =?  and isDeleted=0",[arg.user_id], (error, rowsShofipy, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({"success":true,"message":"success",'body':rowsShofipy});
                }
            });
        }
    });
}
function getPublishedStore(arg) {
    console.log('getPublishedStore',arg);
    return new Promise((resolve, reject) => {
        if (arg.user_id) {
            db.query("SELECT  ll_shopify_auth.store,ll_shopify_auth.store_name,ll_users_channels.* FROM ll_shopify_auth,ll_users_channels WHERE ll_users_channels.id=ll_shopify_auth.channel_id and ll_users_channels.user_id =? and ll_users_channels.status='2' and isDeleted=0 limit 1",[arg.user_id], (error, rowsShofipy, fields) => {
                if (error) {
                    reject(error);
                } else {
                    var isActive=0;
                    for (var i = 0; i < rowsShofipy.length; i++) {
                         console.log('isActive---->>>>--',rowsShofipy[i].isActive);
                        if(rowsShofipy[i].isActive==1){
                            isActive=1;
                        }
                    }
                    console.log('isActive--',isActive);
                    
                    if (isActive==0) {
                        if (rowsShofipy.length>0) {
                         rowsShofipy[0]['isActive']=1; 
                        } 
                    }
                    resolve({"success":true,"message":"success",'body':rowsShofipy});                  
                    
                }
            });
      
        }
    });
}

function updateStoreStatus(arg) {
     console.log('updateStoreStatus',arg);
    return new Promise((resolve, reject) => {
        if (arg.store_id) {
            db.query("SELECT  ll_users_channels.* FROM ll_users_channels WHERE  id=? and isDeleted=0",[arg.store_id], (error, rows, fields) => {
                if (error) {
                    reject(error);
                } else {
                    if(rows.length<=0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"Error! Please add the Store"});
                    } else {
                        db.query("update ll_users_channels set status=? where id=?",[arg.status,arg.store_id], (err, rows) => {
                            if (err) {
                             dbFunc.connectionRelease;
                             console.log(err)
                             reject(err);
                            } else {
                                console.log("Last ID:");
                                console.log(rows.insertId);                                
                                dbFunc.connectionRelease;
                                resolve({"success":true,"message":"Store status has been Updated",body:rows});
                            }
                        });   
                    }
                }
            });
      
        }
    });         
}
function verifyShopifyAuth(user) {
    console.log("verifyShopifyAuth",user);
    return new Promise((resolve, reject) => {
        var user_id=user.user_id;
        console.log('user_id',user_id);    
        var store_name =user.store_name.replace(/ |;|,|!/gi, "");
            db.query("SELECT * FROM ll_shopify_auth WHERE store_name=? and user_id!=? and is_delete=0 ",[store_name,user_id], (error, rows, fields) => {
                if (error) {
                    dbFunc.connectionRelease;
                    reject(error);
                } else if(rows.length>0) {
                    dbFunc.connectionRelease;  
                    reject({"success":false,"message":"Shopify Store already exist"});
                } else {
                    //`ll_shopify_auth`(`id`, `user_id`, `store_name`, `public_key`, `private_key`,
                    db.query("SELECT * FROM ll_shopify_auth WHERE user_id=? and store_name=? and is_delete=0 ",[user_id,store_name], (error, rows, fields) => {
                        if (error) {
                            dbFunc.connectionRelease;
                            reject(error);
                        } else if(rows.length>0) {
                            dbFunc.connectionRelease;
                            //reject({"success":false,"message":"Shopify detail already exist"});
                            /***update start ***/    
                            

                            request("https://"+user.public_key+":"+user.private_key+"@"+store_name+".myshopify.com/admin/api/2020-04/shop.json", function (error, response, body) {
                                body=JSON.parse(body);
                                console.log('body',body);
                                if (body.errors) {
                                    reject({"success":false,"message":"Invalid shopify store detail"});

                                } else {
                                    db.query("SELECT id FROM ll_shopify_auth WHERE channel_id=?",[user.store_id], (error, rows, fields) => {
                                        if (error) {
                                            dbFunc.connectionRelease;
                                            reject(error);
                                        } else if(rows.length<=0) {
                                            dbFunc.connectionRelease;
                                            reject({"success":false,"message":"Invalid Store! try with different shopify id"});
                                        } else {
                                            db.query("update ll_shopify_auth set user_id=?, store_name=?, public_key=?, private_key=?,res_data=? where channel_id=?",[user.user_id,user.store_name, user.public_key, user.private_key,JSON.stringify(body.shop),user.store_id], (err, rows) => {
                                                if (err) {
                                                 dbFunc.connectionRelease;
                                                 reject(err);
                                                } else {
                                                    console.log("Last ID:");
                                                    console.log(rows.insertId); 
                                                    // db.query("update ll_users_channels set shopify_store_id=? where user_id=?",[rows.insertId,user_id], (err, rowsdata) => {
                                                    //     if (err) {
                                                    //      dbFunc.connectionRelease;
                                                    //      reject(err);
                                                    //     } else {
                                                    //         console.log("Last ID:");
                                                    //         dbFunc.connectionRelease;
                                                    //     }
                                                    // });                                  
                                                    dbFunc.connectionRelease;
                                                    resolve({"success":true,"message":"Shopify authenticate details updated successfully",body:rows});
                                                }
                                            });   
                                        }
                                    });
                                }
                            });        

                            /***updated end*****/
                        } else {

                            request("https://"+user.public_key+":"+user.private_key+"@"+store_name+".myshopify.com/admin/api/2020-04/shop.json", function (error, response, body) {
                                body=JSON.parse(body);
                                console.log('body',body);
                                if (body.errors) {
                                    //  reject({"success":false,"message":body.errors});
                                    reject({"success":false,"message":"Invalid shopify store detail"});

                                } else {
                                    db.query("SELECT id FROM ll_users WHERE user_id=?",[user.user_id], (error, rows, fields) => {
                                        if (error) {
                                            dbFunc.connectionRelease;
                                            reject(error);
                                        } else if(rows.length<=0) {
                                            dbFunc.connectionRelease;
                                            reject({"success":false,"message":"Invalid User! try with different user"});
                                        } else {
                                            db.query("INSERT INTO ll_shopify_auth(user_id,channel_id, store_name, public_key, private_key,res_data)VALUES(?,?,?,?,?,?)",[user.user_id,user.store_id, user.store_name, user.public_key, user.private_key,JSON.stringify(body.shop)], (err, rows) => {
                                                if (err) {         
                                                 dbFunc.connectionRelease;
                                                 reject(err);
                                                } else {
                                                    console.log("Last ID:");
                                                    console.log(rows.insertId); 
                                                    db.query("update ll_users_channels set shopify_store_id=? ,status='2' where user_id=?",[rows.insertId,user.user_id], (err, rowsdata) => {
                                                        if (err) {
                                                         dbFunc.connectionRelease;
                                                         reject(err);
                                                        } 
                                                    });                                
                                                    dbFunc.connectionRelease;
                                                    resolve({"success":true,"message":"Shopify authenticate successfully",body:rows});
                                                }
                                            });   
                                        }
                                    });
                                }
                            });        
                        }
                    });
                }
            });
        
    });
}



function getSyncStore(user) {
    console.log("getSyncStore",user);
    return new Promise((resolve, reject) => {
        var user_id=user.user_id;
        console.log('user_id',user_id);
        db.query("SELECT ll_users_channels.*,ll_users_channels.channel_name as store_name,(SELECT store FROM `ll_shopify_auth` where ll_shopify_auth.channel_id=ll_users_channels.id) as store FROM ll_users_channels WHERE user_id=?  and isDeleted=0",[user_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else{
               resolve({"success":true,"message":"success",body:rows});
            }
        });
    });
}

function paymentgateway(email) {
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

function updateShopifyAuth(user) {
    console.log("updateShopifyAuth",user);
    return new Promise((resolve, reject) => {
        var user_id=user.user_id;
        console.log('user_id',user_id);
        var store_name =user.store_name.replace(/ |;|,|!/gi, "");
        db.query("SELECT * FROM ll_shopify_auth WHERE store_name=? and is_delete=0 and channel_id!=? ",[store_name,user.store_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length>0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Shopify Store already exist"});
            } else {
                //`ll_shopify_auth`(`id`, `user_id`, `store_name`, `public_key`, `private_key`,
                db.query("SELECT * FROM ll_shopify_auth WHERE user_id=? and store_name=? and is_delete=0 and channel_id!=? ",[user_id,store_name,user.store_id], (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length>0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"Shopify detail already exist"});
                    } else {

                        request("https://"+user.public_key+":"+user.private_key+"@"+store_name+".myshopify.com/admin/api/2020-04/shop.json", function (error, response, body) {
                            body=JSON.parse(body);
                            console.log('body',body);
                            if (body.errors) {
                                reject({"success":false,"message":body.errors});

                            } else {
                                db.query("SELECT id FROM ll_shopify_auth WHERE channel_id=?",[user.store_id], (error, rows, fields) => {
                                    if (error) {
                                        dbFunc.connectionRelease;
                                        reject(error);
                                    } else if(rows.length<=0) {
                                        dbFunc.connectionRelease;
                                        reject({"success":false,"message":"Invalid Store! try with different shopify id"});
                                    } else {
                                        db.query("update ll_shopify_auth set user_id=?, store_name=?, public_key=?, private_key=?,res_data=? where channel_id=?",[user.user_id,user.store_name, user.public_key, user.private_key,JSON.stringify(body.shop),user.store_id], (err, rows) => {
                                            if (err) {
                                             dbFunc.connectionRelease;
                                             reject(err);
                                            } else {
                                                console.log("Last ID:");
                                                console.log(rows.insertId); 
                                                /*db.query("update ll_users_channels set shopify_store_id=? where user_id=?",[rows.insertId,user_id], (err, rowsdata) => {
                                                    if (err) {
                                                     dbFunc.connectionRelease;
                                                     reject(err);
                                                    } else {
                                                        console.log("Last ID:");
                                                        dbFunc.connectionRelease;
                                                    }
                                                });*/                                  
                                                dbFunc.connectionRelease;
                                                resolve({"success":true,"message":"Shopify authenticate details updated successfully",body:rows});
                                            }
                                        });   
                                    }
                                });
                            }
                        });        
                    }
                });
            }
        });
    });
}

function createStreamingChannel(user) {
    console.log("createStreamingChannel--- ",user);
    return new Promise((resolve, reject) => {
        var channel_name=user.stream_title;
        console.log('channel_name',channel_name);
        /*db.query("SELECT id FROM ll_payment_gateway WHERE user_id=?",[user.user_id], (error, rows, fields) => {
            if (error) {
              dbFunc.connectionRelease;
              reject(error);
            } else if(rows.length<=0) {                        
                reject({"success":false,"message":"Please update Stripe payment details first"});
            }else{*/
                db.query("SELECT * FROM ll_products_streaming_content WHERE title=? and user_id=?",[channel_name,user.user_id], (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length>0) {                     
                        dbFunc.connectionRelease;   
                        reject({"success":false,"message":"Channel already exist with same name!"});
                    } else {
                        db.query("SELECT id FROM ll_users WHERE user_id=?",[user.user_id], (error, rows, fields) => {
                            if (error) {         
                                dbFunc.connectionRelease;
                                reject(error);            
                            } else if(rows.length<=0) {                                 
                                dbFunc.connectionRelease;  
                                reject({"success":false,"message":"Invalid User! try with different user"});
                            } else {          
                                db.query("INSERT INTO ll_products_streaming_content(user_id,store_id, title, description)VALUES(?,?,?,?)",[user.user_id,user.store_id, channel_name,user.stream_description], (err, rows) => {
                                    if (err) {
                                     dbFunc.connectionRelease;
                                     reject(err);
                                    } else {
                                        console.log("Last ID:");
                                        console.log(rows.insertId);  
                                        // db.query("update ll_users_channels set status=? where id=?",['1',user.store_id], (err, rowsdata) => {
                                        //     if (err) {
                                        //      dbFunc.connectionRelease;
                                        //      reject(err);
                                        //     } 
                                        // });                                
                                        dbFunc.connectionRelease;
                                        resolve({"success":true,"message":"Streaming content created successfully",body:rows});
                                    }
                                });   
                            }
                        });        
                    }
                });
            /*}
        });*/
    });
}

function updateStreamChannel(user) {
    console.log("updateChannel--->",user);
    return new Promise((resolve, reject) => {
        var channel_name=user.stream_title;
        console.log('channel_name',channel_name);

        db.query("SELECT * FROM ll_products_streaming_content WHERE title=? and id!=?",[channel_name,user.channel_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length>0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Channel already exist!"});
            } else {
                db.query("SELECT id FROM ll_products_streaming_content WHERE id=?",[user.channel_id], (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length<=0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"Invalid channel name! try with different user"});
                    } else {

                        var updateChanelData ={};
                            updateChanelData['title'] =channel_name;
                            updateChanelData['description'] =user.stream_description;
                        
                        console.log(updateChanelData)
                        db.query("update  ll_products_streaming_content set ? where id=?",[updateChanelData,user.channel_id], (err, rows) => {
                            if (err) {
                             dbFunc.connectionRelease;
                             console.log(err)
                             reject(err);
                            } else {
                                console.log("Last ID:");
                                console.log(rows.insertId);                                
                                dbFunc.connectionRelease;
                                resolve({"success":true,"message":"Streaming Update successfully",body:rows});
                            }
                        });   
                    }
                });        
            }
        });
    });
}


//`channel_name`, `broadcast_id`, `product_id`, `broadcast_type`, `broadcast_time`,
// `broadcast_status`, `cover_image`, `logo_img`, `resolution_type`, `text_on_screen`,
//   FROM `ll_product_broadcasting`
function saveStreamingDetail(user) {
    console.log("createStreamingChannel",user);
    return new Promise((resolve, reject) => {
        db.query("SELECT title,banner_image,id,store_id FROM ll_products_streaming_content WHERE id=? ",[user.channel_id], (error, channelrows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(channelrows.length<0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Channel doesn’t exist!"});
            } else {
                var title=channelrows[0].title;
                var cover_image=channelrows[0].banner_image
                var store_id=channelrows[0].store_id
                db.query("SELECT id,concat(ll_users.first_name,' ',ll_users.last_name) as username FROM ll_users WHERE user_id=?",[user.user_id], (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length<=0) {
                        dbFunc.connectionRelease;
                        reject({"success":false,"message":"Invalid User! try with different user"});
                    } else {
                        var seller_name=rows[0].username
                        var pickupStore=0; 
                        var store_address="";
                        var channelTag=""
                        var broadcast_video_length="";
                        var index_products=""
                        if(user.pickupStore){
                            pickupStore=user.pickupStore;
                        }
                        if(user.store_address){
                            store_address=user.store_address;
                        }
                        if(user.channelTag){
                            channelTag=user.channelTag;
                        }
                         if(user.broadcast_video_length){
                            broadcast_video_length=user.broadcast_video_length;
                        }
                        if(user.index_products){
                            index_products=user.index_products;
                        }
                        var broadcast_id =title.replace(/ |@|$|~|"|'|{|}|:|;|,|!/gi, "-")+user.channel_id;
                        
                        db.query("SELECT id FROM ll_product_broadcasting WHERE channel_id=?",[user.channel_id], (error, rowsb, fields) => {
                            if (error) {
                                dbFunc.connectionRelease;
                                reject(error);
                            } else if(rowsb.length<=0) {
                                dbFunc.connectionRelease;

                                db.query("INSERT INTO ll_product_broadcasting(broadcast_id,user_id,store_id,channel_id,channel_name,broadcast_time,cover_image,store_pickup,pickup_address,channelTag,index_products)VALUES(?,?,?,?,?,?,?,?,?,?,?)",[broadcast_id,user.user_id,store_id,user.channel_id, title,user.broadcast_time,cover_image,pickupStore,store_address,channelTag,index_products], (err, rows) => {
                                    if (err) {
                                     dbFunc.connectionRelease;
                                     console.log(err);
                                     reject(err);
                                    } else {
                                        console.log("Last ID:");
                                        console.log(rows.insertId);                                
                                        dbFunc.connectionRelease;
                                        //SELECT concat(ll_users.first_name,' ',ll_users.last_name) as username FROM `ll_channel_followers`,ll_users WHERE ll_channel_followers.follow_by_id=ll_users.user_id and ll_channel_followers.user_id='9c3d78a6-ad30-47ab-b70e-021786f36896'
                                        db.query("SELECT concat(ll_users.first_name,' ',ll_users.last_name) as username,email FROM `ll_channel_followers`,ll_users WHERE ll_channel_followers.follow_by_id=ll_users.user_id and ll_channel_followers.user_id=? ",[user.user_id], (error, followersList, fields) => {
                                            if (error) {
                                                dbFunc.connectionRelease;
                                                reject(error);
                                            }
                                            if(followersList.length>0) {
                                                for (var i = 0; i < followersList.length; i++) {
                                                   var username=  followersList[i].username;
                                                   var k=0;
                                                   db.query("SELECT * FROM `ll_mail_template` WHERE id=3 order by id asc ", function (err, tempres) {
                                                        if(tempres.length>0) {
                                                            channelrows[0].message=tempres[0].template_body;
                                                            channelrows[0].subject=tempres[0].template_subject;
                                                            channelrows[0].username=followersList[k].username;
                                                            channelrows[0].email=followersList[k].email;
                                                            channelrows[0].seller_name=seller_name
                                                            console.log('k',k);
                                                            console.log(channelrows[0]);
                                                            sentMail(channelrows[0], function(callbackres){
                                                                console.log(callbackres);
                                                            });

                                                        }
                                                        k++;
                                                    });
                                                }
                                                
                                            }
                                        });


                                        resolve({"success":true,"message":"Streaming details saved successfully",body:rows});
                                   
                                    }
                                });  
                            }else{
                                db.query("update ll_product_broadcasting(broadcast_id=?,user_id,store_id=?,channel_name=?,broadcast_time=?,cover_image=?,store_pickup=?,pickup_address=?,channelTag=?,index_products=? where channel_id=?",[broadcast_id,user.user_id,store_id,title,user.broadcast_time,cover_image,pickupStore,store_address,channelTag,index_products,user.channel_id], (err, rows) => {
                                    if (err) {
                                     dbFunc.connectionRelease;
                                     console.log(err);
                                     reject(err);
                                    } else {
                                        console.log("Last ID:");
                                        console.log(rows.insertId);                                
                                        dbFunc.connectionRelease;
                                    
                                        resolve({"success":true,"message":"Streaming details saved successfully",body:rows});
                                   
                                    }
                                }); 

                            }
                        }); 
                    }
                });        
            }
        });
    });
}

function updateStreamingDetail(user) {
    console.log("updateStreamingDetail",user);
    return new Promise((resolve, reject) => {
       // var channel_name=user.stream_title;
        //console.log('channel_name',channel_name);
        db.query("SELECT * FROM ll_products_streaming_content WHERE  id=?",[user.channel_id], (error, rowsStream, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rowsStream.length<=0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Channel doesn’t exist!"});
            } else {
                var title=rowsStream[0].title;
                var cover_image=rowsStream[0].banner_image
                var user_id=rowsStream[0].user_id
                var store_id=rowsStream[0].store_id
                var cover_image=rowsStream[0].banner_image
                db.query("SELECT id FROM ll_product_broadcasting WHERE channel_id=?",[user.channel_id], (error, rows, fields) => {
                    if (error) {
                        dbFunc.connectionRelease;
                        reject(error);
                    } else if(rows.length<=0) {
                        dbFunc.connectionRelease;
                        //reject({"success":false,"message":"Invalid channel name! try with different user"});
                        const updateChanelData ={};
                        //if(userData.broadcast_time)
                        var pickupStore=0; 
                        var store_address="";
                        var broadcast_video_length=''
                        var channelTag="";
                        if(user.pickupStore){
                            pickupStore=user.pickupStore;
                        }
                        if(user.store_address){
                            store_address=user.store_address;
                        }
                        if(user.broadcast_video_length){
                            broadcast_video_length=user.broadcast_video_length;
                        }

                        if(user.channelTag){
                            channelTag=user.channelTag;
                        } 
                        updateChanelData['broadcast_time'] =user.broadcast_time;
                        updateChanelData['channel_name'] =title;
                        updateChanelData['cover_image'] =cover_image;
                        updateChanelData['store_pickup'] =pickupStore;
                        updateChanelData['pickup_address'] =store_address;
                        updateChanelData['channel_id'] =user.channel_id;
                        updateChanelData['channelTag'] =channelTag;

                        updateChanelData['broadcast_id'] = title+'-'+user.channel_id;
                        updateChanelData['user_id'] =user_id;
                        updateChanelData['store_id'] =store_id;

                        db.query("INSERT ll_product_broadcasting set ? ",[updateChanelData], (err, rows) => {
                            if (err) {
                             dbFunc.connectionRelease;
                             console.log(err);
                             reject(err);
                            } else {
                                console.log("Last ID:");
                                console.log(rows.insertId);                                
                                dbFunc.connectionRelease;
                                resolve({"success":true,"message":"Broadcasting details Updated successfully",body:rows});
                            }
                        })    

                    } else {
                        const updateChanelData ={};
                        //if(userData.broadcast_time)
                        var pickupStore=0; 
                        var store_address="";
                        var broadcast_video_length=''
                        var channelTag="";
                        if(user.pickupStore){
                            pickupStore=user.pickupStore;
                        }
                        if(user.store_address){
                            store_address=user.store_address;
                        }
                        if(user.broadcast_video_length){
                            broadcast_video_length=user.broadcast_video_length;
                        }

                        if(user.channelTag){
                            channelTag=user.channelTag;
                        } 
                            updateChanelData['broadcast_time'] =user.broadcast_time;
                            updateChanelData['channel_name'] =title;
                            updateChanelData['cover_image'] =cover_image;
                            updateChanelData['store_pickup'] =pickupStore;
                            updateChanelData['pickup_address'] =store_address;
                            //updateChanelData['broadcast_video_length'] =broadcast_video_length;
                            updateChanelData['channelTag'] =channelTag;
                            
                        db.query("update  ll_product_broadcasting set ? where channel_id=?",[updateChanelData,user.channel_id], (err, rows) => {
                            if (err) {
                             dbFunc.connectionRelease;
                             reject(err);
                            } else {
                                console.log("Last ID:");
                                console.log(rows.insertId);                                
                                dbFunc.connectionRelease;
                                resolve({"success":true,"message":"Broadcasting details Updated successfully",body:rows});
                            }
                        });   
                    }
                });        
            }
        });
    });
}

function uploadCoverImg(user) {
    console.log("uploadCoverImg",user);
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM ll_products_streaming_content WHERE id=?",[user.channel_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length<=0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Channel doesn’t exist! Try with different channel ID"});
            } else {
                db.query("update ll_products_streaming_content set banner_image=? where id=?",[user.cover_image,user.channel_id], (err, rowsdata) => {
                    if (err) {
                     dbFunc.connectionRelease;
                     reject(err);
                    } else {
                        console.log("Last ID:");
                        dbFunc.connectionRelease;
                        rows[0]['banner_image']=user.cover_image;
                        resolve({"success":true,"message":"Cover image upload successfully",body:rows});
                    }
                });   
            }
       }); 
    });
}


function selectBroadcastingProduct(user) {
    console.log("selectBroadcastingProduct",user);
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM ll_product_broadcasting WHERE id=?",[user.channel_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length<=0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Broadcasting doesn’t exist! Try with different broadcast ID"});
            } else {
                var channel_id=rows[0].channel_id;
                var product_id=user.product_ids;
                var product_idArr = product_id.split(',');
                
                var prodArr=[]

                for(var i=0;i<product_idArr.length;i++){
                    var product_idInt= product_idArr[i].split('/');
                    console.log(product_idInt[product_idInt.length - 1]);
                    prodArr.push(product_idInt[product_idInt.length - 1]);
                }
                prodArr=prodArr.toString();
                console.log(prodArr);
                db.query("update ll_product_broadcasting set product_id=? , broadcast_status='0' where id=?",[prodArr,user.channel_id], (err, rowsdata) => {
                    if (err) {
                     dbFunc.connectionRelease;
                    console.log(err)

                     reject(err);
                    } else {
                        console.log("Last ID:");
                        dbFunc.connectionRelease;
                        rows[0]['product_id']=user.product_ids;
                        db.query("update ll_products_streaming_content set status=0 where id=?",[channel_id], (err, rowsdata) => {
                         if (err) {
                             dbFunc.connectionRelease;
                             console.log(err)
                             reject(err);
                            } 
                        });   
                        // db.query("update ll_users_channels set status=? where id=?",['2',user.store_id], (err, rowsdata) => {
                        //     if (err) {
                        //      dbFunc.connectionRelease;
                        //      console.log(err)
                        //      reject(err);
                        //     } 
                        // });   
                        resolve({"success":true,"message":"Broadcasting product update successfully",body:rows});
                    }
                });   
            }
                       
            
       }); 
    });
}
function sentMail(argument) {
     const nodemailer = require("nodemailer");

    var username = argument.username;///dog/gi;timeLeft
    var message = argument.message;
    var subject = argument.subject;
    console.log('sentMail followers',argument.email);
    message =message.replace('[username]',argument.username );
    message =message.replace('[channel_name]',argument.title );
    message =message.replace( '[subject]',argument.title);
    message =message.replace( '[channel_id]',argument.id);
    subject =subject.replace( '[seller_name]',argument.seller_name);


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
module.exports = broadcastModel;



