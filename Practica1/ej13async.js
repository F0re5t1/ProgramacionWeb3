async function main() {
  try {
    const r1 = await paso1();
    const r2 = await paso2(r1);
    const r3 = await paso3(r2);

    console.log(r3);
  } catch (error) {
    console.error(error);
  }
}

main();