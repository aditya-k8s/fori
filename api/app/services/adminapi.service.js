var adminapiModel = require("../models/adminapi-model.js");


var adminapiServeice = {
    getAllusers:getAllusers,
    updateUserStatus:updateUserStatus , 

    getfeeDetail: getfeeDetail, 
    updatefeeDetail:updatefeeDetail,
    downloadList: downloadList, 
    uploadDownload:uploadDownload ,
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
function payToMerchant(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.payToMerchant(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getMerchantBalance(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getMerchantBalance(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getMerchantList(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getMerchantList(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getTestimonialBypage(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getTestimonialBypage(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getTestimonialDetail(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getTestimonialDetail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function delTestimonial(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.delTestimonial(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getTestimonial(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getTestimonial(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function addTestimonial(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.addTestimonial(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function updateStatusTestimonial(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updateStatusTestimonial(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getAllRequestList(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getAllRequestList(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getProductSaleReport(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getProductSaleReport(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getBroadcastGraph(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getBroadcastGraph(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getAvgOrderGraph(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getAvgOrderGraph(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getProductSaleGraph(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getProductSaleGraph(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getDeviceGraph(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getDeviceGraph(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function addBankDetail(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.addBankDetail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function updateBankDetails(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updateBankDetails(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function delBankDetail(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.delBankDetail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getBankDetails(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getBankDetails(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getSaleorderGraph(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getSaleorderGraph(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getRecentusers(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getRecentusers(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function delCategory(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.delCategory(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function delSubCategory(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.delSubCategory(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getSubCategory(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getSubCategory(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function addSubCategory(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.addSubCategory(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function updateSubCategory(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updateSubCategory(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}

function getCategory(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getCategory(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}function addCategory(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.addCategory(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}function getAllOrder(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getAllOrder(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function updateCategory(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updateCategory(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function updateUserStatus(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updateUserStatus(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}

function getAllusers(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getAllusers(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}

function updateFeeUnilevel(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updateFeeUnilevel(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getPackage(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getPackage(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function updatePackage(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updatePackage(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getfeeDetail(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getfeeDetail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function updatefeeDetail(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updatefeeDetail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}

function downloadList(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.downloadList(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function uploadDownload(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.uploadDownload(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function updatefileStatus(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updatefileStatus(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function deletefile(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.deletefile(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getfile(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getfile(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function dashboardStack(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.dashboardStack(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function topDeposit(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.topDeposit(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function depositReport(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.depositReport(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function updateUnilevel(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updateUnilevel(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}

function dailyprofitReport(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.dailyprofitReport(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function directbonusReport(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.directbonusReport(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function withdrawReport(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.withdrawReport(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function resendmail(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.resendmail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
/*
function getTestimonial(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.getTestimonial(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function updateTestimonial(userData) {
    return new Promise((resolve,reject) => {
        adminapiModel.updateTestimonial(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}*/

module.exports = adminapiServeice;

