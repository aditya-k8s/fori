var influModel = require("../models/influencer-model.js");
var influService = {
    getInflueStoredStreaming: getInflueStoredStreaming,
    getInfluencerStreaming:getInfluencerStreaming,
    getInfluencerStreamingDetails:getInfluencerStreamingDetails
}

function getInflueStoredStreaming(userData) {
    return new Promise((resolve,reject) => {
        influModel.getInflueStoredStreaming(userData).then((data)=>{
            console.log('res serve',data);    
            resolve(data);
        }).catch((err) => {
            console.log('err serve',err);    
            reject(err);
        })
    })
   
}
function getInfluencerStreaming(userData) {
    return new Promise((resolve,reject) => {
        influModel.getInfluencerStreaming(userData).then((data)=>{
            console.log('res serve',data);    
            resolve(data);
        }).catch((err) => {
            console.log('err serve',err);    
            reject(err);
        })
    })
   
}
function getInfluencerStreamingDetails(userData) {
    return new Promise((resolve,reject) => {
        influModel.getInfluencerStreamingDetails(userData).then((data)=>{
            console.log('res serve',data);    
            resolve(data);
        }).catch((err) => {
            console.log('err serve',err);    
            reject(err);
        })
    })
   
}
module.exports = influService;

