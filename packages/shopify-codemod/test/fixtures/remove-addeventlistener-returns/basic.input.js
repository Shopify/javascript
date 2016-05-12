document.addEventListener('input', event => {
  event.preventDefault();
  return event.stopPropagation();
}, true);
