
define([ 'jquery', 'underscore', 'backbone', 'models/user' ], function ($, _, Backbone, UserModel) {
  
  "use strict";

  var Users = Backbone.collection.extend({
    url: '/api/users',
    model: UserModel.User
  });

  return {
    Users: Users
  };

});