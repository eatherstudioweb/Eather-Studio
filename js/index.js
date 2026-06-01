// Delta Studio - Script principal completo (optimizado para todas las páginas)

document.addEventListener('DOMContentLoaded', function() {

    // ===== FUNCIONES AUXILIARES =====
    const navbar = document.getElementById('navbar');
    
    // ===== TEMA OSCURO/CLARO =====
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Verificar preferencia del sistema
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (themeIcon) {
                if (document.body.classList.contains('dark-mode')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                    localStorage.setItem('theme', 'dark');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                    localStorage.setItem('theme', 'light');
                }
            }
        });
    }

    // ===== NAVEGACIÓN RESPONSIVE =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto al hacer scroll
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Mostrar/ocultar botón volver arriba
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });
    
    // Menú móvil
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && menuToggle) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // ===== CAROUSEL HERO CON IMÁGENES (SOLO SI EXISTE) =====
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    // Verificar si el carousel existe en esta página
    if (prevBtn && nextBtn) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        let currentSlide = 0;
        let slideInterval;
        
        if (slides.length > 0) {
            
            function showSlide(index) {
                // Validar índice
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;
                
                // Remover active de todos los slides
                slides.forEach(slide => {
                    slide.classList.remove('active', 'prev');
                    slide.style.opacity = '0';
                    slide.style.transform = 'translateX(100%)';
                });
                
                // Remover active de todos los dots
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Mostrar slide actual con animación
                slides[index].classList.add('active');
                slides[index].style.opacity = '1';
                slides[index].style.transform = 'translateX(0)';
                
                // Mostrar slide anterior para efecto
                let prevIndex = index - 1;
                if (prevIndex < 0) prevIndex = slides.length - 1;
                slides[prevIndex].classList.add('prev');
                slides[prevIndex].style.transform = 'translateX(-100%)';
                
                // Activar dot correspondiente
                if (dots[index]) dots[index].classList.add('active');
                
                currentSlide = index;
                
                // Animar elementos flotantes
                animateFloatingElements();
            }
            
            function animateFloatingElements() {
                const floatingElements = document.querySelectorAll('.floating-element');
                floatingElements.forEach((element, index) => {
                    element.style.animation = 'none';
                    void element.offsetWidth;
                    element.style.animation = `floatElement 6s ease-in-out ${index * 0.6}s infinite`;
                });
            }
            
            function nextSlide() {
                showSlide(currentSlide + 1);
            }
            
            function prevSlide() {
                showSlide(currentSlide - 1);
            }
            
            // Event listeners
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
            
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
            
            // Dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                    resetInterval();
                });
            });
            
            // Auto slide
            function startInterval() {
                slideInterval = setInterval(nextSlide, 7000);
            }
            
            function resetInterval() {
                clearInterval(slideInterval);
                startInterval();
            }
            
            // Inicializar
            showSlide(0);
            startInterval();
            
            // Pausar al hacer hover
            const carouselContainer = document.querySelector('.carousel-container');
            if (carouselContainer) {
                carouselContainer.addEventListener('mouseenter', () => {
                    clearInterval(slideInterval);
                    document.querySelectorAll('.floating-element').forEach(element => {
                        element.style.animationPlayState = 'paused';
                    });
                });
                
                carouselContainer.addEventListener('mouseleave', () => {
                    startInterval();
                    document.querySelectorAll('.floating-element').forEach(element => {
                        element.style.animationPlayState = 'running';
                    });
                });
            }
            
            // Efecto de tilt en las imágenes
            const imageFrames = document.querySelectorAll('.image-frame');
            imageFrames.forEach(frame => {
                frame.addEventListener('mousemove', (e) => {
                    const rect = frame.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateY = (x - centerX) / 25;
                    const rotateX = (centerY - y) / 25;
                    
                    frame.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.05, 1.05, 1.05)`;
                });
                
                frame.addEventListener('mouseleave', () => {
                    frame.style.transform = 'perspective(1000px) rotateY(-10deg) rotateX(5deg)';
                });
            });
        }
    }

    // ===== ANIMACIÓN DE CONTADORES =====
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length > 0) {
        function animateCounter(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        }
        
        // Observer para animar cuando son visibles
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // ===== TESTIMONIOS SLIDER (SOLO SI EXISTE) =====
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    
    if (testimonialPrev && testimonialNext) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
        let currentTestimonial = 0;
        
        if (testimonialCards.length > 0) {
            
            function showTestimonial(index) {
                testimonialCards.forEach(card => card.classList.remove('active'));
                testimonialDots.forEach(dot => dot.classList.remove('active'));
                
                testimonialCards[index].classList.add('active');
                if (testimonialDots[index]) testimonialDots[index].classList.add('active');
                currentTestimonial = index;
            }
            
            testimonialPrev.addEventListener('click', () => {
                let newIndex = currentTestimonial - 1;
                if (newIndex < 0) newIndex = testimonialCards.length - 1;
                showTestimonial(newIndex);
            });
            
            testimonialNext.addEventListener('click', () => {
                let newIndex = currentTestimonial + 1;
                if (newIndex >= testimonialCards.length) newIndex = 0;
                showTestimonial(newIndex);
            });
            
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', () => showTestimonial(index));
            });
            
            // Auto cambio de testimonios
            setInterval(() => {
                let newIndex = currentTestimonial + 1;
                if (newIndex >= testimonialCards.length) newIndex = 0;
                showTestimonial(newIndex);
            }, 8000);
        }
    }

    // ===== FORMULARIO DE CONTACTO (Footer normal) =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(this);
                
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                    submitBtn.style.background = 'var(--color-success)';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    throw new Error('Error en el servidor');
                }
            } catch (error) {
                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                submitBtn.style.background = 'var(--color-danger)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // ===== NEWSLETTER =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            const button = this.querySelector('button');
            
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                input.value = '';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // ===== BOTÓN VOLVER ARRIBA =====
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== ANIMACIONES AL SCROLL =====
    const animatedElements = document.querySelectorAll('.service-card, .plan-card, .portfolio-item, .process-step, .portfolio-item-detailed, .addon-card');
    
    if (animatedElements.length > 0) {
        function checkScroll() {
            animatedElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight * 0.85) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }
        
        // Inicializar estilos
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
        checkScroll();
    }

    // ===== EFECTO PARALLAX =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${index * 5}deg)`;
        });
    });

    // ===== SCROLL SUAVE PARA ANCLAS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement && navbar) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== FORMULARIO PREMIUM INTERACTIVO CON FORMSPREE REAL =====
// ===== FORMULARIO PREMIUM INTERACTIVO CON FORMSPREE =====
(function initPremiumForm() {
    const premiumForm = document.getElementById('premiumContactForm');
    if (!premiumForm) return;
    
    const submitBtn = document.getElementById('premiumSubmitBtn');
    const feedback = document.getElementById('premiumFormFeedback');
    const fields = premiumForm.querySelectorAll('.form-field input, .form-field textarea');
    
    // ===== ANIMACIONES DE CAMPOS =====
    fields.forEach(field => {
        const formField = field.closest('.form-field');
        
        // Evento focus
        field.addEventListener('focus', () => {
            formField.classList.add('focused');
        });
        
        // Evento blur
        field.addEventListener('blur', () => {
            formField.classList.remove('focused');
            
            // Verificar si tiene valor
            if (field.value.trim() !== '') {
                formField.classList.add('has-value');
            } else {
                formField.classList.remove('has-value');
            }
        });
        
        // Evento input para validación en tiempo real
        field.addEventListener('input', () => {
            if (field.value.trim() !== '') {
                formField.classList.add('has-value');
                
                // Validación básica de email
                if (field.type === 'email') {
                    const isValid = field.value.includes('@') && field.value.includes('.');
                    if (isValid) {
                        field.style.borderColor = 'var(--color-success)';
                    } else {
                        field.style.borderColor = 'var(--color-danger)';
                    }
                }
                
                // Validación de teléfono (solo números)
                if (field.type === 'tel') {
                    const isValid = /^[0-9+\-\s]+$/.test(field.value);
                    if (isValid) {
                        field.style.borderColor = 'var(--color-success)';
                    } else {
                        field.style.borderColor = 'var(--color-danger)';
                    }
                }
            } else {
                formField.classList.remove('has-value');
                field.style.borderColor = '';
            }
        });
    });
    
    // ===== MANEJO DEL ENVÍO A FORMSPREE =====
    premiumForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos los campos requeridos
        let isValid = true;
        const requiredFields = premiumForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                const formField = field.closest('.form-field');
                formField.classList.add('error');
                
                // Mostrar feedback
                feedback.textContent = '⚠️ Por favor completa todos los campos requeridos';
                feedback.classList.add('error');
                
                // Destacar el campo con error
                field.style.borderColor = 'var(--color-danger)';
                
                // Quitar error después de 3 segundos
                setTimeout(() => {
                    formField.classList.remove('error');
                    field.style.borderColor = '';
                    if (feedback.classList.contains('error') && feedback.textContent.includes('completa')) {
                        feedback.classList.remove('error');
                        feedback.textContent = '';
                    }
                }, 3000);
            }
        });
        
        if (!isValid) return;
        
        // Guardar el texto original del botón
        const originalHTML = submitBtn.innerHTML;
        
        // Mostrar estado de envío
        submitBtn.classList.add('sending');
        submitBtn.innerHTML = `
            <span class="btn-text">Enviando...</span>
            <span class="btn-icon"><i class="fas fa-spinner fa-spin"></i></span>
            <div class="btn-overlay"></div>
        `;
        submitBtn.disabled = true;
        
        try {
            // Crear FormData con los datos del formulario
            const formData = new FormData(premiumForm);
            
            // Enviar a Formspree
            const response = await fetch('https://formspree.io/f/xkozddke', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // ÉXITO
                submitBtn.classList.remove('sending');
                submitBtn.classList.add('success');
                submitBtn.innerHTML = `
                    <span class="btn-text">¡Mensaje Enviado!</span>
                    <span class="btn-icon"><i class="fas fa-check"></i></span>
                    <div class="btn-overlay"></div>
                `;
                
                feedback.innerHTML = '✅ ¡Gracias! Te contactaremos en menos de 24 horas.';
                feedback.classList.add('success');
                
                // Limpiar formulario
                premiumForm.reset();
                fields.forEach(field => {
                    const formField = field.closest('.form-field');
                    if (formField) {
                        formField.classList.remove('has-value', 'focused');
                    }
                    field.style.borderColor = '';
                });
                
                // Restaurar botón después de 4 segundos
                setTimeout(() => {
                    submitBtn.classList.remove('success');
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    feedback.classList.remove('success');
                    feedback.innerHTML = '';
                }, 4000);
                
            } else {
                // ERROR del servidor
                throw new Error('Error en el servidor de Formspree');
            }
            
        } catch (error) {
            console.error('Error al enviar:', error);
            
            // ERROR
            submitBtn.classList.remove('sending');
            submitBtn.classList.add('error');
            submitBtn.innerHTML = `
                <span class="btn-text">Error</span>
                <span class="btn-icon"><i class="fas fa-exclamation-circle"></i></span>
                <div class="btn-overlay"></div>
            `;
            
            feedback.innerHTML = '❌ Hubo un error. Por favor intenta de nuevo o escríbenos directamente a WhatsApp.';
            feedback.classList.add('error');
            
            // Restaurar después de 4 segundos
            setTimeout(() => {
                submitBtn.classList.remove('error');
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                feedback.classList.remove('error');
                feedback.innerHTML = '';
            }, 4000);
        }
    });
    
    // ===== EFECTO DE PARTÍCULAS AL HACER FOCUS =====
    fields.forEach(field => {
        field.addEventListener('focus', () => {
            const rect = field.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Crear partículas
            for (let i = 0; i < 5; i++) {
                createParticle(x, y);
            }
        });
    });
    
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'form-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: var(--color-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 1;
            transition: all 0.8s ease-out;
        `;
        
        document.body.appendChild(particle);
        
        // Animar
        setTimeout(() => {
            particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
            particle.style.opacity = '0';
        }, 10);
        
        // Eliminar después de la animación
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 800);
    }
})();