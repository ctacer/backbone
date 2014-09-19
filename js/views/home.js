
define([
  'jquery',
  'underscore',
  'backbone',
  'storage',
  'backend-api',
  'navi',
  'collections/messages',
  'models/message',
  'text!templates/nav-bar.html',
  'text!templates/home.html'

], function ($, _, Backbone, storage, backendApi, navi, MessageCollection, MessageModel, navBarTemplate, homeTemplate) {

  var messages = new MessageCollection();

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

    render: function () {
      var user = storage.getUser();
      var that = this;

      messages.fetch({
        success: function (list) {
          var html = _.template(navBarTemplate + homeTemplate) ({ user: user, messages: list.models });
          that.$el.html(html);
        }
      });      
    },

    events: {
      'click #log-out-button': 'logOut',
      'click #message-send': 'sendMessage'
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

  var renderLoginView = function () {
    view.render();
  };

  return {
    render: renderLoginView
  };

});