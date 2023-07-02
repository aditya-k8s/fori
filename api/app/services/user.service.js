var userModel = require("../models/user-model.js");


var userService = {
    getAllUser: getAllUser,
    getUserById:getUserById,
    addUser: addUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    updateUserStatus:updateUserStatus,
    changePassword:changePassword,
    changeEmail:changeEmail,
    changeProfilePic:changeProfilePic,
    updatePersonalDetail:updatePersonalDetail,
    twoFactAuthEnable:twoFactAuthEnable,
    twoFactAuthDisable:twoFactAuthDisable,
    twoFactAuthVerify:twoFactAuthVerify,
    questionList:questionList ,
    myQuestion:myQuestion ,
    myQuesAns: myQuesAns,
    verifySecurityQues:  verifySecurityQues,
    SecQuestiondisable: SecQuestiondisable,
    createExcel:createExcel,
    addEditfollower:addEditfollower,
    saveGatewayDetails:saveGatewayDetails,
    getPaymentGateway:getPaymentGateway,
    followingsStoreList:followingsStoreList,
    userInterest:userInterest,
    getUserInterest:getUserInterest,
    getInterestList:getInterestList,
    updateUserType:updateUserType,
    gettimeslot:gettimeslot,
    supportRequest:supportRequest,
    getRecommendationList:getRecommendationList,
    updateUserdeviceInfo:updateUserdeviceInfo,
    sendPushNitification:sendPushNitification,
    influencerDetail:influencerDetail,
    getInfluencerDetail:getInfluencerDetail,
    updateInfluencerDetail:updateInfluencerDetail,
    uploadInfluencerBanner:uploadInfluencerBanner,
    getInfluencerList:getInfluencerList,
    addInfluencerCategory:addInfluencerCategory,
    categoryStoreCount:categoryStoreCount,
    storelistCat:storelistCat,
    saveMyfavoriteStore:saveMyfavoriteStore,
    getInfluencerProfileDetail:getInfluencerProfileDetail,
    getRequestList:getRequestList,
    delSupportRequest:delSupportRequest,
    getInfluencerRequest:getInfluencerRequest,
    addInfluencerRequest:addInfluencerRequest,
    searchInfluencerList:searchInfluencerList,
    cancelInfluencerRequest:cancelInfluencerRequest,
    acceptRequestByInfluencer:acceptRequestByInfluencer,
    merchantCancelInfluRequest:merchantCancelInfluRequest

}
function acceptRequestByInfluencer(userData) {
    return new Promise((resolve,reject) => {
        userModel.acceptRequestByInfluencer(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function merchantCancelInfluRequest(userData) {
    return new Promise((resolve,reject) => {
        userModel.merchantCancelInfluRequest(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function cancelInfluencerRequest(userData) {
    return new Promise((resolve,reject) => {
        userModel.cancelInfluencerRequest(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function searchInfluencerList(userData) {
    return new Promise((resolve,reject) => {
        userModel.searchInfluencerList(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getInfluencerRequest(userData) {
    return new Promise((resolve,reject) => {
        userModel.getInfluencerRequest(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function addInfluencerRequest(userData) {
    return new Promise((resolve,reject) => {
        userModel.addInfluencerRequest(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function delSupportRequest(userData) {
    return new Promise((resolve,reject) => {
        userModel.delSupportRequest(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getRequestList(userData) {
    return new Promise((resolve,reject) => {
        userModel.getRequestList(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function saveMyfavoriteStore(userData) {
    return new Promise((resolve,reject) => {
        userModel.saveMyfavoriteStore(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function categoryStoreCount(userData) {
    return new Promise((resolve,reject) => {
        userModel.categoryStoreCount(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function storelistCat(userData) {
    return new Promise((resolve,reject) => {
        userModel.storelistCat(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function addInfluencerCategory(userData) {
    return new Promise((resolve,reject) => {
        userModel.addInfluencerCategory(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getInfluencerList(userData) {
    return new Promise((resolve,reject) => {
        userModel.getInfluencerList(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function uploadInfluencerBanner(userData) {
    return new Promise((resolve,reject) => {
        userModel.uploadInfluencerBanner(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getInfluencerDetail(userData) {
    return new Promise((resolve,reject) => {
        userModel.getInfluencerDetail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getInfluencerProfileDetail(userData) {
    return new Promise((resolve,reject) => {
        userModel.getInfluencerProfileDetail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function updateInfluencerDetail(userData) {
    return new Promise((resolve,reject) => {
        userModel.updateInfluencerDetail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function influencerDetail(userData) {
    return new Promise((resolve,reject) => {
        userModel.influencerDetail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function sendPushNitification(userData) {
    return new Promise((resolve,reject) => {
        userModel.sendPushNitification(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateUserdeviceInfo(userData) {
    return new Promise((resolve,reject) => {
        userModel.updateUserdeviceInfo(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function getRecommendationList(userData) {
    return new Promise((resolve,reject) => {
        userModel.getRecommendationList(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function supportRequest(userData) {
    return new Promise((resolve,reject) => {
        userModel.supportRequest(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function gettimeslot() {
    return new Promise((resolve,reject) => {
        userModel.gettimeslot().then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateUserType(userData) {
    return new Promise((resolve,reject) => {
        userModel.updateUserType(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getInterestList() {
    return new Promise((resolve,reject) => {
        userModel.getInterestList().then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function userInterest(userData) {
    return new Promise((resolve,reject) => {
        userModel.userInterest(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getUserInterest(userData) {
    return new Promise((resolve,reject) => {
        userModel.getUserInterest(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function followingsStoreList(userData) {
    return new Promise((resolve,reject) => {
        userModel.followingsStoreList(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function getPaymentGateway(userData) {
    return new Promise((resolve,reject) => {
        userModel.getPaymentGateway(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function saveGatewayDetails(userData) {
    return new Promise((resolve,reject) => {
        userModel.saveGatewayDetails(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function addEditfollower(userData) {
    return new Promise((resolve,reject) => {
        userModel.addEditfollower(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function addUser(userData) {
    return new Promise((resolve,reject) => {
        userModel.addUser(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}


function updateUser(id,userData,callback) {
    return new Promise((resolve,reject) => {
        userModel.updateUser(id,userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
     
}

function deleteUser(id) {
    return new Promise((resolve,reject) => {
        userModel.deleteUser(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
}

function getAllUser(arg) {
    return new Promise((resolve,reject) => {
        userModel.getAllUser(arg).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function getUserById(id) {
    return new Promise((resolve,reject) => {
        userModel.getUserById(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}
function updateUserStatus(id) {
    return new Promise((resolve,reject) => {
        userModel.updateUserStatus(id).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    });
}

function changePassword(userData) {
    console.log('changePassword service',userData);    
    return new Promise((resolve,reject) => {
        userModel.changePassword(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function changeEmail(userData) {
    console.log('changeEmail serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.changeEmail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function changeProfilePic(userData) {
    console.log('changeProfilePic serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.changeProfilePic(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function updatePersonalDetail(userData) {
    console.log('updatePersonalDetail serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.updatePersonalDetail(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function twoFactAuthEnable(userData) {
    console.log('twoFactAuthEnable serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.twoFactAuthEnable(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function twoFactAuthVerify(userData) {
    console.log('twoFactAuthVerify serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.twoFactAuthVerify(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function twoFactAuthDisable(userData) {
    console.log('twoFactAuthDisable serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.twoFactAuthDisable(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}



  function questionList(userData) {
    console.log('questionList serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.questionList(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function myQuestion(userData) {
    console.log('myQuestion serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.myQuestion(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function myQuesAns(userData) {
    console.log('myQuesAns serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.myQuesAns(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function verifySecurityQues(userData) {
    console.log('verifySecurityQues serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.verifySecurityQues(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function SecQuestiondisable(userData) {
    console.log('SecQuestiondisable serve',userData);    
    return new Promise((resolve,reject) => {
        userModel.SecQuestiondisable(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function createExcel(userData) {
    return new Promise((resolve,reject) => {
        userModel.createExcel().then((data)=>{
            console.log('res serve',data);    
            resolve(data);
        }).catch((err) => {
            console.log('err serve',err);    
            reject(err);
        })
    })
   
}

module.exports = userService;

