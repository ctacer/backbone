<?php
  require_once("twitteroauth.php"); 

  $settings = array(
    'consumer_key' => "dteuYhW76H6GGyojxLdZPtoA5",
    'consumer_secret' => "MVo8KWRZBrhCWuTA6kGlVm4DlBNVCJtREw8XKQJv4maI5BaWjB",
    'oauth_access_token' => "2369300834-dUCsFL6s566dc6oIi7eHjt7SAdEgSRJ5wdHLUZH",
    'oauth_access_token_secret' => "HwfUQmkW1o8LoV7CyLZbWPubxCZPXOTSgajPQlhFsieTu"
    );

  $username = filter_input(INPUT_GET, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
  $count = filter_input(INPUT_GET, 'count', FILTER_SANITIZE_NUMBER_INT);    

  $connection = new TwitterOAuth($settings['consumer_key'], $settings['consumer_secret'], $settings['oauth_access_token'], $settings['oauth_access_token_secret']);

  $params = array(
    'count' => $count,
    'screen_name' => $username
    );

  $url = '/statuses/user_timeline';

  $tweets = $connection->get($url, $params);

      // Return JSON Object
  header('Content-Type: application/json');

  echo json_encode($tweets);