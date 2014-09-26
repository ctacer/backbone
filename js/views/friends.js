
define([
  'jquery',
  'underscore',
  'backbone',
  'backend-api',
  'storage',
  'navi',
  'utils',
  'collections/friends',
  'text!templates/nav-bar.html',
  'text!templates/friends.html'

], function ($, _, Backbone, backendApi, storage, navi, utils, FriendsCollection, navBarTemplate, friendsTemplate) {

  var FriendsView = Backbone.View.extend({
    el: '#view',
    containerEl: '#friends',
    container: '<div id="friends"></div>',

    loadFriends: function (cb) {
      var that = this;
      var friendsCollection = new FriendsCollection();

      friendsCollection.fetch({
        success: function (friends) {
          that.friends = friends;          
          cb && cb.call(that);
        }
      });
    },

    render: function () {
      this.user = storage.getUser();
      this.loadFriends(function () {
        this.$el.html( _.template(navBarTemplate + this.container) ({ user: this.user }));
        this.reRender();
      });
    },

    reRender: function () {
      this.$el.find(this.containerEl).html( _.template(friendsTemplate) ({ friends: this.friends.models }));
      this.checkPagination();
    },

    events: {
      'click #prev-friends-page': "prev",
      'click #next-friends-page': "next"
    },

    prev: utils.pagination(function () {
      this.friends.getPreviousPage();
      this.reRender();
    }),

    next: utils.pagination(function () {
      this.friends.getNextPage();
      this.reRender();
    }),

    checkPagination: function () {
      utils.checkPagination.apply(this, ['friends', {
        next: "#next-friends-page",
        prev: '#prev-friends-page'
      }]);
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