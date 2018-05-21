import { Template } from 'meteor/templating';





someTest = false;
Template.StepOne.events({
    'submit form' (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const Name = target.Name.value;
        const Description = target.Description.value;
        const datedeb = target.datedeb.value;
        const dateFin = target.dateFin.value;

        if (Name == "" || Description == "" || datedeb=="" || dateFin=="") {
            Bert.alert("Champ obligatoire", 'danger', 'growl-bottom-right');
        } else {

            Meteor.call('AddProject', Name, Description, Meteor.userId(), [],datedeb,dateFin, function(error, res) {
                if (error) {
                    Bert.alert(error.reason, 'danger', 'growl-bottom-right');
                } else {
                    FlowRouter.go('/StepTwo/' + res);
                }
            });

        }
    },

    'change .list-group-item input' (event) {
        // Prevent default browser form submit


        event.preventDefault();


        var index = List.indexOf(this.username);

        if (index > -1) {
            List.splice(index, 1);
        } else {
            List.push(this.username);
        }
        // Get value from form element


    }

});

Template.StepOne.onRendered(function infoOnCreated() {

    Meteor.subscribe('AllUsers');



});


Template.StepOne.helpers({
    'AllUsers': function() {
        return Meteor.users.find().fetch();
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