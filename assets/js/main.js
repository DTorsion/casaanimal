document.addEventListener('DOMContentLoaded', function() {
  // Elementos del DOM
  const menuToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar-tab');
  const body = document.body;
  const mainContent = document.querySelector('.main-container');
  
  // Estado inicial para móviles
  if (window.innerWidth < 768) {
    body.style.paddingLeft = '0';
  }

  // Función para alternar el menú
  function toggleMenu() {
    sidebar.classList.toggle('open');
    menuToggle.classList.toggle('active');
    
    // Bloquear scroll cuando el menú está abierto
    if (sidebar.classList.contains('open')) {
      body.style.overflow = 'hidden';
      // Añadir overlay
      const overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.background = 'rgba(0,0,0,0.7)';
      overlay.style.zIndex = '999';
      overlay.style.backdropFilter = 'blur(3px)';
      overlay.addEventListener('click', toggleMenu);
      body.appendChild(overlay);
    } else {
      body.style.overflow = '';
      // Remover overlay
      const overlay = document.querySelector('.sidebar-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  }
  
  // Evento para el botón del menú
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });
  }
  
  // Cerrar menú al hacer clic en un enlace (solo móviles)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 992) {
        toggleMenu();
      }
    });
  });
  
  // Cerrar menú al cambiar tamaño de pantalla
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      sidebar.classList.remove('open');
      menuToggle.classList.remove('active');
      body.style.overflow = '';
      const overlay = document.querySelector('.sidebar-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  });
  
  // Navegación smooth y animaciones
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const offset = 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Animación de aparición para secciones
  const animateOnScroll = function() {
    const sections = document.querySelectorAll('.section-container, .hero-header');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Configurar estilos iniciales para animación
  document.querySelectorAll('.section-container, .hero-header').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Ejecutar al cargar y al hacer scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  
  // Activar animaciones inmediatamente si están en viewport
  setTimeout(animateOnScroll, 100);
});