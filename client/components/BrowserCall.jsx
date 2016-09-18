import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import twilio from 'twilio';
import { Logcalls } from '../../imports/api/logcalls.js';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';

export default class CallBox extends React.Component {
constructor(props) {
  super(props);
}
componentDidMount() {
  InitiateWebApp();
}

render() {
  return (
       <div> </div>
  );
}
}

function InitiateWebApp()
{

  var identity = randomUsername();
  var capability = new twilio.Capability('ACd2187a8161f59c040a6f170c4eba2549','1e74343e5ba651fce8d3b491d491e981');
  capability.allowClientOutgoing('APda3204a5d48ebba2a199b6c3d85a6e64');
  capability.allowClientIncoming(identity);
  var token = capability.generate();
  document.getElementById('log').style.display = 'block';
  Twilio.Device.setup(token);
  Twilio.Device.ready(function (device) {
    document.getElementById('call-controls').style.display = 'block';
  });

  Twilio.Device.error(function (error) {
    document.getElementById('log').style.display = 'block';
  });

  Twilio.Device.connect(function (conn) {
    //log('Successfully established call!');
    document.getElementById('button-call').style.display = 'none';
    document.getElementById('button-hangup').style.display = 'inline';
  });

  Twilio.Device.disconnect(function (conn) {
    document.getElementById('log1').style.display = 'none';
    document.getElementById('log').style.display = 'block';
    document.getElementById('button-call').style.display = 'inline';
    document.getElementById('button-hangup').style.display = 'none';
  });

  Twilio.Device.incoming(function (conn) {
    document.getElementById('log').style.display = 'block';
    var archEnemyPhoneNumber = '+12099517118';

    if (conn.parameters.From === archEnemyPhoneNumber) {
      conn.reject();
      log('It\'s your nemesis. Rejected call.');
    } else {
      // log('incoming call');
      document.getElementById('log1').style.display = 'block';
      //document.getElementById('callprogress').innerHTML = "Incoming Call from"+conn.parameters.From;
      conn.accept();
    }
  });

  setClientNameUI(identity);
  var userIds =Meteor.userId();
  /*Accounts.createUser({username: identity, password: token, createdAt: new Date()}, function(err) {
  if (err)
    console.log(err);
  else
    console.log('success!');
 }); */
  if(userIds == null)
  {
     Accounts.createUser({username: identity, password: token}, function(err) {
     if (err)
       console.log(err);
     else
       console.log('success!');
    });
  }
  else{
     Meteor.call('updateUser', Meteor.userId(),identity, function (error, result) {
        console.log(error);
    });
  }
Logcalls.insert({ cid: 1,createdAt: new Date(),From: '' ,To: '',callStatus: 'Application Ready'});
  document.getElementById('button-call').onclick = function () {
    document.getElementById('log1').style.display = 'block';
    var params = {
      To: document.getElementById('phone-number').value
    };
    console.log('Calling ' + params.To + '...');
    Twilio.Device.connect(params);
  };
  document.getElementById('button-hangup').onclick = function () {
    document.getElementById('log').style.display = 'block';
    Twilio.Device.disconnectAll();
  };
}

function log(message) {
  var logDiv = document.getElementById('log');
  logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
  logDiv.scrollTop = logDiv.scrollHeight;
}

function setClientNameUI(clientName) {
  var div = document.getElementById('client-name');
  div.innerHTML = 'My Client name: <strong>' + clientName +
  '</strong>';
}

var ADJECTIVES = [
    'Abrasive', 'Brash', 'Callous', 'Daft', 'Eccentric', 'Fiesty', 'Golden',
    'Holy', 'Ignominious', 'Joltin', 'Killer', 'Luscious', 'Mushy', 'Nasty',
    'OldSchool', 'Pompous', 'Quiet', 'Rowdy', 'Sneaky', 'Tawdry',
    'Unique', 'Vivacious', 'Wicked', 'Xenophobic', 'Yawning', 'Zesty'
];

var FIRST_NAMES = [
    'Anna', 'Bobby', 'Cameron', 'Danny', 'Emmett', 'Frida', 'Gracie', 'Hannah',
    'Isaac', 'Jenova', 'Kendra', 'Lando', 'Mufasa', 'Nate', 'Owen', 'Penny',
    'Quincy', 'Roddy', 'Samantha', 'Tammy', 'Ulysses', 'Victoria', 'Wendy',
    'Xander', 'Yolanda', 'Zelda'
];

var LAST_NAMES = [
    'Anchorage', 'Berlin', 'Cucamonga', 'Davenport', 'Essex', 'Fresno',
    'Gunsight', 'Hanover', 'Indianapolis', 'Jamestown', 'Kane', 'Liberty',
    'Minneapolis', 'Nevis', 'Oakland', 'Portland', 'Quantico', 'Raleigh',
    'SaintPaul', 'Tulsa', 'Utica', 'Vail', 'Warsaw', 'XiaoJin', 'Yale',
    'Zimmerman'
];

function randomUsername() {
    function rando(arr) {
        return arr[Math.floor(Math.random()*arr.length)];
    }
    return rando(ADJECTIVES) + rando(FIRST_NAMES) + rando(LAST_NAMES);
}
