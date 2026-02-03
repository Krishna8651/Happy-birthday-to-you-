document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bg-music');
    const enterBtn = document.getElementById('enter-btn');
    const backBtn = document.getElementById('back-btn');
    const introScreen = document.getElementById('intro');
    const wishScreen = document.getElementById('wish-screen');
    const musicToggle = document.getElementById('music-toggle');
    const confettiBtn = document.getElementById('confetti-btn');
    const releaseBtn = document.getElementById('release-btn');
    const blessingInput = document.getElementById('blessing-input');
    const blessingDisplay = document.getElementById('blessing-display');
    const nameElement = document.getElementById('name');

    // Set a custom name (change this)
    nameElement.textContent = "My Beautiful Soul";

    // Enter Wish Screen
    enterBtn.addEventListener('click', () => {
        introScreen.classList.remove('active');
        wishScreen.classList.add('active');
        bgMusic.play().catch(e => console.log("Autoplay blocked — click to play"));
        createFloatingHearts();
        createFloatingStars();
    });

    // Back to Intro
    backBtn.addEventListener('click', () => {
        wishScreen.classList.remove('active');
        introScreen.classList.add('active');
    });

    // Music Toggle
    let musicPlaying = false;
    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music-slash"></i>';
        } else {
            bgMusic.play();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        }
        musicPlaying = !musicPlaying;
    });

    // Confetti
    confettiBtn.addEventListener('click', () => {
        confetti({
            particleCount: 300,
            spread: 100,
            origin: { y: 0.6 }
        });
    });

    // Release Blessing
    releaseBtn.addEventListener('click', () => {
        const text = blessingInput.value.trim();
        if (text) {
            blessingDisplay.innerHTML = `<p><i class="fas fa-quote-left"></i> ${text} <i class="fas fa-quote-right"></i></p>`;
            blessingInput.value = "";
            // Animate
            blessingDisplay.style.transform = "scale(0.9)";
            setTimeout(() => blessingDisplay.style.transform = "scale(1)", 10);
            // More confetti
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.8 } });
        }
    });

    // Click anywhere for stardust
    document.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON' && e.target.id !== 'blessing-input') {
            confetti({
                particleCount: 20,
                spread: 60,
                origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
                colors: ['ff9a9e', 'a3d9ff', 'ffcc00', 'b19cd9']
            });
        }
    });

    // Floating hearts
    function createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = Math.random() * 100 + 'vh';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.3;
            heart.style.animation = `float ${Math.random() * 5 + 5}s infinite ease-in-out`;
            heart.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(heart);
        }
    }

    // Floating stars
    function createFloatingStars() {
        const container = document.querySelector('.floating-stars');
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.innerHTML = '✦';
            star.style.position = 'absolute';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.fontSize = Math.random() * 15 + 10 + 'px';
            star.style.color = '#fff9c4';
            star.style.opacity = Math.random() * 0.6 + 0.2;
            star.style.animation = `float ${Math.random() * 6 + 4}s infinite ease-in-out`;
            star.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(star);
        }
    }

    // Auto confetti every 30 seconds
    setInterval(() => {
        if (wishScreen.classList.contains('active')) {
            confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
        }
    }, 30000);
});
