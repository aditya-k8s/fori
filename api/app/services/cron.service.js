var cronModel = require("../models/cron-model");


var cronService = {
    dailyBonus: dailyBonus,
}

function dailyBonus(authenticData) {
    return new Promise((resolve,reject) => {
        cronModel.dailyBonus(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

module.exports = cronService;



