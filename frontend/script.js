const slides = document.querySelectorAll(".slide");

let current = 0;

function showSlide() {
    // remove active from all
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    // show current
    slides[current].classList.add("active");

    // move to next
    current++;

    if (current >= slides.length) {
        current = 0;
    }
}

setInterval(showSlide, 3000);