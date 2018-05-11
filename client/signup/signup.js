import { Template } from 'meteor/templating';

Template.SignUp.events({
    'submit form' (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const Username = target.Username.value;
        const Email = target.Email.value;
        const Password1 = target.Password1.value;
        const Password2 = target.Password2.value;

        // Call method from the server and signIn
        if (Password1 != Password2) {
            Bert.alert("Mots de passe non pas identique", 'danger', 'growl-bottom-right');
        } else {

            Meteor.call('SignUp', Username, Email, Password1, function(error) {
                if (error) {
                    Bert.alert(error.reason, 'danger', 'growl-bottom-right');
                } else {
                    Meteor.loginWithPassword(Email, Password1, function(err) {
                        if (err) {
                            Bert.alert(err.reason, 'danger', 'growl-bottom-right');
                        } else {
                            Bert.alert({
                                icon: 'fa-user-o',
                                title: 'hello ' + Username,
                                message: 'Welcome in workShop.com'
                            });
                            FlowRouter.go('/MyAccount');
                        }

                    })

                }
            });


            target.Username.value = '';
            target.Email.value = '';
            target.Password1.value = '';
            target.Password2.value = '';
        }
    },
	'click .cancelbtn'  (event) {
		
		FlowRouter.go("/");
	}
});