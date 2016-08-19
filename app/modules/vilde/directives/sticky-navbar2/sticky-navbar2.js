define(function() {

   var parseHeadingObject = function(headingObject) {
      var listItem = '';

      angular.forEach(headingObject, function(value, key) {
          switch(value.charAt(0)) {
              case '#':
                  //An id suggests that the intention is to scroll to a specific section, not to go another page
                  listItem = '<p class="navbar-text" ng-click="goToSection(value)">' + key + '</p>';
                  break;
              default:
                  //If an id is not provided, assume that the intention is to go to another page, not to scroll.
                  //Since we're using ui-router, we're setting the ui-sref attribute.
                  listItem = '<a class="navbar-text" ui-sref="' + value + '">' + key + '</a>';
          }
      });
      return listItem;
   };

   var constructHeadings = function(headings) {
       const numberOfItemsPerGroup = 3;

       for(var i = 0; i < headings.length; i++) {
           if(i % numberOfItemsPerGroup == 0) {
               $('<ul></ul>').appendTo('#navbar .list-container');
           }

           var listItem = parseHeadingObject(headings[i]);
           $('#navbar .list-container ul').last().append($('<li>' + listItem + '</li>'));
       };

   }

   var stickyNavbar2 = function() {

       return {
           restrict: 'E',
           templateUrl: 'app/modules/vilde/directives/sticky-navbar2/sticky-navbar2.html',
           link: function($scope, element, attributes) {
               var headings = $scope.$eval(attributes.headings);
               constructHeadings(headings);
           }
       }

   }

   angular.module('vilde')
       .directive('stickyNavbar2', stickyNavbar2);
});