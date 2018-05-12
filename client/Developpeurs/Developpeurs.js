import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

Template.Developpeurs.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
});