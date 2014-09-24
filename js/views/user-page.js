
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'backend-api',
  'storage',
  'navi',
  'models/user',
  'models/message',
  'collections/user-messages',
  'text!templates/nav-bar.html',
  'text!templates/user-page.html'

], function ($, _, Backbone, config, backendApi, storage, navi, UserModel, MessageModel, UserMessagesCollection, navBarTemplate, userPageTemplate) {

  var UserPageView = Backbone.View.extend({
    el: '#view',

    getMessages: function (userId, callback) {
      callback = callback || function () {};

      var userMessagesCollection = new UserMessagesCollection();
      userMessagesCollection.fetchUsers({
        userId: userId,
        success: callback
      });
    },

    getUser: function (id, callback) {
      callback = callback || function () {};

      if (this.refUser && this.refUser.id == id) {
        return callback(this.refUser);
      }

      var that = this;
      var userModel = new UserModel({ id: id });

      userModel.fetch({
        data: $.param({ 'api_key': config.apiKey}),
        success: function (user) {
          that.refUser = user;
          callback(user);
        },
        error: function () {
          navi.go('home');
        }
      });
    },

    render: function (id) {
      this.getUser(id, function (user) {
        this.getMessages(user.id, function (messages) {
          this.$el.html(_.template(navBarTemplate + userPageTemplate) ({ user: storage.getUser(), viewedUser: user.toJSON(), messages: messages }));
        }.bind(this));        
      }.bind(this));
    },

    reRender: function () {
      this.render(this.refUser.id);
    },

    events: {
      'click #user-message-send': 'sendMessage'
    },

    sendMessage: function (event) {
      var user = storage.getUser();

      var message = new MessageModel();
      var options = backendApi.appendToken({
        description: $('#user-message-description').val(),
        record_type: 'message',
        receiver_id: this.refUser.id
      });

      var that = this;

      message.save(options, {
        success: function (mess) {
          that.reRender();
        }
      });

      $('#message-description').val('');
    }

  });

  var view = new UserPageView();

  var renderFunction = function () {
    view.render.apply(view, Array.prototype.slice.call(arguments, 0));
  };

  return {
    render: renderFunction
  };

});