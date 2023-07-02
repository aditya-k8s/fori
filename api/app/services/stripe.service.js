var stripeModel = require("../models/stripe-model");


var stripeService = {
    createSubscription: createSubscription,
    createCustomer:createCustomer,
    getSubscription:getSubscription,
    cancelSubscription:cancelSubscription,
    createPaymentIntent:createPaymentIntent,
    paymentTransfer:paymentTransfer,
    createCustomerCheckout:createCustomerCheckout,
    paymentIntentData:paymentIntentData,
    saveCard:saveCard,
    getCard:getCard,
    paymentIntentsCvv:paymentIntentsCvv,
    refund:refund
}
function refund(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.refund(authenticData).then((data)=>{
            console.log('refund>>>>>>>>>>>>>>>>>>>>>>>>>',data);

            resolve(data);
        }).catch((err) => {
            console.log('refund>>>>>>>>>>>err>>>>>>>>>>>>>>',err);
            reject(err);
        });
    });
   
}

function paymentIntentsCvv(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.paymentIntentsCvv(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('paymentIntentsCvv>>>>>>>>>>>err>>>>>>>>>>>>>>',err);

            reject(err);
        });
    });
   
}
function getCard(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.getCard(authenticData).then((data)=>{
              console.log('getCard>>>>>>>>>>>>>>>>>>>>>>>>>',data);

            resolve(data);
        }).catch((err) => {
            console.log('getCard>>>>>>>>>>>err>>>>>>>>>>>>>>',err);

            reject(err);
        });
    });
   
}
function saveCard(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.saveCard(authenticData).then((data)=>{
              console.log('saveCard>>>>>>>>>>>>>>>>>>>>>>>>>',data);

            resolve(data);
        }).catch((err) => {
            console.log('saveCard>>>>>>>>>>>err>>>>>>>>>>>>>>',err);

            reject(err);
        });
    });
   
}

function paymentIntentData(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.paymentIntentData(authenticData).then((data)=>{
              console.log('paymentIntentData>>>>>>>>>>>>>>>>>>>>>>>>>',data);

            resolve(data);
        }).catch((err) => {
            console.log('paymentIntentData>>>>>>>>>>>err>>>>>>>>>>>>>>',err);

            reject(err);
        });
    });
   
}

function paymentTransfer(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.paymentTransfer(authenticData).then((data)=>{
              console.log('paymentTransfer>>>>>>>>>>>>>>>>>>>>>>>>>',data);

            resolve(data);
        }).catch((err) => {
            console.log('paymentTransfer>>>>>>>>>>>err>>>>>>>>>>>>>>',err);

            reject(err);
        });
    });
   
}

function createPaymentIntent(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.createPaymentIntent(authenticData).then((data)=>{
              console.log('createPaymentIntent>>>>>>>>>>>>>>>>>>>>>>>>>',data);

            resolve(data);
        }).catch((err) => {
            console.log('createPaymentIntent>>>>>>>>>>>err>>>>>>>>>>>>>>',err);

            reject(err);
        });
    });
   
}
function cancelSubscription(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.cancelSubscription(authenticData).then((data)=>{
              console.log('cancelSubscription>>>>>>>>>>>>>>>>>>>>>>>>>',data);

            resolve(data);
        }).catch((err) => {
            console.log('cancelSubscription>>>>>>>>>>>err>>>>>>>>>>>>>>',err);

            reject(err);
        });
    });
   
}

function getSubscription(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.getSubscription(authenticData).then((data)=>{
              console.log('stripeService>>>>>>>>>>>>>>>>>>>>>>>>>',data);

            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}

function createCustomer(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.createCustomer(authenticData).then((data)=>{
              console.log('stripeService>>>>>>>>>>>>>>>>>>>>>>>>>',data);

            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}
function createCustomerCheckout(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.createCustomerCheckout(authenticData).then((data)=>{
              console.log('createCustomerCheckout>>>>>>>>>>>>>>>>>>>>>>>>>',data);

            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}


function createSubscription(authenticData) {
    return new Promise((resolve,reject) => {
        stripeModel.createSubscription(authenticData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    });
   
}

module.exports = stripeService;