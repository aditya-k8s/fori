var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
var request = require('request');
const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');


const Stripe = require('stripe');
const stripe = Stripe('sk_test_51I9yuoGm48tZv82d5L6W949YLR30p1bsnUx8PanHnsucg77aIl0oZ7WNiUvnyY3BuUaGnzfnefZMkLYSgM679w8M00czAS7Lvl');
	 

var stripeModel = {
   createSubscription:createSubscription,
   createCustomer:createCustomer,
   attendeeMetting:attendeeMetting,
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

async function refund(argument) {
    try{
    	const refund =  await stripe.refunds.create({
          amount: argument.amount,
          payment_intent: argument.payment_intent,//'pi_1IXmZRGm48tZv82dGCBhgHfg',
    	});
    	//await stripe.paymentIntents.cancel(argument.payment_intent);
    	if (argument.order_id) {
    		console.log('Status update ...',argument.order_id);
	    	db.query("UPDATE `ll_orders` set status=? where order_id=?", ['canceled',argument.order_id],(error,rowsorder,fields)=>{
		        if(!!error) {
		            dbFunc.connectionRelease;
		            console.log(error);
		            return ({"success":false,"message":error.code});
		        }
	       		//resolve({"success":true,"message":"Order payment received successfully",body:rows});				        

			});
    	}
    	return ({"success":true,"message":"Order payment refund successfully",body:refund});

	} catch (error) {
	    return ({"success":false,"message":error.message});
	}

}
async function paymentIntentsCvv(argument) {
	
	// body...
	// const token = await stripe.tokens.create({
	// 	  cvc_update: 123,
	// 	});
	// console.log('token..........',token)
	intent = await stripe.paymentIntents.create({
	  payment_method: argument.payment_method,//'pm_1IWIk7Gm48tZv82dZzKGVrPN',
	  customer: argument.customer,//'cus_J8Ztxm0DKx9xm0',
	  amount: argument.amount, //1099,
	  currency: argument.currency,// 'usd',
	  confirmation_method: 'manual',
	  confirm: true,
	  // payment_method_options: {
	  //   card: {
	  //     cvc: token.id,
	  //   },
	  // },
	})
	console.log(intent)
    return ({"success":true,"message":"success",body:intent});

}

async function paymentIntentData(argument) {
	// body...
	const paymentIntent = await stripe.paymentIntents.create({
            amount: argument.amount,
            currency: argument.currency,
            payment_method: argument.payment_method,
            //confirmation_method: "manual",
            customer: argument.customer,
            confirm: true,
  			setup_future_usage: 'on_session',
    });
    return ({"success":true,"message":"success",body:paymentIntent});

}

async function paymentTransfer(argument) {

	 const transfer = await stripe.transfers.create({
	  amount: argument.amount*100,
	  currency: "usd",
	  transfer_group: argument.user_id,
	  destination: argument.stripeAccount,
	});
    console.log('paymentTransfer>>>>>>>>>>>>>>>>>>>>>>>>>',transfer);

  	return ({"success":true,"message":"success",body:transfer});

}

async function createPaymentIntent(argument) {

  
    console.log('createCustomer>>>>>>>>>>>>>>>>>>>>>>>>>',paymentIntent);
     try {
	    const paymentIntent = await stripe.paymentIntents.create({
	      payment_method_types: ['card'],
	      amount: argument.amount*100,
	      currency: 'usd',
	      //application_fee_amount: 123,
	      // transfer_data: {
	      //   destination: '{{CONNECTED_STRIPE_ACCOUNT_ID}}',
	      // },
	       transfer_group: argument.user_id

	    });
	    return ({"success":true,"message":"success",body:paymentIntent});

	  } catch (error) {
	    return ({"success":false,"message":error.message});
	  }


}



 async function createCustomerCheckout(argument) {

  // Create a new customer object
  	const customer = await stripe.customers.create({
	 // source:argument.cardToken,// 'tok_mastercard',
	  name: argument.name,
	});
  // Save the customer.id in your database alongside your user.
  // We're simulating authentication with a cookie.
  //res.cookie('customer', customer.id, { maxAge: 900000, httpOnly: true });
    console.log('createCustomerCheckout>>>>>>>>>>>>>>>>>>>>>>>>>',customer);

  	return ({"success":true,"message":"success",body:customer});

}

 async function createCustomer(argument) {

  // Create a new customer object
  const customer = await stripe.customers.create({
    email: argument.email,
  });
  // Save the customer.id in your database alongside your user.
  // We're simulating authentication with a cookie.
  //res.cookie('customer', customer.id, { maxAge: 900000, httpOnly: true });
    console.log('createCustomer>>>>>>>>>>>>>>>>>>>>>>>>>',customer);

  	return ({"success":true,"message":"success",body:customer});

}


 async function createSubscription(argument) {
 	console.log('createSubscription>>>>>>>>>>>>>',argument)
	// Set your secret key. Remember to switch to your live secret key in production!
	// See your keys here: https://dashboard.stripe.com/account/apikeys
	  // Attach the payment method to the customer
	  try {
	    await stripe.paymentMethods.attach(argument.paymentMethodId, {
	      customer: argument.customerId,
	    });
	  } catch (error) {
	    return ({"success":false,"message":error.message});
	  }

	  // Change the default invoice settings on the customer to the new payment method
	  await stripe.customers.update(
	    argument.customerId,
	    {
	      invoice_settings: {
	        default_payment_method: argument.paymentMethodId,
	      },
	    }
	  );

	  // Create the subscription
		// const subscription = await stripe.subscriptions.create({
		// 	customer: argument.customerId,
		// 	items: [{ price: 'price_1INyovGm48tZv82d7EGvS4Y1' }],
		// 	expand: ['latest_invoice.payment_intent'],
		// });
	  	//console.log('createSubscription<<<<<<<<<<<<<<<<<<<<',subscription);
		const subscription = await stripe.subscriptionSchedules.create({
			customer: argument.customerId,
			start_date: 'now',
			end_behavior: 'release',
			phases: [
			{
			  items: [{ price: 'price_1INyovGm48tZv82d7EGvS4Y1', quantity: 1 }],
			  iterations: 12,
			},
			],
		});
		console.log('schedule<<<<<<<<<<<<<<<<<<<<',subscription);

	if (subscription) {


		var tbdata= {}
		tbdata['customerID'] =argument.customerId
	    tbdata['user_id'] =argument.user_id;
	    tbdata['subscriptionId'] =subscription.id;
	    tbdata['current_period_end'] =subscription.current_phase.end_date;
	    tbdata['current_period_start'] =subscription.current_phase.start_date;
	    tbdata['planID']=subscription.subscription;
	    tbdata['amount']=0
	    tbdata['plan_interval']=subscription.default_settings.billing_cycle_anchor;
	    tbdata['product']=subscription.subscription;
	    tbdata['livemode']=subscription.livemode;
		db.query("INSERT INTO `ll_subscription` set ?", [tbdata],(error,rows,fields)=>{
	        if(!!error) {
	        	 console.log('INSERT',error);
	            dbFunc.connectionRelease;
	            return ({"success":false,"message":error.code})
	        }
	        db.query("UPDATE `ll_users` set isSubscribed=? where user_id=?", ['1',argument.user_id],(error,rows,fields)=>{
		        if(!!error) {
		            dbFunc.connectionRelease;
		            console.log('createTransaction',error);
		            return ({"success":false,"message":error.code});
		        }

	    	});
	        
		});
	}
	return ({"success":true,"message":"success",body:subscription});


}

function saveCard(argument) {
	return new Promise((resolve,reject) => {

	var tbdata= {}
		tbdata['custom_id'] =argument.custom_id
	    tbdata['user_id'] =argument.user_id;
	    tbdata['payment_menthod_id'] =argument.payment_menthod_id;
	    tbdata['name'] =argument.name;
	    tbdata['card_no'] =argument.card_no;
	    tbdata['exp_month'] =argument.exp_month;
	    tbdata['exp_year'] =argument.exp_year;
	    tbdata['client_secret'] =argument.client_secret;

	   


		db.query("INSERT INTO `ll_user_card` set ?", [tbdata],(error,rows,fields)=>{
	        if(!!error) {
	        	 console.log('INSERT',error);
	            dbFunc.connectionRelease;
	            reject ({"success":false,"message":error.code})
	        }
	        resolve ({"success":true,"message":"success",body:rows});

		});
	})	
}
function getCard(argument) {
	// body...custom_id payment_menthod_id
		return new Promise((resolve,reject) => {

		db.query("SELECT * FROM ll_user_card where user_id=? order by id desc",[argument.user_id],(error,rows,fields)=>{
	        if(!!error) {
	        	 console.log('INSERT',error);
	            dbFunc.connectionRelease;
	            reject ({"success":false,"message":error.code})
	        }
	        resolve ({"success":true,"message":"success",body:rows});

		});
	})	
}
async function cancelSubscription(argument) {
  // Cancel the subscription

  // const deletedSubscription = await stripe.subscriptions.del(
  //   argument.subscriptionId
  // );
  const deletedSubscription = await stripe.subscriptionSchedules.cancel(
  argument.subscriptionId
);
  if (deletedSubscription) {
  		console.log('cancelSubscription>>>>>>>',deletedSubscription);

	  db.query("UPDATE `ll_subscription` set status=? where user_id=?", ['0',argument.user_id],(error,rows,fields)=>{
		    if(!!error) {
		        dbFunc.connectionRelease;
		        console.log('createTransaction',error);
		        return ({"success":false,"message":error.code});
		    }

		});
	   db.query("UPDATE `ll_users` set isSubscribed=? where user_id=?", ['0',argument.user_id],(error,rows,fields)=>{
		    if(!!error) {
		        dbFunc.connectionRelease;
		        console.log('createTransaction',error);
		        return ({"success":false,"message":error.code});
		    }

		});
   	}
	 return ({"success":true,"message":"success",body:deletedSubscription});

}
async function attendeeMetting(argument) {
	console.log("attendeeMetting",argument);
 		const meetingResponse = await chime.createMeeting({
		  ClientRequestToken: uuid(),
		  MediaRegion: 'us-west-2' // Specify the region in which to create the meeting.
		}).promise();
		return attendeeResponse = await chime.createAttendee({
		  MeetingId: argument.MeetingId,//meetingResponse.Meeting.MeetingId,
		  ExternalUserId: uuid() // Link the attendee to an identity managed by your application.
		}).promise();		
				  
		
}


function getSubscription(argument) {
	console.log("getSubscription",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		db.query("SELECT * FROM ll_subscription where user_id=? order by id desc limit 1",[argument.user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            reject ({"success":false,"message":error.code});
	        }
	        if (rows.length>0) {
				resolve({"success":true,"message":'success','body':rows[0]});
	        }else{
	        	dbFunc.connectionRelease;
				reject ({"success":false,"message":"No record found"});
	        }
	    	
    	});
	});
}
module.exports = stripeModel;
