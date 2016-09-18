import { Meteor } from 'meteor/meteor';
import '../imports/api/logcalls.js';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {

});

Meteor.methods({
  updateUser: function (userId, username) {
     Accounts.setUsername(Meteor.userId(), username);
  },
})
