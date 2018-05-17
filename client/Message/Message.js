import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Session } from 'meteor/session'
import Images from '/lib/Images';

Template.Message.onRendered(function infoOnCreated() {
    Meteor.subscribe('Chat');
    Meteor.subscribe('users');
    Session.clear();
    Session.setPersistent('nameClient', "");
});

Template.Message.helpers({
    'ListUsers': () => {
        return _.uniq(Messages.find({}, {
            sort: { from: 1 },
            fields: { from: true }
        }).fetch().map(function(x) {
            return x.from;
        }), true);
    },
    currentNameSender: function() {
        return Session.get('nameClient');
    },
    Click_User: function() {
        if (Session.get('nameClient') == "")
            return false;
        else
            return true;
    },
    'ListMessages': () => {
    
    let id="";
    if(Session.get('nameClient')!=""){
        if(Meteor.users.find({username:Session.get('nameClient')}).count()>0){
     let obj =Meteor.users.find({username:Session.get('nameClient')}).fetch();
     id=obj[0]._id}
    }
        $('.direct-Messages-messages').animate({ scrollTop: $('.direct-Messages-messages').prop('scrollHeight') }, 5);
         return Messages.find({
         
  "$or": [
             {
                "$and": [
                   {'from':id},
                    {'to':Meteor.userId()} 
                ]
            },
            {
                "$and": [
                    {'from':Meteor.userId()},
                      {'to':id}
                ]
            }
        ]
        }).fetch();
    },
    'me': (id) => {
        if (id == Meteor.userId())
            return true;
        else
            return false;
    },
    'ListMessagesNonVue': (from) => {
        var nbrMsgNonVue = Messages.find({
            $and: [{
                    "from": from
                },
                {
                    "to": Meteor.userId()
                },
                {
                    "Vue": false
                }
            ]
        }).count();
        return nbrMsgNonVue;
    },
    'ExisteMessagesNonVue': (from) => {

        var nbrMsgNonVue = Messages.find({
            $and: [{
                    "from": from
                },
                {
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
	'GetName'(id){
      const name=  Meteor.users.find({_id:id}).fetch();
        return name[0].username;
    },
    'ImageProfileUtilisateurChat': function(id) {
               
        return Images.find({ 'meta.uid':id  }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 });
    },
     'ExisteImageProfileUtilisateurChat': function(id) {

        if(Images.find({ 'meta.uid': id }, { sort: { 'meta.CreatedAt': -1 }, limit: 1 }).count()>0)
            return true;
        else
            return false;
    },

});


Template.Message.events({
    'click .item': function(e, template) {
        Session.setPersistent('nameClient', e.currentTarget.innerText);
       
        let id="";
        if(Session.get('nameClient')!=""){
            if(Meteor.users.find({username:Session.get('nameClient')}).count()>0){
         let obj =Meteor.users.find({username:Session.get('nameClient')}).fetch();
         id=obj[0]._id}
        }
     
        Meteor.call('SupprimerVueMessage', id, function(error, res) {
            if (error) {
                console.log(error.reason, 'danger', 'growl-bottom-right');
            }
        });
    },
    'submit form': function(e, template) {

        event.preventDefault();
        const target = event.target;
        const message = target.message.value;
        if (message != "") {
          
            let id="";
            if(Session.get('nameClient')!=""){
                if(Meteor.users.find({username:Session.get('nameClient')}).count()>0){
             let obj =Meteor.users.find({username:Session.get('nameClient')}).fetch();
             id=obj[0]._id}
            }
            Meteor.call('SendsMessage', Meteor.userId(), id, message, function(error, res) {
                if (error) {
                    console.log(error.reason, 'danger', 'growl-bottom-right');
                } else {
                    target.message.value = "";
                }
            });

            Meteor.call('SupprimerVueMessage', id, function(error, res) {
                if (error) {
                    console.log(error.reason, 'danger', 'growl-bottom-right');
                }
            });
        }
    }

});