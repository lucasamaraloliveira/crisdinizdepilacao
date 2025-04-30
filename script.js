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
    // const heroHeight = heroSection ? heroSection.offsetHeight : 600; // Altura do hero ou fallback - Não necessário para a sombra do header

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

    if (hamburger && navLinks && body) {
        // Abrir/Fechar menu ao clicar no hambúrguer
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('is-active'); // Opcional: para animar o ícone
            body.classList.toggle('no-scroll'); // Previne scroll no body
        });

        // Fechar menu ao clicar em um link (para navegação suave)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    hamburger.classList.remove('is-active');
                    body.classList.remove('no-scroll');
                }
            });
        });

        // Opcional: Fechar menu ao redimensionar a janela (se o menu mobile estiver aberto)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) { // Use o breakpoint CSS onde o menu hamburguer some
                 if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    hamburger.classList.remove('is-active');
                    body.classList.remove('no-scroll');
                }
            }
        });
    }


    // Rolagem Suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calcula a posição do topo do elemento, subtraindo a altura do header fixo
                const headerOffset = document.querySelector('header').offsetHeight;
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