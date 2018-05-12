import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

Template.Home.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
});

Template.Home.events({
    'submit form' (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const Email = target.email.value;
        const Password = target.password.value;


        // signIn
        Meteor.loginWithPassword(Email, Password, function(err) {
            if (err) {
                Bert.alert(err.reason, 'danger', 'growl-bottom-right');
            } else {
                FlowRouter.go('/MyAccount');
            }

        });
    },
	'click .signup-fn' (event) {
        FlowRouter.go("/SignUp");
    }

});