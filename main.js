// Opex Studio - Interactions

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Header Scroll Effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Disable body scroll when menu is active
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 3. Modals (Booking)
    const bookingModal = document.getElementById('booking-modal');
    const openBookingBtns = [
        document.getElementById('header-booking'),
        document.getElementById('float-booking'),
        ...document.querySelectorAll('.hero-btns .btn-primary'),
        ...document.querySelectorAll('.service-overlay .btn')
    ];
    const closeModal = document.querySelector('.close-modal');

    openBookingBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                bookingModal.classList.add('active');
            });
        }
    });

    closeModal.addEventListener('click', () => {
        bookingModal.classList.remove('active');
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
        }
    });

    // 4. Booking Form Submission (Simple feedback)
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = bookingForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Отправка...';
        btn.disabled = true;

        // Mock success
        setTimeout(() => {
            btn.innerText = 'Успешно отправлено!';
            btn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                bookingModal.classList.remove('active');
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.disabled = false;
                bookingForm.reset();
            }, 2000);
        }, 1500);
    });

    // 5. Reveal Animations on Scroll (Simple implementation)
    const revealElements = document.querySelectorAll('[data-aos]');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            
            if (elTop < triggerBottom) {
                el.classList.add('aos-animate');
                // Support custom AOS-like classes
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) scale(1)';
            }
        });
    };

    // Initial styles for AOS elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const aosType = el.getAttribute('data-aos');
        if (aosType === 'fade-up') el.style.transform = 'translateY(30px)';
        if (aosType === 'fade-left') el.style.transform = 'translateX(30px)';
        if (aosType === 'fade-right') el.style.transform = 'translateX(-30px)';
        if (aosType === 'zoom-in') el.style.transform = 'scale(0.9)';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load
});
