

define([ 'jquery', 'underscore', 'backbone' ], function ($, _, Backbone) {
  
  "use strict";

  var User = Backbone.Model.extend({
    urlRoot: '/api/users',

    defaults: {
      address: '',
      age: '',
      birthday: '',
      created_at: '',
      description: "",
      email: "",
      encrypted_password: '',
      first_name: "",
      gender: '',
      id: 0,
      image_url: '',
      last_name: '',
      person_id: 0,
      phone: '',
      status: '',
      twitter: '',
      updated_at: ''
    }


  });

  return {
    User: User
  };

});