function obtenerNumero() {
  return new Promise(resolve => {
    setTimeout(() => resolve(42), 1000);
  });
}

async function procesarNumero() {
  const num = await obtenerNumero();
  console.log("Número:", num);

  const resultado = num * 2;
  console.log("Resultado:", resultado);
}

procesarNumero();