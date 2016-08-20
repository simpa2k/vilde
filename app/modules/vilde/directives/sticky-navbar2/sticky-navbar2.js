define(function() {

   var stickyNavbar2 = function() {

       return {
           restrict: 'E',
           replace: true,
           scope: {
               headings: '='
           },
           templateUrl: 'app/modules/vilde/directives/sticky-navbar2/sticky-navbar2.html',
           link: function($scope, element, attributes) {
               $scope.socialMedia = attributes.socialMedia;

               var elementToStickTo = $('#' + attributes.elementToStickTo);
               var collapsedNavbarHeight = element.height();
               var expandedNavbarHeight;

               var navbarPositionListener = function() {
                   var navbarHeight = element.hasClass('expanded') ? expandedNavbarHeight : collapsedNavbarHeight;
                   var elementToStickToY = elementToStickTo.offset().top;
                   var topOfWindowAlignsWithTopOfHeader = $(window).scrollTop() > (elementToStickToY - navbarHeight);

                   if(topOfWindowAlignsWithTopOfHeader) {
                       fixateElementPositionTop(element, navbarHeight);
                   } else {
                       fixateElementPositionBottom(element, elementToStickToY);
                   }

               };

               var fixateElementPositionTop = function(element, elementHeight) {

                   element.css({
                       'z-index': '10',
                       'position': 'fixed',
                       'top': '0',
                       'height': String(elementHeight) + 'px'
                   });
               };

               var fixateElementPositionBottom = function(element, bottomOffset) {

                   element.css({
                       'z-index': '10',
                       'position': 'absolute',
                       'bottom': String(bottomOffset),
                       'top': ''
                   });
               };

               $scope.goToSection = function(sectionId) {
                   $('html').animate({
                       scrollTop: $(sectionId).offset().top
                   });
               };

               $scope.toggleNavbar = function() {
                   var navbarButton = document.getElementById('navbar-button');

                   if(element.hasClass('expanded')) {
                       element.removeClass('expanded');
                       element.css('height', String(collapsedNavbarHeight) + 'px');

                       navbarButton.removeClass('active');
                   } else {
                       element.addClass('expanded');
                       expandedNavbarHeight = $('#navbar .container-fluid').height();
                       element.css('height', String(expandedNavbarHeight) + 'px');

                       var navbarY = element.offset().top;
                       if(navbarY < window.scrollY) {
                           $('html').scrollTop(navbarY);
                       }

                       navbarButton.addClass('active');
                   }

               };

               $(window).scroll(navbarPositionListener);
           }
       }

   };

   angular.module('vilde')
       .directive('stickyNavbar2', stickyNavbar2);
});