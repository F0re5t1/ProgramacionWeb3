const promesa = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

promesa
  .then(num => {
    console.log(num); 
    return num * 3;
  })
  .then(resultado => {
    console.log(resultado); 
    return resultado + 1;
  })
  .then(final => {
    console.log(final); 
  });