function a() {
  (true ? a() : b());
  (true ? a(): undefined);
  return (true ? a() : b());
}

function b() {
  return (true ? a() : undefined);
}
