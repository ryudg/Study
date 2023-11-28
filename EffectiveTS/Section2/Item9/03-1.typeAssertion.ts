// Section2/Item9/03-1.typeAssertion.ts

document.querySelector("#myButton").addEventListener("click", (e) => {
  e.currentTarget; // 타입은 EventTarget
  const button = e.currentTarget as HTMLButtonElement;
  button; // 타입은 HTMLButtonElement
});
