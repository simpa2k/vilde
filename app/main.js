require.config({

    paths: {
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'angular': '/bower_components/angular/angular.min',
        'angular-bootstrap': '/bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'ui-router': '/bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-scroll': '/bower_components/angular-scroll/angular-scroll.min',
        'ng-parallax': '/bower_components/ng-parallax/angular-parallax.min',
        'tinymce': '/bower_components/tinymce-dist/tinymce.min',
        'angular-ui-tinymce': '/bower_components/angular-ui-tinymce/dist/tinymce.min',
        'angular-sanitize': '/bower_components/angular-sanitize/angular-sanitize.min',
        'authentication-module': 'modules/authentication-module/authentication-module',
        'vilde': 'modules/vilde/vilde'
    },
    
    shim: {
       'angular': {
           deps: ['jquery']
       },
       'angular-bootstrap': {
            deps: ['angular']
       },
       'ui-router': {
           deps: ['angular']
       }, 
       'angular-scroll': {
            deps: ['angular']  
       }, 
       'ng-parallax': {
           deps: ['angular-scroll']
       },
       'angular-ui-tinymce': {
           deps: ['angular', 'tinymce']
       }, 
       'angular-sanitize': {
           deps: ['angular']
       }, 
       'authentication-module': {
           deps: ['angular']
       }, 
       'vilde': {
           deps: ['angular-bootstrap',
                  'ui-router',
                  'ng-parallax',
                  'angular-ui-tinymce',
                  'angular-sanitize',
                  'authentication-module']
       }
    }
    
});

require(['vilde'], function() {
    
});