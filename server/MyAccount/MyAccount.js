import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    Meteor.publish('ListProjectUser', function() {
        return Projects.find({ 'Manager': Meteor.userId() });
    })


    Meteor.publish('ListProjectcollaborator', function() {
        return Projects.find({ 'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } }).fetch();
    })


});