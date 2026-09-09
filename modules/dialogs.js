(function () {
  function showConfirmDialog(elements, translate, message, onConfirm) {
    const { modal, messageElement, noButton, yesButton } = elements;
    messageElement.textContent = message;
    noButton.textContent = translate('no');
    yesButton.textContent = translate('yes');
    modal.classList.remove('hidden');
    noButton.focus();
    yesButton.onclick = () => {
      modal.classList.add('hidden');
      onConfirm && onConfirm();
    };
    noButton.onclick = () => modal.classList.add('hidden');
  }

  window.KedaiDialogs = { showConfirmDialog };
})();
