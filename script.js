document.addEventListener('DOMContentLoaded', () => {
    const xpBar = document.getElementById('xpBar');
    const xpPercentage = document.getElementById('xpPercentage');
    const compassTrack = document.getElementById('compassTrack');
    const interactiveCards = document.querySelectorAll('[data-popup]');
    const overlays = document.querySelectorAll('.fc-modal-overlay');
    const copyButtons = document.querySelectorAll('[data-copy]');
    const toast = document.getElementById('tacticalToast');
    const toastMessage = document.getElementById('toastMessage');

    let ticking = false;
    let toastTimeout = null;

    // 1. ATUALIZAÇÃO DE SCROLL OTIMIZADA (60 FPS + BÚSSOLA FAR CRY)
    const updateHudOnScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 100;

        if (xpBar && xpPercentage) {
            xpBar.style.width = `${progress}%`;
            xpPercentage.textContent = `${progress}%`;
        }

        // Move a bússola horizontalmente conforme o scroll
        if (compassTrack) {
            const offset = (scrollTop * 0.25) % 360;
            compassTrack.style.transform = `translateX(-${offset}px)`;
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHudOnScroll);
            ticking = true;
        }
    }, { passive: true });

    // Inicializa estado da barra ao carregar
    updateHudOnScroll();

    // 2. SISTEMA DE MODAIS (DOSSIÊS TÁTICOS) COM ACESSIBILIDADE
    const openModal = (modalId) => {
        const targetModal = document.getElementById(modalId);
        if (!targetModal) return;
        targetModal.classList.add('active');
        targetModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Evita scroll do fundo
    };

    const closeAllModals = () => {
        overlays.forEach(overlay => {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = '';
    };

    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            const popupId = card.getAttribute('data-popup');
            openModal(popupId);
        });
    });

    overlays.forEach(overlay => {
        const closeBtn = overlay.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeAllModals);
        }

        // Fecha ao clicar fora da caixa do modal
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });

    // Fecha o modal ao pressionar a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // 3. SISTEMA DE RÁDIO: COPIAR TELEFONE / E-MAIL COM 1 CLIQUE
    const showToast = (text) => {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = text;
        toast.classList.add('show');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    };

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const valueToCopy = btn.getAttribute('data-copy');
            if (!valueToCopy) return;

            try {
                await navigator.clipboard.writeText(valueToCopy);
                showToast(`COPIADO: ${valueToCopy.toUpperCase()}`);
            } catch (err) {
                // Fallback caso o navegador bloqueie clipboard sem HTTPS
                const tempInput = document.createElement('input');
                tempInput.value = valueToCopy;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                showToast(`COPIADO: ${valueToCopy.toUpperCase()}`);
            }
        });
    });
});