
define([ 'jquery', 'underscore', 'backbone', 'config', 'models/user' ], function ($, _, Backbone, config, UserModel) {
  
  "use strict";

  var Friends = Backbone.Collection.extend({
    url: '/api/friends?api_key=' + config.apiKey,
    model: UserModel
  });

  return Friends;

});