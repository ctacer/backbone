
define([
  'jquery',
  'underscore',
  'backbone',
  'backend-api',
  'storage',
  'navi',
  'text!templates/nav-bar.html',
  'text!templates/search-profile.html',
  'text!templates/result-search-profile.html'

], function ($, _, Backbone, backendApi, storage, navi, navBarTemplate, searchProfileTemplate, resultSearchProfileTemplate) {

  var EditProfileView = Backbone.View.extend({
    el: '#view',
    result: '#result',

    render: function () {
      this.$el.html(_.template(navBarTemplate + searchProfileTemplate) ({ user: storage.getUser() }));
    },

    renderResult: function (result) {
      this.$el.find(this.result).html( _.template(resultSearchProfileTemplate) ({ 'result': result }) );
    },

    events: {
      'keydown #search-text': 'searchProfiles',
      'click #submit-search': 'submitSearchProfiles',
      'click #drop-down-select-search-field option': 'selectSearchField',
      'click .add-to-friends-btn': 'addToFriends'
    },

    addToFriends: function (event) {
      var ref = $(event.currentTarget).attr("data-ref");
      console.log({
        user_id: ref
      });
    },

    selectSearchField: function (event) {
      var that = $(event.currentTarget);
      var parent = that.parents('#drop-down-select-search-field');
      parent.attr('data-value', that.attr('value'));
      parent.find('.value-holder').text("'" + that.text() + "'");
    },

    submitSearchProfiles: function () {
      var that = this;
      var searchField = $('#drop-down-select-search-field').attr('data-value');
      var searchText = $('#search-text').val();
      var data = {};      
      data[searchField] = searchText;

      backendApi.searchUsers({
        data: data,
        success: function (users) {
          that.renderResult(users);
        }
      });
    },

    searchProfiles: function (event) {
      if (event.keyCode != '13') {
        return;
      }
      this.submitSearchProfiles();
    }
  });

  var view = new EditProfileView();

  var renderFunction = function () {
    view.render.apply(view, Array.prototype.slice.call(arguments, 0));
  };

  return {
    render: renderFunction
  };

});