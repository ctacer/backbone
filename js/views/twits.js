
define([
  'jquery',
  'underscore',
  'backbone',
  'backend-api',
  'storage',
  'navi',
  'text!templates/nav-bar.html',
  'text!templates/twits.html'

], function ($, _, Backbone, backendApi, storage, navi, navBarTemplate, twitsTemplate) {

  var TwitsView = Backbone.View.extend({
    el: '#view',

    render: function () {
      var user = storage.getUser();

      this.$el.html( _.template(navBarTemplate + twitsTemplate) ({ user: user }) );

      $.ajax({
        url: '/backbone/server/tweet.php/?username=' + 'ukrpravda_news',
        type: 'GET',
        success: function (response) {
          console.log(response);
        },
        error: function (error) {
          console.log(error);
        }
      });
    }
  });

  var view = new TwitsView();

  var renderFunction = function () {
    view.render.apply(view, Array.prototype.slice.call(arguments, 0));
  };

  return {
    render: renderFunction
  };

});