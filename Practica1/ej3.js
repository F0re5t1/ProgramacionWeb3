function miFuncion(arr) {
  return {
    pares: arr.filter(n => n % 2 === 0),
    impares: arr.filter(n => n % 2 !== 0)
  };
}

let obj = miFuncion([1,2,3,4,5,6]);
console.log(obj); 