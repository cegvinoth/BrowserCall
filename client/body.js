import { Template } from 'meteor/templating';
import { Logcalls } from '../imports/api/logcalls.js';

import './main.html';

Template.body.helpers({
  logcalls() {
    return Logcalls.find({},{sort: {createdAt: -1}, limit: 1});
  },
});
