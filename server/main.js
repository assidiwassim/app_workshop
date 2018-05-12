
import { Meteor } from 'meteor/meteor';
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

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


});