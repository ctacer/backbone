
define([], function () {

  var storage = {};
  var keys = {};
  keys.user = 'user';

  storage.getVal = function (key) {
    return localStorage[key];
  };

  storage.getJson = function (key) {
    var val = storage.getVal(key);
    return val ? JSON.parse(val) : null;
  };

  storage.setVal = function (key, value) {
    localStorage[key] = value;
  };

  storage.setJson = function (key, value) {
    storage.setVal(key, JSON.stringify(value));
  };

  storage.getUser = function () {
    return storage.getJson(keys.user);
  };

  storage.setUser = function (user) {
    storage.setJson(keys.user, user);
  };

  storage.clearUser = function () {
    storage.setVal(keys.user, '');
  };
  
  return storage;
});