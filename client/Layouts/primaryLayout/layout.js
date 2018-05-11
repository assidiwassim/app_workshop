import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'




Template.Layout.helpers({
    'isOnline': function() {
        if (Meteor.userId()) {
            return true;
        } else {
            return false;
        }
    },
    'username': function() {
        if (Meteor.userId()) {
            return Meteor.user().username;
        } else {
            return "";
        }
    }
});



Template.Layout.events({
    'click #logout' (event) {

        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/');

    }

});