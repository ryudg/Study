// 9.Modifier/02-1.unknown.ts

function greetComedian(name: unknown) {
  console.log(`Announcing ${name.toUpperCase()}`);
  //                        ^^^^ 'name' is of type 'unknown'.
}
