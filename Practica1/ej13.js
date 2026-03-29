function paso1() {
  return Promise.resolve("Hola");
}

function paso2(mensaje) {
  return Promise.resolve(mensaje + " mundo");
}

function paso3(mensaje) {
  return Promise.resolve(mensaje + "!");
}

paso1().then(r1 => {
  paso2(r1).then(r2 => {
    paso3(r2).then(r3 => {
      console.log(r3); 
    });
  });
});