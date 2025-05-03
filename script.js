document.addEventListener('DOMContentLoaded', function() {

    // --- URLs e NÚMEROS ---
    const whatsappNumber = '5521976430017'; // Seu número do WhatsApp
    const generalHotmartEbooksURL = 'SUA_URL_GERAL_HOTMART_EBOOKS'; // SUBSTITUA PELA URL REAL DA SUA PÁGINA GERAL DE EBOOKS NO HOTMART
    // --- FIM URLs e NÚMEROS ---


    // --- CONTROLE DE VISIBILIDADE DA SEÇÃO DE PROMOÇÕES ---
    const showPromotionsSection = true; // Mude para false para desativar

    const promotionsSection = document.getElementById('promocoes');
    const promotionsNavLink = document.querySelector('a[href="#promocoes"]');

    if (promotionsSection) {
        if (!showPromotionsSection) {
            promotionsSection.classList.add('hidden');
            console.log('Seção de Promoções desativada.');
            if (promotionsNavLink) {
                promotionsNavLink.parentElement.style.display = 'none';
            }
        } else {
            promotionsSection.classList.remove('hidden');
            console.log('Seção de Promoções ativada.');
            if (promotionsNavLink) {
                promotionsNavLink.parentElement.style.display = '';
            }
        }
    }
    // --- FIM DO CONTROLE DE VISIBILIDADE ---


    // Animação inicial da seção Hero após carregar
    const heroSection = document.getElementById('hero');
    setTimeout(() => {
        if (heroSection) {
            heroSection.classList.add('loaded');
        }
    }, 100);

    // Header Dinâmico (mudar sombra ao rolar)
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
             header.classList.add('scrolled');
        } else {
             header.classList.remove('scrolled');
        }
    });


    // Menu Hambúrguer
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const hamburgerIcon = hamburger ? hamburger.querySelector('i') : null;

    function updateHamburgerIcon() {
        if (!hamburgerIcon) return;
        const isMenuOpen = navLinks.classList.contains('open');

        if (isMenuOpen) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
            hamburger.setAttribute('aria-label', 'Fechar menu');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
            hamburger.setAttribute('aria-label', 'Abrir menu');
        }
        if (isMenuOpen) {
            hamburger.classList.add('is-active');
        } else {
            hamburger.classList.remove('is-active');
        }
    }

    if (hamburger && navLinks && body && hamburgerIcon) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            body.classList.toggle('no-scroll');
            updateHamburgerIcon();
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                 const targetId = this.getAttribute('href').substring(1);
                 const isPromotionsLink = targetId === 'promocoes';
                 const shouldCloseMenu = !isPromotionsLink || (isPromotionsLink && showPromotionsSection);

                 if (navLinks.classList.contains('open') && shouldCloseMenu) {
                    navLinks.classList.remove('open');
                    body.classList.remove('no-scroll');
                    updateHamburgerIcon();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                 if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    body.classList.remove('no-scroll');
                    updateHamburgerIcon();
                }
            }
        });
    }


    // Rolagem Suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
             const targetId = this.getAttribute('href').substring(1);
             const targetElement = document.getElementById(targetId);

             const isPromotionsLink = targetId === 'promocoes';

             if (targetElement && (!isPromotionsLink || (isPromotionsLink && showPromotionsSection))) {
                 e.preventDefault();

                const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
             } else if (isPromotionsLink && !showPromotionsSection) {
                 e.preventDefault();
             }
        });
    });


    // --- LÓGICA PARA BOTÕES DE PROMOÇÃO WHATSAPP ---
    const promoWhatsAppButtons = document.querySelectorAll('.btn-promo-whatsapp');

    promoWhatsAppButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const promotionItem = this.closest('.promotion-item');

            if (promotionItem) {
                const promotionTitleElement = promotionItem.querySelector('h3');

                if (promotionTitleElement) {
                    const promotionName = promotionTitleElement.textContent.trim();
                    const baseMessage = 'Olá! Gostaria de agendar a promoção:';
                    const fullMessage = `${baseMessage} ${promotionName}`;
                    const encodedMessage = encodeURIComponent(fullMessage);
                    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

                    window.open(whatsappURL, '_blank');
                } else {
                    console.error("Título da promoção (h3) não encontrado no item.", promotionItem);
                }
            } else {
                console.error("Item de promoção pai (.promotion-item) não encontrado para o botão.", this);
            }
        });
    });
    // --- FIM LÓGICA ---


    // --- LÓGICA PARA BOTÕES GERAIS DAS SEÇÕES (Cursos e Ebooks) ---
    const coursesSectionButton = document.querySelector('.btn-section-courses');
    const ebooksSectionButton = document.querySelector('.btn-section-ebooks');

    if (coursesSectionButton) {
        const message = "Olá! Tenho interesse em saber mais sobre os cursos que você oferece.";
        const encodedMessage = encodeURIComponent(message);
        coursesSectionButton.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    } else {
        console.warn("Botão '.btn-section-courses' não encontrado.");
    }

    if (ebooksSectionButton) {
        if (generalHotmartEbooksURL && generalHotmartEbooksURL !== 'SUA_URL_GERAL_HOTMART_EBOOKS') {
             ebooksSectionButton.href = generalHotmartEbooksURL;
        } else {
             console.error("URL geral do Hotmart para Ebooks não definida. O botão pode não funcionar.");
             ebooksSectionButton.removeAttribute('href');
             // Opcional: Esconde o botão se a URL não estiver configurada
             // ebooksSectionButton.style.display = 'none';
        }
    } else {
         console.warn("Botão '.btn-section-ebooks' não encontrado.");
    }
    // --- FIM LÓGICA BOTÕES GERAIS ---


    // --- LÓGICA DO MODAL ---
    const modal = document.getElementById('myModal');
    const modalContent = modal ? modal.querySelector('.modal-content') : null;
    const closeButton = modal ? modal.querySelector('.close-button') : null;
    const modalImage = modal ? document.getElementById('modal-image') : null;
    const modalTitle = modal ? document.getElementById('modal-title') : null;
    const modalDescription = modal ? document.getElementById('modal-description') : null;
    const modalButton = modal ? document.getElementById('modal-button') : null;

    function openModal(title, description, imageUrl, buttonText, buttonAction, targetUrl) {
        if (!modal || !modalContent || !modalImage || !modalTitle || !modalDescription || !modalButton) {
            console.error("Elementos do modal não encontrados.");
            return;
        }

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imageUrl || '';
        modalImage.alt = title || 'Imagem do Item';

        modalButton.textContent = buttonText;
        modalButton.setAttribute('target', '_blank');
        modalButton.classList.remove('btn-modal-whatsapp', 'btn-modal-hotmart');

        modalButton.style.display = '';

        if (buttonAction === 'whatsapp') {
            modalButton.classList.add('btn-modal-whatsapp');
            const encodedMessage = encodeURIComponent(`Olá! Tenho interesse no curso: ${title}`);
            modalButton.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        } else if (buttonAction === 'hotmart') {
             // Note: Estamos usando targetUrl diretamente aqui, vindo do data attribute do item
             modalButton.classList.add('btn-modal-hotmart'); // Usa estilo primary por padrão
             modalButton.href = targetUrl;
             // Verificação de URL Hotmart movida para o listener para ser mais específica por item
        } else {
            modalButton.style.display = 'none';
            modalButton.href = '#';
        }


        modal.classList.add('open');
        body.classList.add('no-scroll');
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('open');
            setTimeout(() => {
                body.classList.remove('no-scroll');
            }, 300);
        }
    }

    // --- LISTENERS PARA ABRIR MODAL CLICANDO NO LINK INTERNO (.item-details-link) ---
    document.querySelectorAll('.course-item .item-details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link (#)

            // Encontra o item pai (.course-item) para pegar os dados
            const item = this.closest('.course-item');
            if (!item) {
                 console.error("Item pai (.course-item) não encontrado para o link.", this);
                 return;
            }

            const title = item.querySelector('h3').textContent;
            const description = item.getAttribute('data-full-description');
            const imageUrl = item.getAttribute('data-large-image') || item.querySelector('img').src;
            const buttonText = 'Tenho interesse no curso!';
            const buttonAction = 'whatsapp';

            openModal(title, description, imageUrl, buttonText, buttonAction);
        });
    });

    document.querySelectorAll('.ebook-item .item-details-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Previne o comportamento padrão do link (#)

            // Encontra o item pai (.ebook-item) para pegar os dados
            const item = this.closest('.ebook-item');
             if (!item) {
                 console.error("Item pai (.ebook-item) não encontrado para o link.", this);
                 return;
            }

            const title = item.querySelector('h3').textContent;
            const description = item.getAttribute('data-full-description');
            const imageUrl = item.getAttribute('data-large-image') || item.querySelector('img').src;
            const hotmartUrl = item.getAttribute('data-hotmart-url');
            const buttonText = 'Comprar Ebook na Hotmart!';
            const buttonAction = 'hotmart';

            // Verifica a URL Hotmart ANTES de tentar abrir o modal com ela configurada
            if (!hotmartUrl || hotmartUrl === 'SUA_URL_HOTMART_EBOOK1' || hotmartUrl === 'SUA_URL_HOTMART_EBOOK2' || hotmartUrl === 'SUA_URL_GERAL_HOTMART_EBOOKS') {
                console.error(`URL do Hotmart não configurada corretamente para o ebook "${title}". Data attribute: ${hotmartUrl}`);
                // Opcional: Mostra uma mensagem para o usuário que a URL não está pronta
                alert(`Desculpe, a compra deste ebook ainda não está disponível. Por favor, entre em contato para mais informações.`);
                return; // Sai da função, não abre o modal
            }


            openModal(title, description, imageUrl, buttonText, buttonAction, hotmartUrl);
        });
    });
    // --- FIM LISTENERS PARA ABRIR MODAL ---


    // Adiciona listeners para fechar o modal
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
            closeModal();
        }
    });
    // --- FIM LÓGICA DO MODAL ---


    // Botão Voltar ao Topo
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
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
            const parentSection = entry.target.closest('.section');
            const isHidden = parentSection && parentSection.classList.contains('hidden');

            if (entry.isIntersecting && !isHidden) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    elementsToAnimate.forEach(element => {
         const parentSection = element.closest('.section');
         const isHidden = parentSection && parentSection.classList.contains('hidden');
         if (!isHidden) {
            observer.observe(element);
         }
    });
});