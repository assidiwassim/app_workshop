import { Template } from 'meteor/templating';

import Files from '/lib/collection';


Template.StepTwo.onCreated(function () {
    this.fileList =  new ReactiveList();
    this.counter =  new ReactiveVar(0);
  });



Template.StepTwo.events({

    'click #Nextstep' (event,template) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element


        var IdProject = FlowRouter.getParam("postId");

        template.fileList.forEach((value, key) =>{
                const users=value.userslist;
            if(value.file.length>0){
                var uploadInstance = Files.insert({
                    file: file,
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    fileName: IdProject+'  '+file.name,
                    meta:{
                        users:users,
                        id:IdProject
                    }
                  
                   
                  }, false);
                
                  uploadInstance.on('start', function() {
                   
                  });
          
                  uploadInstance.on('end', function(error, fileObj) {
                    if (error) {
                      window.alert('Error during upload: ' + error.reason);
                    } else {
                      window.alert('File "' + fileObj.ext + '" successfully uploaded');
                    
                     
                    }
                   
                  });
          
                  uploadInstance.start();
            }
            else{
                Meteor.call('insertDoc',value.name,'hi this an empty file',users,IdProject
                , (err, res) => {
                  if (err) {
                   alert(err);
              
                  } else {
                  
                    alert(res)
                  }
                });
            }
          }, true); 





        FlowRouter.go('/WorkPage/' + IdProject);

    },

    'click #newfile'(e,template){
       const filename= $('#filename').val();
       const counter=template.counter.get()
       template.counter.set(counter+1)
       template.fileList.insert(counter,{name:filename,file:[],key:counter})
       
        
    },

    'change #fileInput': function (e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
        
          var file = e.currentTarget.files[0];
          const filename=file.name;
          const counter=template.counter.get()
          template.counter.set(counter+1)
          template.fileList.insert(counter,{name:filename,file:file,key:counter})
          
          

        }
    },

    'click #okbutton'(e,template){


                    var selectedUsers = [];
                        $('#checkboxes input:checked').each(function() {
                        selectedUsers.push($(this).attr('name'));
            });
            template.fileList.forEach((value, key) =>{
                
                if(key===this.key){
                    name=value.name;
                    file=value.file;
                    template.fileList.update(this.key, { name:name,file:file,userslist: selectedUsers})
                }
              }, true); 
        // template.fileList.update(this.key, { userslist: selectedUsers});



    },
    'click .fa-times'(e,template){
        
        template.fileList.remove(this.key);
        
    }

});



Template.StepTwo.helpers({
    'AllUsers': function() {
        return Meteor.users.find({_id:{$ne:Meteor.userId()}}).fetch();
    },

    'FindList': function() {
        return Template.instance().fileList.fetch();
    }

});