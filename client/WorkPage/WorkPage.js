import { Template } from 'meteor/templating';


import Files from '/lib/collection';

Template.WorkPage.onCreated(function () {
   
    this.file =  new ReactiveVar();

  });



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
          Meteor.call('todos.updateText',y[0].path
            , (err, res) => {
              if (err) {
               alert(err);
          
              } else {
              
            console.log(res)
            $('#summernote').summernote('code',res);
                
              }
            });
    },
    'click #SaveButton':function(e,template){
        const file= template.file.get();
        console.log(file._id)
    Meteor.call('remove', file._id, function(error, success) { 
        if (error) { 
            console.log('error', error); 
        } 
        else{
            const content=$('#summernote').summernote('code');
            Meteor.call('insertDoc2', file.name,content,file.meta, function(error, success) { 
                if (error) { 
                    console.log('error', error); 
                } 
                else { 
                     console.log('ok')
                } 
            });
        }
    });
        

    }

});


Template.WorkPage.onRendered(function infoOnCreated() {


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
      console.log(f)
      return f
    },
    subname:function(name){
        return name.substr(-11)
    }
  
  });