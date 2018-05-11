Chat = new Mongo.Collection('Chat');
Projects = new Mongo.Collection('Projects');

import { FilesCollection } from 'meteor/ostrio:files';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Files = new FilesCollection({
  debug: true,
  collectionName: 'Files',
  allowClientCode: false,
  storagePath: '../../../../../.meteor/files', 
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 && /txt|html|css?g/i.test(file.extension)) {
      return true;
    }
    return 'Please upload file, with size equal or less than 10MB';
  }
});


if (Meteor.isServer) {

  Files.denyClient();
  Files.allow({
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
  
  Meteor.publish('files.Files.all', function () {
    return Files.find().cursor;
  });


} else {
  
  Meteor.subscribe('files.Files.all');

 
}

export default Files;
