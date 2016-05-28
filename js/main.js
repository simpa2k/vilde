window.onload = function() {
	
	var gigs = document.getElementsByClassName('gig');
    var headings = document.getElementsByClassName('heading');

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

        element.style.zIndex = "0";
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
        } else {
            clickedGig.classList.add('expanded');
        }


        /*var clickedGigHeight = clickedGig.getBoundingClientRect().height;

        var height = setInterval(function() {

            clickedGigHeight += 10;
            clickedGig.style.height = String(clickedGigHeight) + "px";

            if(clickedGigHeight >= 500) {

                clearInterval(height);

            }

        }, 15);*/

    }

    function headingClick(e) {
        var item = e.target;

        var newsAndGigsSection = document.getElementById('news-and-gigs-section');
        var memberSection = document.getElementById('member-section');
        var aboutAndContactSection = document.getElementById('about-and-contact-section');
        var mediaSection = document.getElementById('media-section');
        var navbarHeight = document.getElementById('navbar').getBoundingClientRect().height;

        switch(item.innerHTML) {
            case 'NYHETER':
            case 'KONSERTER':
                window.scrollTo(0, getY(newsAndGigsSection) - navbarHeight);
                break;
            case 'MEDLEMMAR':
                window.scrollTo(0, getY(memberSection));
                break;
            case 'OM VILDE':
            case 'KONTAKT':
                window.scrollTo(0, getY(aboutAndContactSection) - navbarHeight);
                break;
            case 'MUSIK OCH MEDIA':
                window.scrollTo(0, getY(mediaSection) - navbarHeight);
        }
    }
    
    window.addEventListener('scroll', navbarPositionListener, false);

    for(var i = 0; i < gigs.length; i++) {

	    gigs[i].addEventListener('click', expandGig, true);

    }

    for(i = 0; i < headings.length; i++) {

        headings[i].addEventListener('click', headingClick, false);
    }

};

