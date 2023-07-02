var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
/*var smtpTransport = nodemailer.createTransport({
    //service: "Yahoo",  // sets automatically host, port and connection security settings
    host: "smtp.gmail.com",
    port: 587,//587,
    secure: false,
    auth: {
       user: "sunny.kbs121@gmail.com",
       pass: "abc123#@!"
    }
});*/
var smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
       user: "sunny.kbs121@gmail.com",
       pass: "abc123#@!"
    }
}));
function mail(argument) {
  var username = argument.username;///dog/gi;timeLeft
  var message = argument.message;
  console.log('sentMail',argument.email);
  if (argument.email) {
  message =message.replace('[username]',username );
  message =message.replace('[username]',username );
  if (argument.activation_code) {
    message =message.replace( '[activation_code]',argument.activation_code);
    message =message.replace( '[activation_code]',argument.activation_code);
    message =message.replace( '[activation_code]',argument.activation_code);
  }
  if (argument.forgotten_password_code) {
    message =message.replace( '[forgotten_password_code]',argument.forgotten_password_code);
    message =message.replace( '[forgotten_password_code]',argument.forgotten_password_code);
  }
    let messageBodyJson = message
    smtpTransport.sendMail({  //email options
        from: "info@sixprofit.com",//'"Fred Foo 👻" <foo@example.com>' // sender address.  Must be the same as authenticated user if using Gmail.
        to: argument.email, // receiver
        subject: argument.subject, // subject
        html: messageBodyJson // body
     }, function(error, response){  //callback
        if(error){
           console.log("error",error);
        }else{
            console.log(response);
        }
        
     //    smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
     });
  }else{
     console.log("Please provide the emailID",argument);
  }
}


function sentMail(argument) {
 const AWS = require("aws-sdk");
  var username = argument.username;///dog/gi;timeLeft
  var message = argument.message;
  console.log('sentMail',argument.email);
  message =message.replace('[username]',username );
  message =message.replace('[username]',username );
  if (argument.activation_code) {
    message =message.replace( '[activation_code]',argument.activation_code);
    message =message.replace( '[activation_code]',argument.activation_code);
    message =message.replace( '[activation_code]',argument.activation_code);
  }
  if (argument.forgotten_password_code) {
    message =message.replace( '[forgotten_password_code]',argument.forgotten_password_code);
    message =message.replace( '[forgotten_password_code]',argument.forgotten_password_code);
  }
AWS.config.update({ "accessKeyId": "AKIAIWFZSTHVA7FKMDQQ", "secretAccessKey": "sXaSB8Uhtjh5kjWjeSTkS7ol56LYFZzXn1+9cQLe", "region": "us-east-1" });

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
const params = {
  Destination: {
    ToAddresses: [argument.email] // Email address/addresses that you want to send your email
  },
  // ConfigurationSetName: <<ConfigurationSetName>>,
  Message: {
    Body: {
      Html: {
        // HTML Format of the email
        Charset: "UTF-8",
        Data:message,//"<html><body><table align='center' border='0' width='600px' style='width:600px; margin:auto; font-family: 'Open Sans', sans-serif; padding:0; border:0px; table-layout: fixed;' cellpadding='0' cellspacing='0'><tr><td class='center' align='center' valign='top'><center><table cellpadding='0' cellspacing='0' width='600' style='width:100%; table-layout:fixed;'><tbody><tr><td style='height:35px; line-height:35px;'> &nbsp;</td></tr></tbody></table><table cellpadding='0' cellspacing='0' width='600' bgcolor='#656586' style='width:100%; table-layout:fixed; background:#f3f3f3; border: solid 1px #cccccc;'><tbody><tr><td><table cellpadding='0' cellspacing='0'><tbody><tr><th style='height:30px; line-height:30px; padding: 0; margin: 0;'>&nbsp;</th></tr><tr><th><table cellpadding='0' cellspacing='0' style='width:100%;'><tbody><tr><td width='30' style='width:30px;'></td><td width='540' style='width:540px;'><table cellpadding='0' cellspacing='0' style='width:100%;'><tbody><tr><td style='border: 1px solid #2ee7dc; background: #2ee7dc;'><p style='font-size: 24px; line-height: 45px; font-weight: 500; margin:0px; color: #fff; text-align: center;'><a href='https://app.uzyth.com/#/confirmation/"+argument.activation_code+"'><img src='http://devapp.uzyth.com/assets/images/logo.png' style='height:80px;' /></a></p></td></tr><tr><td style='height:20px; line-height:20px; padding: 0; margin: 0;'>&nbsp;</td></tr><tr><td><table cellpadding='0' cellspacing='0' style='width:100%; border-collapse: collapse;'><tbody><tr><td style='padding: 7px 12px 6px 12px; width:140px;'><p style='font-size: 16px; color: #222222; font-weight: 500;'>Hello "+argument.username+",</p><p style='font-size: 16px; color: #222222; font-weight: 500;'>Thank you for choosing https://app.uzyth.com</p><p style='font-size: 16px; color: #222222; font-weight: 500;'>This message is sent by system, do not reply.</p><p style='font-size: 16px; color: #222222; font-weight: 500;'>Please click on the link below to complete the registration:</p><br /><p style='word-break: break-all; font-size: 16px; color: #222222; font-weight: 500;'><a href='https://app.uzyth.com/#/confirmation/"+argument.activation_code+"'>Email Activation Link</a></p><br /><p style='font-size: 16px; color: #222222; font-weight: 500;'>If the above link can not click. Please copy the link to the browser's address bar to open it.If you have not made this operation, may be someone else mistakenly, please ignore this message.</p><br /><p style='font-size: 16px; color: #222222; font-weight: 500;'>https://app.uzyth.com</p></td></tr></tbody></table></td></tr><tr><td style='height:30px; line-height:30px; padding: 0; margin: 0;'>&nbsp;</td></tr></tbody></table></td><td width='30' style='width:30px;'></td></tr></tbody></table></th></tr></tbody></table></td></tr></tbody></table></center></td></tr></table></body></html> ",
        //Data: "<html><body><h1>Hello  "+argument.username+"</h1><p style='color:red'>Please click on confirmation link: </p> <p><a href='http://app.uzyth.com/#/confirmation/"+argument.activation_code+"'>Confirm your mail</a></p></body></html>"
      },
      Text: {
        Charset: "UTF-8",
        Data: "Hello Charith Sample description time 1517831318946"
      }
    },
    Subject: {
      Charset: "UTF-8",
      Data: argument.subject,//"Registration Confirmation Mail"
    }
  },
  Source: "info@uzyth.com"
};

const sendEmail = ses.sendEmail(params).promise();

sendEmail
  .then(data => {
    console.log("email submitted to SES", data);
  })
  .catch(error => {
    console.log(error);
});
}
module.exports = {
    mail:mail
}
