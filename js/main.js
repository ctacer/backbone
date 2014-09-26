
require.config({
  paths: {
    jquery: 'bower-components/jquery/dist/jquery.min',
    underscore: 'bower-components/underscore/underscore-min',
    bootstrap: 'bower-components/bootstrap/dist/js/bootstrap.min',
    backbone: 'bower-components/backbone/backbone',
    text: 'bower-components/requirejs-text/text',
    paginator: 'bower-components/backbone.paginator/lib/backbone.paginator.min',
    
    templates: '../templates'
  },

  shim: {
    "bootstrap": {
      deps: ["jquery"]
    },
    "backbone": {
      deps: ["jquery", "underscore"]
    },
    'paginator': {
      deps: ["backbone"]
    },
  }
});

require([
  "app",
  "jquery",
  "bootstrap",
  "backbone",
  "paginator"
  
  ], function (App) {
    App.initialize();
    return {};
  });