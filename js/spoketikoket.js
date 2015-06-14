var main = document.getElementById('main');
var shows = document.getElementById('shows');
var about = document.getElementById('about');
var musikOchFilm = document.getElementById('musikochfilm');
var kontakt = document.getElementById('kontakt');
var toTheTop = document.getElementById('to-top');
//radio button
var toTheTopVisible = document.getElementById('visible');
//radio button
var toTheTopInvisible = document.getElementById('not-visible');

var toTheTopDisplay = function () {
    var mainBoundingClientRect = main.getBoundingClientRect();
    var mainY = mainBoundingClientRect.top;
    var windowHeight = window.innerHeight;
    
    // display to the top button when main is taking up about half of the screen or more:
    if (mainY < (windowHeight / 2)) {
        toTheTopVisible.checked = "true";
    } else {
        toTheTopInvisible.checked = "true";
    }   
}

var animate;

var scrollUp = function() {
    if (window.scrollY == 0) {
        stopScroll();
    } else {
        var scrollY = -100;
        window.scrollBy(0, scrollY);
        scrollY += 10;
    }
}

var toTheTopClick = function() {
    animate = window.setInterval(scrollUp, 5);
}

var stopScroll = function() {
    clearInterval(animate);
}

var getY = function(element) {
    var boundingClientRect = element.getBoundingClientRect();
    var y = boundingClientRect.top + window.scrollY;
    
    return y;
}

var headingClick = function(e) {
    var item = e.target;
    if (item.className == "heading") {
        switch(item.innerHTML) {
            case 'Shows':
                window.scrollTo(0, getY(shows));
            break;
            case 'About':
                window.scrollTo(0, getY(about));
            break;
            case 'Musik och Film':
                window.scrollTo(0, getY(musikOchFilm));
            break;
            case 'Kontakt':
                window.scrollTo(0, getY(kontakt));
            break;
        }
    }
}

toTheTop.addEventListener('click', toTheTopClick, false);
main.addEventListener('click', headingClick, false);
window.addEventListener('scroll', toTheTopDisplay, false);

/*
 * Jag tog bort en animerad scrolldown när man trycker på headingknapparna eftersom det var svårt att få
 * scrollen att stanna när man vill (den skjuter lätt över målet om man inte sätter ett väldigt lågt scrollvärde varje gång
 * funktionen callas) och att det inte nödvändigtvis ser jättesnyggt ut. Sparar lite exempelkod ifall det skulle bli aktuellt
 * igen:
 *
 * var headingClick = function(e) {
    var item = e.target;
    if (item.className == "heading") {
        switch(item.innerHTML) {
            case 'Shows':
                destination = shows;
                animate = window.setInterval(scrollDown, 1);
            break;
            etc.
            
 * var destination;

 * var scrollDown = function() {
        if (window.scrollY >= getY(destination)) {
            stopScroll();
        } else {
            window.scrollBy(0, 50);
        }
    }
 * 
 */