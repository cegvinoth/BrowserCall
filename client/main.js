import './body.js';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Meteor.startup(() => {

});

/*Meteor.call('getUsers', Meteor.userId(), function (error, result) {
   if(error){
     console.log(error);
     return [];
   }
   else {
     console.log(JSON.stringify(result));
     var div = document.getElementById('client-name');
     div.innerHTML = 'My Client name: <strong>' + JSON.stringify(result) +
     '</strong>';
     return result;
   }
});
*/
