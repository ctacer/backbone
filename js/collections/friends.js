
define([ 'jquery', 'underscore', 'backbone', 'config', 'models/user' ], function ($, _, Backbone, config, UserModel) {
  
  "use strict";

  var Friends = Backbone.PageableCollection.extend({
    model: UserModel,

    url: '/api/friends?api_key=' + config.apiKey,

    mode: 'client',
    
    state: {
      firstPage: 1,
      currentPage: 1,
      pageSize: config.friendsPerPage
    }
  });

  return Friends;

});