/**
 * PORTFÓLIO PESSOAL - VINÍCIUS EMANUEL SILVA ARAUJO
 * Script principal: Inicialização (estilo Squarespace Motion) e Navegação Fixa
 */

document.addEventListener('DOMContentLoaded', () => {
  initMotionLoader();
  initMobileNavigation();
});

/**
 * 1. Efeito de Inicialização (Inspirado no Squarespace Motion)
 * Realiza uma contagem acelerada de 0 a 100%, expande a barra de progresso
 * e recolhe a cortina em transição suave para revelar o Hero em cascata.
 */
function initMotionLoader() {
  const curtain = document.getElementById('intro-curtain');
  const counter = document.getElementById('intro-counter');
  const progressBar = document.getElementById('intro-progress');

  if (!curtain || !counter || !progressBar) {
    document.body.classList.add('hero-animated');
    return;
  }

  let currentPercent = 0;
  const targetPercent = 100;
  const duration = 1200; // Duração total em milissegundos
  const frameRate = 16;
  const increment = targetPercent / (duration / frameRate);

  const timer = setInterval(() => {
    currentPercent += increment;

    if (currentPercent >= targetPercent) {
      currentPercent = targetPercent;
      clearInterval(timer);

      counter.textContent = '100%';
      progressBar.style.width = '100%';

      // Pequena pausa no 100% antes de recolher a cortina
      setTimeout(() => {
        curtain.classList.add('is-finished');
        document.body.classList.add('hero-animated');

        // Remove do foco de acessibilidade após a animação terminar
        setTimeout(() => {
          curtain.setAttribute('aria-hidden', 'true');
          curtain.style.display = 'none';
        }, 900);
      }, 200);
    } else {
      const displayValue = Math.floor(currentPercent).toString().padStart(2, '0');
      counter.textContent = `${displayValue}%`;
      progressBar.style.width = `${currentPercent}%`;
    }
  }, frameRate);
}

/**
 * 2. Menu de Navegação Fixo e Interação Mobile
 * Controla o botão toggle para visualização em dispositivos móveis
 * e fecha o menu ao selecionar um link ou ao redimensionar a tela.
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(forceClose = false) {
    const shouldOpen = forceClose ? false : !navMenu.classList.contains('is-open');
    navMenu.classList.toggle('is-open', shouldOpen);
    toggleBtn.classList.toggle('is-active', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  }

  toggleBtn.addEventListener('click', () => {
    toggleMenu();
  });

  // Fecha o menu móvel ao clicar em um item de navegação
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(true);
    });
  });

  // Fecha ao clicar fora da barra de navegação no mobile
  document.addEventListener('click', (event) => {
    if (
      navMenu.classList.contains('is-open') &&
      !navMenu.contains(event.target) &&
      !toggleBtn.contains(event.target)
    ) {
      toggleMenu(true);
    }
  });

  // Fecha o menu móvel automaticamente se a tela for redimensionada para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navMenu.classList.contains('is-open')) {
      toggleMenu(true);
    }
  });
}

