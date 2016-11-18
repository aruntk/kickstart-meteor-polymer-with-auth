/* global mwcRouter, mwcMixin, FlowRouter */

Polymer({
  is: 'test-layout',
  behaviors: [mwcMixin, mwcRouter],
  getMeteorData() {
    this.set('status', Meteor.status().status);
    if (!Meteor.isCordova) {
      this.notCordova = true;
    }
  },
  properties: {
    mwcRoute: {
      type: Object,
      name: 'landing',
      params: { view: 'home' },
    },
    status: {
      type: String,
    },
    notCordova: Boolean,
  },
  second() {
    this.set('mwcRoute.params.view', 'second');
  },
  home() {
    this.set('mwcRoute.params.view', 'home');
  },
  toast(text) {
    const toast = this.$.polymer_toast;
    toast.text = text;
    toast.toggle();
  },
  signOut() {
    const self = this;
    Meteor.logout((e) => {
      if (e) {
        self.toast(e.reason);
      } else {
        self.toast('successful');
        FlowRouter.go('accounts');
      }
    });
  },
});
