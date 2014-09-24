
define([
  'jquery',
  'underscore',
  'backbone',
  'backend-api',
  'storage',
  'navi',
  'collections/friends',
  'text!templates/nav-bar.html',
  'text!templates/friends.html'

], function ($, _, Backbone, backendApi, storage, navi, FriendsCollection, navBarTemplate, friendsTemplate) {

  var FriendsView = Backbone.View.extend({
    el: '#view',

    render: function () {
      var that = this;

      var friendsCollection = new FriendsCollection();
      friendsCollection.fetch({
        success: function (friends) {
          that.$el.html( _.template(navBarTemplate + friendsTemplate) ({ user: storage.getUser(), friends: friends.models }));
        }
      });      
    }
  });

  var view = new FriendsView();

  var renderFunction = function () {
    view.render.apply(view, Array.prototype.slice.call(arguments, 0));
  };

  return {
    render: renderFunction
  };

});