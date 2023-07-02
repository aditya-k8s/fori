var unilevelModel = require("../models/unilevel-model.js");


var unilevelServeice = {
    getUnilevel: getUnilevel,
    getlevelprofit:getlevelprofit
    
}

function getUnilevel(userData) {
     console.log('Serveice',userData);
    return new Promise((resolve,reject) => {
        unilevelModel.getUnilevel(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function getlevelprofit(userData) {
     console.log('getlevelprofit Serveice',userData);
    return new Promise((resolve,reject) => {
        unilevelModel.getlevelprofit(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}



module.exports = unilevelServeice;

