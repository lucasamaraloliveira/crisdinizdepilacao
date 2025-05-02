document.addEventListener('DOMContentLoaded', function() {

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
                if (navLinks.classList.contains('open')) {
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


    // Rolagem Suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calcula a posição do topo do elemento, subtraindo a altura do header fixo
                // Certifica-se de que o header existe antes de obter a altura
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
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, {
        threshold: 0.1, // Quando 10% do elemento estiver visível
        rootMargin: '0px 0px -80px 0px' // Começa a observar 80px antes de chegar
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});