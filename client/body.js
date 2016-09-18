import { Template } from 'meteor/templating';
import { Logcalls } from '../imports/api/logcalls.js';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import './main.html';

Template.body.helpers({
  logcalls() {
    return Logcalls.find({},{sort: {createdAt: -1}, limit: 1});
  },
  userslist(){
  //  return Meteor.users.find({_id:{$ne:Meteor.userId()}});
   return Meteor.users.find({},{sort: {createdAt: 1}, limit: 2});
  },
});
