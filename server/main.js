
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    Meteor.publish('users', function() {
        return Meteor.users.find();
    })
     Meteor.publish('Projects', function() {
        return Projects.find();
    })

    Meteor.publish('Chat', function() {
            return Chat.find();
        })
    Meteor.publish('Messages', function() {
            return Messages.find();
        })

});