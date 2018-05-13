import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';
import { Session } from 'meteor/session'
var a = 0;
Template.SLayout.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
   
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
    ready:function(){
    
    return FlowRouter.subsReady("users")
    
  
 },
    'GetUsername': function() {
       return Meteor.user().username;
    }
});

Template.SLayout.events({
    'click #logout' () {
         
        Meteor.logout();	
    },

    'click .step_one' () { 
            FlowRouter.go("/StepOne") ;
        },
});