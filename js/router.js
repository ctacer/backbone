  
define([
  'jquery',
  'underscore',
  'backbone',
  'storage',
  'navi',
  'views/home',
  'views/login',
  'views/register',
  'views/edit-profile'

], function($, _, Backbone, storage, navi, homeView, loginView, registerView, editProfileView) {

  "use strict";

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'homeAction',

      'login': 'loginAction',
      'register': 'registerAction',
      'edit-profile': 'editProfile',

      'home': 'homeAction',

      '*actions': 'homeAction'
    }
  });

  var initialize = function () {

    var user;

    var appRouter = new AppRouter;

    appRouter.on('route:loginAction', function () {
      user = storage.getUser();
      if (user) {
        return navi.go('home');
      }
      loginView.render();
    });

    appRouter.on('route:registerAction', function () {
      user = storage.getUser();
      if (user) {
        return navi.go('home');
      }
      registerView.render();
    });

    appRouter.on('route:homeAction', function (actions) {

      user = storage.getUser();
      if (!user) {
        return navi.go('login');
      }
      homeView.render();
    });

    appRouter.on('route:editProfile', function () {
      user = storage.getUser();
      if (!user) {
        return navi.go('login');
      }
      editProfileView.render();
    });

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});