
define([], function () {
  
  "use strict";

  var states = {
    'home': '/',
    'login': '/login',
    'register': '/register'
  };

  return {
    'go': function (state) {
      if (typeof state != 'string' || !states.hasOwnProperty(state)) {
        window.location.hash = states.home;
      }
      else {
        window.location.hash = states[state];
      }
    }
  };
});