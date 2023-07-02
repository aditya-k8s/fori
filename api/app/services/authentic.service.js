var authenticModel = require("../models/authentic.model");


var authenticService = {
    authentic: authentic,
    signup:signup,
    country:country,
    forgotPassword:forgotPassword,
    resetPassword:resetPassword,
    confirmation:confirmation,
    addressCallback:addressCallback,
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
function recentSales(authenticData) {
     //console.log('recentSales',authenticData);
    return new Promise((resolve,reject) => {
        authenticModel.recentSales(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function globalSearch(authenticData) {
     //console.log('globalSearch',authenticData);
    return new Promise((resolve,reject) => {
        authenticModel.globalSearch(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function publicBroadcastingContentDetails(authenticData) {
     console.log('publicBroadcastingContentDetails',authenticData);
    return new Promise((resolve,reject) => {
        authenticModel.publicBroadcastingContentDetails(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function publicBroadcastingDetails(authenticData) {
     console.log('publicBroadcastingDetails',authenticData);
    return new Promise((resolve,reject) => {
        authenticModel.publicBroadcastingDetails(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function getAllChannel(authenticData) {
     console.log('getAllChannel',authenticData);
    return new Promise((resolve,reject) => {
        authenticModel.getAllChannel(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function getAllSreamingChannel(authenticData) {
     console.log('getAllSreamingChannel',authenticData);
    return new Promise((resolve,reject) => {
        authenticModel.getAllSreamingChannel(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function sociallogin(authenticData) {
     console.log('sociallogin',authenticData);
    return new Promise((resolve,reject) => {
        authenticModel.sociallogin(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function getsteamingList(authenticData) {
     console.log('getsteamingList',authenticData);
    return new Promise((resolve,reject) => {
        authenticModel.getsteamingList(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}

function authentic(authenticData) {
     console.log('service',authenticData);
    return new Promise((resolve,reject) => {
        authenticModel.authentic(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}

function signup(signUpData) {
    
    return new Promise((resolve,reject) => {
        authenticModel.signup(signUpData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function country() {
    
    return new Promise((resolve,reject) => {
        authenticModel.country().then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
/***************************************/
function GetUsersMlm() {
    
    return new Promise((resolve,reject) => {
        authenticModel.GetUsersMlm().then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

/****************************************/
function forgotPassword(email) {
    console.log('forgotPassword serve',email);    
    return new Promise((resolve,reject) => {
        authenticModel.forgotPassword(email).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function emailVerify(email) {
    console.log('emailVerify serve',email);    
    return new Promise((resolve,reject) => {
        authenticModel.emailVerify(email).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function resetPassword(userData) {
    console.log('resetPassword serve',userData);    
    return new Promise((resolve,reject) => {
        authenticModel.resetPassword(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function confirmation(userData) {
    console.log('confirmation serve',userData);    
    return new Promise((resolve,reject) => {
        authenticModel.confirmation(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function addressCallback(userData) {
    console.log('addressCallback serve',userData);    
    return new Promise((resolve,reject) => {
        authenticModel.addressCallback(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}


module.exports = authenticService;

