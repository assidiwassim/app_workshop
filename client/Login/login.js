import { Template } from 'meteor/templating';

Template.Login.events({
    'submit form' (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const Email = target.Email.value;
        const Password = target.Password.value;


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

    }

});