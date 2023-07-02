var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
var request = require('request');
const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');
const Shopify = require('shopify-api-node');
var fs = require('fs');
var path = require('path');
const chime = new AWS.Chime({ region: 'us-east-1',accessKeyId: 'AKIA3MSRS7Y7NVLBNFHC',secretAccessKey: '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' });


chime.endpoint = new AWS.Endpoint('https://service.chime.aws.amazon.com');

var chimeModel = {
   createMetting:createMetting,
   attendeeMetting:attendeeMetting,
   uploadvideo:uploadvideo,
   getbroadcastvideos:getbroadcastvideos,
   deletebroadcastvideos:deletebroadcastvideos,
   savetext:savetext,
   gettext:gettext,
   deletetext:deletetext


}

 async function createMetting(argument) {
 	let ClientRequestToken= uuid();
 	console.log(ClientRequestToken);
	return  meetingResponse = await chime.createMeeting({
		  ClientRequestToken:ClientRequestToken,
		  MediaRegion: 'us-east-1' // Specify the region in which to create the meeting.
		}).promise();		  
	

}



async function attendeeMetting(argument) {
	console.log("attendeeMetting",argument);
 		const meetingResponse = await chime.createMeeting({
		  ClientRequestToken: uuid(),
		  MediaRegion: 'us-east-1' // Specify the region in which to create the meeting.
		}).promise();
		return attendeeResponse = await chime.createAttendee({
		  MeetingId: argument.MeetingId ,//meetingResponse.Meeting.MeetingId,
		  ExternalUserId: uuid() // Link the attendee to an identity managed by your application.
		}).promise();		
				  
		
}

function uploadvideo(argument) {
	console.log("uploadvideo",argument);
	return new Promise((resolve,reject) => {
	//
		db.query("INSERT INTO `ll_broadcast_videos`(`broadcast_id`, `video_url`) VALUES (?,?)",[argument.broadcast_id,argument.video_file],(error,rows,fields)=>{
		    //console.log('getMyProduct--->',rows)
		    if(!!error) {
		        dbFunc.connectionRelease;
		        reject ({"success":false,"message":error.code});
		    }
			resolve({"success":true,"message":'success','body':rows});
			
		});
	});
}
function getbroadcastvideos(argument) {
	console.log("getbroadcastvideos",argument);
	return new Promise((resolve,reject) => {
	//
		db.query("SELECT * FROM ll_broadcast_videos WHERE broadcast_id =? ",[argument.broadcast_id],(error,rows,fields)=>{
		    //console.log('getMyProduct--->',rows)
		    if(!!error) {
		        dbFunc.connectionRelease;
		        reject ({"success":false,"message":error.code});
		    }
			resolve({"success":true,"message":'success','body':rows});
			
		});
	});
}

function deletebroadcastvideos(argument) {
	console.log("deletebroadcastvideos",argument);
	return new Promise((resolve,reject) => {
	//
		db.query("SELECT video_url FROM ll_broadcast_videos WHERE id =? ",[argument.id],(error,rows,fields)=>{
		    //console.log('getMyProduct--->',rows)
		    if(!!error) {
		        dbFunc.connectionRelease;
		        reject ({"success":false,"message":error.code});
		    }
		    if (rows.length>0) {
			    if (fs.existsSync('/var/www/html/lash/'+rows[0].video_url)) {
			      fs.unlinkSync('/var/www/html/lash/'+rows[0].video_url);
			      console.log('File deleted!');
			    }
			    db.query(" DELETE FROM `ll_broadcast_videos` WHERE id =? ",[argument.id],(error,rows,fields)=>{
				    //console.log('getMyProduct--->',rows)
				    if(!!error) {
				        dbFunc.connectionRelease;
				        reject ({"success":false,"message":error.code});
				    }
					resolve({"success":true,"message":'Video deleted Successfully','body':rows});
				});
			}
		});
	});
}




function savetext(argument) {
	console.log("savetext",argument);
	return new Promise((resolve,reject) => {
	//
		db.query("INSERT INTO `ll_broadcast_text`(`broadcast_id`, `text`) VALUES (?,?)",[argument.broadcast_id,argument.text],(error,rows,fields)=>{
		    //console.log('getMyProduct--->',rows)
		    if(!!error) {
		        dbFunc.connectionRelease;
		        reject ({"success":false,"message":error.code});
		    }
			resolve({"success":true,"message":'success','body':rows});
			
		});
	});
}
function gettext(argument) {
	console.log("getbroadcastvideos",argument);
	return new Promise((resolve,reject) => {
	//
		db.query("SELECT * FROM ll_broadcast_text ",[argument.broadcast_id],(error,rows,fields)=>{
		    //console.log('getMyProduct--->',rows)
		    if(!!error) {
		        dbFunc.connectionRelease;
		        reject ({"success":false,"message":error.code});
		    }
			resolve({"success":true,"message":'success','body':rows});
			
		});
	});
}

function deletetext(argument) {
	console.log("deletetext",argument);
	return new Promise((resolve,reject) => {
	//
		db.query("SELECT id FROM ll_broadcast_text WHERE id =? ",[argument.id],(error,rows,fields)=>{
		    //console.log('getMyProduct--->',rows)
		    if(!!error) {
		        dbFunc.connectionRelease;
		        reject ({"success":false,"message":error.code});
		    }
		    if (rows.length>0) {
			   
			    db.query(" DELETE FROM `ll_broadcast_text` WHERE id =? ",[argument.id],(error,rows,fields)=>{
				    //console.log('getMyProduct--->',rows)
				    if(!!error) {
				        dbFunc.connectionRelease;
				        reject ({"success":false,"message":error.code});
				    }
					resolve({"success":true,"message":'Deleted Successfully','body':rows});
				});
			}
		});
	});
}

module.exports = chimeModel;
