import { animate, inView, stagger } from "https://esm.run/framer-motion";

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            const icon = mobileMenuButton.querySelector('i');
            icon.setAttribute('data-lucide', mobileMenu.classList.contains('hidden') ? 'menu' : 'x');
            lucide.createIcons();
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuButton.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }


    function updateHeaderStyle() {
        if (!header) return;
        
        let isDarkSectionVisible = false;
        const darkSectionIds = ['hero', 'publications', 'contact'];

        sections.forEach(section => {
            if (darkSectionIds.includes(section.id)) {
                 const rect = section.getBoundingClientRect();
                 if (rect.top <= header.offsetHeight && rect.bottom >= header.offsetHeight) {
                    isDarkSectionVisible = true;
                 }
            }
        });
        
        if (isDarkSectionVisible) {
            header.classList.add('dark-mode-header');
        } else {
            header.classList.remove('dark-mode-header');
        }

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    function updateActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - header.offsetHeight - 50) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        updateHeaderStyle();
        updateActiveNavLink();
    });
    updateHeaderStyle(); 
    updateActiveNavLink();


    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const offsetTop = targetElement.offsetTop - headerHeight;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    document.querySelectorAll('.animated-section').forEach((section) => {
        inView(section, (info) => {
            animate(info.target, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.2 });
            
            const animatedChildrenNodeList = info.target.querySelectorAll('.hover-lift, .hover-lift-dark, #experience > div > div');
            if (animatedChildrenNodeList.length > 0) {
                const animatedChildrenArray = Array.from(animatedChildrenNodeList);
                 animate(animatedChildrenArray, { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: stagger(0.1, { startDelay: 0.4 }) });
            }
            return () => {

            };
        }, { margin: "-100px 0px -100px 0px" });
    });

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
