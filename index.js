const express = require('express');
const path = require('path');
const twitter = require('twitter');
const PORT = process.env.PORT || 5000

const client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });

  //direct_messages/events/list
  client.get('direct_messages/show', {id: "16519133-914786466190020608"}, function(error, tweets, response) {
    if(error) {console.log("error:\n");console.log(Object.values(error))};
    //console.log("Tweets\n"+tweets);  // The favorites. 
    console.log("Response raw\n");  // Raw response object. 
    re = JSON.stringify(response);  // Raw response object. 
  });