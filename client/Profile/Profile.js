import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

Template.Profile.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
});


Template.Profile.events({
    'submit form': function() {
      
    }
});




Template.Profile.helpers({
    'NbrProjectUser': function() {
        return Projects.find({ 'Manager': Meteor.userId() }).count();
    },
    'NbrProjectUserTerminée': function() {
        return Projects.find({ '$and': [{ 'Manager': Meteor.userId() }, { 'Status': 'Terminée' }] }).count();
    },
    'NbrProjectUserEnCours': function() {
        return Projects.find({ '$and': [{ 'Manager': Meteor.userId() }, { 'Status': 'En cours' }] }).count();
    },
    'NbrProjectUserAnnuler': function() {
        return Projects.find({ '$and': [{ 'Manager': Meteor.userId() }, { 'Status': 'Annuler' }] }).count();
    },
    'NbrProjectcollaborator': function() {
        return Projects.find({ 'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } }).count();
    },
    'GetEmail': function() {
        return Meteor.user().emails[0].address;

    },
    'Getusername': function() {
        return Meteor.user().username;

    },

});