document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeName = document.getElementById('themeName');
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    const audioStatus = document.getElementById('audioStatus');
    const systemClock = document.getElementById('systemClock');
    const xpBar = document.getElementById('xpBar');
    const xpPercentage = document.getElementById('xpPercentage');
    const compassTrack = document.getElementById('compassTrack');
    const interactiveCards = document.querySelectorAll('[data-popup]');
    const overlays = document.querySelectorAll('.fc-modal-overlay');
    const copyButtons = document.querySelectorAll('[data-copy]');
    const toast = document.getElementById('tacticalToast');
    const toastMessage = document.getElementById('toastMessage');

    // Breach Protocol Minigame
    const matrixSpans = document.querySelectorAll('.matrix-grid span');
    const ramSlotsContainer = document.getElementById('ramSlots');
    const breachBtn = document.getElementById('breachBtn');
    const breachResult = document.getElementById('breachResult');

    let audioEnabled = false;
    let selectedBuffer = [];
    const targetSequence = ['1C', 'BD', '55'];

    // Web Audio API Sintetizador de Sons Táticos
    let audioCtx = null;
    const playBeep = (freq = 440, duration = 0.05, type = 'sine') => {
        if (!audioEnabled) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Ignora se bloqueado por autoplay policies
        }
    };

    // Relógio do Sistema em Tempo Real
    setInterval(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        if (systemClock) {
            systemClock.textContent = `${year}.${month}.${day} // ${h}:${m}:${s}`;
        }
    }, 1000);

    // Alternador de Temas (Cyberpunk x Far Cry)
    themeToggleBtn.addEventListener('click', () => {
        playBeep(880, 0.08, 'square');
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'cyberpunk') {
            body.setAttribute('data-theme', 'farcry');
            themeName.textContent = 'YARA GUERRILLA (FAR CRY)';
            themeToggleBtn.classList.remove('cyberpunk-active');
        } else {
            body.setAttribute('data-theme', 'cyberpunk');
            themeName.textContent = 'NIGHT CITY (CYBERPUNK)';
            themeToggleBtn.classList.add('cyberpunk-active');
        }
    });

    // Toggle de Áudio
    audioToggleBtn.addEventListener('click', () => {
        audioEnabled = !audioEnabled;
        audioStatus.textContent = audioEnabled ? 'ON' : 'OFF';
        if (audioEnabled) {
            playBeep(600, 0.1, 'sine');
            audioToggleBtn.style.borderColor = 'var(--sys-primary)';
            audioToggleBtn.style.color = 'var(--sys-primary)';
        } else {
            audioToggleBtn.style.borderColor = '';
            audioToggleBtn.style.color = '';
        }
    });

    // Bússola reativa a scroll e mouse
    let mouseOffset = 0;
    window.addEventListener('mousemove', (e) => {
        mouseOffset = (e.clientX / window.innerWidth) * 40 - 20;
    });

    let ticking = false;
    const updateHudOnScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 100;

        if (xpBar && xpPercentage) {
            xpBar.style.width = `${progress}%`;
            xpPercentage.textContent = `${progress}%`;
        }

        if (compassTrack) {
            const scrollPos = (scrollTop * 0.3) % 360;
            compassTrack.style.transform = `translateX(${-scrollPos + mouseOffset}px)`;
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHudOnScroll);
            ticking = true;
        }
    }, { passive: true });

    updateHudOnScroll();

    // Modais
    const openModal = (modalId) => {
        playBeep(520, 0.08, 'triangle');
        const targetModal = document.getElementById(modalId);
        if (!targetModal) return;
        targetModal.classList.add('active');
        targetModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeAllModals = () => {
        overlays.forEach(overlay => {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = '';
    };

    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', () => playBeep(1200, 0.02, 'sine'));
        card.addEventListener('click', () => {
            const popupId = card.getAttribute('data-popup');
            openModal(popupId);
        });
    });

    overlays.forEach(overlay => {
        const closeBtn = overlay.querySelector('.close-btn');
        if (closeBtn) closeBtn.addEventListener('click', closeAllModals);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeAllModals();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllModals();
    });

    // Toast de Cópia
    const showToast = (text) => {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = text;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2800);
    };

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            playBeep(980, 0.06, 'square');
            const valueToCopy = btn.getAttribute('data-copy');
            if (!valueToCopy) return;

            try {
                await navigator.clipboard.writeText(valueToCopy);
                showToast(`COPIADO: ${valueToCopy.toUpperCase()}`);
            } catch (err) {
                showToast(`COPIADO: ${valueToCopy.toUpperCase()}`);
            }
        });
    });

    // Minigame Breach Protocol Lógica
    matrixSpans.forEach(span => {
        span.addEventListener('click', () => {
            playBeep(750, 0.04, 'sawtooth');
            if (selectedBuffer.length < 3) {
                selectedBuffer.push(span.textContent);
                span.classList.add('selected');
                updateRamSlots();
            }
        });
    });

    const updateRamSlots = () => {
        const slots = ramSlotsContainer.querySelectorAll('.ram-slot');
        slots.forEach((slot, index) => {
            slot.textContent = selectedBuffer[index] || '--';
        });
    };

    breachBtn.addEventListener('click', () => {
        playBeep(1100, 0.1, 'square');
        if (selectedBuffer.length === 3 && selectedBuffer.every((val, idx) => val === targetSequence[idx])) {
            breachResult.textContent = '// STATUS: HACK BEM-SUCEDIDO! SISTEMA OTIMIZADO.';
            breachResult.style.color = 'var(--sys-green)';
            showToast('HACK DE BREACH CONCLUÍDO!');
        } else {
            breachResult.textContent = '// STATUS: FALHA NO HACK. TENTE NOVAMENTE.';
            breachResult.style.color = 'var(--sys-accent)';
            selectedBuffer = [];
            matrixSpans.forEach(s => s.classList.remove('selected'));
            updateRamSlots();
        }
    });
});