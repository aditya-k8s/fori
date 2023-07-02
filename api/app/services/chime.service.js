var chimeModel = require("../models/chime.model.js");


var chimeService = {
    createMetting:createMetting,
    attendeeMetting:attendeeMetting, 
    uploadvideo:uploadvideo,
    getbroadcastvideos:getbroadcastvideos,
    deletebroadcastvideos:deletebroadcastvideos,
    savetext:savetext,
   gettext:gettext,
   deletetext:deletetext

}
function deletetext(userData) {
    return new Promise((resolve,reject) => {
        chimeModel.deletetext(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}

function gettext(userData) {
    return new Promise((resolve,reject) => {
        chimeModel.gettext(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}

function savetext(userData) {
    return new Promise((resolve,reject) => {
        chimeModel.savetext(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function deletebroadcastvideos(userData) {
    return new Promise((resolve,reject) => {
        chimeModel.deletebroadcastvideos(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}

function getbroadcastvideos(userData) {
    return new Promise((resolve,reject) => {
        chimeModel.getbroadcastvideos(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}

function uploadvideo(userData) {
    return new Promise((resolve,reject) => {
        chimeModel.uploadvideo(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function createMetting(userData) {
    return new Promise((resolve,reject) => {
        chimeModel.createMetting(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
function attendeeMetting(userData) {
    return new Promise((resolve,reject) => {
        chimeModel.attendeeMetting(userData).then((data)=>{
            resolve(data);
        }).catch((err) => {
            console.log('Serveice err',err);
            reject(err);
        })
    })
   
}
module.exports = chimeService;