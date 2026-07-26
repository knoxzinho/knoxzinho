document.addEventListener('DOMContentLoaded', () => {
    // ================= SELETORES DE ELEMENTOS =================
    const interactives = document.querySelectorAll('.bl-interactive');
    const closeButtons = document.querySelectorAll('.close-btn');
    const overlays = document.querySelectorAll('.bl-modal-overlay');
    const xpBar = document.getElementById('xpBar');
    const xpPercentage = document.getElementById('xpPercentage');

    // ================= LÓGICA DOS POPUPS / MODAIS =================

    // Função centralizada para fechar todos os modais ativos
    const closeAllModals = () => {
        overlays.forEach(overlay => overlay.classList.remove('active'));
        document.body.style.overflow = ''; // Reativa a rolagem da página
    };

    // Mapeamento de clique para abrir as transmissões de dados (Popups)
    interactives.forEach(card => {
        card.addEventListener('click', () => {
            const popupTarget = card.getAttribute('data-popup');
            const targetModal = document.getElementById(popupTarget);
            if (targetModal) {
                targetModal.classList.add('active');
                // Impede que a página de fundo role enquanto o modal estiver aberto
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Fechar ao clicar no botão de fechar (X)
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            closeAllModals();
            e.stopPropagation(); // Evita bolha de eventos indesejada
        });
    });

    // Fechar ao clicar na área escura (Overlay) fora do painel amarelo
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeAllModals();
            }
        });
    });

    // Fechar o dispositivo ECHO pressionando a tecla ESC do teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // ================= LÓGICA DA BARRA DE XP (PROGRESSO DE SCROLL) =================

    const updateXPBar = () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Calcula a porcentagem real percorrida, tratando se a página for menor que o viewport
        const scrolled = height > 0 ? Math.round((winScroll / height) * 100) : 0;
        
        // Atualiza dinamicamente a interface do HUD
        if (xpBar && xpPercentage) {
            xpBar.style.width = scrolled + '%';
            xpPercentage.innerText = scrolled + '%';
        }
    };

    // Dispara a atualização ao rolar a página
    window.addEventListener('scroll', updateXPBar);
    
    // Executa uma vez no carregamento caso o usuário dê F5 no meio da página
    updateXPBar();
});