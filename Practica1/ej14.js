function miPromesa() {
  return new Promise(resolve => {
    setTimeout(() => resolve("hola mundo"), 1000);
  });
}

function usarCallback(callback) {
  miPromesa().then(resultado => callback(resultado));
}

usarCallback(mensaje => {
  console.log(mensaje);
});