
define([
  'jquery',
  'underscore',
  'backbone',
  'storage',
  'backend-api',
  'navi',
  'utils',
  'collections/messages',
  'models/message',
  'text!templates/nav-bar.html',
  'text!templates/home.html',
  'text!templates/messages.html'

], function ($, _, Backbone, storage, backendApi, navi, utils, MessageCollection, MessageModel, navBarTemplate, homeTemplate, messagesTemplate) {

  var getUserInfo = function (user) {
    var list = [];
    for (var key in user) {
      if (user.hasOwnProperty(key)) {
        list.push({ key: key, val: user[key] });
      }
    }
  };

  var HomeView = Backbone.View.extend({
    el: '#view',
    messageEl: '#messages-container',

    reRender: function () {
      this.$el.find(this.messageEl).html( _.template(messagesTemplate) ({ messages: this.messages.getMessages() }) );
      this.checkPagination();
    },

    render: function () {
      var user = storage.getUser();
      var that = this;

      this.messages = new MessageCollection();
      this.messages.fetchUsers({
        success: function () {
          var html = _.template(navBarTemplate + homeTemplate) ({ user: user });
          that.$el.html(html);
          that.reRender();
        }
      });
    },

    events: {
      'click #log-out-button': 'logOut',
      'click #message-send': 'sendMessage',
      'click #prev-message-page': "prev",
      'click #next-message-page': "next"
    },

    prev: utils.pagination(function () {
      this.messages.getPreviousPage();
      this.reRender();
    }),

    next: utils.pagination(function () {
      this.messages.getNextPage();
      this.reRender();
    }),

    checkPagination: function () {
      utils.checkPagination.apply(this, ['messages', {
        next: "#next-message-page",
        prev: '#prev-message-page'
      }]);
    },

    sendMessage: function (event) {
      var user = storage.getUser();

      var message = new MessageModel();
      var options = backendApi.appendToken({
        description: $('#message-description').val(),
        record_type: 'message',
        receiver_id: user.id
      });

      var that = this;

      message.save(options, {
        success: function (mess) {
          that.render();
        }
      });

      $('#message-description').val('');
    },

    logOut: function (event) {
      backendApi.logOut({
        success: function () {
          storage.clearUser();
          navi.go('login');
        }
      });

      return false;
    }
  });

  var view = new HomeView();

  var renderFunction = function () {
    view.render.apply(view, Array.prototype.slice.call(arguments, 0));
  };

  return {
    render: renderFunction
  };

});