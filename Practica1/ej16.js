function obtenerNumero() {
  return new Promise(resolve => {
    setTimeout(() => resolve(42), 1000);
  });
}

function procesarNumero() {
  obtenerNumero()
    .then(num => {
      console.log("Número:", num);
      return num * 2;
    })
    .then(resultado => {
      console.log("Resultado:", resultado);
    });
}

procesarNumero();