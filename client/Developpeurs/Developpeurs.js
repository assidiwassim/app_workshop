import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

Template.Developpeurs.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
    Meteor.subscribe('Messages');
});


Template.Developpeurs.helpers({

	'ExisteDeveloppeur': function() {
		if(Meteor.users.find({'_id':{$ne: Meteor.userId() }}).count()>0)
	        return  true;
	    else
	    	return false;
    },
    'ListeDeveloppeur': function() {
        return Meteor.users.find({'_id':{$ne: Meteor.userId() }}).fetch();
    },
     'ListProjectUser': function() {
        return Projects.find({ 'Manager': Meteor.userId() }).fetch();
    },
    'ListProjectcollaborator': function() {
        return Projects.find({ 'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } }).fetch();

    },
    'NbrProjectUser': function() {
        return Projects.find({ 'Manager': Meteor.userId() }).count();
    },
    'NbrProjectUserTerminée': function() {
        return Projects.find({ '$and': [{ 'Manager': this._id}, { 'Status': 'Terminée' }] }).count();
    },
    'NbrProjectUserEnCours': function() {
        return Projects.find({ '$and': [{ 'Manager': this._id }, { 'Status': 'En cours' }] }).count();
    },
    'NbrProjectUserAnnuler': function() {
        return Projects.find({ '$and': [{ 'Manager': this._id }, { 'Status': 'Annuler' }] }).count();
    },
    'NbrProjectcollaborator': function() {
        return Projects.find({ 'Collaborators': { $elemMatch: { $eq: this.username } } }).count();
    },
    'GetEmail': function() {
        return Meteor.user().emails[0].address;
    },
    'Getusername': function() {
        return Meteor.user().username;

    },
    'CvUtilisateur': function() {
        return Pdf.find({ 'meta.uid': this._id  }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 });
    },
     'ExisteCvUtilisateur': function() {
        if(Pdf.find({ 'meta.uid': this._id  }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 }).count()>0)
            return true;
        else
            return false;
    },
      'ImageProfileUtilisateur': function() {
        return Images.find({ 'meta.uid':this._id  }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 });
    },
     'ExisteImageProfileUtilisateur': function() {
        if(Images.find({ 'meta.uid': this._id }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 }).count()>0)
            return true;
        else
            return false;
    },

     'ImageProfileUtilisateurChat': function(id) {
        return Images.find({ 'meta.uid':id  }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 });
    },
     'ExisteImageProfileUtilisateurChat': function(id) {
        if(Images.find({ 'meta.uid': id }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 }).count()>0)
            return true;
        else
            return false;
    },

    'MessagesList'()
    {
        return Messages.find({
         
  "$or": [
             {
                "$and": [
                   {'from':this._id},
                    {'to':Meteor.userId()} /* or { "isDeleted": { "$exists": false } } */
                ]
            },
            {
                "$and": [
                    {'from':Meteor.userId()},
                      {'to':this._id}/* or { "isDeleted": { "$exists": false } } */
                ]
            }
        ]




        })
    },

    'NotMe'(from){
        return from!==Meteor.userId()
    },
    'GetName'(id){
      const name=  Meteor.users.find({_id:id}).fetch();
        return name[0].username;
    }

});


Template.Developpeurs.events({
    'click .send'(){
        const msg =$('#msg-'+this._id).val();
        const to =this._id;

        const from =Meteor.userId();
        if(msg!="")
        {
        Meteor.call('SendsMessage',from,to,msg,(err,res)=>{
            if(err){
                console.log(err)
            }
            else{
                $('#msg').val("")
            }
        })
    }
}

})