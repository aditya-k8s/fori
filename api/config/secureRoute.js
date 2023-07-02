const jwt = require('jsonwebtoken');

module.exports = function checkToken(req, res, next) {
    var token = req.headers['token'];
    console.log('jsonwebtoken token',token);
    if(token) {
      jwt.verify(token, 'spnov2019',(err,decode)=>{
        if(err) {
          res.json({"status":500,
            "message":"Your session has expired. Please relogin",
            "error":err.message
         });
       } else {
          next();
        }
      })
    } else {
      res.json({"status":500,
      "message":"NO TOKEN PROVIDE",
      "error":"token must be provide in header for endpoint access"
   });
    }
  }


  