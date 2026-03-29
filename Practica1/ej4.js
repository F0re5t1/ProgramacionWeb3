function miFuncion(a) {
  let mayor = a[0];
  let menor = a[0];

  for (let num of a) {
    if (num > mayor) {
      mayor = num;
    }
    if (num < menor) {
      menor = num;
    }
  }

  return { mayor: mayor, menor: menor };
}

let obj = miFuncion([3,1,5,4,2,8]);
console.log(obj); 