
define([
  'jquery',
  'underscore',
  'backbone',
  'backend-api',
  'storage',
  'navi',
  'utils',
  'config',
  'collections/tweets',
  'text!templates/nav-bar.html',
  'text!templates/tweets.html'

], function ($, _, Backbone, backendApi, storage, navi, utils, config, TweetsCollection, navBarTemplate, tweetsTemplate) {

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
          count: config.tweetsToLoad
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

    prev: utils.pagination(function () {
      this.tweets.getPreviousPage();
      this.reRender();
    }),

    next: utils.pagination(function () {
      this.tweets.getNextPage();
      this.reRender();
    }),

    checkPagination: function () {
      utils.checkPagination.apply(this, ['tweets', {
        next: "#next-tweets-page",
        prev: '#prev-tweets-page'
      }]);
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