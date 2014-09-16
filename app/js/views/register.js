
define([
  'jquery',
  'underscore',
  'backbone',
  'backend-api',
  'storage',
  'navi',
  'text!templates/register.html'

], function ($, _, Backbone, backendApi, storage, navi, loginTemplate) {

  var LoginView = Backbone.View.extend({
    el: '#view',

    render: function () {
      this.$el.html(loginTemplate);
    },

    events: {
      'submit form#register-form': 'submitForm'
    },

    submitForm: function (event) {
      var getField = function (name) {
        return $(event.target).find('input[name="' + name + '"]').val();
      };

      var formObject = {
        'email' : getField('email'),
        'password' : getField('password'),

        'first_name': getField('first_name'),
        'last_name': getField('last_name'),
        'birthday': getField('birthday'),
        'phone': getField('phone'),
        'address': getField('address'),
        'image_url': getField('image_url'),
        'twitter': getField('twitter'),
        'description': getField('description'),
        'status': getField('status')
      };

      backendApi.register({
        data: formObject,
        success: function (data) {
          navi.go('home');
        }
      });
      return false;
    }
  });

  var view = new LoginView();

  var renderLoginView = function () {
    view.render();
  };

  return {
    render: renderLoginView
  };

});