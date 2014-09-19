

define([ 'jquery', 'underscore', 'backbone' ], function ($, _, Backbone) {
  
  "use strict";

  var Message = Backbone.Model.extend({
    urlRoot: '/api/wall_posts',

    defaults: {
      record_type: '',
      description: '',
      image_url: null,
      video_url: null,
      subject: null,
      visibility: false,
      created_at: '',
      updated_at: ''
    }


  });

  return Message;

});