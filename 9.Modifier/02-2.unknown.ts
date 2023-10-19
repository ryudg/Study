// 9.Modifier/02-2.unknown.ts

function greetComedianSafety(name: unknown) {
  if (typeof name === "string") {
    console.log(`Announcing ${name.toUpperCase()}`);
  } else {
    console.log("Well, I'm off.");
  }
}

greetComedianSafety("Amy Schumer"); // Announcing AMY SCHUMER
greetComedianSafety(123); // Well, I'm off.
