/* global mwcRouter, FlowRouter, mwcLayout */
/* eslint-disable no-console */
import '../../ui/index.html';

FlowRouter.wait();

document.addEventListener('WebComponentsReady', () => {
  FlowRouter.initialize({
  });
});
FlowRouter.route('/', {
  name: 'landing',
  triggersEnter: [() => {
    if (Meteor.user()) {
      FlowRouter.go('after-login');
    } else if (Meteor.loggingIn()) {
      Tracker.autorun(() => {
        if (Meteor.user()) {
          FlowRouter.go('after-login');
        }
      });
    } else {
      FlowRouter.go('accounts');
    }
  }],
});

const autherized = FlowRouter.group({
  name: 'autherized',
  prefix: '/autherized',
  triggersEnter: [(context, redirect) => {
    if (!(Meteor.user() || Meteor.loggingIn())) {
      redirect('/accounts');
    }
  }],
});

autherized.route('/:view?', {
  triggersEnter: [(c, r) => {
    if (!c.params.view) {
      const path = FlowRouter.path('after-login', { view: 'home' });
      r(path);
    }
  }],
  action: () => {
    mwcLayout.render('after-login', { main: 'test-layout' });
  },
  name: 'after-login',
});

FlowRouter.route('/accounts/:view?', {
  name: 'accounts',
  triggersEnter: [(c, r) => {
    if (!c.params.view) {
      const path = FlowRouter.path('accounts', { view: 'sign-in' });
      r(path);
    }
  }],
  action() {
    mwcLayout.render('accounts', {
      main: 'accounts-element',
    });
  },
});


console.log('%cEnjoy the %cM %cW %cC %cgoodness', 'color:#d61a7f;', 'color:red;font-size:50px;font-weight:bold;font-family:sans-serif;', 'color:green;font-size:50px;font-weight:bold;font-family:sans-serif;', 'color:blue;font-size:50px;font-weight:bold;font-family:sans-serif;', 'color:#d61a7f;');

