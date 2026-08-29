document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursor = document.getElementById('custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const clickables = document.querySelectorAll('a, button, .reg-btn');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.innerText = ">_";
            cursor.style.textShadow = "0 0 10px var(--corrupt-cyan)";
            cursor.style.color = "var(--corrupt-cyan)";
        });
        el.addEventListener('mouseleave', () => {
            cursor.innerText = "█";
            cursor.style.textShadow = "0 0 5px var(--signal-red)";
            cursor.style.color = "var(--signal-red)";
        });
    });




    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
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

                // If tracks section is visible, activate glitch divider
                if (entry.target.id === 'tracks') {
                    document.querySelector('.glitch-divider').classList.add('active');
                }
                
                observer.unobserve(entry.target);
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
            const targetText = el.getAttribute('data-target');
            let iterations = 0;
            const maxIterations = 20;
            
            const interval = setInterval(() => {
                el.innerText = targetText.split('').map((char, index) => {
                    if (index < iterations / 2) {
                        return targetText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
                
                if (iterations >= maxIterations * 2) {
                    clearInterval(interval);
                    el.innerText = targetText;
                }
                iterations++;
            }, 50);
        });
    }

    // --- Footer Interactive Prompt ---
    const btnDecline = document.getElementById('btn-decline');
    const declineMsg = document.getElementById('decline-msg');

    btnDecline.addEventListener('click', (e) => {
        e.preventDefault();
        declineMsg.classList.remove('hidden');
        // Fake flicker
        btnDecline.style.opacity = '0';
        setTimeout(() => btnDecline.style.opacity = '1', 100);
        setTimeout(() => btnDecline.style.opacity = '0.5', 200);
        setTimeout(() => btnDecline.style.opacity = '1', 300);
    });

    // --- Countdown Timer ---
    const targetDate = new Date('2026-09-11T09:00:00');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            document.getElementById('countdown-timer').innerHTML = "EVENT LIVE";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

});
