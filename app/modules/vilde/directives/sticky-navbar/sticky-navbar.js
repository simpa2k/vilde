define(function() {

   var stickyNavbar = function() {

       return {
           restrict: 'E',
           replace: true,
           scope: {
               headings: '=',
               socialmedia: '='
           },
           templateUrl: 'app/modules/vilde/directives/sticky-navbar/sticky-navbar.html',
           link: function($scope, element, attributes) {
               $scope.socialMedia = $scope.$eval(attributes.socialMedia);

               var elementToStickTo = $('#' + attributes.elementToStickTo);
               var collapsedNavbarHeight = element.height();
               var expandedNavbarHeight;

               var navbarPositionListener = function() {
                   var navbarHeight = element.hasClass('expanded') ? expandedNavbarHeight : collapsedNavbarHeight;
                   var elementToStickToY = elementToStickTo.offset().top;
                   var topOfWindowAlignsWithTopOfNavbar= $(window).scrollTop() > (elementToStickToY - navbarHeight);

                   if(topOfWindowAlignsWithTopOfNavbar) {
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

               /*
                * Sets the enclosing nav element's height to that of the enclosed .container-fluid,
                * which is what is actually taking the size and padding/margin of the <p>'s or <a>'s into account
                */

               var setNavbarHeight = function() {
                   var correctHeight = $(element).children('.container-fluid').height();

                   if(element.hasClass('expanded')) {
                       expandedNavbarHeight = correctHeight;
                       $(element).css('height', expandedNavbarHeight);
                   } else {
                       collapsedNavbarHeight = correctHeight;
                       $(element).css('height', collapsedNavbarHeight);
                   }
               };

               /*
                * If the navbar is expanded so that its upper edge
                * is off screen, the window has to be scrolled up to account
                * for this.
                */

               var checkNavbarUpperEdge = function() {
                   var navbarY = $(element).offset().top;

                   if(navbarY < window.scrollY) {
                       $('html').scrollTop(navbarY);
                   }
               };

               /*
                * If the navbar is fixed to the top and it's height changes so that it
                * still is fixed to the top, despite the lower edge hanging above the element
                * that it should stick to, it has to be moved down.
                */

               var checkNavbarLowerEdge = function() {
                   var elementBottom = $(element).offset().top + $(element).height();

                   if(elementBottom < elementToStickTo.offset().top) {
                       fixateElementPositionBottom($(element), elementToStickTo.offset().top);
                   }
               };

               /*
                * If the navbar height is not constantly checked on resize
                * the .container-fluid might get bigger than the navbar, resulting in ugliness.
                * The position of the navbar might also change if it gets smaller, resulting in it
                * being placed above the element that it should stick to.
                */

               var resizeHandler = function() {
                   setNavbarHeight();
                   checkNavbarUpperEdge();
                   checkNavbarLowerEdge();
               };

               $scope.goToSection = function(sectionId) {
                   $('html').animate({
                       scrollTop: $(sectionId).offset().top
                   });
               };

               $scope.toggleNavbar = function() {
                   var navbarButton = $('#navbar-button');

                   if(element.hasClass('expanded')) {
                       element.removeClass('expanded');
                       element.css('height', String(collapsedNavbarHeight) + 'px');

                       checkNavbarLowerEdge();

                       navbarButton.removeClass('active');
                   } else {
                       element.addClass('expanded');
                       expandedNavbarHeight = $(element).children('.container-fluid').height();
                       element.css('height', String(expandedNavbarHeight) + 'px');

                       checkNavbarUpperEdge();

                       navbarButton.addClass('active');
                   }

               };


               if(elementToStickTo.length == 0) {
                   $(element).css({
                       'position': 'static'
                   });

                   $(window).resize(function() {
                       setNavbarHeight();

                   });
               } else {
                   $(window).scroll(navbarPositionListener);
                   $(window).resize(function() {
                       setNavbarHeight();
                       checkNavbarUpperEdge();
                       checkNavbarLowerEdge();
                   });
               }
           }
       }

   };

   angular.module('vilde')
       .directive('stickyNavbar', stickyNavbar);
});