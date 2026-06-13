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
        heroVideo.play().catch(() => {
            /* autoplay blocked — gradient fallback in CSS */
        });
    }
})();
