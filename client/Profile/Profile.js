import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor'
import Files from '/lib/Files';
import Images from '/lib/Images';
import Pdf from '/lib/Pdf';

let Image = "";
let pdf = "";

Template.Profile.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
        this.currentUpload = new ReactiveVar(false);

});


Template.Profile.events({
    'click .upload': function(e,template) {
       if (Image != "" ) {
                            var uploadInstance = Images.insert({
                                file: Image,
                                streams: 'dynamic',
                                chunkSize: 'dynamic',
                                fileName:  Image.name,
                                meta: { uid: Meteor.userId() },
                            }, false);

                            uploadInstance.on('start', function() {
                               // template.currentUpload.set(this);
                            });

                            uploadInstance.on('end', function(error, fileObj) {
                                if (error) {
                                    //console.log('Error during upload: ' + error.reason);
                                } else {
                                    // console.log('File "' + fileObj.ext + '" successfully uploaded');
                                }
                              //  template.currentUpload.set(false);
                            });
                            uploadInstance.start();
                        }

                        if(pdf != "" ){
                           var uploadInstance2 = Pdf.insert({
                                file: pdf,
                                streams: 'dynamic',
                                chunkSize: 'dynamic',
                                fileName:  pdf.name,
                                meta: { uid: Meteor.userId()  },
                            }, false);

                            uploadInstance2.on('start', function() {
                               // template.currentUpload.set(this);
                            });

                            uploadInstance2.on('end', function(error, fileObj) {
                                if (error) {
                                    //console.log('Error during upload: ' + error.reason);
                                } else {
                                    // console.log('File "' + fileObj.ext + '" successfully uploaded');
                                }
                              //  template.currentUpload.set(false);
                            });
                            uploadInstance2.start();
                            }

                        
    },
        'change #fileCV': function(e, template) {

        if (e.currentTarget.files && e.currentTarget.files[0]) {
            var file = e.currentTarget.files[0];
            pdf = file;
        }
    },
        'change #fileProfile': function(e, template) {

        if (e.currentTarget.files && e.currentTarget.files[0]) {
            var file = e.currentTarget.files[0];
            Image = file;
        }
    }
});

Template.Profile.helpers({
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

});