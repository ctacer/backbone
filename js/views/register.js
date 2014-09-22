
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
        return $(event.target).find('input[name="' + name + '"]');
      };

      var getValue = function (name) {
        return $(event.target).find('input[name="' + name + '"]').val();
      };

      var setValue = function (name, value) {
        $(event.target).find('input[name="' + name + '"]').val(value);
      };

      if (getValue('password-again') != getValue('password')) {
        setValue('password-again', '');
        setValue('password', '');
        getField('password').focus();
        return false;
      }

      var formObject = {
        'email' : getValue('email'),
        'password' : getValue('password'),

        'first_name': getValue('first_name'),
        'last_name': getValue('last_name'),
        'birthday': getValue('birthday'),
        'phone': getValue('phone'),
        'address': getValue('address'),
        'image_url': getValue('image_url'),
        'twitter': getValue('twitter'),
        'description': getValue('description'),
        'status': getValue('status')
      };

      backendApi.register({
        data: formObject,
        success: function (data) {
          if (!data.error) {
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