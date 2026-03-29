function paso1(callback) {
  setTimeout(() => {
    callback("Hola");
  }, 1000);
}

function paso2(mensaje, callback) {
  setTimeout(() => {
    callback(mensaje + " mundo");
  }, 1000);
}

function paso3(mensaje, callback) {
  setTimeout(() => {
    callback(mensaje + "!");
  }, 1000);
}

// Anidamiento
paso1(resultado1 => {
  paso2(resultado1, resultado2 => {
    paso3(resultado2, resultadoFinal => {
      console.log(resultadoFinal);
    });
  });
});