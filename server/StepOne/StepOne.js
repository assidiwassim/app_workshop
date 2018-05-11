import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    Meteor.publish('AllUsers', function() {
        return Meteor.users.find();
    })

    Meteor.methods({
        AddProject: function(Name, Description, Manager, Collaborators) {
            try {
                var result = Projects.insert({
                    Name: Name,
                    Description: Description,
                    Manager: Manager,
                    Collaborators: Collaborators
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