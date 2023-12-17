// scientist: number | string 타입
let scientist = Math.random() > 0.5 ? "Newton" : 100;

if (scientist === "Newton") {
  // scientist: string 타입
  scientist.toUpperCase(); // OK
}

// scientist: number | string 타입
scientist.toUpperCase();
//        ^^^^^^^^^^^^ Property 'toUpperCase' does not exist on type 'string | number'.
//                     Property 'toUpperCase' does not exist on type 'number'.
