(function () {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

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
        burger.addEventListener('click', () => {
            const open = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', open ? 'false' : 'true');
            mobileNav.hidden = open;
        });

        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                burger.setAttribute('aria-expanded', 'false');
                mobileNav.hidden = true;
            });
        });
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

    const heroVideo = document.querySelector('.hero__video');
    if (heroVideo) {
        heroVideo.play().catch(() => {});
    }

    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        revealEls.forEach((el, i) => {
            el.style.transitionDelay = `${Math.min(i % 4, 3) * 0.08}s`;
            revealObserver.observe(el);
        });
    } else {
        revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    const lightbox = document.getElementById('lightbox');
    const lbImg = lightbox?.querySelector('.lightbox__img');
    const lbCaption = lightbox?.querySelector('.lightbox__caption');
    const lbTriggers = Array.from(document.querySelectorAll('[data-lightbox]'));
    let lbIndex = 0;

    function showSlide(index) {
        if (!lightbox || !lbImg || !lbTriggers.length) return;
        lbIndex = (index + lbTriggers.length) % lbTriggers.length;
        const trigger = lbTriggers[lbIndex];
        const src = trigger.getAttribute('data-lightbox') || '';
        const caption = trigger.getAttribute('data-caption') || '';
        lbImg.src = src;
        lbImg.alt = caption;
        if (lbCaption) lbCaption.textContent = caption;
    }

    function openLightbox(index) {
        if (!lightbox) return;
        showSlide(index);
        lightbox.hidden = false;
        document.body.classList.add('lightbox-open');
        lightbox.querySelector('.lightbox__close')?.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.hidden = true;
        document.body.classList.remove('lightbox-open');
        lbTriggers[lbIndex]?.focus();
    }

    lbTriggers.forEach((btn, i) => {
        btn.addEventListener('click', () => openLightbox(i));
    });

    lightbox?.querySelectorAll('[data-lightbox-close]').forEach((el) => {
        el.addEventListener('click', closeLightbox);
    });

    lightbox?.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => {
        showSlide(lbIndex - 1);
    });

    lightbox?.querySelector('[data-lightbox-next]')?.addEventListener('click', () => {
        showSlide(lbIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox || lightbox.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showSlide(lbIndex - 1);
        if (e.key === 'ArrowRight') showSlide(lbIndex + 1);
    });
})();
