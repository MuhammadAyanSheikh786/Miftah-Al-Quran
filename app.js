
document.querySelector(".menu-toggle").onclick = () => {
    document.querySelector(".nav-links").classList.toggle("show") ;
} ;



let current = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[current].classList.add("active");

    current = (current + 1) % slides.length;
}

setInterval(showSlide, 5000); // 5 seconds




  document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.aqlimic-card');
            
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.zIndex = '100';
                });
                
                card.addEventListener('mouseleave', function() {
                    setTimeout(() => {
                        this.style.zIndex = '1';
                    }, 300);
                });
            });
        });



         const tabs = document.querySelectorAll(".tab-btn");
    const containers = document.querySelectorAll(".plans-container");

    tabs.forEach(btn => {
        btn.addEventListener("click", () => {
            tabs.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            containers.forEach(c => c.classList.remove("active"));
            document.querySelector(btn.dataset.target).classList.add("active");
        });
    });






document.getElementById("demoSelect").addEventListener("change", function () {
    let value = this.value;

    if (value === "Enroll for Month") {
        document.getElementById("daysWrapper").style.display = "block";
        document.getElementById("durationWrapper").style.display = "block";
    } else {
        document.getElementById("daysWrapper").style.display = "none";
        document.getElementById("durationWrapper").style.display = "none";
    }
});

// SUCCESS POPUP AFTER SUBMIT
document.getElementById("enrollForm").addEventListener("submit", function (e) {
    setTimeout(() => {
        document.getElementById("successMessage").style.display = "block";
        setTimeout(() => {
            document.getElementById("successMessage").style.display = "none";
        }, 3000);
    }, 500);
});




function openPopup(id) {
    document.getElementById(id).style.display = "flex";
}
function closePopup(id) {
    document.getElementById(id).style.display = "none";
}

