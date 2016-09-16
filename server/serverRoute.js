import twilio from 'twilio'
var bodyParser = Meteor.npmRequire( 'body-parser');
Picker.middleware( bodyParser.json() );
Picker.middleware( bodyParser.urlencoded( { extended: false } ) );

Picker.route('/voice', function(params, req, res, next) {

    var twiml = new twilio.TwimlResponse();

    if(req.body.To) {
      twiml.dial({ callerId:'+33977556702'}, function() {
        if (/^[\d\+\-\(\) ]+$/.test(req.body.To)) {
          this.number({statusCallbackEvent:['initiated ringing answered completed'],statusCallback:'https://1c064acd.ngrok.io/events',statusCallbackMethod: 'POST'},req.body.To);
        } else {
          this.client({statusCallbackEvent:['initiated ringing answered completed'],statusCallback:'https://1c064acd.ngrok.io/events',statusCallbackMethod: 'POST'},req.body.To);
        }
      });
    } else {
      twiml.say("Thanks for calling!");
    }

    res.setHeader('Content-Type', 'text/xml');
    res.statusCode = 200;
    res.end(twiml.toString());
});
