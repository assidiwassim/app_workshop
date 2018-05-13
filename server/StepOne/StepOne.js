import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    Meteor.publish('AllUsers', function() {
        return Meteor.users.find();
    })

    Meteor.methods({
        AddProject: function(Name, Description, Manager, Collaborators,datedeb,dateFin) {
            try {
                var result = Projects.insert({
                    Name: Name,
                    Description: Description,
                    Manager: Manager,
                    Collaborators: Collaborators,
                    Status:"En cours",
                    datedeb,
                    dateFin,
                    Notification:""
                });
                if (result) {
                    return result;
                }
            } catch (err) {
                return err;
            }
        },
        'Update.Projet.jour'(id){
            Projects.update({_id: id}, {$set:{
                Notification:"Reste 1 jour "
            }});
            
        },
        'Update.Projet.fin'(id){
            Projects.update({_id: id}, {$set:{
                Notification:"fin de projet"
            }});
            
        },
        'Update.Projet.depasser'(id){
            Projects.update({_id: id}, {$set:{
                Notification:""
            }});
            
        },
        
    });

});