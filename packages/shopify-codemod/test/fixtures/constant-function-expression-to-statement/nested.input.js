const a = () => {
  const b = function() {
    const c = () => 1;
    return c;
  }
  return b;
}
