import { Meteor } from 'meteor/meteor';
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

Meteor.startup(() => {

  
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