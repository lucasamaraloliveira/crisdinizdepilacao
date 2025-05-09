document.addEventListener('DOMContentLoaded', function() {

    // --- URLs e NÚMEROS ---
    const whatsappNumber = '5521976430017'; // Seu número do WhatsApp
    // const generalHotmartEbooksURL = 'SUA_URL_GERAL_HOTMART_EBOOKS'; // Desativado pois o link hotmart é por ebook agora
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
                 // Fecha o menu se NÃO for o link de promoções QUANDO ela está desativada
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
             // Só rola se a seção de promoções estiver ativada OU se não for o link de promoções
             const shouldScroll = !isPromotionsLink || (isPromotionsLink && showPromotionsSection);

             if (targetElement && shouldScroll) {
                 e.preventDefault();

                const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
             } else if (isPromotionsLink && !showPromotionsSection) {
                 // Se for o link de promoções e a seção estiver desativada, previne o comportamento padrão
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
    // Estes botões parecem ter sido removidos ou comentados no HTML,
    // mas a lógica permanece para caso sejam reativados.
    const coursesSectionButton = document.querySelector('.btn-section-courses');
    const ebooksSectionButton = document.querySelector('.btn-section-ebooks');

    if (coursesSectionButton) {
        const message = "Olá! Tenho interesse em saber mais sobre os cursos que você oferece.";
        const encodedMessage = encodeURIComponent(message);
        coursesSectionButton.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    } else {
        // console.warn("Botão '.btn-section-courses' não encontrado."); // Remover aviso se for intencional
    }

    if (ebooksSectionButton) {
        // Note: A URL geral Hotmart parece não ser usada mais com o modal por item.
        // Se a URL geral for necessária, descomente a variável e a lógica abaixo.
        /*
        if (generalHotmartEbooksURL && generalHotmartEbooksURL !== 'SUA_URL_GERAL_HOTMART_EBOOKS') {
             ebooksSectionButton.href = generalHotmartEbooksURL;
        } else {
             console.error("URL geral do Hotmart para Ebooks não definida. O botão pode não funcionar.");
             ebooksSectionButton.removeAttribute('href');
        }
        */
        // Como agora o clique nos itens de ebook abre o modal, este botão geral pode ser removido do HTML ou ter outra função.
        // A lógica atual do modal usa a URL do item, não a geral.
    } else {
         // console.warn("Botão '.btn-section-ebooks' não encontrado."); // Remover aviso se for intencional
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
    // Referência ao novo bloco de informações extras
    const courseModalExtraInfo = modal ? modal.querySelector('.course-modal-extra-info') : null;


    // Modifique a assinatura da função openModal para aceitar 'itemType'
    function openModal(title, description, imageUrl, buttonText, buttonAction, targetUrl, itemType) { // Adicionado itemType

        // Adicionado courseModalExtraInfo na verificação
        if (!modal || !modalContent || !modalImage || !modalTitle || !modalDescription || !modalButton || !courseModalExtraInfo) {
            console.error("Elementos do modal não encontrados ou alguns não foram encontrados.");
            // Tenta abrir o modal mesmo que algum elemento extra não seja encontrado
            if (modal) modal.classList.add('open');
             if (body) body.classList.add('no-scroll');
            return; // Sai se os elementos críticos não forem encontrados
        }

        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imageUrl || '';
        modalImage.alt = title || 'Imagem do Item';

        // --- Controla a visibilidade do bloco de informações extras ---
        if (itemType === 'course') {
            courseModalExtraInfo.style.display = 'block'; // Mostra o bloco se for um curso
        } else {
            courseModalExtraInfo.style.display = 'none'; // Oculta o bloco para outros tipos (ebooks)
        }
        // --- Fim controle de visibilidade ---


        modalButton.textContent = buttonText;
        modalButton.setAttribute('target', '_blank');
        modalButton.classList.remove('btn-modal-whatsapp', 'btn-modal-hotmart', 'btn-primary');
        modalButton.classList.add('btn-primary'); // Adiciona a classe base

        modalButton.style.display = ''; // Garante que o botão seja exibido por padrão

        if (buttonAction === 'whatsapp') {
            modalButton.classList.add('btn-modal-whatsapp'); // Adiciona classe para estilo específico do WhatsApp
            const encodedMessage = encodeURIComponent(`Olá! Tenho interesse no curso: ${title}`);
            modalButton.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        } else if (buttonAction === 'hotmart') {
             modalButton.classList.add('btn-modal-hotmart'); // Adiciona classe para estilo específico do Hotmart (opcional)
             modalButton.href = targetUrl;

            // ... (verificação de URL Hotmart movida para o listener, como já está) ...

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
            // Atraso para remover no-scroll, permitindo que a transição do modal termine
            setTimeout(() => {
                if (body) body.classList.remove('no-scroll');
            }, 300); // 300ms é o tempo da transição de opacidade no CSS
        }
    }

    // --- LISTENERS PARA ABRIR MODAL CLICANDO NO LINK INTERNO (.item-details-link) ---
    // Listener para Cursos
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
            // Usa data-large-image se existir, caso contrário usa a imagem do próprio item
            const itemImg = item.querySelector('img');
            const imageUrl = item.getAttribute('data-large-image') || (itemImg ? itemImg.src : '');
            const buttonText = 'Tenho interesse no curso!';
            const buttonAction = 'whatsapp'; // Ação para linkar para o WhatsApp

            // Chamar openModal, passando 'course' como itemType
            openModal(title, description, imageUrl, buttonText, buttonAction, null, 'course');
        });
    });

    // Listener para Ebooks
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
            // Usa data-large-image se existir, caso contrário usa a imagem do próprio item
             const itemImg = item.querySelector('img');
            const imageUrl = item.getAttribute('data-large-image') || (itemImg ? itemImg.src : '');
            const hotmartUrl = item.getAttribute('data-hotmart-url');
            const buttonText = 'Comprar Ebook na Hotmart!';
            const buttonAction = 'hotmart'; // Ação para linkar para a Hotmart

            // Verifica a URL Hotmart ANTES de tentar abrir o modal com ela configurada
            if (!hotmartUrl || hotmartUrl.includes('SUA_URL_HOTMART_EBOOK') || hotmartUrl.includes('SUA_URL_GERAL_HOTMART_EBOOKS')) {
                console.error(`URL do Hotmart não configurada corretamente para o ebook "${title}". Data attribute: ${hotmartUrl}`);
                // Opcional: Mostra uma mensagem para o usuário que a URL não está pronta
                alert(`Desculpe, a compra deste ebook ainda não está disponível ou o link não foi configurado corretamente. Por favor, entre em contato para mais informações.`);
                return; // Sai da função, não abre o modal
            }

            // Chamar openModal, passando 'ebook' como itemType
            openModal(title, description, imageUrl, buttonText, buttonAction, hotmartUrl, 'ebook');
        });
    });
    // --- FIM LISTENERS PARA ABRIR MODAL ---


    // Adiciona listeners para fechar o modal
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (modal) {
        // Fecha o modal clicando no overlay (fora do conteúdo)
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Fecha o modal pressionando a tecla ESC
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
            const parentSection = entry.target.closest('.section'); // Encontra a seção pai
            // Verifica se a seção pai existe e se tem a classe 'hidden' (usada para promoções)
            const isHidden = parentSection && parentSection.classList.contains('hidden');

            // Só anima se estiver intersectando E a seção PAI não estiver oculta
            if (entry.isIntersecting && !isHidden) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Opcional: Para de observar depois de animar
            }
             // Se você quiser que eles desapareçam ao sair da tela, descomente a linha abaixo
            // else if (!entry.isIntersecting) {
            //     entry.target.classList.remove('visible');
            // }
        });
    }, {
        threshold: 0.1, // Quantidade do elemento visível para disparar
        rootMargin: '0px 0px -80px 0px' // Margem inferior negativa para disparar um pouco antes
    });

    elementsToAnimate.forEach(element => {
         const parentSection = element.closest('.section');
         const isHidden = parentSection && parentSection.classList.contains('hidden');
         // Só observa o elemento se a seção pai NÃO estiver oculta
         if (!isHidden) {
            observer.observe(element);
         } else {
             // Se a seção estiver oculta, garante que o elemento não tenha a classe 'visible'
             element.classList.remove('visible');
         }
    });


}); // Fim do DOMContentLoaded