
define([
  'jquery',
  'underscore',
  'backbone',
  'storage',
  'backend-api',
  'navi',
  'text!templates/home.html'

], function ($, _, Backbone, storage, backendApi, navi, homeTemplate) {

  var HomeView = Backbone.View.extend({
    el: '#view',

    render: function () {
      this.$el.html(_.template(homeTemplate) ({ user: storage.getUser() }));
    },

    events: {
      'click #log-out-button': 'logOut'
    },

    logOut: function (event) {
      backendApi.logOut({
        success: function () {
          storage.clearUser();
          navi.go('login');
        }
      });

      return false;
    }
  });

  var view = new HomeView();

  var renderLoginView = function () {
    view.render();
  };

  return {
    render: renderLoginView
  };

});