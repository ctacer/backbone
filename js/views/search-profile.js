
define([
  'jquery',
  'underscore',
  'backbone',
  'backend-api',
  'storage',
  'navi',
  'text!templates/nav-bar.html',
  'text!templates/search-profile.html'

], function ($, _, Backbone, backendApi, storage, navi, navBarTemplate, findProfileTemplate) {

  var EditProfileView = Backbone.View.extend({
    el: '#view',

    render: function () {
      this.$el.html(_.template(navBarTemplate + findProfileTemplate) ({ user: storage.getUser() }));
    },

    events: {
      'keydown #search-text': 'searchProfiles'
    },

    searchProfiles: function (event) {
      console.log(event);
      if (event.keyCode != '13') {
        return;
      }

      var searchField = $('#search-field').val();
      var searchText = $('#search-text').val();
      var data = {};      
      data[searchField] = searchText;

      backendApi.searchUsers({
        data: data,
        success: function (users) {
          console.log(users);
        }
      });

      console.log({ text: searchText, field: searchField });
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