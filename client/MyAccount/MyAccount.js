import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

Template.MyAccount.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
});


Template.MyAccount.events({
    'click .linkProject': function() {
        FlowRouter.go('/WorkPage/' + this._id);
    }
});




Template.MyAccount.helpers({
    'ListProjectUser': function() {
        return Projects.find({ 'Manager': Meteor.userId() }).fetch();
    },
    'ListProjectcollaborator': function() {
        return Projects.find({ 'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } }).fetch();

    },
    'GetEmail': function() {
        return Meteor.user().emails[0].address;

    },
    'Getusername': function() {
        return Meteor.user().username;

    },

});