var depositModel = require("../models/deposit-model");


var depositService = {
    depositAddress: depositAddress,
    createTransaction:createTransaction,
    transactionStatus:transactionStatus,
    depositHistory:depositHistory,
    getMyBalance:getMyBalance,
    myHistory:myHistory
}

function depositAddress(authenticData) {
    return new Promise((resolve,reject) => {
        depositModel.depositAddress(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function createTransaction(depositData) {
     // console.log('createTransaction'+JSON.parse(depositData));

    return new Promise((resolve,reject) => {
        depositModel.createTransaction(depositData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function transactionStatus(authenticData) {
    return new Promise((resolve,reject) => {
        depositModel.transactionStatus(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function depositHistory(authenticData) {
    return new Promise((resolve,reject) => {
        depositModel.depositHistory(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function myHistory(authenticData) {
    return new Promise((resolve,reject) => {
        depositModel.myHistory(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function getMyBalance(authenticData) {
    return new Promise((resolve,reject) => {
        depositModel.getMyBalance(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

module.exports = depositService;



