import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'



var a = 0;
Template.SLayout.onRendered(function() {
    Meteor.subscribe('users');
    var self = this;
    if (a === 1) {
        //no shit
    } else if (self.view.isRendered) {
        var body = $('body');
        body.removeClass();
        body.addClass("skin-blue sidebar-mini");
        a = 1
        $(function() {
            MeteorAdminLTE.run()
        });
    }
    FlowRouterAutoscroll.animationDuration = 500;
});

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