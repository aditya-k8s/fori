var broadcastModel = require("../models/broadcast-model");


var broadcastService = {
    createChannel: createChannel,
    getChanneldetail:getChanneldetail,
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
    return new Promise((resolve,reject) => {
        broadcastModel.updateBroadcastStatus(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateShopifyAuth(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.updateShopifyAuth(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getPublishedStore(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.getPublishedStore(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateStoreStatus(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.updateStoreStatus(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getStoredetail(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.getStoredetail(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function deleteStore(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.deleteStore(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getSyncStore(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.getSyncStore(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getStoredStreaming(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.getStoredStreaming(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getupcomingStreaming(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.getupcomingStreaming(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateStreamingDetail(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.updateStreamingDetail(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getBroadcastDetails(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.getBroadcastDetails(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateBroadcastId(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.updateBroadcastId(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function deleteStreamingChannel(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.deleteStreamingChannel(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function popularChannels(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.popularChannels(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function myChannel(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.myChannel(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function selectBroadcastingProduct(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.selectBroadcastingProduct(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function uploadCoverImg(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.uploadCoverImg(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getmyStreamingChannel(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.getmyStreamingChannel(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function saveStreamingDetail(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.saveStreamingDetail(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getStreamingChannel(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.getStreamingChannel(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function createStreamingChannel(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.createStreamingChannel(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateStreamChannel(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.updateStreamChannel(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function createChannel(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.createChannel(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getChanneldetail(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.getChanneldetail(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function adminGetChanneldetail(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.adminGetChanneldetail(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function uploadchanelLogo(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.uploadchanelLogo(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function verifyShopifyAuth(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.verifyShopifyAuth(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateChannel(arg) {
    return new Promise((resolve,reject) => {
        broadcastModel.updateChannel(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}


module.exports = broadcastService;