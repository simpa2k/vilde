define(function() {

    var app = angular.module('vilde');
    
    app.directive('stickyNavbar', function() {
        return {
            restrict: 'EA',
            templateUrl: 'app/modules/vilde/directives/sticky-navbar/sticky-navbar.html',
            link: function($scope, element, attrs) {
                var navbarTextElements = document.getElementsByClassName('navbar-text');

                function getY(element) {
                    var boundingClientRect = element.getBoundingClientRect();
                    return boundingClientRect.top + window.scrollY;
                }

                /*
                 *
                 * Function to fixate navbar to top of window when scrolling down past it
                 * and then pop it back when scrolling above it.
                 *
                 */

                var main = document.getElementById('main');
                var navbar = document.getElementById('navbar');
                var collapsedNavbarHeight = navbar.getBoundingClientRect().height;
                var expandedNavbarHeight;

                function navbarPositionListener() {
                    var navbarHeight = navbar.classList.contains('expanded') ? expandedNavbarHeight : collapsedNavbarHeight;
                    var mainY = getY(main);
                    var topOfWindowAlignsWithTopOfHeader = window.scrollY > (mainY - navbarHeight);

                    if (topOfWindowAlignsWithTopOfHeader) {
                        fixateElementPositionTop(navbar, navbarHeight);
                    } else {
                        fixateElementPositionBottom(navbar, mainY);
                    }

                }

                function fixateElementPositionTop(element, elementHeight) {

                    element.style.zIndex = "10";
                    element.style.position = "fixed";
                    element.style.bottom = "";
                    element.style.top = "0";
                    element.style.height = String(elementHeight) + "px";

                }

                function fixateElementPositionBottom(element, bottomOffset) {

                    element.style.zIndex = "10";
                    element.style.position = "absolute";
                    element.style.bottom = String(bottomOffset);
                    element.style.top = "";

                }

                window.addEventListener('scroll', navbarPositionListener, false);

                /*
                 *
                 * Expands and collapses navbar on small screens.
                 *
                 */

                function toggleNavbar() {
                    var navbarButton = document.getElementById('navbar-button');

                    if(navbar.classList.contains('expanded')) {
                        navbar.classList.remove('expanded');
                        navbar.style.height = String(collapsedNavbarHeight) + 'px';

                        navbarButton.classList.remove('active');
                    } else {
                        navbar.classList.add('expanded');
                        expandedNavbarHeight = document.querySelector('#navbar .container-fluid').getBoundingClientRect().height;
                        navbar.style.height = String(expandedNavbarHeight) + 'px';

                        var navbarY = getY(navbar);
                        if(navbarY < window.scrollY) {
                            window.scrollTo(0, navbarY);
                        }

                        navbarButton.classList.add('active');
                    }

                }

                var navbarButton = document.getElementById('navbar-button');
                navbarButton.addEventListener('click', toggleNavbar, false);

                function headingClick(e) {
                    var item = e.target;

                    var newsSection = document.getElementById('news');
                    var gigsSection = document.getElementById('gigs');
                    var memberSection = document.getElementById('member-section');
                    var aboutSection = document.getElementById('about');
                    var mediaSection = document.getElementById('media-section');
                    var contactSection = document.getElementById('contact');

                    var navbarHeight = document.getElementById('navbar').getBoundingClientRect().height;

                    switch(item.innerHTML) {
                        case 'OM VILDE':
                            window.scrollTo(0, getY(aboutSection) - navbarHeight);
                            break;
                        case 'MEDLEMMAR':
                            window.scrollTo(0, getY(memberSection));
                            break;
                        case 'NYHETER':
                            window.scrollTo(0, getY(newsSection) - navbarHeight);
                            break;
                        case 'KONSERTER':
                            window.scrollTo(0, getY(gigsSection) - navbarHeight);
                            break;
                        case 'MEDIA':
                            window.scrollTo(0, getY(mediaSection) - navbarHeight);
                            break;
                        case 'KONTAKT':
                            window.scrollTo(0, getY(contactSection) - navbarHeight);
                            break;
                    }
                }

                for(var i = 0; i < navbarTextElements.length; i++) {
                    navbarTextElements[i].addEventListener('click', headingClick, false);
                }
            }
        };
    });
    
});
