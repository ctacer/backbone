
define([ 'jquery', 'underscore', 'backbone', 'models/message' ], function ($, _, Backbone, MessageModel) {
  
  "use strict";

  var Messages = Backbone.Collection.extend({
    url: '/api/wall_posts?api_key=3fce90e822fc89288eda1b59079a53963a659263',
    model: MessageModel
  });

  return Messages;

});