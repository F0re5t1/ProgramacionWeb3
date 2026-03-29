const funcion = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("se ejecuto despues de 3 segundos");
  }, 3000);
});

funcion.then(mensaje => {
  console.log(mensaje);
});