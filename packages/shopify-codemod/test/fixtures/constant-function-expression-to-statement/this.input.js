const a = function() {
  const b = () => {
    const c = () => {
      return 1;
    }

    return this.d(c);
  }

  return b;
}
