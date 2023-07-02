var db = require('../../config/database');
var dbFunc = require('../../config/db-function');
var request = require('request');
const uuid = require('uuidv4').default;
const Shopify = require('shopify-api-node');


var productModel = {
   createProduct:createProduct,
   saveShopifyProduct:saveShopifyProduct,
   getMyProduct:getMyProduct,
   getCategory:getCategory,
   createCategory:createCategory,
   updateCategory:updateCategory,
   createSubcategory:createSubcategory,
   updateSubcategory:updateSubcategory,
   addShippingAddress:addShippingAddress,
   updateCategoryStatus:updateCategoryStatus,
   updateSubcategoryStatus:updateSubcategoryStatus,
   searchProduct:searchProduct,
   deleteProduct:deleteProduct,
   updateProduct:updateProduct,
   getProductDetail:getProductDetail,
   saveOrder:saveOrder,
   getAddress:getAddress,
   saveOrderPayment:saveOrderPayment,
   getMyOrder:getMyOrder,
   getMyOrderDetail:getMyOrderDetail,
   // transactionStatus:transactionStatus,
   editShippingAddress:editShippingAddress,
   delShippingAddress:delShippingAddress,
   shippingFee:shippingFee,
   getShippingFee:getShippingFee,
   validateDiscountCode:validateDiscountCode,
   getMarchantOrder:getMarchantOrder,
   carbonClickPayment:carbonClickPayment,
   getMyStoreProduct:getMyStoreProduct
}


function carbonClickPayment(argument) {
	return new Promise((resolve,reject) => {
		// "carbon_api" : "https://api.qual.carbon.click:443/purchases/v1/", //(this URL is used for purchase amount and refund)
		// "API_CLIENT_ID" : "3q5nsnoi02b0351ffc8akvqdso",
		// "API_USER" : "fori",
		// "API_PASSWORD" : "NLG44rzx5Ve9e+bAptdbi5ei52Uu8lFaRpSvi7768To=",
		// "MERCHANT_CODE" : "SHO_US_FORI_MARKETPLACE"
		// API_CLIENT_ID : 3q5nsnoi02b0351ffc8akvqdso
		// ● API_USER : demo-user
		// ● API_PASSWORD : HQAkPNui7LUTXPyKlWNXpz596pAvJVJD@ANA-bevmdg-
		// ● API_KEY: 9h0MNbatHpwNCrZhrMgoQj4y98rspsQGuHUvyzedi6cwOHu4yMYygHE5
		// ● MERCHANT_CODE : ACMECO
		console.log('carbonClickPayment------------->');
		var request = require('request');
		var user_id= argument['user_id'];

		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					var email=rows[0].email;
					var options = { method: 'POST',
					url: 'https://cognito-idp.ap-southeast-2.amazonaws.com/',
					headers: 
					{ 
					 'cache-control': 'no-cache',
					 'content-type': 'application/x-amz-json-1.1',
					 'x-amz-target': 'AWSCognitoIdentityProviderService.InitiateAuth' 
					},
					body: '{\r\n    "AuthFlow":"USER_PASSWORD_AUTH",\r\n    "ClientId":"3q5nsnoi02b0351ffc8akvqdso",\r\n    "AuthParameters":{\r\n        "USERNAME":"demo-user",\r\n        "PASSWORD":"HQAkPNui7LUTXPyKlWNXpz596pAvJVJD@ANA-bevmdg-"\r\n    }\r\n}\r\n' };

					request(options, function (error, response, body) {
					  if (error) throw new Error(error);
			  			/*{
						    "AuthenticationResult": {
						        "AccessToken": "eyJraWQiOiJ4NlhGe",
						        "ExpiresIn": 3600,
						        "IdToken":"eyJraWQiOiJ0M3BxMUl4SzlSSm0xd2hpaFJRQm",
						        "RefreshToken": "Q.svt4SR2n3wCtR5s2MP1Y0A",
						        "TokenType": "Bearer"
						    },
						    "ChallengeParameters": {}
						}*/
						
						body=JSON.parse(body);
						console.log(body);
						var accessToken=body.AuthenticationResult.AccessToken;//"";//{"AuthenticationResult":{"AccessToken" body.AuthenticationResult.AccessToken;
						if (accessToken) {

							console.log(accessToken);
							var options = {
								uri: 'https://api.qual.carbon.click:443/purchases/v1/amount',
								method: 'POST',
								headers: {
								  	'Content-Type':'application/json',
								  	'x-api-key':'9h0MNbatHpwNCrZhrMgoQj4y98rspsQGuHUvyzedi6cwOHu4yMYygHE5',
									'Authorization':'Bearer '+accessToken
								},
								json: 
								{
									"paymentReference":argument.order_id,
									"paymentProvider": "FORI",
									"merchantCode": "ACMECO",
									"payment": {
									"currency": "USD",
									"value": parseFloat(argument.amount)
									},
									"emailAddress": email,
									"billingCountry": "US"
									}
							};

							request(options, function (error, response, body) {
							  //if (!error && response.statusCode == 200) {
							  	console.log('carbonClickPayment----erorr-?',error)
							    console.log('carbonClickPayment----respose-?',response)
							    console.log('carbonClickPayment-----?',body) // Print the shortened url.
							   // body=JSON.parse(body);
							    var donationArr={}
				                if (body.purchaseId) {
					                donationArr['user_id'] =	argument.user_id;
					                donationArr['order_id'] =	argument.order_id;
					                donationArr['amount'] =	argument.amount;
					                donationArr['orderReference']=body.orderReference
					                donationArr['purchaseId']=body.purchaseId
				                

			                	db.query("INSERT INTO `ll_order_donation` set ?", [donationArr],(error,rows,fields)=>{
							        if(!!error) {
							            dbFunc.connectionRelease;
							            console.log('createDonationTransaction',error);
							            reject ({"success":false,"message":error.code});
							        }
							         var donationID= rows.insertId;

							        resolve({"success":true,"message":"success",body:{'donation_id':donationID}});
							    });

							    
							}else{
								if (body.errors) {
									reject({"success":false,"message":body.errors.message});

								}
							
							}
							});
						}else{
							reject({"success":false,"message":"Server error"});

						}

					});
				}else{
					reject({"success":false,"message":"Invalid user_id"});

				}
			}
		})
	});	
}
function validateDiscountCode(argument) {
	console.log("validateDiscountCode argument",argument);
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];
		db.query("SELECT ll_shopify_auth.* FROM ll_shopify_auth,ll_product_broadcasting WHERE ll_product_broadcasting.user_id=ll_shopify_auth.user_id and ll_product_broadcasting.channel_id=?",[user_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length<=0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Shopify detail not verified"});
            } else {
				const shopify = new Shopify({
				  shopName: rows[0]['store_name'],
				  accessToken: rows[0]['private_key'].trim()
				});
				const query = `
			
					    {
  codeDiscountNodeByCode(code: "`+argument['coupon_code']+`") {
    id
    codeDiscount {
      __typename
       ... on DiscountCodeBxgy  {
                        createdAt 
                        endsAt
                        startsAt 
                        status 
                        summary 
                        title 
                        usageLimit
                        usesPerOrderLimit
                         customerBuys {
          items {
            __typename
            ... on DiscountProducts {
              productVariants(first: 10) {
                edges {
                  node {
                    id
                  }
                }
              }
              products(first: 10) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
            ... on DiscountCollections {
              collections(first: 10) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
            ... on AllDiscountItems {
              allItems
            }
          }
          value {
            __typename
            ... on DiscountQuantity {
              quantity
            }
            ... on DiscountPurchaseAmount {
              amount
            }
          }
        }
               customerGets {
          items {
            __typename
            ... on DiscountProducts {
              productVariants(first: 10) {
                edges {
                  node {
                    id
                  }
                }
              }
              products(first: 10) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
            ... on DiscountCollections {
              collections(first: 10) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
            ... on AllDiscountItems {
              allItems
            }
          }
          value {
            __typename
            ... on DiscountOnQuantity {
              effect {
                ... on DiscountPercentage {
                  percentage
                }
              }
              quantity {
                quantity
              }
            }
            ... on DiscountPercentage {
              percentage
            }
          }
        }
                
                  
                
              
                        codes (first:100) {
            edges {
              node {
                code
              }
            }
          }
                    }
                    ... on DiscountCodeFreeShipping {
          title
          status
          codes (first:10) {
            edges {
              node {
                code
              }
            }
          }
        }
      ... on DiscountCodeBasic {
title
summary
usageLimit
status
startsAt
endsAt
codeCount
asyncUsageCount
appliesOncePerCustomer
minimumRequirement
customerGets {
items {
__typename
... on DiscountProducts {
productVariants(first: 10) {
edges {
node {
id
}
}
}
products(first: 10) {
edges {
node {
id
}
}
}
}
... on DiscountCollections {
collections(first: 10) {
edges {
node {
id
}
}
}
}
... on AllDiscountItems {
allItems
}
}
value {
            __typename
            ... on DiscountOnQuantity {
              effect {
                ... on DiscountPercentage {
                  percentage
                }
              }
              quantity {
                quantity
              }
            }
            ... on DiscountAmount {
              amount {
                amount
                currencyCode
              }
            }
            ... on DiscountPercentage {
              percentage
            }
            

          } 


}


minimumRequirement {
__typename
}
codes (first:10) {
edges {
node {
code
}
}
}

}
    }

            
  }
}`;
				console.log('query',query)
				shopify
				  .graphql(query)
				  .then((codeDiscountNodeByCode) =>{ 
				  	//$result['body']['container']['data']['products']['edges']
				  	console.log('codeDiscountNodeByCode',codeDiscountNodeByCode)
				  	if (codeDiscountNodeByCode.codeDiscountNodeByCode) {
				  		resolve({"success":true,"message":"Coupon code verified",'body':codeDiscountNodeByCode.codeDiscountNodeByCode})

				  	} else {
				  		resolve({"success":false,"message":"Invalid Coupon code",'body':codeDiscountNodeByCode.codeDiscountNodeByCode})

				  	}
				  })
				  .catch((err) =>{ 
				  	console.log("err---------",err)
				  	reject({"success":false,"message":"Error:Your daily limit exceeds, the single query max cost limit (1000)"});
				  });
			} 
		});
	});		
}
function searchProduct(argument) {
	console.log("argument",argument);
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];
		var store_id= argument['store_id'];

		db.query("SELECT * FROM ll_shopify_auth WHERE channel_id=? and user_id=?",[store_id,user_id], (error, rows, fields) => {
            if (error) {
                dbFunc.connectionRelease;
                reject(error);
            } else if(rows.length<=0) {
                dbFunc.connectionRelease;
                reject({"success":false,"message":"Shopify detail not verified"});
            } else {
            	//console.log("https://"+rows[0]['public_key']+":"+rows[0]['private_key']+"@"+rows[0]['store_name']+".myshopify.com/admin/api/2020-04/products.json?name="+argument['searchqry']);
			 	/*
			 	const shopify = new Shopify({
				  shopName: rows[0]['store_name'],
				  apiKey: rows[0]['public_key'],
				  password: rows[0]['private_key']
				});
				shopify.product.list(
					{ query:"title:*"+argument['searchqry']+"*", first:50 }
					)
				  .then((product) => console.log('product',product))
				  .catch((err) => console.error(err));
				  */
				const shopify = new Shopify({
				  shopName: rows[0]['store_name'],
				  accessToken: rows[0]['private_key'].trim()
				});
				//console.log('shopify',shopify)
				/*const query = `{
				  products(query:"title:*`+argument['searchqry']+`*",first: 50) {
				    edges {
				      node {
				        id
				        title
				        description
				        productType
				        images(first: 10) {
					        edges {
					          	node {
						          	id
					        		originalSrc
				        		}
				        	}
				        }
				        variants(first: 10) {
					        edges {
					          node {
					            title
					          }
					        }
					    }
								
				      }
				    }
				  }
				}`;*/
				const query = `{
				  products(query:"title:*`+argument['searchqry']+`*",first: 50) {
				    edges {
			          node {
			            id
			            createdAt
			            updatedAt
			            title
			            handle
			            descriptionHtml
			            productType
			            options {
			              name
			              position
			              values
			            }
			            priceRange {
			              minVariantPrice {
			                amount
			                currencyCode
			              }
			              maxVariantPrice {
			                amount
			                currencyCode
			              }
						  
			            }
						images (first:5){
							edges {
								node {
									id
									originalSrc
								}
							}
						}
						variants(first:5){
							edges {
								node {
									id
									title
									availableForSale
									inventoryQuantity
									price
									sku
									weight
									weightUnit

								}
							}
						}
				      }
				    }
				  }
				}`;
													/*image{
										originalSrc
									}*/
				console.log('query',query)
				shopify
				  .graphql(query)
				  .then((products) =>{ 
				  	//$result['body']['container']['data']['products']['edges']
				  	//console.log('products',products['products']['edges'])
				  	resolve({"success":true,"message":"Product search successfully",'body':products['products']['edges']})
				  })
				  .catch((err) =>{ 
				  	console.log("err---------",err)
				  	reject({"success":false,"message":"Error:Your daily limit exceeds, the single query max cost limit (1000)"});
				  });

			 	/*request("https://"+rows[0]['public_key']+":"+rows[0]['private_key']+"@"+rows[0]['store_name']+".myshopify.com/admin/api/2020-04/products.json?name="+argument['searchqry'], function (error, response, body) {
		            body=JSON.parse(body);
		            //console.log('body',body);
		            if (body.errors) {
		                reject({"success":false,"message":body.errors});

		            } else {
		               resolve({"success":true,"message":"Product search successfully",'body':body});

		            }
		      	})*/
			} 
		});
	});		
}
function saveShopifyProduct(argument) {
	console.log("argument",argument);
	const dataArr =  argument;


	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];
		var store_id= argument['store_id'];

		
		db.query("SELECT * FROM ll_shopify_auth WHERE ll_shopify_auth.channel_id=? and ll_shopify_auth.user_id =? ",[store_id,user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					const shopify = new Shopify({
					  shopName: rows[0]['store_name'],
					  accessToken: rows[0]['private_key']
					});
					
					/*const query = `products(first: 100) {
   					nodes(ids: [`+argument['details'].toString()+`])
					      id
					      title
						  description
						   options {
					      id
					      name
					      position
					      values
					    }
					    }
					  }
					 [gid://shopify/Product/6203242315943,gid://shopify/Product/6203241037991])
					}`;*/
					/*const query =  `nodes(ids: ["gid://shopify/Product/6203242315943", "gid://shopify/Product/6203241037991"]) {
					    ... on Product {
					      id
					      variants(first: 100) {
					        edges {
					          node {
					            title
					          }
					        }
					      }
					    }
					  }`;
				console.log('query',query)
				shopify
				  	.graphql(query)
				  	.then((products) =>{ 
				  		//$result['body']['container']['data']['products']['edges']
				  		console.log('products',products['container']['data'])
				  		resolve({"success":true,"message":"Product search successfully",'body':products['container']['data']});
				  	})
				  	.catch((err) =>{ 
				  		reject({"success":false,"message":"Error:Your daily limit exceeds, the single query max cost limit (1000)"});

				  	});*/
				  	var h=0;
				  	var j=0;
					for (var i =0; i<argument['details'].length; i++) {
						//console.log(argument['details'][i]);
						var id=argument['details'][i]['node'].id;
						var product_title=argument['details'][i]['node'].title;
						console.log('id',id,'product_title',product_title)
		                var t=0;
		                console.log("SELECT user_id, is_delete,channel_id FROM ll_products WHERE product_id="+id+" and channel_id="+store_id+" ")

		                db.query("SELECT user_id, is_delete,channel_id FROM ll_products WHERE product_id=? and channel_id=? ",[id,store_id],(error,rows,fields)=>{
					        if(!!error) {
					            dbFunc.connectionRelease;
					            console.log('error',error);
					            reject({"success":false,"message":error.code});
					        } else {
					        	var id=argument['details'][t]['node'].id;
					        	console.log('id',id,'rows.length=',rows.length,'rows',rows)
								if (rows.length>0) {
									
									var title=argument['details'][t]['node'].title;
									console.log('h',h,'t',t,'product_id',argument['details'][t]['node'].id,rows[0].is_delete);

									if (user_id==rows[0].user_id && store_id==rows[0].channel_id && '1'==rows[0].is_delete) {
										var productid=argument['details'][t]['node'].id;
										var title=argument['details'][t]['node'].title;
										console.log('productid-----',productid,'h',h,'t',t);

										db.query("UPDATE `ll_products` set is_delete='0' where product_id=?", [productid],(error,rows,fields)=>{
									        if(!!error) {
									            dbFunc.connectionRelease;
									            console.log('createTransaction',error);
									            reject ({"success":false,"message":error.code});
									        }
									        
								    	});
								    	console.log('details',argument['details'].length-1,'h',h,'t',t);
								         if (argument['details'].length-1==t) {
								        	resolve({"success":true,"message":"Product saved successfully",body:rows});
								        }
									        
									}else{
										console.log('details reject',argument['details'].length-1,'h',h,'t',t);
										reject ({"success":false,"message":"Product ("+title+")  already exist in records."});
									}
									h++;
								}else{
									var id=argument['details'][t]['node'].id;
									var product_title=argument['details'][t]['node'].title;
									var description= argument['details'][t]['node'].descriptionHtml
									var stock= argument['details'][t]['node'].publicationCount
									var variant= argument['details'][t]['node'].variants['edges'].length;//argument['details'][i].variant
									var category=  argument['details'][t]['node'].productType;
									var max_price=  argument['details'][t]['node'].priceRange.maxVariantPrice.amount;
									var min_price=  argument['details'][t]['node'].priceRange.minVariantPrice.amount;
									var currencyCode=  argument['details'][t]['node'].priceRange.minVariantPrice.currencyCode;
							    	
									var tbdata= {}
							    	tbdata['product_id'] =id
					                tbdata['user_id'] =user_id;
					                tbdata['product_title'] =product_title;
					                tbdata['product_description'] =description;
					                tbdata['product_category'] =category;
					                tbdata['product_type']='shopify';
					                tbdata['variant']=variant;
					                tbdata['max_price']=max_price/100;
					                tbdata['min_price']=min_price/100;
					    
					                tbdata['product_retail_price']=max_price/100;
					                tbdata['product_price']=max_price/100;
					                tbdata['currencyCode']=currencyCode;
					                tbdata['product_stock']=stock;
					                tbdata['store_id']=store_id;
					                tbdata['channel_id']=store_id;
					                
					                console.log('j--------->',argument['details'].length,j,'t',t);
								                //rows[h]['subcat']=catrows;
							    	db.query("INSERT INTO `ll_products` set ?", [tbdata],(error,rows,fields)=>{
								        if(!!error) {
								            dbFunc.connectionRelease;
								            console.log('createTransaction',error);
								            if (error.code=='ER_DUP_ENTRY') {

								            	reject ({"success":false,"message":"Product already exist in records."});
								            } else {
								            	reject ({"success":false,"message":error.code});
								            }
								            
								        }
								         console.log('j---------2',argument['details'].length,j,'t',t);
								        if (argument['details'].length-1==j) {
								        	resolve({"success":true,"message":"Product saved successfully",body:rows});
								        }
								        
							    	});
							    	j++;
				    	}
				    }
				    t++;
				})



				    	saveProductImg(argument['details'][i]['node'].images['edges'],id,product_title)
				    	saveProductVariants(argument['details'][i]['node'].variants['edges'],id,product_title)
			    	}
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); 
		
	});
}
function saveProductVariants(variants,product_id) {
	//console.log("variants",variants);
	const dataArr =  variants;
	 
	for (var i = variants.length - 1; i >= 0; i--) {
		var arg=variants[i]['node'];
		var images="";
		if (arg.image && arg.image['edges'].length>0) {
		 	images=arg.image['edges'][0]['node'].originalSrc;
		}
		var tbdata= {}
		tbdata['product_id'] =product_id
		tbdata['product_variant_id']=arg.id
	    tbdata['title'] =arg.title;
	    tbdata['availableForSale'] =arg.availableForSale;
	   // tbdata['inventoryItem'] =arg.inventoryItem;
	    tbdata['inventoryQuantity'] =arg.inventoryQuantity;
	    tbdata['price'] =arg.price;
	    tbdata['sku'] =arg.sku;
	    tbdata['weight'] =arg.weight;
	    tbdata['weightUnit'] =arg.weightUnit;
	    tbdata['image'] =images;
		db.query("INSERT INTO `ll_products_variants` set ?", [tbdata],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('createTransaction',error);
	        }

		});
	}	
		
			
		
}
function saveProductImg(images,product_id,product_title) {
	//console.log("images",images);
	const dataArr =  images;
	for (var i = images.length - 1; i >= 0; i--) {
		var originalSrc=images[i]['node'].originalSrc;
		var tbdata= {}
		tbdata['product_id'] =product_id
		tbdata['image_alt']=product_title
	    tbdata['image_url'] =originalSrc;
		db.query("INSERT INTO `ll_products_images` set ?", [tbdata],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('createTransaction',error);
	        }

		});
	}	
		
			
		
}

function updateProduct(argument) {
	console.log("updateProduct argument",argument);
	return new Promise((resolve,reject) => {

		db.query("SELECT * FROM ll_products WHERE SUBSTRING_INDEX(product_id,'/',-1) =? ",[argument.product_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					
					var tbdata= {}
					 tbdata['channelTag'] ="";
	                tbdata['product_title'] =	argument.product_title;
	                tbdata['product_description'] =	argument.product_description;
	                //tbdata['max_price'] =	argument.max_price;
	                tbdata['on_air_price'] =	argument.on_air_price;
	                tbdata['off_air_price'] =	argument.off_air_price;
	                tbdata['product_retail_price'] =	argument.product_retail_price;
	                //tbdata['discount_peroffair'] =	argument.discount_peroffair;
	                //tbdata['discount_peronair'] =	argument.discount_peronair;
	                tbdata['product_stock'] =	argument.product_stock;
	                if(argument.channelTag){
                        tbdata['channelTag'] =	argument.channelTag;
                    }
	              
			    	db.query("UPDATE `ll_products` set ? where SUBSTRING_INDEX(product_id,'/',-1)=?", [tbdata,argument.product_id],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
				        resolve({"success":true,"message":"Product details updated successfully",body:rows});

			    	});
						    			
						   
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid product ID"});
				}
			}
		}); 
		
	});
}

function createProduct(argument) {
	console.log("argument",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];

		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {

					var id=uuid();
					var product_title=argument.product_title;
					var amount= argument.product_price
					var sku= argument.sku
					var retail_price= argument.retail_price
					//var category= argument.category
					var description= argument.description
					var stock= argument.stock
					var limit_per_order= argument.limit_per_order
					var variant= argument.variant
					var shippingday= argument.shippingday
					var shipping_type= argument.shipping_type
					var shipping_country= argument.shipping_country
					//var product_sub_category= argument.product_sub_category

			    	var tbdata= {}
			    	tbdata['product_id'] =id
	                tbdata['user_id'] =user_id;
	                tbdata['product_title'] =product_title;
	                tbdata['product_description'] =description;
	                tbdata['product_sku'] =sku;
	                tbdata['product_price'] =parseFloat(amount);
	                tbdata['product_retail_price'] =parseFloat(retail_price);
	                //tbdata['product_category'] =parseInt(category);
	                tbdata['product_stock'] =parseInt(stock);
	                //tbdata['product_sub_category'] =parseInt(product_sub_category);
	                tbdata['limit_per_order'] =parseInt(limit_per_order);
			    	db.query("INSERT INTO `ll_products` set ?", [tbdata],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
				        resolve({"success":true,"message":"Product created successfully",body:rows});

			    	});
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); 
		
	});
}

function getProductDetail(argument) {
	console.log("getProductDetail",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];
		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					//`category_title`, `category_name`, `category_image`,
					db.query("SELECT prod.*,SUBSTRING_INDEX(prod.product_id,'/',-1) as product_id_int, (SELECT ll_products_images.image_url FROM ll_products_images WHERE ll_products_images.product_id=prod.product_id limit 1) as image_url FROM `ll_products` prod where  prod.is_delete='0' and (prod.product_id=? or SUBSTRING_INDEX(prod.product_id,'/',-1)=?) order by id desc",[argument.product_id,argument.product_id],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            reject ({"success":false,"message":error.code});
				        }
				        if (rows.length>0) {
							resolve({"success":true,"message":'done','body':rows[0]});
				        }else{
				        	dbFunc.connectionRelease;
							reject ({"success":false,"message":"No record found"});
				        }
				    	
			    	});
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); 
	
	});
}
function getMyStoreProduct(argument) {
	console.log("getMyStoreProduct",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {

		var LimitNum = 8
        var startNum = 0;
        if(argument.start == '' || argument.start == undefined || argument.limit == '' || argument.limit == undefined){
              startNum = 0;
              LimitNum = 8;
        }else{
             //parse int Convert String to number 
              startNum = parseInt(argument.start);
              LimitNum = parseInt(argument.limit); 
        }
        console.log('getMyStoreProduct---->',startNum,LimitNum)
		/*var user_id= argument['user_id'];
		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {*/
					//`category_title`, `category_name`, `category_image`,
					db.query("SELECT prod.*,SUBSTRING_INDEX(prod.product_id,'/',-1) as product_id_int, (SELECT ll_products_images.image_url FROM ll_products_images WHERE ll_products_images.product_id=prod.product_id limit 1) as image_url FROM `ll_products` prod where prod.user_id=? and prod.store_id=? and prod.is_delete='0' order by prod.id desc limit ? offset ?",[argument.user_id,argument.store_id,LimitNum,startNum],(error,rows,fields)=>{
				        //console.log('getMyProduct--->',rows)
				        if(!!error) {
				            dbFunc.connectionRelease;
				            reject ({"success":false,"message":error.code,'sql':error});
				        }
				        if (rows) {
				        	//console.log('getMyProduct',rows)
							resolve({"success":true,"message":'success','body':rows});
				        }else{
				        	dbFunc.connectionRelease;
							reject ({"success":false,"message":"No record found"});
				        }
				    	
			    	});
				/*}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); */
	
	});
}
function getMyProduct(argument) {
	console.log("getMyProduct",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {

		var LimitNum = 8
        var startNum = 0;
        if(argument.start == '' || argument.start == undefined || argument.limit == '' || argument.limit == undefined){
              startNum = 0;
              LimitNum = 8;
        }else{
             //parse int Convert String to number 
              startNum = parseInt(argument.start);
              LimitNum = parseInt(argument.limit); 
        }
        console.log('getMyProduct---->',startNum,LimitNum)
		/*var user_id= argument['user_id'];
		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {*/
					//`category_title`, `category_name`, `category_image`,
					db.query("SELECT prod.*,SUBSTRING_INDEX(prod.product_id,'/',-1) as product_id_int, (SELECT ll_products_images.image_url FROM ll_products_images WHERE ll_products_images.product_id=prod.product_id limit 1) as image_url FROM `ll_products` prod where prod.user_id=? and prod.is_delete='0' order by id desc limit ? offset ?",[argument.user_id,LimitNum,startNum],(error,rows,fields)=>{
				        //console.log('getMyProduct--->',rows)
				        if(!!error) {
				            dbFunc.connectionRelease;
				            reject ({"success":false,"message":error.code,'sql':error});
				        }
				        if (rows) {
				        	//console.log('getMyProduct',rows)
							resolve({"success":true,"message":'success','body':rows});
				        }else{
				        	dbFunc.connectionRelease;
							reject ({"success":false,"message":"No record found"});
				        }
				    	
			    	});
				/*}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); */
	
	});
}

function createCategory(argument) {
	console.log("argument",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];

		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					var category_title=argument.category_title;
					var category_name =category_title.replace(/ /gi, "-");
					db.query("SELECT * FROM ll_products_category WHERE category_name =? ",[category_name],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('error',error);
				            reject ({"success":false,"message":error.code});
				        } else {
							if (rows.length<=0) {
						    	var tbdata= {}
				                tbdata['category_title'] =	category_title;
				                tbdata['category_name'] =	category_name;
				              
						    	db.query("INSERT INTO `ll_products_category` set ?", [tbdata],(error,rows,fields)=>{
							        if(!!error) {
							            dbFunc.connectionRelease;
							            console.log('createTransaction',error);
							            reject ({"success":false,"message":error.code});
							        }
							        resolve({"success":true,"message":"Category created successfully",body:rows});

						    	});
						    }else{
								dbFunc.connectionRelease;
								reject ({"success":false,"message":"Category name already exist"});
							}
						}
					}); 
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); 
		
	});
}
function updateCategory(argument) {
	console.log("argument",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];

		db.query("SELECT * FROM ll_products_category WHERE id =? ",[argument.category_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('error',error);
				            reject ({"success":false,"message":error.code});
				        } else {
							if (rows.length>0) {
								var category_title=argument.category_title;
								var category_name =category_title.replace(/ /gi, "-");
								db.query("SELECT * FROM ll_products_category WHERE category_name =? and id!=?",[category_name,argument.category_id],(error,rows,fields)=>{
							        if(!!error) {
							            dbFunc.connectionRelease;
							            console.log('error',error);
							            reject ({"success":false,"message":error.code});
							        } else {
										if (rows.length<=0) {
									    	var tbdata= {}
							                tbdata['category_title'] =	category_title;
							                tbdata['category_name'] =	category_name;
							              
									    	db.query("UPDATE `ll_products_category` set ? where id=?", [tbdata,argument.category_id],(error,rows,fields)=>{
										        if(!!error) {
										            dbFunc.connectionRelease;
										            console.log('createTransaction',error);
										            reject ({"success":false,"message":error.code});
										        }
										        resolve({"success":true,"message":"Category updated successfully",body:rows});

									    	});
						    			}else{
											dbFunc.connectionRelease;
											reject ({"success":false,"message":"Category name already exist"});
										}
									}
								}); 
						    }else{
								dbFunc.connectionRelease;
								reject ({"success":false,"message":"Invalid category ID"});
							}
						}
					}); 
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); 
		
	});
}

function updateCategoryStatus(argument) {
	console.log("argument",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];

		db.query("SELECT category_status FROM ll_products_category WHERE id =? ",[argument.category_id],(error,catrows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (catrows.length>0) {
					var category_status= catrows[0]['category_status'];
					if (category_status=='1') {
						category_status='2';
					}else{
						category_status='1';
					}
					db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('error',error);
				            reject ({"success":false,"message":error.code});
				        } else {
							if (rows.length>0) {
								
							    	var tbdata= {}
					                tbdata['category_status'] =	category_status;
					              
							    	db.query("UPDATE `ll_products_category` set ? where id=?", [tbdata,argument.category_id],(error,rows,fields)=>{
								        if(!!error) {
								            dbFunc.connectionRelease;
								            console.log('updateCategoryStatus',error);
								            reject ({"success":false,"message":error.code});
								        }
								        resolve({"success":true,"message":"Category status updated successfully",body:rows});

							    	});
						    			
						    }else{
								dbFunc.connectionRelease;
								reject ({"success":false,"message":"Invalid user ID"});
							}
						}
					}); 
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid Category ID"});
				}
			}
		}); 
		
	});
}

function getCategory(argument) {
	console.log("argument",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		/*var user_id= argument['user_id'];
		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {*/                    
					//`category_title`, `category_name`, `category_image`,
					db.query("SELECT id,category_title,category_name,category_image FROM ll_products_category where category_status='1'",(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
				        if (rows.length>0) {
				        	for (var i = 0; i < rows.length; i++) {
				        		var h=0;
				        	 	var cat_id=rows[i].id;
				        	 	//console.log('rows',rows);
					        	db.query("SELECT id,category_id,subcategory_title,subcategory_name,subcategory_image FROM ll_products_sub_category where subcategory_status='1' and category_id=?",[cat_id],(error,catrows,fields)=>{
							        if(!!error) {
							            dbFunc.connectionRelease;
							            console.log('createTransaction',error);
							            reject ({"success":false,"message":error.code});
							        }
							        //console.log('catrows',catrows);
							        if (catrows.length>0) {
							        	for (var j = 0; j < catrows.length; j++) {
							        		rows[h]['subcat']=catrows;
							        	}
							        }
							        if (h==rows.length-1) {
							        	//rows[h]['subcat']=catrows[j];
							        	resolve({"success":true,"message":'done','body':rows});
							        }
							        h++;
							    }); 
						    }   
				        }
				    	
			    	});
				/*}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); */
	
	});
}


function createSubcategory(argument) {
	console.log("argument",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var category_id= argument['category_id'];

	db.query("SELECT id FROM ll_products_category WHERE ll_products_category.id =?",[category_id],(error,rows,fields)=>{
        if(!!error) {
            dbFunc.connectionRelease;
            console.log('error',error);
            reject ({"success":false,"message":error.code});
        } else {
			if (rows.length>0) {
				var category_id=argument.category_id;
				var subcategory_title= argument.subcategory_title
				var subcategory_name =subcategory_title.replace(/ /gi, "-");
				db.query("SELECT * FROM ll_products_sub_category WHERE subcategory_name =? ",[subcategory_name],(error,rows,fields)=>{
			        if(!!error) {
			            dbFunc.connectionRelease;
			            console.log('error',error);
			            reject ({"success":false,"message":error.code});
			        } else {
						if (rows.length<=0) {
					    	var tbdata= {}
			                tbdata['category_id'] =category_id;
			                tbdata['subcategory_title'] =subcategory_title;
			                tbdata['subcategory_name'] =subcategory_name;
					    	db.query("INSERT INTO `ll_products_sub_category` set ?", [tbdata],(error,rows,fields)=>{
						        if(!!error) {
						            dbFunc.connectionRelease;
						            console.log('createTransaction',error);
						            reject ({"success":false,"message":error.code});
						        }
						    	resolve({"success":true,"message":"Subcategory created successfully",body:rows});

					    	});
					    }else{
							dbFunc.connectionRelease;
							reject ({"success":false,"message":"Sub-category name already exist"});
						}
					}
				}); 
			}else{
				dbFunc.connectionRelease;
				reject ({"success":false,"message":"Invalid category ID"});
			}
		}
	}); 
	
	});
}

function updateSubcategory(argument) {
	console.log("argument",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var category_id= argument['category_id'];
		var subcategory_id= argument['subcategory_id'];

	db.query("SELECT id FROM ll_products_category WHERE ll_products_category.id =?",[category_id],(error,rows,fields)=>{
        if(!!error) {
            dbFunc.connectionRelease;
            console.log('error',error);
            reject ({"success":false,"message":error.code});
        } else {
			if (rows.length>0) {
				db.query("SELECT id FROM ll_products_sub_category WHERE ll_products_sub_category.id =?",[subcategory_id],(error,rows,fields)=>{
			        if(!!error) {
			            dbFunc.connectionRelease;
			            console.log('error',error);
			            reject ({"success":false,"message":error.code});
			        } else {
						if (rows.length>0) {
							var category_id=argument.category_id;
							var subcategory_title= argument.subcategory_title
							var subcategory_name =subcategory_title.replace(/ /gi, "-");
							db.query("SELECT * FROM ll_products_sub_category WHERE subcategory_name =? and id!=?",[subcategory_name,argument.subcategory_id],(error,rows,fields)=>{
						        if(!!error) {
						            dbFunc.connectionRelease;
						            console.log('error',error);
						            reject ({"success":false,"message":error.code});
						        } else {
									if (rows.length<=0) {
								    	var tbdata= {}
						                tbdata['category_id'] =category_id;
						                tbdata['subcategory_title'] =subcategory_title;
						                tbdata['subcategory_name'] =subcategory_name;
								    	db.query("update `ll_products_sub_category` set ? where id=?", [tbdata,subcategory_id],(error,rows,fields)=>{
									        if(!!error) {
									            dbFunc.connectionRelease;
									            console.log('createTransaction',error);
									            reject ({"success":false,"message":error.code});
									        }
									    	resolve({"success":true,"message":"Subcategory updated successfully",body:rows});

								    	});
					    	 		}else{
										dbFunc.connectionRelease;
										reject ({"success":false,"message":"Sub-category name already exist"});
									}
								}
							});
					    }else{
							dbFunc.connectionRelease;
							reject ({"success":false,"message":"Invalid sub category ID"});
						}
					}
				});
			}else{
				dbFunc.connectionRelease;
				reject ({"success":false,"message":"Invalid category ID"});
			}
		}
	}); 
	
	});
}

function updateSubcategoryStatus(argument) {
	console.log("argument",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var subcategory_id= argument['subcategory_id'];
		db.query("SELECT subcategory_status FROM ll_products_sub_category WHERE ll_products_sub_category.id =?",[subcategory_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					var category_id=argument.category_id;
					var subcategory_status=rows[0]['subcategory_status'];
					if (subcategory_status=='1') {
						subcategory_status='2';
					}else{
						subcategory_status='1';
					}
			    	var tbdata= {}
			    	tbdata['subcategory_status']=subcategory_status;
			    	db.query("update `ll_products_sub_category` set ? where id=?", [tbdata,subcategory_id],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            reject ({"success":false,"message":error.code});
				        }
				    	resolve({"success":true,"message":"Subcategory status updated successfully",body:rows});

			    	});
			    	 		
			    }else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid sub category ID"});
				}
			}
		});
			
	
	});
}

function deleteProduct(argument) {
	console.log("deleteProduct",argument);
	return new Promise((resolve,reject) => {
		var id= argument['product_id'];
		db.query("SELECT id FROM ll_products WHERE ll_products.product_id =? and ll_products.user_id=?",[id,argument['user_id']],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
			
			    	var tbdata= {}
			    	tbdata['is_delete']='1';
			    	db.query("UPDATE `ll_products` set ? where product_id=?", [tbdata,id],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log(error);
				            reject ({"success":false,"message":error.code});
				        }
				    	resolve({"success":true,"message":"Product deleted successfully",body:rows});

			    	});
			    	 		
			    }else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid product_id ID"});
				}
			}
		});
			
	
	});
}

function addShippingAddress(argument) {
	console.log("addShippingAddress",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];

		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					var contact_no=null;
					var address_1=null;
					
					if (argument.address_1) {
						address_1=argument.address_1
					}
					if (argument.contact_no) {
						contact_no=argument.contact_no
					}
			    	var tbdata= {}
	                tbdata['user_id'] =	argument.user_id;
	                tbdata['fullname'] =	argument.fullname;
	                tbdata['address'] =	argument.address;
	                tbdata['address_1'] =	address_1;
	                tbdata['contact_no'] =	contact_no;
	                tbdata['address_type'] = argument.address_type;
	                tbdata['city'] =	argument.city;
	                tbdata['state'] =	argument.state;
	                tbdata['country'] =	argument.country;
	                tbdata['pin_code'] =	argument.pin_code;
			    	db.query("INSERT INTO `ll_users_address` set ?", [tbdata],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
				        resolve({"success":true,"message":"Billing/Shipping  address added successfully",body:rows});

			    	});
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); 
		
	});
}


function editShippingAddress(argument) {
	console.log("editShippingAddress",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];

		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					var contact_no=null;
					var address_1=null;
					
					if (argument.address_1) {
						address_1=argument.address_1
					}
					if (argument.contact_no) {
						contact_no=argument.contact_no
					}
			    	var tbdata= {}
	                tbdata['user_id'] =	argument.user_id;
	                tbdata['fullname'] =	argument.fullname;
	                tbdata['address'] =	argument.address;
	                tbdata['address_1'] =	address_1;
	                tbdata['contact_no'] =	contact_no;
	                tbdata['address_type'] = argument.address_type;
	                tbdata['city'] =	argument.city;
	                tbdata['state'] =	argument.state;
	                tbdata['country'] =	argument.country;
	                tbdata['pin_code'] =	argument.pin_code;
			    	db.query("Update `ll_users_address` set ? where id=?", [tbdata,argument.id],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
				        resolve({"success":true,"message":"Billing/Shipping  address updated successfully",body:tbdata});

			    	});
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); 
		
	});
}

function shippingFee(argument) {
	console.log("addShippingAddress",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];
		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {

					db.query("DELETE FROM `ll_shipping_fee` WHERE `user_id`=?", [argument.user_id],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
			    	});
			    	if (argument.shipping_fee.length>0) {
					var shipping_fee =	argument.shipping_fee;
					var tbdata= {}
	                tbdata['user_id'] =	argument.user_id;
	                tbdata['shipping_fee'] =	"log";
	                //0: {minValue: 1881, maxValue: 8022, floor: 0, ceil: 10000, shipping: "10"}
	               	let values = [];
	                for (var i = 0; i < shipping_fee.length; i++) {
	                	var fieldvalue=[]
	                	fieldvalue.push(shipping_fee[i].maxValue)
	                	fieldvalue.push(shipping_fee[i].minValue)
	                	fieldvalue.push(shipping_fee[i].shipping)

	                	
	                	fieldvalue.push(argument.user_id)
	                	fieldvalue.push(JSON.stringify(shipping_fee))
	                	values.push(fieldvalue)
	                }
					db.query("INSERT INTO `ll_shipping_fee` (max_price, mini_price,shipping_fee,user_id,arrayData) VALUES ?", [values],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
				        db.query("INSERT INTO `ll_shipping_fee_log` set ?", [tbdata],(error,rows,fields)=>{
				        
			    		});
				        resolve({"success":true,"message":"Shipping fee saved successfully",body:rows});

			    	});
				}else{
					resolve({"success":true,"message":"Shipping fee removed successfully",body:rows});

				}

					/*db.query("SELECT id FROM ll_shipping_fee WHERE user_id =?",[user_id],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('error',error);
				            reject ({"success":false,"message":error.code});
				        } else {
							if (rows.length>0) {
								var id= rows[0].id;
						    	var tbdata= {}
				                tbdata['user_id'] =	argument.user_id;
				                tbdata['shipping_fee'] =	argument.shipping_fee;

						    	db.query("update `ll_shipping_fee` set ? where id=?", [tbdata,id],(error,rows,fields)=>{
							        if(!!error) {
							            dbFunc.connectionRelease;
							            console.log('createTransaction',error);
							            reject ({"success":false,"message":error.code});
							        }
							        db.query("INSERT INTO `ll_shipping_fee_log` set ?", [tbdata],(error,rows,fields)=>{

						    		});
							        resolve({"success":true,"message":"Shipping fee updated successfully",body:rows});

						    	});
						    }else{
						    	var tbdata= {}
				                tbdata['user_id'] =	argument.user_id;
				                tbdata['shipping_fee'] =	argument.shipping_fee;
						    	db.query("INSERT INTO `ll_shipping_fee` set ?", [tbdata],(error,rows,fields)=>{
							        if(!!error) {
							            dbFunc.connectionRelease;
							            console.log('createTransaction',error);
							            reject ({"success":false,"message":error.code});
							        }
							        db.query("INSERT INTO `ll_shipping_fee_log` set ?", [tbdata],(error,rows,fields)=>{
							        
						    		});
							        resolve({"success":true,"message":"Shipping fee added successfully",body:rows});

						    	});
						    }
						}
					});	*/   	
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); 
		
	});
}

function getShippingFee(argument) {
	console.log("getShippingFee",argument);
	return new Promise((resolve,reject) => {
		
		db.query("SELECT user_id FROM ll_product_broadcasting WHERE channel_id =? or user_id=?",[argument.user_id,argument.user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					db.query("SELECT * FROM ll_shipping_fee where user_id=?",[rows[0].user_id],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
				        if (rows.length>0) {
							resolve({"success":true,"message":'success','body':rows[0]});
				        }else{
				        	reject ({"success":false,"message":"Please add Shipping Fee"})
				        }
				    	
			    	});
			    }else{
			    	reject ({"success":false,"message":"Please add Shipping Fee"})

			    }
			}
		});	    

	
	
	});
}


function addStreamingContent(argument) {
	console.log("addStreamingContent",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];

		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					var category_title=argument.category_title;
			    	var tbdata= {}
	                //tbdata['product_id'] =	argument.product_id;
	                tbdata['user_id'] =	argument.user_id;
	                tbdata['title'] =	argument.title;
	                tbdata['description'] =	argument.description;
	                
			    	db.query("INSERT INTO `ll_products_streaming_content` set ?", [tbdata],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
				        console.log(rows.insertId);
				        resolve({"success":true,"message":"Streaming content added successfully",body:rows});

			    	});
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); 
		
	});
}


function saveOrder(argument) {
	console.log("saveOrder",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];

		db.query("SELECT ll_users.email,ll_users.username FROM ll_users WHERE ll_users.user_id =? and ll_users.active='1'",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
					var product_id=null;
					var address_1=null;
					var coupon_discount=0;
					if (argument.address_1) {
						address_1=argument.address_1
					}
					if (argument.coupon_discount) {
						coupon_discount=argument.coupon_discount;
					}
			    	var tbdata= {}
					// `order_id`, `user_id`, `broadcast_id`, `total_items`, `sub_total_amount`,
					// `total_amount`,`currency`, `status`, `payment_type`, `payment_txn`, 
					//`billing_address`,`shipping_address`, `coupon_code`, `note` FROM `ll_orders`

	                var order_id=uuid();
	                tbdata['user_id'] =	argument.user_id;
	                tbdata['order_id'] =order_id; 
	                tbdata['broadcast_id'] =	argument.broadcast_id;
	                tbdata['total_items'] =	argument.total_items;
	                tbdata['sub_total_amount'] =	argument.sub_total_amount;
	                tbdata['total_amount'] =	argument.total_amount;//.total_amount;
	                tbdata['currency'] =	argument.currency;
	                tbdata['billing_address'] =	argument.shipping_address;
	                tbdata['shipping_address'] =	argument.shipping_address;
	                tbdata['coupon_code'] =	argument.coupon_code;
	                tbdata['store_pickup'] =	argument.pickupStore;
	                tbdata['pickup_address'] =	argument.store_address;
	                tbdata['note'] =	argument.note;
	                tbdata['shipping_fee']=argument.shipping_fee;
	                tbdata['coupon_discount']=coupon_discount;
			    	db.query("INSERT INTO `ll_orders` set ?", [tbdata],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
				        if (argument.products.length>0) {
				        	db.query("SELECT *,(SELECT store_id FROM `ll_product_broadcasting` WHERE channel_id=?) as store_id, (SELECT ll_users.email FROM ll_products,ll_users WHERE SUBSTRING_INDEX(ll_products.product_id,'/',-1) =? and ll_products.user_id=ll_users.user_id) as sellerMail FROM ll_users_address WHERE ll_users_address.id=? order by id desc",[argument.broadcast_id,argument.products[0].product,argument.shipping_address],(error,shippingAddress,fields)=>{
						        if(!!error) {
						            dbFunc.connectionRelease;
						            console.log('error',error);
						            //reject ({"success":false,"message":error.code});
						        } else {
				        			saveOrderItema(argument.shipping_fee,argument.pickupStore,argument.products,order_id,argument.total_amount,argument.sub_total_amount,shippingAddress[0],argument.currency,argument.note);
				        		}
				        	})
				        	resolve({"success":true,"message":"Order take placed successfully",body:tbdata});

				        } else {
				        	 reject ({"success":false,"message":"Please select the product"});
				        }
				        
			    	});
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid user ID"});
				}
			}
		}); 
		
	});
}

function saveOrderItema(shipping_fee,pickupStore,products,order_id,total_amount,sub_total_amount,shipping_address,currency,note) {
		db.query("SELECT ll_orders.order_id,ll_users.username,ll_users.email,ll_users.user_id FROM ll_orders,ll_users WHERE ll_users.user_id=ll_orders.user_id and ll_orders.order_id =? ",[order_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	        } else {
				if (rows.length>0) {
					console.log('order products',products,'shipping_address',shipping_address);
					var username= rows[0].username;
					var email=rows[0].email;
					var user_id=rows[0].user_id;
					var sellerMail="";
					var store_id=shipping_address.store_id;
					if (shipping_address.sellerMail) {
						sellerMail=shipping_address.sellerMail;

					}
					var items=[];
					//var table = '<table><thead><tr><th>Product</th><th>QTY</th><th>Price</th></tr></thead><tbody>';
					var table='<table class="es-content" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td class="esd-stripe" align="center"><table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"><tbody><tr><td class="esd-structure es-p20t es-p35r es-p35l" align="left"><table cellspacing="0" cellpadding="6" border="1" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; width: 100%;"><thead><tr>';
					table+='<th scope="col" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;">Product</th>';
					table+='<th scope="col" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;">Quantity</th>';
					table+='<th scope="col" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;">Price</th></tr></thead><tbody>';
			    	for (var i =0;i<products.length; i++) {					    	
				    	var tbdata= {}
						// `order_id`, `product_id`, `product_quantity`, `product_price`, `sku`,``

						tbdata['order_id'] =order_id;
		                tbdata['product_id'] =products[i].product;
		                tbdata['product_quantity'] =	products[i].quantity;
		                tbdata['on_air_price'] =	products[i].on_air_price;
		                tbdata['off_air_price'] =	products[i].off_air_price;
		                tbdata['variant_id'] =	products[i].variant_id;//products[i].sku;
		                //table += '<tr><td><img src="'+products[i].image_url+'" height="100" width="100"><br>'+products[i].product_title+'</td><td>'+products[i].quantity+'</td><td>'+products[i].on_air_price+' '+products[i].currencyCode+'</td></tr>';
				    	
				    	items.push({grams:0,originalUnitPrice:"0",quantity:products[i].quantity, requiresShipping:false, sku:"", taxable:false,variantId:products[i].variant_id});
				    	table+='<tr><td style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle; word-wrap: break-word;">'+products[i].product_title+'</td><td style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle;">'+products[i].quantity+'</td><td style="color: #636363; border: 1px solid #e5e5e5; padding: 12px; text-align: left; vertical-align: middle;"><span><span>'+products[i].currencyCode+'</span> '+products[i].on_air_price+'</span></td></tr>';

				    	db.query("INSERT INTO `ll_order_items` set ?", [tbdata],(error,rows,fields)=>{
					        if(!!error) {
					            dbFunc.connectionRelease;
					            console.log('createTransaction',error);
					        }

				    	});
				    	                  
			    	}
			    	//table += '</tbody></table>';
			    	table+='</tbody><tfoot><tr>';
					table+='<th scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left; border-top-width: 4px;">Subtotal:</th>';
					table+='<td style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left; border-top-width: 4px;">';
					table+='<span><span>'+currency+'</span> '+sub_total_amount+'</span></td></tr><tr><th scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;">Shipping:</th>';
					table+='<td style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;"><span><span>'+currency+'</span> 15.00</span>&nbsp;<small>via Shipping</small></td></tr><tr>';
					table+='<th scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;">Total:</th><td style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;">';
					table+='<span><span>'+currency+'</span> '+total_amount+'</span><small>(includes <span><span>'+currency+'</span> 3.21</span> GST)</small></td></tr><tr>';
					table+='<th scope="row" colspan="2" style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;">Payment method:</th><td style="color: #636363; border: 1px solid #e5e5e5; vertical-align: middle; padding: 12px; text-align: left;">Credit Card (Stripe)</td></tr></tfoot></table></td></tr><tr><td class="esd-structure es-p40t es-p40b es-p35r es-p35l" esd-custom-block-id="7796" align="left">';
					table+='<table class="es-left" cellspacing="0" cellpadding="0" align="left"><tbody><tr><td class="esd-container-frame es-m-p20b" width="255" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr>';
					table+='<td class="esd-block-text es-p15b" align="left"><h4>Delivery Address</h4></td></tr><tr><td class="esd-block-text es-p10b" align="left">';
					if (pickupStore==false || pickupStore==0) {
						table+='<p>'+shipping_address.fullname+'</p>';
						table+='<p>'+shipping_address.address+' '+shipping_address.address_1+'</p>';
						table+='<p>'+shipping_address.city+', '+shipping_address.state+' '+shipping_address.country+'- '+shipping_address.pin_code+'</p>';
						table+='<p>Contact No.: '+shipping_address.contact_no+'</p>';
					}else{
						table+='<p>Store Pickup</p>';
					}
					
					table+='</td></tr></tbody></table></td></tr></tbody></table><table class="es-right" cellspacing="0" cellpadding="0" align="right"><tbody><tr><td class="esd-container-frame" width="255" align="left"><table width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td class="esd-block-text es-p15b" align="left"><h4>Estimated Delivery Date<br></h4></td></tr><tr><td class="esd-block-text" align="left"><p>Feb 15, 2021</p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>';
					//console.log('table',table);
			    	var k=0
					db.query("SELECT * FROM `ll_mail_template` WHERE id=6 order by id asc ", function (err, tempres) {
					    if(tempres.length>0) {
					    	var channelrows={}
					        channelrows.message=tempres[0].template_body;
					        channelrows.subject=tempres[0].template_subject;
					        channelrows.username=username;
					        channelrows.email=email;
					        channelrows.order_id=order_id;
					        channelrows.products=table;
					        channelrows.shipping_fee=shipping_fee;
					       // channelrows.image_url=products[k].image_url
					        console.log('k',k);
					        console.log(channelrows);
					        sentMail(channelrows, function(callbackres){
					            console.log(callbackres);
					        });
					        if (sellerMail) {
						        channelrows.email=sellerMail;
						        sentMail(channelrows, function(callbackres){
						            console.log(callbackres);
						        });
					    	}
					        

					    }
					    orderSyncShopify(store_id,user_id,items,order_id,total_amount,sub_total_amount,shipping_address,email,note)
					    k++;
					});
			    	
				}else{
					dbFunc.connectionRelease;
					console.log('Invalid order_id');
				}
			}
		}); 
		
}


function getAddress(argument) {
	console.log("argument",argument);
	return new Promise((resolve,reject) => {
		
		db.query("SELECT * FROM ll_users_address where user_id=?",[argument.user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('createTransaction',error);
	            reject ({"success":false,"message":error.code});
	        }
	        if (rows.length>0) {
	        	
	        	rows[0]['status']=true;
				resolve({"success":true,"message":'success','body':rows});
	        }else{
	        	reject ({"success":false,"message":"Please add Shipping/Billing address"})
	        }
	    	
    	});
	
	
	});
}

function delShippingAddress(argument) {
	console.log("delShippingAddress argument",argument);
	return new Promise((resolve,reject) => {
		
		db.query("SELECT * FROM ll_users_address where user_id=? and id=? ",[argument.user_id,argument.id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('createTransaction',error);
	            reject ({"success":false,"message":error.code});
	        }
	        if (rows.length>0) {
	        	db.query("DELETE FROM `ll_users_address` WHERE `id`=?", [argument.id],(error,rowsorder,fields)=>{
			        if(!!error) {
			            dbFunc.connectionRelease;
			            console.log(error);
			            reject ({"success":false,"message":error.code});
			        }
		       		resolve({"success":true,"message":"Adress deleted successfully",body:""});				        

	    		});
				//resolve({"success":true,"message":'success','body':rows});
	        }else{
	        	reject ({"success":false,"message":"Invalid Shipping/Billing request data"})
	        }
	    	
    	});
	
	
	});
}

function saveOrderPayment(argument) {
	console.log("saveOrderPayment",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var order_id= argument['order_id'];
 	//`order_id`, `user_id`, `payment_gateway`, `payment_type`, `txn`, `eamil`,
  	//`card_type`, `country`, `mode`,`ll_payment_details` 
		db.query("SELECT order_id FROM ll_orders WHERE ll_orders.order_id =? and ll_orders.status!='paid'",[order_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
				if (rows.length>0) {
			    	var tbdata= {}
					// `order_id`, `user_id`, `broadcast_id`, `total_items`, `sub_total_amount`,
					// `total_amount`,`currency`, `status`, `payment_type`, `payment_txn`, 
					//`billing_address`,`shipping_address`, `coupon_code`, `note` FROM `ll_orders`
					var donation_id=0;
	                tbdata['user_id'] =	argument.user_id;
	                tbdata['order_id'] =order_id; 
	                tbdata['payment_gateway'] =	argument.payment_gateway;
	                tbdata['payment_type'] =	argument.payment_type;
	                tbdata['txn'] =	argument.txn;
	                tbdata['card_type'] =	argument.card_type;
	                tbdata['amount_received'] =	argument.amount_received;
	                tbdata['email'] =	argument.email;
	                tbdata['country'] =	argument.country;
	                tbdata['mode'] =	argument.mode;
	                tbdata['client_secret']=argument.client_secret

	                if (argument.donation_id) {
	                	donation_id=argument.donation_id
	                }

	                //INSERT INTO `ll_order_donation`( `user_id`, `order_id`, `amount`, `orderReference`, `purchaseId`
			    	db.query("INSERT INTO `ll_payment_details` set ?", [tbdata],(error,rows,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('createTransaction',error);
				            reject ({"success":false,"message":error.code});
				        }
				        
				        db.query("UPDATE `ll_orders` set status=?,donation_id=? where order_id=?", ['paid',donation_id,order_id],(error,rowsorder,fields)=>{
					        if(!!error) {
					            dbFunc.connectionRelease;
					            console.log(error);
					            reject ({"success":false,"message":error.code});
					        }
				       		resolve({"success":true,"message":"Order payment received successfully",body:rows});				        

			    		});
			    	});
				}else{
					dbFunc.connectionRelease;
					reject ({"success":false,"message":"Invalid order ID"});
				}
			}
		}); 
		
	});
}


function getMyOrder(argument) {
	console.log("getMyOrder",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];
		db.query("SELECT * FROM ll_orders WHERE ll_orders.user_id =? order by id desc",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
			       	resolve({"success":true,"message":"success",body:rows});				        
			}
		}); 
		
	});
}
function getMyOrderDetail(argument) {
	console.log("getMyOrderDetail",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var order_id= argument['order_id'];
		var user_id= argument['user_id'];
		db.query("SELECT ll_orders.* FROM ll_orders WHERE  order_id=? order by id desc",[argument.order_id],(error,orderList,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
	        	if (orderList.length>0) {
	        		var shipping_address= orderList[0].shipping_address;
	        		var billing_address= orderList[0].billing_address;

	        		db.query("SELECT *  FROM ll_users_address WHERE ll_users_address.id=? order by id desc",[shipping_address],(error,shippingAddress,fields)=>{
				        if(!!error) {
				            dbFunc.connectionRelease;
				            console.log('error',error);
				            reject ({"success":false,"message":error.code});
				        } else {
				        	db.query("SELECT * FROM ll_users_address WHERE ll_users_address.id=? order by id desc",[billing_address],(error,billingAddress,fields)=>{
						        if(!!error) {
						            dbFunc.connectionRelease;
						            console.log('error',error);
						            reject ({"success":false,"message":error.code});
						        } else {
						        	if (shippingAddress.length<=0) {
						        		orderList[0]['shippingAddress']=""
						        	} else {
						        		orderList[0]['shippingAddress']=shippingAddress[0]
						        	}
						        	if (billingAddress.length<=0) {
						        		orderList[0]['shippingAddress']=""
						        	} else {
						        		orderList[0]['shippingAddress']=billingAddress[0]
						        	}

				        		db.query("SELECT ll_order_items.*,(SELECT product_title FROM `ll_products` where (product_id=ll_order_items.product_id or SUBSTRING_INDEX(product_id,'/',-1)=ll_order_items.product_id )) as product_title,(SELECT image_url FROM `ll_products_images` where (product_id=ll_order_items.product_id  or SUBSTRING_INDEX(product_id,'/',-1)=ll_order_items.product_id) limit 1) as product_images  FROM ll_order_items WHERE ll_order_items.order_id=? order by id desc",[argument.order_id],(error,orderItems,fields)=>{
							        if(!!error) {
							            dbFunc.connectionRelease;
							            console.log('error',error);
							            reject ({"success":false,"message":error.code});
							        } else {
							        	orderList[0]['orderItems']=orderItems
							        	db.query("SELECT ll_payment_details.* FROM ll_payment_details WHERE ll_payment_details.order_id=? order by id desc limit 1",[argument.order_id],(error,orderPayment,fields)=>{
									        if(!!error) {
									            dbFunc.connectionRelease;
									            console.log('error',error);
									            reject ({"success":false,"message":error.code});
									        } else {
									        	if (orderPayment.length>0) {
									        		orderList[0]['orderPaymentInfo']=orderPayment[0];
									        	}else{
									        		orderList[0]['orderPaymentInfo']=orderPayment
									        	}
									        	resolve({"success":true,"message":"success",body:orderList[0]});
									        }
									    }) 
									}      
							    }); 
							}      
							}); 
							    
						}      
					}); 	           	


	        	} else {
	        		reject ({"success":false,"message":"No record found"});
	        	}
			       					        
			}
		}); 
		
	});
}

//
function getMarchantOrder(argument) {
	console.log("getMyOrder",argument);
	const dataArr =  argument;
	return new Promise((resolve,reject) => {
		var user_id= argument['user_id'];
		db.query("SELECT ll_orders.*,ll_product_broadcasting.channel_name, (SELECT ll_users.email FROM ll_users WHERE ll_users.user_id=ll_orders.user_id) as email FROM `ll_product_broadcasting`,ll_orders WHERE ll_orders.broadcast_id=ll_product_broadcasting.channel_id and ll_product_broadcasting.user_id=? ORDER BY ll_orders.create_date desc",[user_id],(error,rows,fields)=>{
	        if(!!error) {
	            dbFunc.connectionRelease;
	            console.log('error',error);
	            reject ({"success":false,"message":error.code});
	        } else {
			       	resolve({"success":true,"message":"success",body:rows});				        
			}
		}); 
		
	});
}

function orderSyncShopify(store_id,user_id,products,order_id,total_amount,sub_total_amount,shipping_address,email,note) {
	console.log("orderSyncShopify ",products,shipping_address);
	db.query("SELECT *,(SELECT UCASE(code) FROM `ll_country` WHERE name=?) as  countryCode FROM ll_shopify_auth WHERE user_id=? and channel_id=?",[shipping_address.country,user_id,store_id], (error, rows, fields) => {
        if (error) {
            dbFunc.connectionRelease;
            console.log(error);
        } else if(rows.length<=0) {
            dbFunc.connectionRelease;
            console.log({"success":false,"message":"Shopify detail not verified"});
        } else {
        	
			const shopify = new Shopify({
			  shopName: rows[0]['store_name'],
			  accessToken: rows[0]['private_key'].trim()
			});
			var countryCode=rows[0].countryCode;
			const query = `mutation {
				  draftOrderCreate(input: {
				    appliedDiscount:{
				      amount:`+total_amount+`,
				      description:"",
				      title:"New order From Fori",
				      value:0,
				      valueType:FIXED_AMOUNT
				    },billingAddress:{
				      address1:"`+shipping_address.address+`",
				      address2:"`+shipping_address.address_1+`",
				      city:"`+shipping_address.city+`",
				      company:"",
				      country:"United States",,
				      countryCode:US,
				      firstName:"`+shipping_address.fullname+`",
				      lastName:"",
				      phone:"`+shipping_address.contact_no+`",
				      province:"",
				      provinceCode:"",
				      zip:"`+shipping_address.pin_code+`"
				    },
				    customAttributes:[{
				      key:"",
				      value:""
				    }],
				    email:"`+email+`",
				    lineItems:[{grams:0,originalUnitPrice:"0",quantity:1,requiresShipping:false,sku:"",taxable:false,variantId:"gid://shopify/ProductVariant/37408471416984"},{grams:0,originalUnitPrice:"0",quantity:1,requiresShipping:false,sku:"",taxable:false,variantId:"gid://shopify/ProductVariant/36054455713944"}],
				    note:"test note `+note+`",
				    shippingAddress:{
				      address1:"`+shipping_address.address+`",
				      address2:"`+shipping_address.address_1+`",
				      city:"`+shipping_address.city+`",
				      company:"",
				      country:"United States",
				      countryCode:US,
				      firstName:"`+shipping_address.fullname+`",
				      lastName:"",
				      phone:"`+shipping_address.contact_no+`",
				      province:"",
				      provinceCode:"",
				      zip:"`+shipping_address.pin_code+`"
				    },
				    shippingLine:{
				      price:"0",
				      shippingRateHandle:"",
				      title:"Flat Rate"
				    },
				    tags:"Test Tag",
				    taxExempt:true,
				    useCustomerDefaultAddress:true
				  }){
				    draftOrder {
				      id
				    }
				    userErrors {
				      field
				      message
				    }
				  }
				}
			`;
			console.log('query',query)
			shopify
			  .graphql(query)
			  .then((products) =>{ 
			  	/*
			  	
orderSyncShopify {
  draftOrderCreate: {
    draftOrder: { id: 'gid://shopify/DraftOrder/696770298008' },
    userErrors: []
  }
}
*/
			  	//result['body']['container']['data']['products']['edges']
			  	console.log('orderSyncShopify',products)
			  	//resolve({"success":true,"message":"Product search successfully",'body':products['products']['edges']})
			  })
			  .catch((err) =>{ 
			  	console.log("err---------",err)
			  	//reject({"success":false,"message":"Error:Your daily limit exceeds, the single query max cost limit (1000)"});
			});
		} 
	});
}

function sentMail(argument) {
     const nodemailer = require("nodemailer");

    var username = argument.username;///dog/gi;timeLeft
    var message = argument.message;
    var subject = argument.subject;
    console.log('sentMail followers',argument.email);
    message =message.replace('[username]',argument.username );
    //message =message.replace('[channel_name]',argument.title );
    message =message.replace( '[subject]',"New Order: "+argument.order_id);
    message =message.replace( '[products]',argument.products);
    subject =subject.replace( '[order_id]',argument.order_id);


    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
     user: 'forikbs@gmail.com',
      pass: 'kindle@123#',
    },
  });

  // send mail with defined transport object 
  let info = transporter.sendMail({
    from: '"FORI"<forikbs@gmail.com>', // sender address
    to: argument.email, // list of receivers
    subject:subject, // Subject line
   // text: '', // plain text body
    html: message, // html body
  });

  console.log("Message sent: %s", info.messageId);

}

module.exports = productModel;
