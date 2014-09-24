
define([ 'jquery', 'underscore', 'backbone', 'config', 'models/user', 'storage', 'collections/friends' ], function ($, _, Backbone, config, UserModel, storage, FriendsCollection) {
  
  "use strict";

  var isFriend = function (user, friends) {
    for (var i = 0; i < friends.length; i++) {
      if (friends[i].id == user.id) {
        return true;
      }
    };
    return false;
  };

  var isCurrentUser = function (user) {
    var currentUser = storage.getUser();
    return !!currentUser && user.id == currentUser.id;
  };

  var buildUserList = function (users, friends) {
    return users.filter(function (user) {
      return (!isFriend(user, friends) && !isCurrentUser(user));
    });
  };

  var UnknownUsers = Backbone.Collection.extend({
    url: '/api/users/search?api_key=' + config.apiKey,
    model: UserModel,

    fetchUsers: function (props) {
      var fetchOptions = props || {};
      var userSuccess = fetchOptions.success || function () {};

      fetchOptions.success = function (users) {
        var friendsCollection = new FriendsCollection();
        friendsCollection.fetch({
          success: function (friends) {
            userSuccess(buildUserList(users.models, friends.models));
          }
        });
      }

      this.fetch(fetchOptions);
    }
  });

  return UnknownUsers;

});