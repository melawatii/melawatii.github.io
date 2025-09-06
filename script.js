// ================= ICONS =================
// Initialize lucide icons
lucide.createIcons();


// ================= HERO BACKGROUND SLIDESHOW =================
// List of background images for the hero section
const images = [
    "img/wallpaper/img-1.jpg",
    "img/wallpaper/img-2.jpg",
    "img/wallpaper/img-3.jpg"
];

let index = 0;
const hero = document.getElementById("home");

// Function to change hero background image
function changeBackground() {
    hero.style.backgroundImage = `url('${images[index]}')`;
    index = (index + 1) % images.length;
}

// Change background every 5 seconds
setInterval(changeBackground, 5000);
changeBackground();


// ================= CLOCK & DATE =================
// Function to update clock and date in hero section
function updateClock() {
    const now = new Date();
    document.getElementById("clock").innerText = now.toLocaleTimeString("en-GB");
    document.getElementById("date").innerText = now.toLocaleDateString("en-US", { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
}
// Update every second
setInterval(updateClock, 1000);
updateClock();


// ================= PROJECT CAROUSEL =================
// Get project carousel element and slide count
const projectCarousel = document.getElementById("projectCarousel");
const projectSlides = projectCarousel.children.length;
let projectIndex = 0;

// Transition duration in ms (should match Tailwind duration-1000)
const TRANSITION_MS = 1000;

// Auto-play timeout and animation lock
let projectAutoTimeout = null;
let isAnimating = false;

// Set CSS transition properties for carousel
projectCarousel.style.transition = `transform ${TRANSITION_MS}ms ease-in-out`;
projectCarousel.style.willChange = 'transform';

// Function to show project slide at index i
function showProjectSlide(i) {
    if (isAnimating) return; // Ignore if animating
    isAnimating = true;

    // Normalize index (always positive)
    projectIndex = ((i % projectSlides) + projectSlides) % projectSlides;

    projectCarousel.style.transform = `translateX(-${projectIndex * 100}%)`;

    // Unlock animation after transition duration (+ buffer)
    setTimeout(() => {
        isAnimating = false;
    }, TRANSITION_MS + 30);
}

// Start auto-play with recursive timeout
function startProjectAuto() {
    clearProjectAuto();
    projectAutoTimeout = setTimeout(() => {
        showProjectSlide(projectIndex + 1);
        startProjectAuto();
    }, 5000);
}

// Clear auto-play timeout
function clearProjectAuto() {
    if (projectAutoTimeout) {
        clearTimeout(projectAutoTimeout);
        projectAutoTimeout = null;
    }
}

// Prev & Next buttons event
document.querySelectorAll("#project .carousel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (isAnimating) return;
        clearProjectAuto();
        if (btn.dataset.action === "prev") {
            showProjectSlide(projectIndex - 1);
        } else {
            showProjectSlide(projectIndex + 1);
        }
        startProjectAuto();
    });
});

// Use transitionend event for more accurate unlock
projectCarousel.addEventListener("transitionend", (e) => {
    if (e.propertyName && e.propertyName.includes("transform")) {
        isAnimating = false;
    }
});

// Start auto-play on initialization
startProjectAuto();


// ================= CERTIFICATE CAROUSEL =================
// Get certificate carousel element and slide count
const certificateCarousel = document.getElementById("certificateCarousel");
const certificateSlides = certificateCarousel.children.length;
let certificateIndex = 0;

// Transition duration for certificate carousel
const CERT_TRANSITION_MS = 1000;
let certTimeout = null;
let isCertAnimating = false;

// Set CSS transition properties for certificate carousel
certificateCarousel.style.transition = `transform ${CERT_TRANSITION_MS}ms ease-in-out`;
certificateCarousel.style.willChange = "transform";

// Function to show certificate slide at index i
function showCertificateSlide(i) {
    if (isCertAnimating) return;
    isCertAnimating = true;

    certificateIndex = ((i % certificateSlides) + certificateSlides) % certificateSlides;
    certificateCarousel.style.transform = `translateX(-${certificateIndex * 100}%)`;

    setTimeout(() => {
        isCertAnimating = false;
    }, CERT_TRANSITION_MS + 30);
}

// Start auto-play for certificate carousel
function startCertificateAuto() {
    clearCertificateAuto();
    certTimeout = setTimeout(() => {
        showCertificateSlide(certificateIndex + 1);
        startCertificateAuto();
    }, 5000);
}

// Clear auto-play timeout for certificate carousel
function clearCertificateAuto() {
    if (certTimeout) {
        clearTimeout(certTimeout);
        certTimeout = null;
    }
}

// Prev & Next buttons event for certificate carousel
document.querySelectorAll("#certificate .cert-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if (isCertAnimating) return;
        clearCertificateAuto();
        if (btn.dataset.action === "prev") {
            showCertificateSlide(certificateIndex - 1);
        } else {
            showCertificateSlide(certificateIndex + 1);
        }
        startCertificateAuto();
    });
});

// Use transitionend event for more accurate unlock
certificateCarousel.addEventListener("transitionend", (e) => {
    if (e.propertyName && e.propertyName.includes("transform")) {
        isCertAnimating = false;
    }
});

// Start auto-play on initialization
startCertificateAuto();


// ================= CONTACT FORM HANDLER =================
// Get contact form and alert elements
const form = document.getElementById("contact-form");
const alertBox = document.getElementById("alert-box");
const alertMessage = document.getElementById("alert-message");
const alertClose = document.getElementById("alert-close");
const submitBtn = document.getElementById("submit-btn");
const btnText = document.getElementById("btn-text");
const btnSpinner = document.getElementById("btn-spinner");

// Handle form submit event
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Show loading state on button
    btnText.textContent = "Sending...";
    btnSpinner.classList.remove("hidden");
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" }
    });

    // Reset button state
    btnText.textContent = "Send Message";
    btnSpinner.classList.add("hidden");
    submitBtn.disabled = false;

    // Show alert box
    alertBox.classList.remove("hidden");

    if (response.ok) {
        alertBox.className = "relative p-4 mb-4 text-green-700 bg-green-100 rounded-lg pr-10";
        alertMessage.textContent = "✅ Your message has been sent successfully!";
    } else {
        alertBox.className = "relative p-4 mb-4 text-red-700 bg-red-100 rounded-lg pr-10";
        alertMessage.textContent = "❌ Oops! Something went wrong. Please try again.";
    }
});

// Close alert box event
alertClose.addEventListener("click", () => {
    alertBox.classList.add("hidden");
});


// ================= FOOTER YEAR AUTO =================
// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();