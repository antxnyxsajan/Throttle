document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursor = document.getElementById('custom-cursor');
    
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const clickables = document.querySelectorAll('a, button, .reg-btn');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.textContent = ">_";
                cursor.style.textShadow = "0 0 10px var(--corrupt-cyan)";
                cursor.style.color = "var(--corrupt-cyan)";
            });
            el.addEventListener('mouseleave', () => {
                cursor.textContent = "█";
                cursor.style.textShadow = "0 0 5px var(--signal-red)";
                cursor.style.color = "var(--signal-red)";
            });
        });
    }

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('open');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('open');
            });
        });

        // Close menu when tapping outside the navbar
        document.addEventListener('click', (e) => {
            const navbar = document.getElementById('navbar');
            if (navbar && !navbar.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('open');
            }
        });
    }


    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger text glitch once when section appears
                const heading = entry.target.querySelector('.glitch-text');
                if (heading) {
                    heading.classList.add('glitch-active');
                    setTimeout(() => heading.classList.remove('glitch-active'), 800);
                }
                
                // Decrypt prize effect when payload is visible
                if (entry.target.id === 'payload') {
                    startDecrypt();
                }
                
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });


    // --- Decrypt Effect for Prizes ---
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let decryptStarted = false;

    function startDecrypt() {
        if (decryptStarted) return;
        decryptStarted = true;
        
        const decryptElements = document.querySelectorAll('.decrypt');
        
        decryptElements.forEach(el => {
            const targetText = el.getAttribute('data-target') || '';
            let iterations = 0;
            const maxIterations = 20;
            
            const interval = setInterval(() => {
                el.textContent = targetText.split('').map((char, index) => {
                    if (index < iterations / 2) {
                        return targetText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
                
                if (iterations >= maxIterations * 2) {
                    clearInterval(interval);
                    el.textContent = targetText;
                }
                iterations++;
            }, 50);
        });
    }

    // --- Footer Interactive Prompt ---
    const btnDecline = document.getElementById('btn-decline');
    const declineMsg = document.getElementById('decline-msg');

    if (btnDecline && declineMsg) {
        btnDecline.addEventListener('click', (e) => {
            e.preventDefault();
            declineMsg.classList.remove('hidden');
            // Fake flicker
            btnDecline.style.opacity = '0';
            setTimeout(() => { btnDecline.style.opacity = '1'; }, 100);
            setTimeout(() => { btnDecline.style.opacity = '0.5'; }, 200);
            setTimeout(() => { btnDecline.style.opacity = '1'; }, 300);
        });
    }

    // --- Countdown Timer ---
    const targetDate = new Date('2026-09-11T09:00:00');
    const countdownTimer = document.getElementById('countdown-timer');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    let countdownInterval = null;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            if (countdownTimer) countdownTimer.textContent = "EVENT LIVE";
            if (countdownInterval) clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

});
