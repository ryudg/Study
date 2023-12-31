// 9.Modifier/01-2.any.ts

function greetComedian(name: any) {
  console.log(`Announcing ${name.toUpperCase()}`);
}

greetComedian({ name: "Ellen" }); // => 런타임에서 오류 발생
