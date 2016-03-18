function a() {
  const b = () => {
    function c() {
      return 1;
    }

    return this.d(c);
  }

  return b;
}
