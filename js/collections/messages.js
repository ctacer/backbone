
define([ 'jquery', 'underscore', 'backbone', 'config', 'models/message', 'collections/users' ], function ($, _, Backbone, config, MessageModel, UserCollection) {
  
  "use strict";

  var getUser = function (userId, users) {
    for (var i = 0; i < users.length; i ++) {
      if (users[i].id == userId) {
        return users[i].get('first_name') + ' ' + users[i].get('last_name');
      }
    }
    return 'Anonymous';
  };

  var buildMessageList = function (messages, users) {
    messages.forEach(function (message) {
      message.set('sender', getUser(message.get('sender_id'), users));
      message.set('receiver', getUser(message.get('receiver_id'), users));
    });
    return messages;
  };

  var Messages = Backbone.Collection.extend({
    url: '/api/wall_posts?api_key=' + config.apiKey,
    model: MessageModel,

    fetchUsers: function (props) {
      this.fetch({
        success: function (messages) {
          var userCollection = new UserCollection();
          userCollection.fetch({
            success: function (users) {
              props && props.success && props.success(buildMessageList(messages.models, users.models));
            }
          });
        }
      });
      if (props && props.success) {

      }
    }
  });

  return Messages;

});