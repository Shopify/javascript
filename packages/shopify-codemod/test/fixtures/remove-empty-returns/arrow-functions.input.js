$document.on('click', 'a.disabled, a.btn-disabled', event => {
  event.preventDefault();
  return;
});
