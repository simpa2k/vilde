define(function() {

    return [
        'modules/vilde/controllers/AdminController',
        'modules/vilde/controllers/AdminGigsController',
        'modules/vilde/controllers/AdminNewsController',
        'modules/vilde/controllers/LoginController',
        'modules/vilde/controllers/MainController',
        'modules/vilde/services/append-credentials-service',
        'modules/vilde/services/asynch-iframe-service',
        'modules/vilde/services/get-and-prepare-gigs-service',
        'modules/vilde/services/get-date-service',
        'modules/vilde/services/send-object-service',
        'modules/vilde/directives/gig',
        'modules/vilde/directives/sticky-navbar',
        'modules/vilde/directives/youtube',
        'modules/vilde/directives/asynch-iframe'

    ]

});
