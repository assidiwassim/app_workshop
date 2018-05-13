Chat = new Mongo.Collection('Chat');
Projects = new Mongo.Collection('Projects');
Messages = new Mongo.Collection('Messages');
if( Meteor.isClient)
{
	Meteor.subscribe('Messages');
	Meteor.subscribe('Projects');
    Meteor.subscribe('Chat');
    Meteor.subscribe('users');
}