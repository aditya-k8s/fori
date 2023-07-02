
const cronService = require('../services/cron.service');
var mail = require('./../../common/mailer.js');

function cronDaily(router) {
    router.route('/dailyBonus/')
        .get(dailyBonus);                 
           
}

function dailyBonus(req,res) {
   cronService.dailyBonus(req).then((data) => {
   if(data) {
      res.json({
        "success":true,
        "data":data,
      });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
module.exports.cronDaily = cronDaily;
