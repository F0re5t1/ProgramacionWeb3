function saludo(nombre, callback) {
  setTimeout(() => {
    callback("hola " + nombre);
  }, 1000);
}

function saludarpromesa(nombre) {
  return new Promise((resolve, reject) => {
    saludo(nombre, mensaje => {
      resolve(mensaje);
    });
  });
}

saludarpromesa("juan").then(mensaje => {
  console.log(mensaje);
});