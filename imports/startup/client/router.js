FlowRouter.wait();

document.addEventListener("WebComponentsReady", function() {

  FlowRouter.initialize({
  });
});
FlowRouter.route("/",{
  name:"landing",
  action:function(p,q) {

  },
  triggersEnter:[function(p,q){
    if (Meteor.user()) {
      FlowRouter.go('after-login');
    }
    else if(Meteor.loggingIn()){
      Tracker.autorun(function(c){
        if(Meteor.user()){

          FlowRouter.go('after-login');
        }
      }); 
    }
    else {
      FlowRouter.go('accounts');
    }

  }]
});

var autherized = FlowRouter.group({
  name: "autherized",
  prefix: "/autherized",
  triggersEnter: [function(context, redirect){
    if (!(Meteor.user() || Meteor.loggingIn())) {
      redirect('/accounts');
    }
  }]
});

autherized.route("/:view?", {
  triggersEnter:[function(c,r){
    if(!c.params.view){

      var path = FlowRouter.path("after-login",{view:'home'});
      r(path);
    }
  }],
  action: function(p, q){
    mwcLayout.render("after-login",{"main":"test-layout"});
  },
  name: "after-login"
});

FlowRouter.route("/accounts/:view?", {
  name:"accounts",
  triggersEnter:[function(c,r){
    if(!c.params.view){
      var path = FlowRouter.path("accounts",{view:'sign-in'});
      r(path);
    }
  }],
  action: function(p, q) {
    mwcLayout.render("accounts", {
      main: "accounts-element"
    });
  }
});
import '../../ui/bower_components/webcomponentsjs/webcomponents-lite.min.js'
import "../../ui/bower_components/polymer/polymer.html";
import '../../ui';






console.log('%cEnjoy the %cM %cW %cC %cgoodness','color:#d61a7f;', 'color:red;font-size:50px;font-weight:bold;font-family:sans-serif;','color:green;font-size:50px;font-weight:bold;font-family:sans-serif;','color:blue;font-size:50px;font-weight:bold;font-family:sans-serif;','color:#d61a7f;');

