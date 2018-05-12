import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

Template.Developpeurs.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
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
      	console.log(this._id);
        return Images.find({ 'meta.uid':this._id  }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 });
    },
     'ExisteImageProfileUtilisateur': function() {
        if(Images.find({ 'meta.uid': this._id }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 }).count()>0)
            return true;
        else
            return false;
    },

});