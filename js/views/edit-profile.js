
define([
  'jquery',
  'underscore',
  'backbone',
  'backend-api',
  'storage',
  'navi',
  'text!templates/nav-bar.html',
  'text!templates/edit-profile.html'

], function ($, _, Backbone, backendApi, storage, navi, navBarTemplate, editProfileTemplate) {

  var EditProfileView = Backbone.View.extend({
    el: '#view',

    render: function () {
      this.$el.html(_.template(navBarTemplate + editProfileTemplate) ({ user: storage.getUser() }));
    },

    events: {
      'submit form#edit-profile-form': 'submitForm'
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

      var formObject = {};
      var user = storage.getUser();

      [
        'first_name',
        'last_name',
        'birthday',
        'phone',
        'address',
        'image_url',
        'twitter',
        'description',
        'status'
      ].forEach(function (key) {
        if (getValue(key) != user[key]) {
          formObject[key] = getValue(key);
        }
      });

      backendApi.updateUser({
        data: formObject,
        id: user.id,
        success: function (data) {
          storage.setUser(data);
        }
      });

      return false;
    }
  });

  var view = new EditProfileView();

  var renderEditProfileView = function () {
    view.render();
  };

  return {
    render: renderEditProfileView
  };

});