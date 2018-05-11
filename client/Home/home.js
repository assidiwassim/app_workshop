import { Template } from 'meteor/templating';

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


                Bert.alert({
                    icon: 'fa-user-o',
                    title: 'hello ' + Meteor.user().username,
                    message: 'Welcome in workShop.com'
                });
                FlowRouter.go('/MyAccount');
            }

        });


        target.Email.value = '';
        target.Password.value = '';

    },
	'click .signup-fn' (event) {
        FlowRouter.go("/SignUp");
    }

});