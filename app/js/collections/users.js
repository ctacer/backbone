
define([ 'jquery', 'underscore', 'backbone' ], function ($, _, Backbone) {
  
  "use strict";

  var Users = Backbone.collection.extend({
    url: '/api/users'
  });

  return {
    Users: Users
  };

});