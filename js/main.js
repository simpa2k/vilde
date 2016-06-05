window.onload = function() {
	
	var gigs = document.getElementsByClassName('gig');
    //var headings = document.getElementsByClassName('heading');
    var navbarTextElements = document.getElementsByClassName('navbar-text');

    function getY(element) {
        var boundingClientRect = element.getBoundingClientRect();
        return boundingClientRect.top + window.scrollY;
    }

    function fixateElementPositionTop(element, elementHeight, topOffset) {

        element.style.zIndex = "10";
        element.style.position = "fixed";
        element.style.bottom = "";
        element.style.top = String(topOffset);
        element.style.height = String(elementHeight) + "px";

    }

    function fixateElementPositionBottom(element, bottomOffset) {

        element.style.zIndex = "10";
        element.style.position = "absolute";
        element.style.bottom = String(bottomOffset);
        element.style.top = "";

    }

    /*
     *
     * Function to fixate navbar to top of window when scrolling down past it and then pop it back when scrolling above it
     *
     */

    function navbarPositionListener() {
        
    	var navbar = document.getElementById('navbar');
        var main = document.getElementById('main');
    	
        var headerHeight = navbar.getBoundingClientRect().height;
        var mainY = getY(main);

        var topOfWindowAlignsWithTopOfHeader = window.scrollY > (mainY - headerHeight);

        if (topOfWindowAlignsWithTopOfHeader) {

            fixateElementPositionTop(navbar, headerHeight, 0);

        } else {

            fixateElementPositionBottom(navbar, mainY);
            
        }

    }

    function expandGig(e) {

        var clickedGig = e.currentTarget;

        if(clickedGig.classList.contains('expanded')) {

            clickedGig.classList.remove('expanded');
            clickedGig.classList.add('collapsed');

        } else {

            clickedGig.classList.remove('collapsed');
            clickedGig.classList.add('expanded');
        }

    }

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
    
    window.addEventListener('scroll', navbarPositionListener, false);

    for(var i = 0; i < gigs.length; i++) {

	    gigs[i].addEventListener('click', expandGig, true);

    }

    for(i = 0; i < navbarTextElements.length; i++) {

        navbarTextElements[i].addEventListener('click', headingClick, false);
    }

};

