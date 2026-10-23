/* Управление мобильной навигацией и модальным окном */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Адаптивное мобильное меню навигации
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('site-nav--open');
    });

    // Закрытие меню по нажатию клавиши Escape
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && primaryNav.classList.contains('site-nav--open')) {
        primaryNav.classList.remove('site-nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Закрытие меню при клике по ссылке
    primaryNav.querySelectorAll('.site-nav__link').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('site-nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Управление модальным окном быстрого заказа через HTML5 dialog
  const modal = document.getElementById('order-modal');
  const openButtons = document.querySelectorAll('.js-open-modal');
  const closeButtons = document.querySelectorAll('.js-close-modal');

  if (!modal) return;

  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    });
  });

  modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );
    if (!isInDialog && typeof modal.close === 'function') {
      modal.close();
    }
  });
});
