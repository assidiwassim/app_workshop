import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'

Template.SLayout.helpers({
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

Template.SLayout.events({
    'click #logout' () {
		FlowRouter.go('/');
        Meteor.logout();
		location.reload();
	
    }

});