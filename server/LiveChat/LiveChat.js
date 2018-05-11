import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    Meteor.publish('Chat', function(IdProject) {
        return Chat.find({ 'IdProject': IdProject });
    })

    Meteor.methods({


        InsertMessageChat: function(userSender, message, IdProject) {
            try {
                var result = Chat.insert({
                    userSender: userSender,
                    message: message,
                    IdProject: IdProject
                });
                if (result) {
                    return result;
                }
            } catch (err) {
                return err;
            }
        }
    });

});