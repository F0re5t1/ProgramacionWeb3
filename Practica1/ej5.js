function miFuncion(cadena) {
  let invertida = cadena.split("").reverse().join("");
  return cadena === invertida;
}

let band = miFuncion("oruro");
console.log(band); 

band = miFuncion("hola");
console.log(band); 