
require.config({
  paths: {
    jquery: 'bower-components/jquery/dist/jquery',
    underscore: 'bower-components/underscore/underscore-min',
    bootstrap: 'bower-components/bootstrap/dist/js/bootstrap.min',
    backbone: 'bower-components/backbone/backbone',
    text: 'bower-components/requirejs-text/text',
    
    templates: '../templates'
  },

  shim: {
    "bootstrap": {
      deps: ["jquery"]
    },
    "backbone": {
      deps: ["jquery", "underscore"]
    }
  }
});

require([
  "app",
  "jquery",
  "bootstrap",
  "backbone"
  
  ], function (App) {
    App.initialize();
    return {};
  });