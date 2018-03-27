require('dotenv').config();
const pjson = require("json-beautify");
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

  const dmList = new Promise((resolve, reject) => {
      client.get('direct_messages/events/list', function(error, tweets, response) {
          if(error) {
              reject(Error(`${error}`));
          };
          resolve(response);
      })
  });

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', function(request, response) { response.send(`HELLO`); })
  .get('/dm-list', function(request, response) {
      dmList
        .then(data => {
            response.send(prepareResponse(data))
        })
        .catch(err => response.send(`Error: \n${err}`));
  })
  .listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`));

function prepareResponse(data){
    
    if(data){
        const events = JSON.parse(data.body).events;
        if(events.length > 0) {
            const retData = events.map(event => {
                let ts = new Date(1970, 0, 1);
                ts.setMilliseconds(event.created_timestamp)
                ts = ts.toISOString();
                const recipient = event.message_create.target.recipient_id === process.env.OWNER_ID ?
                    process.env.OWNER : event.message_create.target.recipient_id;
                const sender = event.message_create.sender_id === process.env.OWNER_ID ?
                    process.env.OWNER : event.message_create.sender_id;
                const text = event.message_create.message_data.text;

                return `
                    Hora: ${ts}<br/>
                    Enviado por: ${sender}<br/>
                    Recibido por: ${recipient}<br/>
                    Texto: ${text}<br/>
                    ___<br/>
                `
            }).join("");
            return retData;
        }
        
        
            // console.log(events[0].created_timestamp);
            // var t = new Date(1970, 0, 1)
            // t.setMilliseconds(events[0].created_timestamp);
            // console.log(t.toISOString())
    }
}
/*
___
Hora: 
Enviado por:
Recibido por:
Texto:
___
*/