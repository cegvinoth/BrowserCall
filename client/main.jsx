import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from './routes.js';
import { Template } from 'meteor/templating';


Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('log'));
});
