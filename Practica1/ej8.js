function funcion(callback) {
  setTimeout(() => {
    callback();
  }, 2000);
}

funcion(() => {
  console.log("se ejecuto después de 2 segundos");
});