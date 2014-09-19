  
define([
  'jquery',
  'underscore',
  'backbone',
  'storage',
  'navi',
  'views/home',
  'views/login',
  'views/register',
  'views/edit-profile',
  'views/search-profile'

], function($, _, Backbone, storage, navi, homeView, loginView, registerView, editProfileView, searchProfileView) {

  "use strict";

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'homeAction',
      
      'login': 'loginAction',
      'register': 'registerAction',
      'edit-profile': 'editProfile',
      'search-profile': 'searchProfile',
      'home': 'homeAction',

      '*actions': 'homeAction'
    }
  });

  var initialize = function () {

    var user;

    var appRouter = new AppRouter;

    _.each({

      'route:loginAction': function () {
        user = storage.getUser();
        if (user) {
          return navi.go('home');
        }
        loginView.render();
      },

      'route:registerAction': function () {
        user = storage.getUser();
        if (user) {
          return navi.go('home');
        }
        registerView.render();
      },

      'route:homeAction': function (actions) {
        user = storage.getUser();
        if (!user) {
          return navi.go('login');
        }
        homeView.render();
      },

      'route:editProfile': function () {
        user = storage.getUser();
        if (!user) {
          return navi.go('login');
        }
        editProfileView.render();
      },

      'route:searchProfile': function () {
        user = storage.getUser();
        if (!user) {
          return navi.go('login');
        }
        searchProfileView.render();
      }

    }, function (listener, key) {
      appRouter.on(key, listener);
    });

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});