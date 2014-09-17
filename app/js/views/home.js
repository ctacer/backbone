
define([
  'jquery',
  'underscore',
  'backbone',
  'storage',
  'backend-api',
  'navi',
  'text!templates/home.html'

], function ($, _, Backbone, storage, backendApi, navi, homeTemplate) {

  var getUserInfo = function (user) {
    var list = [];
    for (var key in user) {
      if (user.hasOwnProperty(key)) {
        list.push({ key: key, val: user[key] });
      }
    }
  };

  var HomeView = Backbone.View.extend({
    el: '#view',

    render: function () {
      var user = storage.getUser();
      this.$el.html(_.template(homeTemplate) ({ user: user, userInfo: getUserInfo(user) }));
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