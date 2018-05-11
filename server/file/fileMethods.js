var fs = require("fs");
var JSZip = require("jszip");
import Files from '/lib/collection';
import { throws } from "assert";
Meteor.methods({
    'todos.updateText'(path) {
     
       content = fs.readFileSync(path,"utf-8");
  
        return content;
    
     
    },
    'remove':function(id){
      
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
    "insertDoc": function(fname,fcontent,users,id) {
      fs.writeFile("../../../../../.meteor/files/"+id+' '+fname, fcontent, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
   
     
              var uploadInstance = Files.addFile("../../../../../.meteor/files/"+id+' '+fname,{
                
                fileName: id+' '+fname,
                meta:{
                  users:users,
                  id:id
              }
            
        
              }, (err, fileRef) => {
                if (err) {
                console.log(err);
                } else {
                  console.log('File Inserted: ', fileRef.path);
                
                }});
            
            
            
           
          },





          "insertDoc2": function(fname,fcontent,meta) {
          
            fs.writeFile("../../../../../.meteor/files/"+meta.id+' '+fname, fcontent, function(err) {
              if(err) {
                  return console.log(err);
              }
          
              console.log("The file was saved!");
          }); 
         
           
                    var uploadInstance = Files.addFile("../../../../../.meteor/files/"+meta.id+' '+fname,{
                      
                      fileName: meta.id+' '+fname,
                      meta:meta
                  
              
                    }, (err, fileRef) => {
                      if (err) {
                      console.log(err);
                      } else {
                        console.log('File Inserted: ', fileRef.path);
                      
                      }});
                  
                  
                  
                 
                }
  });