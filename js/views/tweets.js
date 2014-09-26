
define([
  'jquery',
  'underscore',
  'backbone',
  'backend-api',
  'storage',
  'navi',
  'collections/tweets',
  'text!templates/nav-bar.html',
  'text!templates/tweets.html'

], function ($, _, Backbone, backendApi, storage, navi, TweetsCollection, navBarTemplate, tweetsTemplate) {

  var TweetsView = Backbone.View.extend({
    el: '#view',
    tweetEl: '#tweets',
    tweetBlank: '<div id="tweets"></div>',

    loadTweets: function (cb) {
      cb = cb.bind(this) || function () {};

      var that = this;
      var tweetsCollection = new TweetsCollection();

      tweetsCollection.fetch({
        data: {
          username: this.user.twitter,
          count: 20
        },
        success: function (tweets) {
          that.tweets = tweets;
          cb();
        },
        fail: function (error) {
          console.log(error);
          that.tweets = [];
          cb();
        }
      });
    },

    reRender: function () {      
      this.$el.find(this.tweetEl).html( _.template(tweetsTemplate) ({ tweets: this.tweets.models }) );
      this.checkPagination();
    },

    render: function () {
      this.user = storage.getUser();
      this.$el.html( _.template(navBarTemplate + this.tweetBlank) ({ user: this.user }) );

      this.loadTweets(function () {
        this.reRender();
      });
    },

    events: {
      'click #prev-tweets-page': "prev",
      'click #next-tweets-page': "next"
    },

    prev: function (event) {
      event.preventDefault();
      if ($(event.currentTarget).hasClass('disabled')) {
        return;
      }
      
      this.tweets.getPreviousPage();
      this.reRender();
    },

    next: function (event) {
      event.preventDefault();
      if ($(event.currentTarget).hasClass('disabled')) {
        return;
      }
      
      this.tweets.getNextPage();
      this.reRender();
    },

    checkPagination: function () {
      if (this.tweets.hasNextPage()) {
        this.$el.find("#next-tweets-page").removeClass("disabled")
      } else {
        this.$el.find("#next-tweets-page").addClass("disabled")
      }

      if (this.tweets.hasPreviousPage()) {
        this.$el.find("#prev-tweets-page").removeClass("disabled")
      } else {
        this.$el.find("#prev-tweets-page").addClass("disabled")
      }
    }
  });

  var view = new TweetsView();

  var renderFunction = function () {
    view.render.apply(view, Array.prototype.slice.call(arguments, 0));
  };

  return {
    render: renderFunction
  };

});