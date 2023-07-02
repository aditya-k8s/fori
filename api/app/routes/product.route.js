
const productService = require('../services/product.service');
var schema = require('../schema/loginValidationSchema.json')
var iValidator = require('../../common/iValidator');
var errorCode = require('../../common/error-code');
var errorMessage = require('../../common/error-methods');
var mail = require('./../../common/mailer.js');


const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
const secretKey="!_@_fori_market_place_@_!"; 


function product(router) {
    router.route('/createProduct')
        .post(createProduct);  
    router.route('/saveShopifyProduct')
        .post(saveShopifyProduct);    
    router.route('/getMyProduct/:start?/:limit?')
        .post(getMyProduct);        
           
    router.route('/getCategory')
        .get(getCategory);  
    router.route('/updateCategory')
        .post(updateCategory);    
    router.route('/createCategory')
        .post(createCategory); 

    router.route('/createSubcategory')
        .post(createSubcategory);         
    router.route('/updateSubcategory')
        .post(updateSubcategory);
     router.route('/updateCategoryStatus')
        .post(updateCategoryStatus);         
    router.route('/updateSubcategoryStatus')
        .post(updateSubcategoryStatus);    

    router.route('/addShippingAddress')
        .post(addShippingAddress);
    router.route('/searchProduct')
        .post(searchProduct);
    router.route('/deleteProduct')
        .post(deleteProduct)
    router.route('/updateProduct')
        .post(updateProduct)
    router.route('/getProductDetail')
        .post(getProductDetail)
    router.route('/saveOrder')
        .post(saveOrder)                 
    router.route('/getAddress/:user_id')
        .get(getAddress);  
    router.route('/saveOrderPayment')
        .post(saveOrderPayment)     
    router.route('/getMyOrder/:user_id')
        .get(getMyOrder); 
    router.route('/getMyOrderDetail/:order_id/:user_id')
        .get(getMyOrderDetail); 
    router.route('/editShippingAddress')
        .post(editShippingAddress)
    router.route('/delShippingAddress')
        .post(delShippingAddress);    
    router.route('/shippingFee')
        .post(shippingFee)  
    router.route('/getShippingFee/:user_id')
        .get(getShippingFee);      
    router.route('/validateDiscountCode')
        .post(validateDiscountCode)    
     
    router.route('/getMarchantOrder/:user_id')
        .get(getMarchantOrder);
    router.route('/carbonClickPayment/')
        .post(carbonClickPayment);   
    router.route('/getMyStoreProduct/:start?/:limit?')
        .post(getMyStoreProduct);       
}
function carbonClickPayment(req,res) {
  var reqData=req.body;
  console.log('carbonClickPayment---------->',reqData);
  if (!reqData.user_id || reqData.user_id=='' || !reqData.amount || reqData.amount=='' ) {
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.carbonClickPayment(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}

function getMarchantOrder(req,res) {
  var reqData=req.params;
  if (!reqData.user_id || reqData.user_id=='') {
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.getMarchantOrder(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}

function validateDiscountCode(req,res) {
  var reqData=req.body;
  if (!reqData.user_id || reqData.user_id=='' || !reqData.coupon_code || reqData.coupon_code=='') {
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.validateDiscountCode(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}

function getShippingFee(req,res) {
    var reqData=req.params;
    
   if (!reqData.user_id || reqData.user_id=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.getShippingFee(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}

function shippingFee(req,res) {
    var reqData=req.body;
    
   if ( !reqData.user_id || reqData.user_id=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.shippingFee(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function delShippingAddress(req,res) {
    var reqData=req.body;
    
   if (!reqData.id || reqData.id=='' || !reqData.user_id || reqData.user_id=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.delShippingAddress(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function editShippingAddress(req,res) {
    var reqData=req.body;
    
   if (!reqData.id || reqData.id=='' || !reqData.user_id || reqData.user_id=='' || !reqData.address_1 || reqData.address_1=='' || !reqData.city || reqData.city=='' || !reqData.state || reqData.state=='' || !reqData.country || reqData.country=='' || !reqData.pin_code || reqData.pin_code=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.editShippingAddress(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

function getMyOrderDetail(req,res) {
    var reqData=req.params;
    
   if (!reqData.order_id || reqData.order_id=="" || !reqData.user_id || reqData.user_id=="" ) {
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.getMyOrderDetail(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}

function getMyOrder(req,res) {
    var reqData=req.params;
    
   if (!reqData.user_id || reqData.user_id=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.getMyOrder(reqData).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    res.json(err);
  });

}

function saveOrderPayment(req,res) {
    var reqData=req.body;
     // Decrypt
    if ( !reqData.data || reqData.data=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"POST parameter required"
       });
    }
    var bytes  = CryptoJS.AES.decrypt(reqData.data, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData)
    reqData=decryptedData
   if (!reqData.user_id || reqData.user_id=='' || !reqData.order_id || reqData.order_id=="" ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.saveOrderPayment(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function getAddress(req,res) {
    var reqData=req.params;
    
   if (!reqData.user_id || reqData.user_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.getAddress(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function saveOrder(req,res) {
    var reqData=req.body;
    // Decrypt
    if ( !reqData.data || reqData.data=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"POST parameter required"
       });
    }
    var bytes  = CryptoJS.AES.decrypt(reqData.data, secretKey);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData)
    reqData=decryptedData
   if ( !reqData.user_id || reqData.user_id=='' || !reqData.broadcast_id || reqData.broadcast_id=='' || !reqData.total_items || reqData.total_items=='' || !reqData.sub_total_amount || reqData.sub_total_amount==''  || !reqData.products || reqData.products=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
    if (!reqData.shipping_address || reqData.shipping_address=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"Shipping detail required"
       });
    }
  productService.saveOrder(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function getProductDetail(req,res) {
  console.log('getProductDetail',req.body)
     var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='' ||  !reqData.product_id || reqData.product_id=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"User_id and product_id detail required"
       });
    }
    productService.getProductDetail(reqData).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
    });
}

function updateProduct(req,res) {
     var reqData=req.body;
     console.log(reqData);
     

    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.product_id || reqData.product_id=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"User_id and product_id detail required"
       });
    }
    productService.updateProduct(reqData).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
    });
}

function deleteProduct(req,res) {
     var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='' || !reqData.product_id || reqData.product_id=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"User_id and product_id detail required"
       });
    }
    productService.deleteProduct(reqData).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
    });
}
function searchProduct(req,res) {
     var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='' || !reqData.store_id || reqData.store_id=='' || !reqData.searchqry || reqData.searchqry=="") {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"All Fields Required"
       });
    }
    productService.searchProduct(reqData).then((data) => {
       if(data) {
          res.json(data);
        }
      }).catch((err) => {
        //mail.mail(err);
        res.json(err);
    });
}

function saveShopifyProduct(req,res) {
  var reqData=req.body;
  console.log('saveShopifyProduct',reqData);
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"User ID is Required"
       });
    }
    if (!reqData.store_id || reqData.store_id==''  ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"Store ID is Required"
       });
    }
    if ( !reqData.details || reqData.details=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "message":"Product details required"
       });
    }
   productService.saveShopifyProduct(reqData).then((data) => {
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
function createProduct(req,res) {
  var reqData=req.body;
    //var json_format = iValidator.json_schema(schema.postDepositSchema, depositData, "deposit");
    if (!reqData.user_id || reqData.user_id=='' || !reqData.product_title || reqData.product_title=='' || !reqData.product_price || reqData.product_price=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }

   productService.createProduct(reqData).then((data) => {
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
function getCategory(req,res) {
    var reqData=req.params;
   // if (!reqData.user_id || reqData.user_id=='') {
   //    //return res.status(422).send(json_format.errorMessage);
   //    return res.json({
   //       "success":false,
   //       "data":"All Fields Required"
   //     });
   //  }
  productService.getCategory(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function createCategory(req,res) {
    var reqData=req.body;
   if (!reqData.user_id || reqData.user_id=='' || !reqData.category_title || reqData.category_title=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.createCategory(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function updateCategory(req,res) {
    var reqData=req.body;
   if (!reqData.category_id || reqData.category_id=='' || !reqData.user_id || reqData.user_id=='' || !reqData.category_title || reqData.category_title=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.updateCategory(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function updateCategoryStatus(req,res) {
    var reqData=req.body;
   if (!reqData.category_id || reqData.category_id=='' || !reqData.category_status || reqData.category_status=='' ) {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.updateCategoryStatus(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function createCategory(req,res) {
    var reqData=req.body;
    console.log('createCategory',reqData);
   if (!reqData.user_id || reqData.user_id=='' || !reqData.category_title || reqData.category_title=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All detail required"
       });
    }
  productService.createCategory(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function createSubcategory(req,res) {
    var reqData=req.body;
   if (!reqData.category_id || reqData.category_id=='' || !reqData.subcategory_title || reqData.subcategory_title=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"Category detail required"
       });
    }
  productService.createSubcategory(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}


function updateSubcategory(req,res) {
    var reqData=req.body;
   if (!reqData.subcategory_id || reqData.subcategory_id=='' || !reqData.category_id || reqData.category_id=='' || !reqData.subcategory_title || reqData.subcategory_title=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"Category detail required"
       });
    }
  productService.updateSubcategory(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}
function updateSubcategoryStatus(req,res) {
    var reqData=req.body;
   if (!reqData.subcategory_id || reqData.subcategory_id=='' || !reqData.subcategory_status || reqData.subcategory_status=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"Category detail required"
       });
    }
  productService.updateSubcategoryStatus(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}


function addShippingAddress(req,res) {
    var reqData=req.body;
    
   if (!reqData.user_id || reqData.user_id=='' || !reqData.address_1 || reqData.address_1=='' || !reqData.city || reqData.city=='' || !reqData.state || reqData.state=='' || !reqData.country || reqData.country=='' || !reqData.pin_code || reqData.pin_code=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
  productService.addShippingAddress(reqData).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}

function getMyStoreProduct(req,res) {
    var reqData=req.body;
    var req=req.params;
   if (!reqData.user_id || reqData.user_id=='' || !reqData.store_id || reqData.store_id=='') {
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
   req['user_id']=reqData.user_id ;
   req['store_id']=reqData.store_id ;
  productService.getMyStoreProduct(req).then((data) => {
    if(data) {
      res.json(data);
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}         
function getMyProduct(req,res) {
    var reqData=req.body;
    var req=req.params;
   if (!reqData.user_id || reqData.user_id=='') {
      //return res.status(422).send(json_format.errorMessage);
      return res.json({
         "success":false,
         "data":"All Fields Required"
       });
    }
   req['user_id']=reqData.user_id ;
  productService.getMyProduct(req).then((data) => {
    if(data) {
      res.json(data);
      // res.json({
      //   "success":true,
      //   "data":data,
      // });
    }
  }).catch((err) => {
    //mail.mail(err);
    res.json(err);
  });

}


module.exports.product = product;
