import { FilesCollection } from 'meteor/ostrio:files';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Pdf = new FilesCollection({
  debug: false,
  collectionName: 'Pdf',
  allowClientCode: true,
  storagePath: '/home/upload', 
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 ) {
      return true;
    }
    return 'Please upload file, with size equal or less than 10MB';
  }
});


if (Meteor.isServer) {

  Pdf.denyClient();
  Pdf.allow({
    insert: function () {
           return true;
        },
 
    update: function () {
           return true;
        },
  
    remove: function () {
           return true;
        },
 
});
    

    Meteor.publish('files.Pdf.all', function () {
    return Pdf.find().cursor;
  });


} else {
   Meteor.subscribe('files.Pdf.all');
}

export default Pdf;
