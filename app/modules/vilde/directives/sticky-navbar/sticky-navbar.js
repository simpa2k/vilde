define(function() {

   var stickyNavbar = function() {

       return {
           restrict: 'E',
           replace: true,
           scope: {
               headings: '='
           },
           templateUrl: 'app/modules/vilde/directives/sticky-navbar/sticky-navbar.html',
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

               /*
                * Sets the enclosing nav element's height to that of the enclosed .container-fluid,
                * which is what is actually taking the size and padding/margin of the <p>'s or <a>'s into account
                */

               var setNavbarHeight = function() {
                   $(element).css('height', $('#navbar .container-fluid').height() + 'px');
               };

               /*
                * If the navbar is fixed to the top and it's height changes so that it
                * still is fixed to the top despite it being placed above the element that it should stick to
                * it has to be fixated to it.
                */

               var checkBottomPosition = function() {
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
                   checkBottomPosition();
               };

               $(window).resize(resizeHandler);


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

                       /*
                        * If the navbar is collapsed it might end up having it's lower
                        * edge being placed above the element it should stick to.
                        */

                       checkBottomPosition();

                       navbarButton.removeClass('active');
                   } else {
                       element.addClass('expanded');
                       expandedNavbarHeight = $('#navbar .container-fluid').height();
                       element.css('height', String(expandedNavbarHeight) + 'px');

                       /*
                        * If the navbar is expanded so that its upper edge
                        * is off screen, the window has to be scrolled up to account
                        * for this.
                        */

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
       .directive('stickyNavbar', stickyNavbar);
});