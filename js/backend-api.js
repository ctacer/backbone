
define([ 'jquery' ], function ($) {
  
  "use strict";

  var api = {};
  var accessToken = '3fce90e822fc89288eda1b59079a53963a659263';

  /**
   * function appends access token to every request object
   */
  var appendToken = function (params) {
    params = params || {};
    params['api_key'] = accessToken;
    return params;
  };

  api.appendToken = appendToken;

  var ajax = function (props) {
    props.data = appendToken(props.data);

    var success = (typeof props.success == 'function') ? props.success : function () { console.log('success for ' + props.url); };
    var error = (typeof props.error == 'function') ? props.error : function (err) { console.log('error for ' + props.url + "\n" + error.message); };

    $.ajax({
      url: props.url,
      type: props.type || 'GET',
      method: props.type || 'GET',
      data: props.data,
      // crossDomain: true,
      // dataType: 'jsonp',
      headers: {
        'accept': '*/*'
      },
      success: function (data) {
        if (data.error) { 
          error({ message: data.error });
        }
        else {
          success(data);
        }
      },
      error: error
    });
  };

  /**
   * LOG IN
   * POST "/api/sign_in"
   * Parameters: "email", "password"
   * Error: { error: "Wrong credentials" }
   */
  api.login = function (props) {
    ajax({
      url: '/api/sign_in',
      type: 'POST',
      data: props.data || {},
      success: props.success,
      error: props.error
    });
  };

  /**
   * SIGN UP
   * POST “/api/sign_up”
   * Parameters: [
   *       first_name, 
   *       last_name, 
   *       email*, 
   *       birthday, 
   *       phone, address, 
   *       image_url, 
   *       twitter, 
   *       description, 
   *       status, 
   *       password*   
   * ]
   * (* - required fields)
   */
  api.register = function (props) {
    ajax({
      url: '/api/sign_up',
      type: 'POST',
      data: props.data || {},
      success: props.success,
      error: props.error
    });
  };

  /**
   * LOG OUT (LOGOUT USER, WHICH ID IS IN COOKIE)
   * DELETE  “/api/sign_out”
   * Success
   * { message: "Signed out successfully" }
   */
  api.logOut = function (props) {
    ajax({
      url: '/api/sign_out',
      type: 'DELETE',
      data: props.data || {},
      success: props.success,
      error: props.error
    });
  };

  /**
   * UPDATE USER
   * Pass only parameters, which you want to update
   * PUT “/api/users/:id”
   * Permitted parameters: [
   *       first_name, 
   *       last_name, 
   *       birthday, 
   *       phone, 
   *       address,  
   *       image_url, 
   *       twitter, 
   *       description, 
   *       status
   * ]
   */
  api.updateUser = function (props) {
    ajax({
      url: '/api/users/' + props.id,
      type: 'PUT',
      data: props.data || {},
      success: props.success,
      error: props.error
    });
  };

  /**
   * GET PROFILE
   * GET “/api/users/:id”
   */
  api.getUser = function () {};

  /**
   * CREATE A MESSAGE
   * POST "/api/wall_posts"
   * Required parameters: record_type, receiver_id
   * Other permitted parameters:
   * If record_type:
   *   "message" - description, subject
   *   "image" - description, subject, image_url
   *   "video" - description, subject, video_url
   *
   * Example:
   * Parameters:
   *    {
   *       "api_key"=>"4bb183794be47fe3695fe2d2068a74b44bd09744",
   *       "record_type"=>"message",
   *       "receiver_id"=>"20",
   *       "description"=>"Message biig"
   *    }
   */
  api.createMessage = function () {};

  /**
   * GET MESSAGES
   * GET "/api/wall_posts
   * If there no wallposts were found for user response would be an empty array
   */
  api.getMessages = function () {};

  /**
   * UPDATE MESSAGES
   * Pass only parameters, which you want to update
   * PUT “/api/wall_posts/:id”
   * Can change:
   * - description, subject, visibility in messages
   * - video_url, visibility in video
   * - image_url, visibility in image
   */
  api.updateMessage = function () {};

  /**
   * DELETE MESSAGES
   * DELETE “/api/wall_posts/:id”
   * Parameters: [ user_id ]
   */
  api.deleteMessages = function () {};

  /**
   * ADD FRIEND
   * POST   /api/add_friend
   * 
   */
  api.addFriend = function () {};

  /**
   * DELETE FRIEND
   * DELETE /api/remove_friend/:id
   * 
   */
  api.deleteFriend = function () {};

  /**
   * GET FRIENDS
   * GET /api/friends
   */
  api.getFriends = function () {};

  /**
   * SEARCH FRIENDS 
   * GET /api/friends/search
   * Possible search criteria:  first_name, last_name, twitter, gender, age 
   */
  api.searchFriends = function () {};

  /**
   * SEARCH USERS 
   * GET /api/users/search
   * Possible search criteria:  first_name, last_name
   */
  api.searchUsers = function (props) {
    ajax({
      url: '/api/users/search',
      type: 'GET',
      data: props.data || {},
      success: props.success,
      error: props.error
    });
  };

  /**
   * SEARCH MESSAGES 
   * GET /api/wall_posts/search
   * Possible search criteria:  visibility, type, receiver_id, subject
   */
  api.searchMessages = function () {};

  return api;
});