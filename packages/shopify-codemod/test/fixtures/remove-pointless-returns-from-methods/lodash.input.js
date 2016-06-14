_.each(foo, (element, index) => {
  if (index === 0) {
    return;
  }
  return element.position = index;
});

_.filter(foo, (element, index) => {
  if (index === 0) {
    return;
  }
  return element.position = index;
});

_.doNotRemove(foo, (element, index) => {
  if (index === 0) {
    return;
  }
  return element.position = index;
});
