/* global mwcRouter, FlowRouter */

Polymer({
  is: 'accounts-element',
  behaviors: [mwcMixin],
  getMeteorData() {
    this.selected = FlowRouter.getParam('route') || 'sign-in';
  },
  properties: {
    selected: {
      type: String,
      value: 'sign-in',
      observer: 'changeRoute',
    },
  },
  toast(text) {
    const toast = this.$.polymer_toast;
    toast.text = text;
    toast.toggle();
  },
  signIn(e) {
    const email = e.detail.email;
    const password = e.detail.password;
    const self = this;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        self.toast(err.reason);
      } else {
        self.toast('successful');
        FlowRouter.go('/');
      }
    });
  },
  _signIn() {
    this.$.signIn.submit();
  },
  signUp(e) {
    const email = e.detail.email;
    const password = e.detail.password;
    const self = this;
    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        self.toast(err.reason);
      } else {
        self.toast('successful');
        FlowRouter.go('/');
      }
    });
  },
  _signUp() {
    this.$.signUp.submit();
  },
  changeRoute(newValue) {
    FlowRouter.setParams({ view: newValue });
  },
});
