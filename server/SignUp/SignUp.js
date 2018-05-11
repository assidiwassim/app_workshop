import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    Meteor.methods({
        SignUp: function(username, email, pwd) {
            try {
                var result = Accounts.createUser({
                    username: username,
                    email: email,
                    password: pwd,
                    online: true
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