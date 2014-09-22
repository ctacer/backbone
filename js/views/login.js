
define([
  'jquery',
  'underscore',
  'backbone',
  'backend-api',
  'storage',
  'navi',
  'text!templates/login.html'

], function ($, _, Backbone, backendApi, storage, navi, loginTemplate) {

  var LoginView = Backbone.View.extend({
    el: '#view',

    render: function () {
      this.$el.html(loginTemplate);
    },

    events: {
      'submit form#login-form': 'submitForm'
    },

    submitForm: function (event) {
      var formObject = {
        'email' : $(event.target).find('input[type="text"]').val(),
        'password' : $(event.target).find('input[type="password"]').val()
      };
      backendApi.login({
        data: formObject,
        success: function (data) {
          if (!data.error) {
            storage.setUser(data);
            navi.go('home');
          }
          else {}
        }
      });
      return false;
    }
  });

  var view = new LoginView();

  var renderFunction = function () {
    view.render.apply(view, Array.prototype.slice.call(arguments, 0));
  };

  return {
    render: renderFunction
  };

});