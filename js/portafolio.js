// planes-portafolio.js - Script para la página de Planes + Portafolio

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FILTROS DE PORTAFOLIO =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item-detailed');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover active de todos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar active al clickeado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filtrar items
            portfolioItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'flex';
                } else {
                    const category = item.getAttribute('data-category');
                    if (category === filter) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // ===== ANIMACIÓN DE ENTRADA PARA PLANES =====
    const planCards = document.querySelectorAll('.plan-card-main');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    planCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // ===== HOVER EFECTOS PARA ADD-ONS =====
    const addonCards = document.querySelectorAll('.addon-card');
    
    addonCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.addon-icon i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.addon-icon i');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
    
    // ===== SCROLL SUAVE A SECCIONES DE PROYECTOS =====
    document.querySelectorAll('.plan-projects-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Activar filtro correspondiente
                const category = targetId.replace('#proyectos-', '');
                const filterBtn = document.querySelector(`[data-filter="${category}"]`);
                
                if (filterBtn) {
                    setTimeout(() => {
                        filterBtn.click();
                        
                        // Resaltar el proyecto específico si existe
                        if (targetId !== 'proyectos-lite' && 
                            targetId !== 'proyectos-plus' && 
                            targetId !== 'proyectos-premium') {
                            const project = document.querySelector(targetId);
                            if (project) {
                                project.style.transition = 'all 0.3s ease';
                                project.style.boxShadow = '0 0 0 3px var(--color-primary)';
                                setTimeout(() => {
                                    project.style.boxShadow = '';
                                }, 2000);
                            }
                        }
                    }, 100);
                }
            }
        });
    });
    
    // ===== CONTEO DE PROYECTOS =====
    function updateProjectCounts() {
        const liteProjects = document.querySelectorAll('[data-category="lite"]').length;
        const plusProjects = document.querySelectorAll('[data-category="plus"]').length;
        const premiumProjects = document.querySelectorAll('[data-category="premium"]').length;
        
        console.log(`Proyectos: Lite: ${liteProjects}, Plus: ${plusProjects}, Premium: ${premiumProjects}`);
    }
    
    updateProjectCounts();
    
    // ===== SELECTOR DE FUNCIONALIDADES =====
    const addonSelects = document.querySelectorAll('.addon-select');
    
    addonSelects.forEach(select => {
        select.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.value) {
                // Mostrar mensaje de selección
                const card = this.closest('.addon-card');
                const originalHtml = card.innerHTML;
                
                const tempMessage = document.createElement('div');
                tempMessage.className = 'selection-message';
                tempMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Has seleccionado: ${selectedOption.text}</p>
                    <a href="index.html#contact" class="btn btn-primary btn-small">Solicitar cotización</a>
                `;
                tempMessage.style.cssText = `
                    text-align: center;
                    padding: var(--space-md);
                    background: rgba(16, 185, 129, 0.1);
                    border-radius: var(--radius-md);
                    margin-top: var(--space-md);
                `;
                
                // Eliminar mensaje anterior si existe
                const oldMessage = card.querySelector('.selection-message');
                if (oldMessage) {
                    oldMessage.remove();
                }
                
                card.appendChild(tempMessage);
            }
        });
    });
    
    // ===== EFECTO PARALLAX EN HERO =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // ===== INICIALIZACIÓN =====
    console.log('Página Planes + Portafolio cargada correctamente');
    
    // Smooth scroll para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});