(function () {
    const config = window.SUNPRIDE_CONFIG || {};
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    function trackEvent(name) {
        if (!name) return;
        if (typeof window.ym === 'function' && config.yandexMetrikaId) {
            window.ym(config.yandexMetrikaId, 'reachGoal', name);
        }
    }

    function initMetrika() {
        const id = config.yandexMetrikaId;
        if (!id) return;

        (function (m, e, t, r, i, k, a) {
            m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
            m[i].l = 1 * new Date();
            for (let j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) return;
            }
            k = e.createElement(t);
            a = e.getElementsByTagName(t)[0];
            k.async = 1;
            k.src = r;
            a.parentNode.insertBefore(k, a);
        })(window, document, 'script', `https://mc.yandex.ru/metrika/tag.js?id=${id}`, 'ym');

        window.ym(id, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
        });
    }

    initMetrika();

    document.querySelectorAll('[data-track]').forEach((el) => {
        el.addEventListener('click', () => trackEvent(el.getAttribute('data-track')));
    });

    const header = document.getElementById('header');
    if (header) {
        const onScroll = () => {
            header.classList.toggle('header--solid', window.scrollY > 48);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    const burger = document.querySelector('.burger');
    const mobileNav = document.getElementById('mobileNav');

    if (burger && mobileNav) {
        const setNavOpen = (open) => {
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
            mobileNav.hidden = !open;
            document.body.classList.toggle('nav-open', open);
        };

        burger.addEventListener('click', () => {
            const open = burger.getAttribute('aria-expanded') === 'true';
            setNavOpen(!open);
        });

        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setNavOpen(false));
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) setNavOpen(false);
        }, { passive: true });
    }

    const toast = document.getElementById('toast');
    let toastTimer;

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.hidden = true;
        }, 4000);
    }

    document.querySelectorAll('[data-waitlist]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const course = btn.getAttribute('data-waitlist');
            const text = encodeURIComponent(`Привет! Хочу на старт мастер-класса «${course}»`);
            showToast('Открываю Telegram — напишите нам');
            window.setTimeout(() => {
                window.open(`https://t.me/Tan4ik77G?text=${text}`, '_blank', 'noopener,noreferrer');
            }, 400);
        });
    });

    function shouldLoadHeroVideo() {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return false;
        return true;
    }

    function loadHeroVideos() {
        document.querySelectorAll('.hero__video[data-lazy-src]').forEach((video) => {
            const src = video.getAttribute('data-lazy-src');
            if (!src || video.querySelector('source')) return;
            const source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';
            video.appendChild(source);
            video.load();
            video.play().catch(() => {});
        });
    }

    const heroMedia = document.querySelector('.hero__media');
    if (heroMedia && 'IntersectionObserver' in window && shouldLoadHeroVideo()) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadHeroVideos();
                    videoObserver.disconnect();
                }
            });
        }, { threshold: 0.15 });
        videoObserver.observe(heroMedia);
    } else if (shouldLoadHeroVideo()) {
        loadHeroVideos();
    }

    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
        );
        revealEls.forEach((el) => observer.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    const navLinks = document.querySelectorAll('.nav a, .mobile-nav a');
    const sections = ['courses', 'works', 'about', 'contact']
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const id = entry.target.id;
                    navLinks.forEach((link) => {
                        const match = link.getAttribute('href') === `#${id}`;
                        link.classList.toggle('nav--active', match);
                    });
                });
            },
            { threshold: 0.35, rootMargin: '-20% 0px -55% 0px' }
        );
        sections.forEach((section) => navObserver.observe(section));
    }

    const stickyCta = document.getElementById('stickyCta');
    const contactSection = document.getElementById('contact');
    const heroSection = document.querySelector('.hero');

    if (stickyCta && window.matchMedia('(max-width: 767px)').matches) {
        document.body.classList.add('has-sticky-cta');
        stickyCta.hidden = false;

        const toggleSticky = () => {
            const y = window.scrollY;
            const heroEnd = heroSection ? heroSection.offsetHeight * 0.6 : 400;
            const contactTop = contactSection ? contactSection.getBoundingClientRect().top : Infinity;
            const show = y > heroEnd && contactTop > window.innerHeight * 0.5;
            stickyCta.classList.toggle('is-visible', show);
        };

        toggleSticky();
        window.addEventListener('scroll', toggleSticky, { passive: true });
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxWebp = document.getElementById('lightboxWebp');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxText = document.getElementById('lightboxText');
    const lightboxLink = document.getElementById('lightboxLink');
    let lastFocus = null;

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.hidden = true;
        document.body.classList.remove('nav-open');
        if (lastFocus) lastFocus.focus();
    }

    function openLightbox(btn) {
        if (!lightbox) return;
        lastFocus = btn;
        const src = btn.getAttribute('data-lightbox-src');
        const webp = btn.getAttribute('data-lightbox-webp');
        lightboxImg.src = src;
        lightboxImg.alt = btn.getAttribute('data-lightbox-alt') || '';
        if (lightboxWebp) lightboxWebp.srcset = webp || '';
        lightboxTitle.textContent = btn.getAttribute('data-lightbox-title') || '';
        lightboxText.textContent = btn.getAttribute('data-lightbox-text') || '';
        const link = btn.getAttribute('data-lightbox-link');
        if (lightboxLink && link) {
            lightboxLink.href = link;
            lightboxLink.hidden = false;
        } else if (lightboxLink) {
            lightboxLink.hidden = true;
        }
        lightbox.hidden = false;
        lightbox.querySelector('.lightbox__close')?.focus();
        trackEvent(btn.getAttribute('data-track'));
    }

    document.querySelectorAll('[data-lightbox-src]').forEach((btn) => {
        btn.addEventListener('click', () => openLightbox(btn));
    });

    lightbox?.querySelectorAll('[data-close-lightbox]').forEach((el) => {
        el.addEventListener('click', closeLightbox);
    });

    const videoModal = document.getElementById('videoModal');
    const videoModalEmbed = document.getElementById('videoModalEmbed');

    function closeVideoModal() {
        if (!videoModal || !videoModalEmbed) return;
        videoModal.hidden = true;
        videoModalEmbed.innerHTML = '';
        if (lastFocus) lastFocus.focus();
    }

    function openVideoModal(url) {
        if (!videoModal || !videoModalEmbed) return;
        const isYoutube = /youtu\.?be/.test(url);
        const isVk = /vk\.com|vkvideo/.test(url);

        if (isYoutube) {
            const id = url.match(/(?:youtu\.be\/|v=)([\w-]+)/)?.[1];
            if (id) {
                videoModalEmbed.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen title="Видео мастер-класса"></iframe>`;
            }
        } else if (isVk) {
            videoModalEmbed.innerHTML = `<iframe src="${url}" allowfullscreen title="Видео мастер-класса"></iframe>`;
        } else {
            videoModalEmbed.innerHTML = `<video src="${url}" controls autoplay playsinline></video>`;
        }

        videoModal.hidden = false;
        videoModal.querySelector('.video-modal__close')?.focus();
    }

    document.querySelectorAll('.play-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const url = (btn.getAttribute('data-video-url') || '').trim();
            if (!url || btn.hasAttribute('data-video-soon')) {
                showToast('Видео мастер-класса скоро появится здесь');
                return;
            }
            lastFocus = btn;
            openVideoModal(url);
            trackEvent('course-video-play');
        });
    });

    videoModal?.querySelectorAll('[data-close-video]').forEach((el) => {
        el.addEventListener('click', closeVideoModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (lightbox && !lightbox.hidden) closeLightbox();
        if (videoModal && !videoModal.hidden) closeVideoModal();
    });
})();
