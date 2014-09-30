
define([ 'jquery', 'underscore', 'backbone', 'config', 'models/tweet', 'paginator' ], function ($, _, Backbone, config, TweetModel) {

  "use strict";

  var TweetsCollection = Backbone.PageableCollection.extend({
    model: TweetModel,

    url: '/backbone/server/tweet.php',

    mode: "client",

    state: {
      firstPage: 1,
      currentPage: 1,
      pageSize: config.tweetsPerPage
    }
  });

  return TweetsCollection;

});