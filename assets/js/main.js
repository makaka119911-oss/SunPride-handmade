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

    const heroVideos = document.querySelectorAll('.hero__video');
    heroVideos.forEach((video) => {
        video.play().catch(() => {
            /* autoplay blocked — gradient fallback in CSS */
        });
    });

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
})();
