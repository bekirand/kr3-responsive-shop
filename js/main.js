/* Управление модальным окном быстрого заказа */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('order-modal');
  const openButtons = document.querySelectorAll('.js-open-modal');
  const closeButtons = document.querySelectorAll('.js-close-modal');

  if (!modal) return;

  // Открытие модального окна через нативный метод HTML5 dialog
  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
    });
  });

  // Закрытие окна по кнопке или крестику
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    });
  });

  // Закрытие при клике по затемненной области backdrop
  modal.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      modal.close();
    }
  });
});
