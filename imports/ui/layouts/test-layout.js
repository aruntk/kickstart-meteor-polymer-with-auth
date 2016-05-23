Polymer({
  is:"test-layout",
  behaviors:[mwcMixin,mwcRouter],
  getMeteorData:function(){
    this.set("status",Meteor.status().status);
    if(!Meteor.isCordova){
      this.notCordova = true;
    }
  },
  properties:{
    mwcRoute:{
      type:Object,
      name:"landing",
      params:{"view":"home"}
    },
    status:{
      type:String
    },
    notCordova:Boolean

  },
  second:function(){
    this.set("mwcRoute.params.view", "second"); 
  },
  home:function(){

    this.set("mwcRoute.params.view", "home"); 
  },
  toast:function(text){
    var toast = this.$.polymer_toast;
    toast.text = text;
    toast.toggle();
  },
  signOut:function(){
    var self = this;
    Meteor.logout(function(e){
      if(e){
        self.toast(e.reason);
      }
      else{

        self.toast("successful");
        FlowRouter.go('accounts');
      }
    })
  }


});


