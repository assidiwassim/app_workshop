import { Template } from 'meteor/templating';

Template.LiveChat.onRendered(function infoOnCreated() {

    Meteor.subscribe('Chat', FlowRouter.getParam("postId"));


});
Template.LiveChat.events({
    'click #live-chat header': function() {
        $('.chat').slideToggle(300, 'swing');
        $('.chat-message-counter').fadeToggle(300, 'swing');
        var objDiv = $('.chat-history');
        if (objDiv.length > 0) {
            objDiv[0].scrollTop = objDiv[0].scrollHeight;
        }
    },
    'submit form': function(event) {

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const message = target.message.value;
        var IdProject = FlowRouter.getParam("postId");
        Meteor.call('InsertMessageChat', Meteor.user().username, message, IdProject, function(error) {
            if (error) {
                console.log(error.reason);
            } else {
                var objDiv = $('.chat-history')
                objDiv[0].scrollTop = objDiv[0].scrollHeight;
            }
        });
        target.message.value = '';
    }
});
Template.LiveChat.helpers({
    'ChatList': function() {
        return Chat.find({ 'IdProject': FlowRouter.getParam("postId") }).fetch();
    }
});

/*********** mobile  *************/



Template.LivechatMobile.onRendered(function infoOnCreated() {

    Meteor.subscribe('Chat', FlowRouter.getParam("postId"));


});
Template.LivechatMobile.events({
    'click #live-chat header': function() {
        $('.chat').slideToggle(300, 'swing');
        $('.chat-message-counter').fadeToggle(300, 'swing');
        var objDiv = $('.chat-history');
        if (objDiv.length > 0) {
            objDiv[0].scrollTop = objDiv[0].scrollHeight;
        }
    },
    'click #back': function() {
        FlowRouter.go('/WorkPage/' + FlowRouter.getParam("postId"))
    },
    'submit form': function(event) {

        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const message = target.message.value;
        var IdProject = FlowRouter.getParam("postId");
        Meteor.call('InsertMessageChat', Meteor.user().username, message, IdProject, function(error) {
            if (error) {
                console.log(error.reason);
            } else {
                var objDiv = $('.chat-history')
                objDiv[0].scrollTop = objDiv[0].scrollHeight;
            }
        });
        target.message.value = '';
    }
});
Template.LivechatMobile.helpers({
    'ChatList': function() {
        return Chat.find({ 'IdProject': FlowRouter.getParam("postId") }).fetch();
    }
});