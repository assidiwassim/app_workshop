import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'

var a = 0;
Template.SLayout.onRendered(function() {
    Meteor.subscribe('users');
    Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
   
    var self = this;
    if (a === 1) {
        //no shit
    } else if (self.view.isRendered) {
        var body = $('body');
        body.removeClass();
        body.addClass("skin-blue sidebar-mini");
        a = 1
        $(function() {
            MeteorAdminLTE.run()
        });
    }
    FlowRouterAutoscroll.animationDuration = 500;
});

Template.SLayout.helpers({
    'isOnline': function() {
        if (Meteor.userId()) {
            return true;
        } else {
            return false;
        }
    },
    ready:function(){
    return FlowRouter.subsReady("users")
 },
    'GetUsername': function() {
       return Meteor.user().username;
    },
   'ListMessagesNonVue': () => {
        var nbrMsgNonVue = Messages.find({
            $and: [{
                    "to": Meteor.userId()
                },
                {
                    "Vue": false
                }
            ]
        }).count();
        return nbrMsgNonVue;
    },
    'ExisteMessagesNonVue': () => {

        var nbrMsgNonVue = Messages.find({
            $and: [{
                    "to": Meteor.userId()
                },
                {
                    "Vue": false
                }
            ]
        }).count();
        if (nbrMsgNonVue > 0)
            return true;
        else
            return false;
    },

'NbrNotification'(){
    return Projects.find({
        "$or": [
                   {
                      "$and": [
                         {'Manager': Meteor.userId()},
                          {'Notification':{$ne:""}} /* or { "isDeleted": { "$exists": false } } */
                      ]
                  },
                  {
                      "$and": [
                          {'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } },
                          {'Notification':{$ne:""}} /* or { "isDeleted": { "$exists": false } } */
                      ]
                  }
              ]
              }).count();
},

    'NotificationList'(){
         return Projects.find({
         
                "$or": [
                        {
                            "$and": [
                                {'Manager': Meteor.userId()},
                                {'Notification':{$ne:""}} /* or { "isDeleted": { "$exists": false } } */
                            ]
                        },
                        {
                            "$and": [
                                {'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } },
                                {'Notification':{$ne:""}} /* or { "isDeleted": { "$exists": false } } */
                            ]
                        }
                    ]
              });
    },

    'ExisteNotificationList'(){
        return Projects.find({
        
               "$or": [
                       {
                           "$and": [
                               {'Manager': Meteor.userId()},
                               {'Notification':{$ne:""}} /* or { "isDeleted": { "$exists": false } } */
                           ]
                       },
                       {
                           "$and": [
                               {'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } },
                               {'Notification':{$ne:""}} /* or { "isDeleted": { "$exists": false } } */
                           ]
                       }
                   ]
             }).count()>0;
   },








    'ListProject': function() {
       
        const porjectList= Projects.find({
            "$or": [
                {  
                        'Manager': Meteor.userId()
                },
                {
                         'Collaborators': { $elemMatch: { $eq: Meteor.user().username } } 
                }
            ] 
        }).fetch();

        porjectList.map((item,index)=>{
            const year=parseInt(item.dateFin.substr(0,4));
            const month=parseInt(item.dateFin.substr(5,2));
            const day=parseInt(item.dateFin.substr(8,2));
            const yearNow=new Date().getFullYear();
            const monthNow=new Date().getMonth()+1;
            const dayNow=new Date().getDate();

 
           if(year==yearNow){
                if(month==monthNow)
                {
                    if(dayNow-day==-1 )
                    {
                        Meteor.call('Update.Projet.jour', item._id, function(error, success) { 
                            if (error) { 
                                console.log('error', error); 
                            } 
                            if (success) { 
                                 
                            } 
                        });
                    }
                    if(dayNow-day==0){
                        Meteor.call('Update.Projet.fin', item._id, function(error, success) { 
                            if (error) { 
                                console.log('error', error); 
                            } 
                            if (success) { 
                                 
                            } 
                        });
                    }
                    if(dayNow-day<-1){
                        Meteor.call('Update.Projet.depasser', item._id, function(error, success) { 
                            if (error) { 
                                console.log('error', error); 
                            } 
                            if (success) { 
                                 
                            } 
                        });
                    }
                }
           }
        })
        
    },

});

Template.SLayout.events({
    'click #logout' () {
        Meteor.logout();	
    },

    'click .step_one' () { 
            FlowRouter.go("/StepOne") ;
    },
});



