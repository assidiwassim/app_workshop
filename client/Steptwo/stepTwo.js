import { Template } from 'meteor/templating';

import Files from '/lib/Files';
List = [];

Template.StepTwo.onCreated(function () {
    this.fileList =  new ReactiveList();
    this.counter =  new ReactiveVar(0);
    Meteor.subscribe('AllUsers');
  });



Template.StepTwo.events({

    'click #Nextstep' (event,template) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element

        const fileinput=($)
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
                        id:IdProject,
                        state:0
                    }
                  }, false);
                
                  uploadInstance.on('start', function() {
                   
                  });
          
                  uploadInstance.on('end', function(error, fileObj) {
                    if (error) {
                     // window.alert('Error during upload: ' + error.reason);
                    } else {
                      //window.alert('File "' + fileObj.ext + '" successfully uploaded');
                    
                     
                    }
                   
                  });
          
                  uploadInstance.start();
            }
            else{
                Meteor.call('insertDoc',value.name,'hi this an empty file',users,IdProject
                , (err, res) => {
                  if (err) {
                  // alert(err);
              
                  } else {
                  
                  //  alert(res)
                  }
                });
            }
          }, true); 

          Meteor.call('Update.Project.List',IdProject, List, function(error, res) {
            if (error) {
                Bert.alert(error.reason, 'danger', 'growl-bottom-right');
            } else {
               
            }
        });
        FlowRouter.go('/WorkPage/' + IdProject);
    },

    'click #newfile'(e,template){
        if($("#filename").val()!==""){
       const filename= $('#filename').val();
       const counter=template.counter.get()
       template.counter.set(counter+1)
       template.fileList.insert(counter,{name:filename,file:[],key:counter})
       $('#filename').val("");
    } 
    },

    'change #fileInput': function (e, template) {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
          var file = e.currentTarget.files[0];
          const filename=file.name;
          const counter=template.counter.get()
          template.counter.set(counter+1)
          template.fileList.insert(counter,{name:filename,file:file,key:counter});
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
                    template.fileList.update(this.key, { name:name,file:file,userslist: selectedUsers,key:this.key})
                }
              }, true); 
        // template.fileList.update(this.key, { userslist: selectedUsers});



    },
    'click .fa-times'(e,template){
     
        var id=e.currentTarget.dataset.value;
        template.fileList.remove(id);
        
    },
    'change .list-group-item input' (event) {
        // Prevent default browser form submit


        event.preventDefault();

        var IdProject = FlowRouter.getParam("postId");
        var index = List.indexOf(this.username);

        if (index > -1) {
            List.splice(index, 1);
        } else {
            List.push(this.username);
        }
        // Get value from form element

     Meteor.call('Update.Project.List',IdProject, List, function(error, res) {
            if (error) {
                Bert.alert(error.reason, 'danger', 'growl-bottom-right');
            } else {
               
            }
        });

    }

});



Template.StepTwo.helpers({
    'AllUsers': function() {
        var IdProject = FlowRouter.getParam("postId");
      const collaboratos=  Projects.find({_id:IdProject}).fetch()
      return collaboratos[0].Collaborators;
       // return Meteor.users.find({_id:{$ne:Meteor.userId()}}).fetch();
    },

    'FindList': function() {
        return Template.instance().fileList.fetch();
    },
    'AllUserss': function() {
        return Meteor.users.find().fetch();
    },

  

    'isNotMyUsername': function() {
        if (this.username != Meteor.user().username)
            return true;
        else
            return false;
    },

});