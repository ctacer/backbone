
define([ 'jquery', 'underscore', 'backbone', 'config', 'models/user' ], function ($, _, Backbone, config, UserModel) {
  
  "use strict";

  var Users = Backbone.Collection.extend({
    url: '/api/users?api_key=' + config.apiKey,
    model: UserModel
  });

  return Users;

});