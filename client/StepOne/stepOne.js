import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

Template.StepOne.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
});
List = [];

someTest = false;
Template.StepOne.events({
    'submit form' (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const Name = target.Name.value;
        const Description = target.Description.value;


        if (Name == "" || Description == "") {
            Bert.alert("Champ obligatoire", 'danger', 'growl-bottom-right');
        } else {

            Meteor.call('AddProject', Name, Description, Meteor.userId(), List, function(error, res) {
                if (error) {
                    Bert.alert(error.reason, 'danger', 'growl-bottom-right');
                } else {
                    FlowRouter.go('/StepTwo/' + res);
                }
            });

        }
    },

    'change .list-group-item input' (event) {
        event.preventDefault();
        var index = List.indexOf(this.username);

        if (index > -1) {
            List.splice(index, 1);
        } else {
            List.push(this.username);
        }
    }

});


Template.StepOne.helpers({
    'AllUsers': function() {
        return Meteor.users.find();
    },

    'FindList': function() {
        return List;
    },

    'isNotMyUsername': function() {
        if (this.username != Meteor.user().username)
            return true;
        else
            return false;
    },

});