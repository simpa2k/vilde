define(function() {

    return [
        'controllers/AdminController',
        'controllers/AdminGigsController',
        'controllers/AdminNewsController',
        'controllers/LoginController',
        'controllers/MainController',
        'services/append-credentials-service',
        'services/get-and-prepare-gigs-service',
        'services/get-date-service',
        'services/send-object-service',
        'directives/gig',
        'directives/sticky-navbar'
    ]

});
