// Simple JavaScript to make the navigation links smooth scroll
document.addEventListener('DOMContentLoaded', function () {
    // Get all navigation links that point to sections
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Scroll smoothly to the target
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to the current navigation item
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav ul li a');

        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }

    // Call the function on scroll
    window.addEventListener('scroll', highlightCurrentSection);
});


// popup
const popup = document.getElementById('popup');

function openPopUp() {
    popup.toggleAttribute('hidden')
    popup.style.setProperty('opacity', 100);
}
async function closePopUp() {
    popup.style.setProperty('opacity', 0);
    await new Promise(r => setTimeout(r, 500));
    popup.toggleAttribute('hidden')
}

document.getElementById('popup-button').addEventListener('click', openPopUp);
document.getElementById('close-popup').addEventListener('click', closePopUp);

// timmer
function Timmer() {
    const now = new Date();
    const target = new Date();
    target.setHours(15, 0, 0, 0);

    function update() {
        const now = new Date();
        const timeDiff = target - now;

        if (timeDiff <= 0) {
            document.getElementById('countDown-undertext').innerHTML =
                "Bestil inden kl. 15 på hverdage, og få din ordre sendt afsted samme dag."
            return
        }
        else {
            document.getElementById('countDown-undertext').innerHTML =
                "Bestil inden tiden er gået, så sender vi idag!"
        }

        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);


        document.getElementById('countDown').innerHTML =
            `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    }

    update();
    setInterval(update, 1000);
}

window.onload = Timmer;