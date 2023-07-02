const unilevelService = require('../services/unilevel.service');
//var schema = require('../schema/userValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


function unilevel(router) {
    // router.route('/unilevelSearch/:id/:username')
    //     .get(getAllUsers)
    //     .post(addUser);
    router.route('/getUnilevel/:user_id')
        .get(getUnilevel)
    router.route('/getlevelprofit/:user_id')
        .get(getlevelprofit)    

}

function getUnilevel(req,res) {
  let userId = req.params;
  console.log('getUnilevel',userId);
  unilevelService.getUnilevel(userId).then((data) => {
      //res.send(data);
       res.json({
         "success":true,
         "data":data
       });
    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "data":err
       });
    });
}

function getlevelprofit(req,res) {
  let userId = req.params;
   console.log('getlevelprofit router',userId);
  
  if (!userId.user_id || userId.user_id=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All field required"
       });
   }
  unilevelService.getlevelprofit(userId).then((data) => {
      res.send(data);

    }).catch((err) => {
      //mail.mail(err);
       console.log('err',err);
       //res.send(err);
       res.json({
         "success":false,
         "data":err
       });
    });
}

module.exports.unilevel = unilevel;



