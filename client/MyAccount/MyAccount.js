import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor'
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

let Image = "";
let pdf = "";

Template.MyAccount.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
});


Template.MyAccount.events({
    'click .linkProject': function() {
        FlowRouter.go('/WorkPage/' + this._id);
    },
    'click #delete':function(){
       Meteor.call('deleteProject', this._id, function(error, success) {
           if (error) {
           
           }
           if (success) {
               
           }
       });
   },
   'click .restorer'(e){
        e.preventDefault();
       
        Meteor.call('Projet.restorer', this._id, function(error, success) { 
            if (error) { 
               
            } 
            if (success) { 
                 
            } 
        });
   }
});

Template.MyAccount.helpers({
     'ListProjectUser': function() {
        return Projects.find({ '$and': [{ 'Manager': Meteor.userId() }, {'Status': {'$ne': 'Annuler'} }] }).fetch();
    },
    'ListProjectcollaborator': function() {
        return Projects.find({ 'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } }).fetch();

    },
    'NbrProjectUser': function() {
        return Projects.find({ 'Manager': Meteor.userId() }).count();
    },
    'NbrProjectUserTerminée': function() {
        return Projects.find({ '$and': [{ 'Manager': Meteor.userId() }, { 'Status': 'Terminée' }] }).count();
    },
    'NbrProjectUserEnCours': function() {
        return Projects.find({ '$and': [{ 'Manager': Meteor.userId() }, { 'Status': 'En cours' }] }).count();
    },
    'NbrProjectUserAnnuler': function() {
        return Projects.find({ '$and': [{ 'Manager': Meteor.userId() }, { 'Status': 'Annuler' }] }).count();
    },
    'NbrProjectcollaborator': function() {
        return Projects.find({ 'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } }).count();
    },
    'GetEmail': function() {
        return Meteor.user().emails[0].address;
    },
    'Getusername': function() {
        return Meteor.user().username;

    },
    'CvUtilisateur': function() {
        return Pdf.find({ 'meta.uid': Meteor.userId()  }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 });
    },
     'ExisteCvUtilisateur': function() {
        if(Pdf.find({ 'meta.uid': Meteor.userId()  }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 }).count()>0)
            return true;
        else
            return false;
    },
      'ImageProfileUtilisateur': function() {
        return Images.find({ 'meta.uid': Meteor.userId()  }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 });
    },
     'ExisteImageProfileUtilisateur': function() {
        if(Images.find({ 'meta.uid': Meteor.userId()  }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 }).count()>0)
            return true;
        else
            return false;
    },
    'GetProgress'(){
           
            let sum=0;
            const FilesKList =Files.find({'meta.id':this._id}).fetch();
            
            FilesKList.map((item,index)=>{
             
                sum+=item.meta.state;
            })
            if(sum/FilesKList.length===100)
            {
                Meteor.call('Projet.terminer', this._id, function(error, success) { 
                    if (error) { 
                      
                    } 
                    if (success) { 
                         
                    } 
                });
            }
            return sum/FilesKList.length;
    },




    'NoDeleted'(){
        const statee=Projects.find({_id:this._id}).fetch();
 
        return statee[0].Status !=="Annuler";
        },
   'ListProjectTerminee': function() {
       
       return Projects.find({
           "$or": [
            {  
                 "$and": [
                   { 'Manager': Meteor.userId()},
                   { 'Status': 'Terminée'}
               ]
           },
               {
                   "$and": [
                       { 'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } },
                       { 'Status': 'Terminée'}
                   ]
               }
           ] 
       }).fetch();
       
   },



   'ListProjectencour': function() {
       
       return Projects.find({
           
                 "$and": [
                   { 'Manager': Meteor.userId()},
                   { 'Status': 'En cours'}
               ]
          
           

           
       
       
       }).fetch();
       
   },

   'ListProjectSupprimer': function() {
       
       return Projects.find({
           "$or": [
            {  
                 "$and": [
                   { 'Manager': Meteor.userId()},
                   { 'Status': 'Annuler'}
               ]
           },
               {
                   "$and": [
                       { 'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } },
                       { 'Status': 'Annuler'}
                   ]
               }
           ]

           
       
       
       }).fetch();
       
   },

});