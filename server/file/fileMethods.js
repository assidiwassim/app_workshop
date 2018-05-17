var fs = require("fs");
import Files from '/lib/Files';
import { throws } from "assert";


Meteor.methods({
   'todos.updateText'(path) {
      content = fs.readFileSync(path,"utf-8");
       return content;
   },
   'remove':function(id,name){
     fs.exists('/home/upload/'+name, function(exists) {
       if(exists) {
         console.log('File exists. Deleting now ...');
         fs.unlink('/home/upload/'+name,()=>{
         });
       } else {
         console.log('File not found, so not deleting.');
       }
     });


     Files.remove({_id: id},(err,ers)=>{
       if(err){
         throw new Meteor.Error('pants-not-found', "Can't find my pants");
       }
       else
       {
         return 'ok'
       }
     });
   },


'file.update':function(id,inewValue,IdProject){
 const newval=parseInt(inewValue)
 Files.update({_id: id}, {$set:{
 'meta.state':newval
}});
const fileList=Files.find({'meta.id':IdProject}).count();
const filefinishedList=Files.find({'meta.id':IdProject,'meta.state':100}).count();

if(fileList==filefinishedList)
{
 Projects.update({_id: IdProject}, {$set:{
   Status:'Terminée'
 }});

}
},


'deleteProject':function(IdProject){
 Projects.update({_id: IdProject}, {$set:{
   Status:'Annuler'
 }});
},


   "insertDoc": function(fname,fcontent,users,id) {
   
     fs.writeFile("/home/upload/"+id+' '+fname, fcontent, function(err) {
       if(err) {
           return console.log(err);
       }
   
       console.log("The file was saved!");
   });
 Meteor.sleep(500);
   
             var uploadInstance = Files.addFile("/home/upload/"+id+' '+fname,{
               
               fileName: id+' '+fname,
               meta:{
                 users:users,
                 id:id,
                 state:0
             }
           
       
             }, (err, fileRef) => {
               if (err) {
               console.log(err);
               } else {
                 console.log('File Inserted: ', fileRef.path);
               
               }});
         },

         "insertDoc2": function(fname,fcontent,meta) {
          Meteor.sleep(500);
           fs.writeFile("/home/upload/"+fname, fcontent, function(err) {
             if(err) {
                 return console.log(err);
             }
         
             console.log("The file was saved!");
         });
       
                   var uploadInstance = Files.addFile("/home/upload/"+fname,{
                     
                     fileName:fname,
                     meta:meta
                 
             
                   }, (err, fileRef) => {
                     if (err) {
                     console.log(err);
                     } else {
                       console.log('File Inserted: ', fileRef.path);
                     
                     }});
               }
 });