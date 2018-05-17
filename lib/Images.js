import { FilesCollection } from 'meteor/ostrio:files';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Images = new FilesCollection({
  debug: false,
  collectionName: 'Images',
  allowClientCode: true,
  storagePath: '/home/upload', 
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 && /jpeg|png|jpg?g/i.test(file.extension)) {
      return true;
    }
    return 'Please upload file, with size equal or less than 10MB';
  }
});



if (Meteor.isServer) {


  Images.denyClient();
  Images.allow({
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
  

    Meteor.publish('files.Images.all', function () {
    return Images.find().cursor;
  });


} else {
 
   Meteor.subscribe('files.Images.all');
}

export default Images;
