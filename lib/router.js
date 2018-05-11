FlowRouter.route('/', {
    action: function() {
        if (Meteor.userId()) {
            BlazeLayout.render('SLayout', { main: "MyAccount" });
        }else{
            BlazeLayout.render("Home");
        }        
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
        BlazeLayout.render("Home");
    }
});

FlowRouter.route('/StepTwo/:postId', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "StepTwo" });
        else
        BlazeLayout.render("Home");
    }
});

FlowRouter.route('/WorkPage/:postId', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "WorkPage" });
        else
        BlazeLayout.render("Home");
    }
});

FlowRouter.route('/MyAccount', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "MyAccount" });
        else
            BlazeLayout.render("Home");
    }
});

FlowRouter.route('/Developpeurs', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "Developpeurs" });
        else
            BlazeLayout.render("Home");
    }
});
FlowRouter.route('/Profile', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "Profile" });
        else
            BlazeLayout.render("Home");
    }
});

FlowRouter.route('/LivechatMobile/:postId', {
    action: function() {
        if (Meteor.userId())
            BlazeLayout.render("LivechatMobile" );
        else
            BlazeLayout.render("Home");
    }
});