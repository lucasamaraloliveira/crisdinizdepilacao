document.addEventListener('DOMContentLoaded', function() {

    // --- CONTROLE DE VISIBILIDADE DA SEÇÃO DE PROMOÇÕES ---
    // Altere o valor desta variável para 'true' para MOSTRAR as promoções,
    // ou 'false' para ESCONDER a seção de promoções.
    const showPromotionsSection = true; // Mude para false para desativar

    const promotionsSection = document.getElementById('promocoes');
    const promotionsNavLink = document.querySelector('a[href="#promocoes"]'); // Encontra o link no menu

    if (promotionsSection) { // Verifica se a seção existe
        if (!showPromotionsSection) {
            // Se a variável for false, adiciona a classe 'hidden' para esconder a seção
            promotionsSection.classList.add('hidden');
            console.log('Seção de Promoções desativada.');

            // Opcional: Esconder também o link no menu de navegação
            if (promotionsNavLink) {
                promotionsNavLink.parentElement.style.display = 'none'; // Esconde o <li> pai
            }

        } else {
             // Se a variável for true, garante que a classe 'hidden' seja removida
            promotionsSection.classList.remove('hidden');
             console.log('Seção de Promoções ativada.');

             // Garante que o link no menu esteja visível
             if (promotionsNavLink) {
                 promotionsNavLink.parentElement.style.display = ''; // Remove o estilo display: none
             }
        }
    }
    // --- FIM DO CONTROLE DE VISIBILIDADE ---


    // Animação inicial da seção Hero após carregar
    const heroSection = document.getElementById('hero');
    // Adiciona um pequeno delay para garantir que o CSS inicial seja aplicado antes da animação
    setTimeout(() => {
        if (heroSection) {
            heroSection.classList.add('loaded');
        }
    }, 100); // 100ms delay

    // Header Dinâmico (mudar sombra ao rolar)
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        // Adiciona a classe 'scrolled' quando a rolagem for maior que 50px (ou header.offsetHeight se preferir)
        if (window.scrollY > 50) { // Usar um valor fixo ou header.offsetHeight
             header.classList.add('scrolled');
        } else {
             header.classList.remove('scrolled');
        }
    });

    // Menu Hambúrguer
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    // Seleciona o elemento <i> que contém o ícone
    const hamburgerIcon = hamburger ? hamburger.querySelector('i') : null;

    // Função para atualizar o ícone do hambúrguer (bars ou times/x)
    function updateHamburgerIcon() {
        if (!hamburgerIcon) return; // Sai se o elemento do ícone não for encontrado

        // Verifica se o menu de navegação está aberto (pela classe 'open' nos links)
        const isMenuOpen = navLinks.classList.contains('open');

        if (isMenuOpen) {
            // Menu está aberto, muda para 'X'
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times'); // Use fa-times para o ícone de fechar
            hamburger.setAttribute('aria-label', 'Fechar menu'); // Atualiza o rótulo de acessibilidade
        } else {
            // Menu está fechado, volta para 'hambúrguer'
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
            hamburger.setAttribute('aria-label', 'Abrir menu'); // Atualiza o rótulo de acessibilidade
        }
         // Opcional: Mantenha a classe 'is-active' no botão se usá-la para outros estilos
        if (isMenuOpen) {
            hamburger.classList.add('is-active');
        } else {
            hamburger.classList.remove('is-active');
        }
    }


    if (hamburger && navLinks && body && hamburgerIcon) { // Garante que todos os elementos existem
        // Abrir/Fechar menu ao clicar no hambúrguer
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            body.classList.toggle('no-scroll'); // Previne scroll no body

            // Atualiza o estado do ícone DEPOIS de alternar a classe 'open'
            updateHamburgerIcon();
        });

        // Fechar menu ao clicar em um link (para navegação suave)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Verifica se o link clicado NÃO é o link de promoções E se as promoções estão desativadas
                // Ou se o link clicado é o de promoções E as promoções estão ativadas
                const isPromotionsLink = link.getAttribute('href') === '#promocoes';
                 // Fecha o menu se não for o link de promoções (ou se for o de promoções E a seção estiver visível)
                const shouldCloseMenu = !isPromotionsLink || (isPromotionsLink && showPromotionsSection);


                if (navLinks.classList.contains('open') && shouldCloseMenu) {
                    // Fecha o menu removendo as classes
                    navLinks.classList.remove('open');
                    body.classList.remove('no-scroll');

                    // Atualiza o estado do ícone DEPOIS de fechar o menu
                    updateHamburgerIcon();
                }
            });
        });

        // Opcional: Fechar menu ao redimensionar a janela (se o menu mobile estiver aberto)
        window.addEventListener('resize', () => {
            // Verifica se a largura da janela é maior que o breakpoint onde o menu hamburguer some no CSS
            if (window.innerWidth > 768) {
                 if (navLinks.classList.contains('open')) {
                    // Fecha o menu removendo as classes
                    navLinks.classList.remove('open');
                    body.classList.remove('no-scroll');

                    // Atualiza o estado do ícone DEPOIS de fechar o menu
                    updateHamburgerIcon();
                }
            }
        });

        // Inicializa o estado do ícone ao carregar a página (opcional, mas boa prática)
        // updateHamburgerIcon(); // Assume que o menu começa fechado, o estado padrão já é fa-bars
    }


    // Rolagem Suave para links internos (mantido para outros links #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
             const targetId = this.getAttribute('href').substring(1);
             const targetElement = document.getElementById(targetId);
             const isPromotionsLink = targetId === 'promocoes';

             // Se for o link de promoções E a seção estiver desativada, previne o default e sai.
             // Isso lida com o link no menu de navegação quando a seção está oculta.
             if (isPromotionsLink && !showPromotionsSection) {
                 e.preventDefault();
                 // Não precisa rolar, apenas impede o comportamento padrão do link (#)
                 return;
             }

            // Para todos os outros links # ou para o link #promocoes QUANDO visível:
            e.preventDefault();

            if (targetElement) {
                const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- NOVA LÓGICA PARA BOTÕES DE PROMOÇÃO WHATSAPP ---
    const promoWhatsAppButtons = document.querySelectorAll('.btn-promo-whatsapp');
    const whatsappNumber = '5521976430017'; // Seu número do WhatsApp

    promoWhatsAppButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o comportamento padrão do link (href="javascript:void(0);")

            // Encontra o item de promoção pai deste botão
            const promotionItem = this.closest('.promotion-item');

            if (promotionItem) {
                // Encontra o título (h3) dentro do item de promoção
                const promotionTitleElement = promotionItem.querySelector('h3');

                if (promotionTitleElement) {
                    const promotionName = promotionTitleElement.textContent.trim(); // Pega o texto do título e remove espaços extras

                    // Constrói a mensagem personalizada
                    const baseMessage = 'Olá! Gostaria de agendar a promoção:';
                    const fullMessage = `${baseMessage} ${promotionName}`; // Combina a mensagem base com o nome da promoção

                    // Codifica a mensagem para uso na URL do WhatsApp
                    const encodedMessage = encodeURIComponent(fullMessage);

                    // Cria a URL completa do WhatsApp
                    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

                    // Abre a URL no WhatsApp (em uma nova aba)
                    window.open(whatsappURL, '_blank');
                } else {
                    console.error("Título da promoção (h3) não encontrado no item.", promotionItem);
                }
            } else {
                console.error("Item de promoção pai (.promotion-item) não encontrado para o botão.", this);
            }
        });
    });
    // --- FIM NOVA LÓGICA ---


    // Botão Voltar ao Topo
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Mostra o botão quando a rolagem for maior que 400px
        if (window.scrollY > 400) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animação Fade-in ao Rolar (IntersectionObserver)
    // Certifica-se de que este observador também observe os novos elementos .animate-on-scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Adiciona uma verificação adicional: só anima se o elemento não estiver dentro de uma seção 'hidden'
            // Isso evita que elementos em seções escondidas tentem animar
            const parentSection = entry.target.closest('.section');
            const isHidden = parentSection && parentSection.classList.contains('hidden');

            if (entry.isIntersecting && !isHidden) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, {
        threshold: 0.1, // Quando 10% do elemento estiver visível
        rootMargin: '0px 0px -80px 0px' // Começa a observar 80px antes de chegar
    });

    elementsToAnimate.forEach(element => {
         // Só observe elementos que não estão em uma seção escondida ao carregar
         const parentSection = element.closest('.section');
         const isHidden = parentSection && parentSection.classList.contains('hidden');
         if (!isHidden) {
            observer.observe(element);
         }
    });
});