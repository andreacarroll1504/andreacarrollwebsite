let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");

    // Hides all the slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    // Increments the slide index
    slideIndex++;

    // If I've gone past the last slide, start from the first one
    if (slideIndex > slides.length) { 
        slideIndex = 1; 
    }

    // Shows the current slide
    slides[slideIndex-1].style.display = "block";  

    // Changes the slide every 4 seconds
    setTimeout(showSlides, 4000); 
}

// Starts my slideshow when the page loads
showSlides();

