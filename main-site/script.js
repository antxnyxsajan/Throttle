// =========================================================================
// REGISTRATION & POPUP MASTER CONTROLS
// -------------------------------------------------------------------------
// • ctf:                     true = OPEN, false = SOLD OUT
// • hackathon:               true = OPEN, false = SOLD OUT
// • showDisclaimerCtf:       true = SHOW warning dialog before CTF registration
//                            false = SKIP warning & go directly to KonfHub
// • showDisclaimerHackathon: true = SHOW warning dialog before Hackathon registration
//                            false = SKIP warning & go directly to KonfHub
// =========================================================================
const REGISTRATION_CONFIG = {
    ctf: false,                     // Break//In (CTF): true = OPEN, false = SOLD OUT
    hackathon: false,               // Build//Out (Hackathon): true = OPEN, false = SOLD OUT
    showDisclaimerCtf: false,        // CTF Warning Modal: true = ON, false = DIRECT TO KONFHUB
    showDisclaimerHackathon: false   // Hackathon Warning Modal: true = ON, false = DIRECT TO KONFHUB
};

document.addEventListener('DOMContentLoaded', () => {

    // --- Registration Status Controller ---
    const updateRegistrationStatus = () => {
        // 1. CTF Track (Break//In)
        const ctfOpenBtn = document.getElementById('track-ctf-open-btn');
        const ctfClosedBtn = document.getElementById('track-ctf-closed-btn');
        const ctfOpenCard = document.getElementById('reg-ctf-open-card');
        const ctfClosedCard = document.getElementById('reg-ctf-closed-card');

        if (REGISTRATION_CONFIG.ctf) {
            if (ctfOpenBtn) ctfOpenBtn.style.display = 'flex';
            if (ctfClosedBtn) ctfClosedBtn.style.display = 'none';
            if (ctfOpenCard) ctfOpenCard.style.display = 'flex';
            if (ctfClosedCard) ctfClosedCard.style.display = 'none';
        } else {
            if (ctfOpenBtn) ctfOpenBtn.style.display = 'none';
            if (ctfClosedBtn) ctfClosedBtn.style.display = 'flex';
            if (ctfOpenCard) ctfOpenCard.style.display = 'none';
            if (ctfClosedCard) ctfClosedCard.style.display = 'flex';
        }

        // 2. Hackathon Track (Build//Out)
        const hackOpenBtn = document.getElementById('track-hack-open-btn');
        const hackClosedBtn = document.getElementById('track-hack-closed-btn');
        const hackOpenCard = document.getElementById('reg-hack-open-card');
        const hackClosedCard = document.getElementById('reg-hack-closed-card');

        if (REGISTRATION_CONFIG.hackathon) {
            if (hackOpenBtn) hackOpenBtn.style.display = 'flex';
            if (hackClosedBtn) hackClosedBtn.style.display = 'none';
            if (hackOpenCard) hackOpenCard.style.display = 'flex';
            if (hackClosedCard) hackClosedCard.style.display = 'none';
        } else {
            if (hackOpenBtn) hackOpenBtn.style.display = 'none';
            if (hackClosedBtn) hackClosedBtn.style.display = 'flex';
            if (hackOpenCard) hackOpenCard.style.display = 'none';
            if (hackClosedCard) hackClosedCard.style.display = 'flex';
        }
    };
    updateRegistrationStatus();

    // Browser console helpers for quick testing & live toggling
    window.toggleCtfRegistration = (isOpen) => {
        REGISTRATION_CONFIG.ctf = Boolean(isOpen);
        updateRegistrationStatus();
        console.log(`[THROTTLE] CTF registration status: ${REGISTRATION_CONFIG.ctf ? 'OPEN' : 'SOLD OUT'}`);
    };

    window.toggleHackathonRegistration = (isOpen) => {
        REGISTRATION_CONFIG.hackathon = Boolean(isOpen);
        updateRegistrationStatus();
        console.log(`[THROTTLE] Hackathon registration status: ${REGISTRATION_CONFIG.hackathon ? 'OPEN' : 'SOLD OUT'}`);
    };

    // --- Preloader (1s Simple Shutter) ---
    const loaderScreen = document.getElementById('loader-screen');
    if (loaderScreen) {
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            loaderScreen.classList.add('open');
            document.body.style.overflow = '';
            setTimeout(() => {
                loaderScreen.remove();
            }, 550);
        }, 1000);
    }

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // --- Custom Cursor (Hardware-Accelerated via rAF) ---
    const cursor = document.getElementById('custom-cursor');

    if (cursor) {
        let mouseX = -100, mouseY = -100;
        let rafId = null;

        const updateCursorPos = () => {
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            rafId = null;
        };

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
            if (!rafId) {
                rafId = requestAnimationFrame(updateCursorPos);
            }
        }, { passive: true });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        const clickables = document.querySelectorAll('a, button:not([disabled]):not(.track-btn-disabled):not(#modal-btn-no):not(#modal-close-icon), .reg-btn:not(.reg-card-disabled), .flow-node');
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

        const disabledElements = document.querySelectorAll('[disabled], .track-btn-disabled, .reg-card-disabled');
        disabledElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.textContent = "✕";
                cursor.style.textShadow = "0 0 8px #FFB347";
                cursor.style.color = "#FFB347";
            });
            el.addEventListener('mouseleave', () => {
                cursor.textContent = "█";
                cursor.style.textShadow = "0 0 5px var(--signal-red)";
                cursor.style.color = "var(--signal-red)";
            });
        });

        const modalAbortButtons = document.querySelectorAll('#modal-btn-no, #modal-close-icon');
        modalAbortButtons.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.textContent = "✕";
                cursor.style.textShadow = "0 0 8px var(--signal-red)";
                cursor.style.color = "var(--signal-red)";
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

    // --- Nav Links Scramble  ---
    const navLinksList = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    navLinksList.forEach(link => {
        const originalText = link.textContent;
        let hoverInterval;
        link.addEventListener('mouseenter', () => {
            if (isMobile) return;
            clearInterval(hoverInterval);
            let iterations = 0;
            hoverInterval = setInterval(() => {
                link.textContent = originalText.split('').map(char => {
                    return Math.random() > 0.5 ? char : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                }).join('');

                iterations++;
                if (iterations > 6) {
                    clearInterval(hoverInterval);
                    link.textContent = originalText;
                }
            }, 40);
        });
        link.addEventListener('mouseleave', () => {
            if (isMobile) return;
            clearInterval(hoverInterval);
            link.textContent = originalText;
        });
    });

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

    // --- Sponsor Hover Decrypt ---
    const sponsors = document.querySelectorAll('.decrypt-sponsor');
    sponsors.forEach(sponsor => {
        const targetText = sponsor.getAttribute('data-target') || sponsor.textContent;
        const originalText = sponsor.textContent;
        let hoverInterval;

        sponsor.parentElement.addEventListener('mouseenter', () => {
            if (isMobile) return;
            let iterations = 0;
            clearInterval(hoverInterval);
            hoverInterval = setInterval(() => {
                sponsor.textContent = targetText.split('').map((char, index) => {
                    if (index < iterations / 2) return targetText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');

                if (iterations >= targetText.length * 2) {
                    clearInterval(hoverInterval);
                    sponsor.textContent = targetText;
                }
                iterations++;
            }, 30);
        });

        sponsor.parentElement.addEventListener('mouseleave', () => {
            if (isMobile) return;
            clearInterval(hoverInterval);
            sponsor.textContent = originalText;
        });
    });

    // --- Footer Interactive Prompt ---
    const btnDecline = document.getElementById('btn-decline');

    if (btnDecline) {
        btnDecline.addEventListener('click', (e) => {
            e.preventDefault();
        });

        const btnText = btnDecline.querySelector('.btn-text');
        if (btnText) {
            const originalText = btnText.textContent;
            const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
            let scrambleInterval;

            btnDecline.addEventListener('mouseenter', () => {
                scrambleInterval = setInterval(() => {
                    btnText.textContent = originalText.split('').map(char => {
                        if (char === ' ') return ' ';
                        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    }).join('');
                }, 50);
            });

            btnDecline.addEventListener('mouseleave', () => {
                clearInterval(scrambleInterval);
                btnText.textContent = originalText;
            });
        }
    }

    // --- Countdown Timer ---
    const targetDate = new Date('2026-09-11T09:00:00');
    const countdownTimer = document.getElementById('countdown-timer');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const regDaysEl = document.getElementById('reg-days');
    const regHoursEl = document.getElementById('reg-hours');
    const regMinutesEl = document.getElementById('reg-minutes');
    const regSecondsEl = document.getElementById('reg-seconds');

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

        if (regDaysEl) regDaysEl.textContent = String(days).padStart(2, '0');
        if (regHoursEl) regHoursEl.textContent = String(hours).padStart(2, '0');
        if (regMinutesEl) regMinutesEl.textContent = String(minutes).padStart(2, '0');
        if (regSecondsEl) regSecondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // --- Registration Disclaimer Modal Logic ---
    const modal = document.getElementById('disclaimer-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-close-icon');
    const modalBtnNo = document.getElementById('modal-btn-no');
    const modalBtnYes = document.getElementById('modal-btn-yes');

    function openDisclaimerModal(targetUrl) {
        if (!modal || !modalBtnYes) return;
        modalBtnYes.setAttribute('href', targetUrl);
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDisclaimerModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (modalBtnNo) {
        modalBtnNo.addEventListener('click', (e) => {
            e.preventDefault();
            closeDisclaimerModal();
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeDisclaimerModal();
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeDisclaimerModal);
    }

    if (modalBtnYes) {
        modalBtnYes.addEventListener('click', () => {
            setTimeout(closeDisclaimerModal, 200);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeDisclaimerModal();
        }
    });

    // Browser console helpers for quick testing & live toggling
    window.toggleCtfDisclaimer = (show) => {
        REGISTRATION_CONFIG.showDisclaimerCtf = Boolean(show);
        console.log(`[THROTTLE] CTF disclaimer modal: ${REGISTRATION_CONFIG.showDisclaimerCtf ? 'ENABLED (Popup will show)' : 'DISABLED (Direct redirect)'}`);
    };

    window.toggleHackathonDisclaimer = (show) => {
        REGISTRATION_CONFIG.showDisclaimerHackathon = Boolean(show);
        console.log(`[THROTTLE] Hackathon disclaimer modal: ${REGISTRATION_CONFIG.showDisclaimerHackathon ? 'ENABLED (Popup will show)' : 'DISABLED (Direct redirect)'}`);
    };

    window.toggleDisclaimer = (show) => {
        REGISTRATION_CONFIG.showDisclaimerCtf = Boolean(show);
        REGISTRATION_CONFIG.showDisclaimerHackathon = Boolean(show);
        console.log(`[THROTTLE] All disclaimer modals: ${Boolean(show) ? 'ENABLED' : 'DISABLED'}`);
    };

    window.previewDisclaimer = (url = 'https://konfhub.com/ctf-throttle') => {
        openDisclaimerModal(url);
    };

    // Intercept clicks on all active registration links (CTF & open Hackathon)
    const activeRegLinks = document.querySelectorAll('a[href*="konfhub.com"]');
    activeRegLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetUrl = link.getAttribute('href') || '';
            const isCtf = targetUrl.includes('ctf') || link.id.includes('ctf');
            const isHack = targetUrl.includes('hackathon') || link.id.includes('hack');

            const shouldShowDisclaimer = isCtf
                ? REGISTRATION_CONFIG.showDisclaimerCtf
                : (isHack ? REGISTRATION_CONFIG.showDisclaimerHackathon : (REGISTRATION_CONFIG.showDisclaimerCtf || REGISTRATION_CONFIG.showDisclaimerHackathon));

            // If disclaimer is turned off for this track, allow natural direct navigation to KonfHub!
            if (!shouldShowDisclaimer) {
                return;
            }
            e.preventDefault();
            if (targetUrl && targetUrl !== '#') {
                openDisclaimerModal(targetUrl);
            }
        });
    });

});
