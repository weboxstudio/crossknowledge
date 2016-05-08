### FB messanger bots
##### A short overview
![Alt text](https://i.imgur.com/NpsH8R3.gif "Bots")


The Messenger Platform created by Facebook provides us with tools to create a bot to engage in conversation with people. 
Give us also new **entry points** to enable people to start a conversation.



### Entry Points

Entry Points are ways in which people can enter into a conversation with our bot through Messenger.

* Send-to-Messenger Plugin
* Message-Us Plugin
* Other Entry Points



### Send-to-Messenger Plugin 1/2

The "Send to Messenger" plugin is a web plugin that works on desktop and mobile web. We can place it on our website at points of entry for Messenger. When a person opts into communication with our bot through this plugin, we refer to it as "authentication." When the user is authenticated, we will send a backend callback so the person will not be taken out of our experience.



### Send-to-Messenger Plugin 2/2

If the person successfully completes the flow, an **authentication event** is sent to our webhook. We must have subscribed to the **messaging_optins** field when we setup our webhook.



### Message-Us Plugin

The "Message Us" plugin can be used to immediately start a conversation and send the person to Messenger. On the desktop web, the user is sent to messenger.com and on mobile they are sent to the Messenger native app.
We will not receive any events just from the conversation being opened. The first event we would receive is when the person sends a message.



### Other Entry Points

People can enter into a conversation through other ways:

If our app is Public, we can be discovered through Search in Messenger
We can create a shortlink with the format https://m.me/< PAGE_USERNAME >

See more about Entry points: https://goo.gl/HtW2Hm



To start integration, we need the following:

* **Facebook App**: The Facebook App contains the settings. This is where we will setup our webhook, retrieve our page access token and submit our app for approval.


* **Facebook Page**: A Facebook Page will be used as the identity of our bot. When people chat with our bot, they will see the Page name and the Page profile pic.


* **Webhook URL**: FB use secure callbacks in order to send us messaging events. These will be sent to our webhook.


Webhook example, we're specifically listening for a callback when a message is sent to a Page:
``` javascript
app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
    }
  }
  res.sendStatus(200);
});
```


When we setup our webhook, there are 4 relevant fields for this integration. All fields are optional so we select the fields most relevant for our experience. Each field maps to a callback:


1. **messaging_optins**: Subscribes to authentication callbacks via the Send-to-Messenger Plugin
2. **messages**: Subscribes to message-received callbacks
3. **message_deliveries**: Subscribes to message-delivered callbacks
4. **messaging_postbacks**: Subscribes to postback callbacks


See more on Webhook reference: https://goo.gl/gEc9zv


All callbacks for the Messenger Platform have a common structure.
``` javascript
{
  "object":"page",
  "entry":[
    {
      "id":PAGE_ID,
      "time":123456789,
      "messaging":[
        {
          "sender":{
            "id":USER_ID
          },
          "recipient":{
            "id":PAGE_ID
          },
          
          ...
        }
      ]
    }
  ]
}
```


* **objectValue**: will be 'page'

* **entryArray**: containing event data
 
* **entry.idPage**: ID of page
 
* **entry.time**: Time of update
 
* **messagingObject**: containing data related to messaging
 
* **messaging.sender.id**: PSID of the user
 
* **messaging.recipient.id**: PAGE ID


## Note 1
Field entry is an array and may contain multiple objects. Also, the messaging array may contain multiple objects. We have to iterate over entry and messaging to process all events. Each messaging object contains a sender and recipient. The object will also contain a data depending on the type of callback.


## Note 2
All user ids returned in callbacks are page-scoped ids. This means that the ids are unique for a given page


**Message-Received Callback**
``` javascript
{
  "object":"page",
  "entry":[
    {
      "id":PAGE_ID,
      "time":1457764198246,
      "messaging":[
        {
          "sender":{
            "id":USER_ID
          },
          "recipient":{
            "id":PAGE_ID
          },
          "timestamp":1457764197627,
          "message":{
            "mid":"mid.1457764197618:41d102a3e1ae206a38",
            "seq":73,
            "text":"hello, world!"
          }
        }
      ]
    }
  ]
}
```


We need to modify our webhook to echo messages back. Below is a function that will send back a text message...
``` javascript
var token = "<page_access_token>";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}
```


...with whatever is sended to the page.
``` javascript
sendTextMessage(sender, "Text received, echo: "+ text.substring(0, 200));
```


See more about technical implementation: https://goo.gl/6E3lCu

See also Send API Reference: https://goo.gl/f1FOfv



Thank you all!