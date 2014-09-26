  
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
  'views/search-profile',
  'views/user-page',
  'views/friends',
  'views/tweets'

], function($, _, Backbone, storage, navi, homeView, loginView, registerView, editProfileView, searchProfileView, userPageView, friendsView, tweetsView) {

  "use strict";

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'homeAction',
      
      'login': 'loginAction',
      'register': 'registerAction',
      'edit-profile': 'editProfile',
      'search-profile': 'searchProfile',
      'home': 'homeAction',
      'user-page/:id': 'userPageAction',
      'friends': 'friendsAction',
      'tweets': 'tweetsAction',

      '*actions': 'homeAction'
    }
  });

  var initialize = function () {

    var user;

    var appRouter = new AppRouter;

    _.each({

      'loginAction': function () {
        user = storage.getUser();
        if (user) {
          return navi.go('home');
        }
        loginView.render();
      },

      'registerAction': function () {
        user = storage.getUser();
        if (user) {
          return navi.go('home');
        }
        registerView.render();
      },

      'homeAction': function (actions) {
        user = storage.getUser();
        if (!user) {
          return navi.go('login');
        }
        homeView.render();
      },

      'editProfile': function () {
        user = storage.getUser();
        if (!user) {
          return navi.go('login');
        }
        editProfileView.render();
      },

      'searchProfile': function () {
        user = storage.getUser();
        if (!user) {
          return navi.go('login');
        }
        searchProfileView.render();
      },

      'userPageAction': function (id) {
        if (!id) {
          return navi.go('home');
        }
        userPageView.render(id);
      },

      'friendsAction': function () {
        user = storage.getUser();
        if (!user) {
          return navi.go('login');
        }
        friendsView.render();
      },

      'tweetsAction': function () {
        user = storage.getUser();
        if (!user) {
          return navi.go('login');
        }
        tweetsView.render();
      }

    }, function (listener, key) {
      appRouter.on('route:' + key, listener);
    });

    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});