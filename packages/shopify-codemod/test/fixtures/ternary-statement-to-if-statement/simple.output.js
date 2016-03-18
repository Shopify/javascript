function a() {
  if (true) {
    a();
  } else {
    b();
  }

  if (true) {
    a();
  }

  if (true) {
    return a();
  } else {
    return b();
  }
}

function b() {
  if (true) {
    return a();
  }
}
