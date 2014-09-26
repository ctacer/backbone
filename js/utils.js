
define([ 'jquery' ], function ($) {
  
  var utils = {};

  utils.pagination = function (cb) {
    cb = cb || function () {};

    return function (event) {
      event.preventDefault();
      if ($(event.currentTarget).hasClass('disabled')) {
        return;
      }
      
      cb.call(this);
    };
  };

  utils.checkPagination = function (collection, buttons) {
    if (this[collection].hasNextPage()) {
      this.$el.find(buttons.next).removeClass("disabled")
    } else {
      this.$el.find(buttons.next).addClass("disabled")
    }

    if (this[collection].hasPreviousPage()) {
      this.$el.find(buttons.prev).removeClass("disabled")
    } else {
      this.$el.find(buttons.prev).addClass("disabled")
    }
  };

  return utils;

});