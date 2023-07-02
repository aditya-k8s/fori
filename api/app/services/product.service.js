var productModel = require("../models/product-model");


var productService = {
    createProduct: createProduct,
    getMyProduct:getMyProduct,
    getCategory:getCategory,
    createCategory:createCategory,
    updateCategory:updateCategory,
    createSubcategory:createSubcategory,
    updateSubcategory:updateSubcategory,
    updateCategoryStatus:updateCategoryStatus,
    updateSubcategoryStatus:updateSubcategoryStatus,
    addShippingAddress:addShippingAddress,
    searchProduct:searchProduct,
    saveShopifyProduct:saveShopifyProduct,
    deleteProduct:deleteProduct,
    updateProduct:updateProduct,
    getProductDetail:getProductDetail,
    saveOrder:saveOrder,
   getAddress:getAddress,
   saveOrderPayment:saveOrderPayment,
   getMyOrder:getMyOrder,
   getMyOrderDetail:getMyOrderDetail,
   editShippingAddress:editShippingAddress,
   delShippingAddress:delShippingAddress,
   shippingFee:shippingFee,
   getShippingFee:getShippingFee,
   validateDiscountCode:validateDiscountCode,
   getMarchantOrder:getMarchantOrder,
   carbonClickPayment:carbonClickPayment,
   getMyStoreProduct:getMyStoreProduct
}
function getMyStoreProduct(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.getMyStoreProduct(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function carbonClickPayment(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.carbonClickPayment(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function getMarchantOrder(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.getMarchantOrder(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}

function validateDiscountCode(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.validateDiscountCode(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}

function shippingFee(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.shippingFee(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function getShippingFee(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.getShippingFee(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function delShippingAddress(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.delShippingAddress(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function editShippingAddress(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.editShippingAddress(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function getMyOrder(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.getMyOrder(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function getMyOrderDetail(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.getMyOrderDetail(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function saveOrderPayment(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.saveOrderPayment(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function saveOrder(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.saveOrder(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}

function getAddress(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.getAddress(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}

function getProductDetail(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.getProductDetail(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}

function updateProduct(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.updateProduct(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function deleteProduct(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.deleteProduct(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function searchProduct(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.searchProduct(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function saveShopifyProduct(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.saveShopifyProduct(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function createProduct(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.createProduct(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function getMyProduct(authenticData) {
    return new Promise((resolve,reject) => {
        productModel.getMyProduct(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

function getCategory(depositData) {
     // console.log('createTransaction'+JSON.parse(depositData));

    return new Promise((resolve,reject) => {
        productModel.getCategory(depositData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function createCategory(depositData) {
     // console.log('createTransaction'+JSON.parse(depositData));

    return new Promise((resolve,reject) => {
        productModel.createCategory(depositData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function createSubcategory(depositData) {
     // console.log('createTransaction'+JSON.parse(depositData));

    return new Promise((resolve,reject) => {
        productModel.createSubcategory(depositData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateCategory(depositData) {
     // console.log('createTransaction'+JSON.parse(depositData));335137

    return new Promise((resolve,reject) => {
        productModel.updateCategory(depositData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateSubcategory(depositData) {
     // console.log('createTransaction'+JSON.parse(depositData));

    return new Promise((resolve,reject) => {
        productModel.updateSubcategory(depositData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateCategoryStatus(depositData) {
     // console.log('createTransaction'+JSON.parse(depositData));335137

    return new Promise((resolve,reject) => {
        productModel.updateCategory(depositData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function updateSubcategoryStatus(depositData) {
     // console.log('createTransaction'+JSON.parse(depositData));

    return new Promise((resolve,reject) => {
        productModel.updateSubcategory(depositData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}
function addShippingAddress(depositData) {
    return new Promise((resolve,reject) => {
        productModel.addShippingAddress(depositData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
   
}

module.exports = productService;