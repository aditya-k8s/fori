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
var influModel = {
  getInflueStoredStreaming:getInflueStoredStreaming,
  getInfluencerStreaming:getInfluencerStreaming,
  getInfluencerStreamingDetails:getInfluencerStreamingDetails

}
function getInflueStoredStreaming(argument) {
     console.log('getInflueStoredStreaming',argument);
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

        db.query("SELECT  ll_products_streaming_content.*,ll_product_broadcasting.store_url,ll_product_broadcasting.broadcast_time,SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW())  as timestamp FROM ll_products_streaming_content,ll_product_broadcasting WHERE ll_product_broadcasting.channel_id=ll_products_streaming_content.id and ll_product_broadcasting.broadcast_status='2' and  ll_product_broadcasting.Influencer_id =? and ll_products_streaming_content.is_delete='0' order by ll_products_streaming_content.id desc  limit ? offset ?",[argument.user_id,LimitNum,startNum], (error, rows, fields) => {
            if (error) {
                   console.log('getInflueStoredStreaming error',error);

                reject(error);
            } else {
                resolve({"success":true,"message":"success",'body':rows});                  
                
            }
        });
    });
} 
function getInfluencerStreaming(argument) {
     console.log('getInfluencerStreaming',argument);
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

        db.query("SELECT  ll_products_streaming_content.*,ll_product_broadcasting.store_url,ll_product_broadcasting.broadcast_time,SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW())  as timestamp FROM ll_products_streaming_content,ll_product_broadcasting WHERE ll_product_broadcasting.channel_id=ll_products_streaming_content.id and ll_product_broadcasting.broadcast_status!='2' and  ll_product_broadcasting.Influencer_id =? and ll_products_streaming_content.is_delete='0' order by ll_products_streaming_content.id desc  limit ? offset ?",[argument.user_id,LimitNum,startNum], (error, rows, fields) => {
            if (error) {
              console.log('getInflueStoredStreaming error',error);
              reject(error);
            } else {
                resolve({"success":true,"message":"success",'body':rows});                  
                
            }
        });
    });
}
function getInfluencerStreamingDetails(argument) {
     console.log('getInfluencerStreamingDetails',argument);
    return new Promise((resolve, reject) => {
        db.query("SELECT (SELECT ll_users_channels.channel_org_name FROM ll_users_channels WHERE ll_users_channels.id=ll_product_broadcasting.store_id limit 1) as store_name,(SELECT COUNT(ll_orders.id) as solditem FROM `ll_order_items`,ll_orders WHERE ll_orders.order_id=ll_order_items.order_id and ll_orders.broadcast_id=?) as itemsold , ll_products_streaming_content.*,ll_product_broadcasting.*,SUBSTRING_INDEX(UNIX_TIMESTAMP(ll_product_broadcasting.broadcast_time), '.', 1)-UNIX_TIMESTAMP(NOW())  as timestamp FROM ll_products_streaming_content,ll_product_broadcasting WHERE ll_product_broadcasting.channel_id=ll_products_streaming_content.id and ll_product_broadcasting.broadcast_status='2' and  ll_product_broadcasting.Influencer_id =? and  ll_product_broadcasting.channel_id =? and ll_products_streaming_content.is_delete='0' order by ll_products_streaming_content.id desc ",[argument.stream_id,argument.user_id,argument.stream_id], (error, rows, fields) => {
            if (error) {
              console.log('getInflueStoredStreaming error',error);
              reject(error);
            } else {
                var product_id=rows[0].product_id;
                 console.log(product_id)
                db.query("SELECT DISTINCT prod.product_id,prod.*,SUBSTRING_INDEX(prod.product_id,'/',-1) as product_id_int, (SELECT ll_products_images.image_url FROM ll_products_images WHERE ll_products_images.product_id=prod.product_id limit 1) as image_url FROM `ll_products` prod where SUBSTRING_INDEX(prod.product_id,'/',-1) IN ("+product_id+")   order by id desc",(error,productList,fields)=>{
                    if (error) {
                        reject(error);
                    } else {
                      console.log('productList',productList)                        
                      dbFunc.connectionRelease;
                      rows[0]['productList']=productList;
                      resolve({"success":true,"message":"success",'body':rows});
                        
                    }
                });            
                                  
                
            }
        });
    });
}
module.exports = influModel;
