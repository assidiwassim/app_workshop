import { Template } from 'meteor/templating';
import Files from '/lib/Files';




Template.WorkPage.events({
    'click #slide-submenu': function() {
        $('.list-group').fadeOut('slide', function() {
            $('.mini-submenu').fadeIn();
        });
    },
    'click .mini-submenu': function() {
        $('.list-group').toggle('slide');
        $('.mini-submenu').hide();
    },
    'click #fab': function() {
        FlowRouter.go('/LivechatMobile/' + FlowRouter.getParam("postId"));
    },

    'click .list-group-item':function(event, template){
        var x=event.currentTarget.dataset.value;
        
        var y= Files.find({_id:x}).fetch();
        template.file.set(y[0])
        Session.set('file',y[0].name);
          Meteor.call('todos.updateText',y[0].path
            , (err, res) => {
              if (err) {
             //  alert(err);
          
              } else {
              
         
            $('#summernote').summernote('code',res);
                
              }
            });
    },
    'click #SaveButton':function(e,template){
        const file= template.file.get();
        
        var IdProject = FlowRouter.getParam("postId");
        const userList=file.meta.users;
        const manager= Projects.find({_id:IdProject}).fetch();
        if(Meteor.userId()==manager[0].Manager)
        {
            
        Meteor.call('remove', file._id,file.name, function(error, success) { 
            if (error) { 
               // console.log('error', error); 
            } 
            else{
                const content=$('#summernote').summernote('code');
                Meteor.call('insertDoc2', file.name,content,file.meta, function(error, success) { 
                    if (error) { 
                       // console.log('error', error); 
                    } 
                    else { 
                        // console.log('ok')
                    } 
                });
            }
        });
        }
        else{
            if(userList.includes(Meteor.user().username)) 
            {
                Meteor.call('remove', file._id,file.name, function(error, success) { 
                    if (error) { 
                       // console.log('error', error); 
                    } 
                    else{
                        const content=$('#summernote').summernote('code');
                        Meteor.call('insertDoc2', file.name,content,file.meta, function(error, success) { 
                            if (error) { 
                                //console.log('error', error); 
                            } 
                            else { 
                               //  console.log('ok')
                            } 
                        });
                    }
                });
            }
            else{
                //console.log('error');
            }
        }







        

    },


    
    'click #UploadButton'(){
        var IdProject = FlowRouter.getParam("postId");
        FlowRouter.go('/StepTwo/'+IdProject);
    },
    'change #myRange':function(e,template){
        
        template.Range.set(e.currentTarget.value);
        
    },
    'click #changeValue'(event,template){
        var id=event.currentTarget.dataset.value;
        var inewValue=template.Range.get();
        var IdProject = FlowRouter.getParam("postId");
        Meteor.call('file.update', id,inewValue,IdProject, function(error, success) { 
            if (error) { 
                console.log('error', error); 
            } 
            if (success) { 
                 
            } 
        });
    }

});


Template.WorkPage.onRendered(function infoOnCreated() {
    this.file =  new ReactiveVar();
    this.Range =  new ReactiveVar();
 

    $(document).ready(function() {
        $('#summernote').summernote({
            height: 300,
            disableResizeEditor: true,
        });
        $('.chat').slideToggle(300, 'swing');
        $('.chat-message-counter').fadeToggle(300, 'swing');
        $('.mini-submenu').hide();



    });

});




Template.WorkPage.helpers({
    FilesList: function () {
    var IdProject = FlowRouter.getParam("postId");
      const f= Files.find({'meta.id':IdProject});
      return f
    },
    subname:function(name){
        var IdProject = FlowRouter.getParam("postId");
        var ret = name.replace(IdProject+' ','');
        return ret;
    },
    getProjectName:function(){
        var IdProject = FlowRouter.getParam("postId");
       const name= Projects.find({_id:IdProject}).fetch();
        return name[0].Name;
    },
    getFileName:function(e,template){
       
        var IdProject = FlowRouter.getParam("postId");
        if(Session.get('file'))
        return Session.get('file').replace(IdProject+' ','');
  
    },
    manager:function(){
        var IdProject = FlowRouter.getParam("postId");
      const p=  Projects.find({_id:IdProject}).fetch();
         return(p[0].Manager===Meteor.userId())
    },

    done:function(id){
        const f= Files.find({'_id':id}).fetch();
        return (f[0].meta.state==100)
    }
  
  });
