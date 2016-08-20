define(function() {

   var parseHeadingObject = function(headingObject) {
      var listItem = '';

      angular.forEach(headingObject, function(value, key) {
          switch(value.charAt(0)) {
              case '#':
                  //An id suggests that the intention is to scroll to a specific section, not to go another page
                  listItem = '<p class="navbar-text" ng-click="goToSection($event)">' + key + '</p>';
                  break;
              default:
                  //If an id is not provided, assume that the intention is to go to another page, not to scroll.
                  //Since we're using ui-router, we're setting the ui-sref attribute.
                  listItem = '<a class="navbar-text" ui-sref="' + value.uisref + '">' + key + '</a>';
                  break;
          }
      });
      return listItem;
   };

   var constructHeadings = function(headings, listContainer) {
       const numberOfItemsPerGroup = 3;

       for(var i = 0; i < headings.length; i++) {
           if(i % numberOfItemsPerGroup == 0) {
               listContainer.append($('<ul></ul>'));
           }

           var listItem = parseHeadingObject(headings[i]);
           var lastUl = listContainer.children('ul').last();
           lastUl.append($('<li>' + listItem + '</li>'));
       };

   }

   var stickyNavbar2 = function($compile, $templateRequest) {

       var stickyNavbarController = ['$scope', function($scope) {

           $scope.goToSection = function($event) {

              for(var i = 0; i < $scope.headings.length; i++) {
                  if($scope.headings[i][$event.target.innerHTML] != null) {
                      console.log($($scope.headings[i][$event.target.innerHTML]));
                      var section = $($scope.headings[i][$event.target.innerHTML]);
                      var navbar = $('#navbar');
                      console.log(section.offset().top);
                      $('html, body').scrollTop(section.offset().top);
                  }
              }
              /*section = $(section);
              var navbar = $('#navbar');
              //http://stackoverflow.com/questions/2905867/how-to-scroll-to-specific-item-using-jquery
              $('body').animate({
                  scrollTop: section.offset().top
              });*/
           }

       }];

       return {
           restrict: 'E',
           controller: stickyNavbarController,
           link: function($scope, element, attributes) {
               //Since we're generating a lot of dynamic html, we need to do some compiling magic to
               //be able to access our scope.
               $templateRequest('app/modules/vilde/directives/sticky-navbar2/sticky-navbar2.html')
                   .then(function(html) {
                        var template = angular.element(html);
                        var headings = $scope.$eval(attributes.headings);

                        constructHeadings(headings, template.find('.list-container'));

                        element.append(template)
                        $compile(template)($scope);
               });
           }
       }

   };

   angular.module('vilde')
       .directive('stickyNavbar2', stickyNavbar2);
});