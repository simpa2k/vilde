define(function() {

    return [
        'modules/vilde/controllers/AdminController',
        'modules/vilde/controllers/AdminDescriptionController',
        'modules/vilde/controllers/AdminGigsController',
        'modules/vilde/controllers/AdminNewsController',
        'modules/vilde/controllers/AdminQuotesController',
        'modules/vilde/controllers/HomeController',
        'modules/vilde/controllers/LoginController',
        'modules/vilde/controllers/MainController',
        'modules/vilde/services/append-credentials-service',
        'modules/vilde/services/asynch-iframe-service',
        'modules/vilde/services/news-service',
        'modules/vilde/services/gigs-service',
        'modules/vilde/services/description-service',
        'modules/vilde/services/quotes-service',
        'modules/vilde/services/quote-sections-service',
        //'modules/vilde/services/date-service',
        'modules/vilde/services/send-object-service',
        'modules/vilde/directives/gig',
        'modules/vilde/directives/sticky-navbar/sticky-navbar',
        'modules/vilde/directives/youtube',
        'modules/vilde/directives/asynch-iframe'

    ]

});
