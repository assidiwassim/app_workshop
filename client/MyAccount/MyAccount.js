import { Template } from 'meteor/templating';

Template.MyAccount.onRendered(function infoOnCreated() {

    Meteor.subscribe('ListProjectUser');
    Meteor.subscribe('ListProjectcollaborator');
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