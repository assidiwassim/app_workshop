FlowRouter.route('/', {
    subscriptions: function(params, queryParams) {
        this.register('Projects', Meteor.subscribe('Projects'));
        this.register('users', Meteor.subscribe('users'));
    },
    action: function() {
        Tracker.autorun(function() {
            if (FlowRouter.subsReady()) {

                            if (Meteor.userId()) {
                                BlazeLayout.render('SLayout', { main: "MyAccount" });
                            }else{
                                BlazeLayout.render("Home");
                            }
            }
            else{
                console.log("loading");
            }
        })
    }
});


FlowRouter.route('/SignUp', {
      subscriptions: function(params, queryParams) {
        this.register('users', Meteor.subscribe('users'));
    },
    action: function() {
        Tracker.autorun(function() {
            if (FlowRouter.subsReady()) {

        if (Meteor.userId()) {
            BlazeLayout.render('SLayout', { main: "MyAccount" });
        } else {
            BlazeLayout.render("SignUp");
        }
            }
            else{
                console.log("loading");
            }
        })

    }
});

FlowRouter.route('/StepOne', {
       subscriptions: function(params, queryParams) {
        this.register('users', Meteor.subscribe('users'));
    },
    action: function() {

        Tracker.autorun(function() {
            if (FlowRouter.subsReady()) {

        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "StepOne" });
        else
        BlazeLayout.render("Home");

      }
            else{
                console.log("loading");
            }
        })

    }
});

FlowRouter.route('/StepTwo/:postId', {
       subscriptions: function(params, queryParams) {
        this.register('users', Meteor.subscribe('users'));
    },
    action: function() {
              Tracker.autorun(function() {
            if (FlowRouter.subsReady()) {

        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "StepTwo" });
        else
        BlazeLayout.render("Home");
}
      else{
                console.log("loading");
            }
        })
    }
});

FlowRouter.route('/WorkPage/:postId', {
       subscriptions: function(params, queryParams) {
        this.register('users', Meteor.subscribe('users'));
    },
    action: function() {
          Tracker.autorun(function() {
            if (FlowRouter.subsReady()) {

        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "WorkPage" });
        else
        BlazeLayout.render("Home");
}
    else{
                console.log("loading");
            }
        })

    }
});

FlowRouter.route('/MyAccount', {
       subscriptions: function(params, queryParams) {
        this.register('users', Meteor.subscribe('users'));
    },
    action: function() {

        Tracker.autorun(function() {
            if (FlowRouter.subsReady()) {


        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "MyAccount" });
        else
            BlazeLayout.render("Home");

        }
      else{
                console.log("loading");
            }
        })
    }
});

FlowRouter.route('/Developpeurs', {
       subscriptions: function(params, queryParams) {
        this.register('users', Meteor.subscribe('users'));
    },
    action: function() {
          Tracker.autorun(function() {
            if (FlowRouter.subsReady()) {

        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "Developpeurs" });
        else
            BlazeLayout.render("Home");


        }
      else{
                console.log("loading");
            }
        })

    }
});
FlowRouter.route('/Profile', {
       subscriptions: function(params, queryParams) {
        this.register('users', Meteor.subscribe('users'));
    },
    action: function() {
         Tracker.autorun(function() {
            if (FlowRouter.subsReady()) {

        if (Meteor.userId())
            BlazeLayout.render('SLayout', { main: "Profile" });
        else
            BlazeLayout.render("Home");
         }
      else{
                console.log("loading");
            }
        })

    }
});

FlowRouter.route('/LivechatMobile/:postId', {
       subscriptions: function(params, queryParams) {
        this.register('users', Meteor.subscribe('users'));
    },
    action: function() {
          Tracker.autorun(function() {
            if (FlowRouter.subsReady()) {

        if (Meteor.userId())
            BlazeLayout.render("LivechatMobile" );
        else
            BlazeLayout.render("Home");
           }
      else{
                console.log("loading");
            }
        })
    }
});