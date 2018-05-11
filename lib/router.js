FlowRouter.route('/', {
    action: function() {
        if (Meteor.userId()) {
            BlazeLayout.render('SLayout', { main: "MyAccount" });
        }else{
            BlazeLayout.render("Home");
        }        
    }
});

FlowRouter.route('/about', {
    action: function() {
        BlazeLayout.render('Layout', { main: "About" });
    }
});

FlowRouter.route('/SignUp', {
    action: function() {
        if (Meteor.userId()) {
            BlazeLayout.render('SLayout', { main: "MyAccount" });
        } else {
            BlazeLayout.render("SignUp");
        }
    }
});

FlowRouter.route('/StepOne', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "StepOne" });
        else
            BlazeLayout.render('Layout', { main: "Login" });
    }
});

FlowRouter.route('/StepTwo/:postId', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "StepTwo" });
        else
            BlazeLayout.render('Layout', { main: "Login" });
    }
});

FlowRouter.route('/WorkPage/:postId', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "WorkPage" });
        else
            BlazeLayout.render('Layout', { main: "Login" });
    }
});

FlowRouter.route('/MyAccount', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "MyAccount" });
        else
            BlazeLayout.render('Layout', { main: "Login" });
    }
});

FlowRouter.route('/LivechatMobile/:postId', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render('emptyLayout', { main: "LivechatMobile" });
        else
            BlazeLayout.render('Layout', { main: "Login" });
    }
});