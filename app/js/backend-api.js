
define([ 'jquery' ], function ($) {
  
  "use strict";

  var api = {};
  var accessToken = '3fce90e822fc89288eda1b59079a53963a659263';

  var appendToken = function (params) {
    params = params || {};
    params['api_key'] = accessToken;
    return params;
  };

  var ajax = function (props) {
    props.data = appendToken(props.data);

    $.ajax({
      url: props.url,
      type: props.type || 'GET',
      data: props.data,
      success: (typeof props.success == 'function') ? props.success : function () { console.log('success for ' + props.url); },
      error: (typeof props.success == 'function') ? props.error : function () { console.log('error for ' + props.url); }
    });
  };

  api.login = function (props) {
    ajax({
      url: '/api/sign_in',
      type: 'POST',
      data: props.data || {},
      success: props.success,
      error: props.error
    });
  };

  api.register = function (props) {
    ajax({
      url: '/api/sign_up',
      type: 'POST',
      data: props.data || {},
      success: props.success,
      error: props.error
    });
  };

  api.logOut = function (props) {
    ajax({
      url: '/api/sign_out',
      type: 'DELETE',
      data: props.data || {},
      success: props.success,
      error: props.error
    });
  };

  return api;
});