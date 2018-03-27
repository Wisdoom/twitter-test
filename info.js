const oauth = require('oauth.js');

const params = {
    "oauth_consumer_key": oauth_consumer_key,
    "oauth_consumer_secret": oauth_consumer_key,
    "oauth_nonce": nonce,
    "oauth_signature_method": "HMAC-SHA1",
    "oauth_timestamp": timestamp,
    "oauth_token": oauth_token,
    "oauth_version": "1.0",
    "status": twitterStatus,
};
const oauth_consumer_key = "d6T0PcnqxxxxxxxxxxUB7Jok2f";
const consumerSecret = "NFbG1H7CGRxukJTPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxze02qH8";
const oauth_token = "306673734-RQanTkxxxxxxxxxxxxxxxxxxeH4NuqQ8Z";
const tokenSecret = "YnF5vpjclMMVWhuxxxxxxxxxxxxxxxl3xejqAu";
const nonce = oauth.nonce(32);
const ts = `${new Date().getTime()}`

const accessor = {
    "consumerSecret": consumerSecret,
    "tokenSecret": tokenSecret
};
const message = {
    "method": "POST",
    "action": urlLink,
    "parameters": params
};

//lets create signature
oauth.SignatureMethod.sign(message, accessor);
const normPar = oauth.SignatureMethod.normalizeParameters(message.parameters);
const baseString = oauth.SignatureMethod.getBaseString(message);
const sig = oauth.getParameter(message.parameters, "oauth_signature") + "=";
const encodedSig = oauth.percentEncode(sig); //finally you got oauth signature

const urlLink = 'https://api.twitter.com/1.1/statuses/update.json';
const twitterStatus = "Sample tweet";



$.ajax({
    url: urlLink,
    type: 'POST',
    data: {
        "status": twitterStatus
    },
    beforeSend: function(xhr){
        xhr.setRequestHeader("Authorization",'OAuth oauth_consumer_key="'+oauth_consumer_key+'",oauth_signature_method="HMAC-SHA1",oauth_timestamp="' + timestamp + '",oauth_nonce="' + nonce + '",oauth_version="1.0",oauth_token="'+oauth_token+'",oauth_signature="' + encodedSig + '"');  
   },
   success: function(data) { 
        alert("Tweeted!"); 
   },
   error:function(exception){
       alert("Exeption:"+exception);
    }
  });