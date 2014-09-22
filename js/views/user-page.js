
define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'backend-api',
  'storage',
  'navi',
  'models/user',
  'text!templates/nav-bar.html',
  'text!templates/user-page.html'

], function ($, _, Backbone, config, backendApi, storage, navi, UserModel, navBarTemplate, userPageTemplate) {

  var UserPageView = Backbone.View.extend({
    el: '#view',

    render: function (id) {      
      var that = this;
      var userModel = new UserModel({ id: id });

      userModel.fetch({
        data: $.param({ 'api_key': config.apiKey}),
        success: function (user) {
          that.$el.html(_.template(navBarTemplate + userPageTemplate) ({ user: storage.getUser(), viewedUser: user.toJSON() }));
        },
        error: function () {
          navi.go('home');
        }
      });
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