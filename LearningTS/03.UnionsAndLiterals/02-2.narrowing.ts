let inventor: number | string = "Thomas Edison";

inventor.toUpperCase(); // OK

inventor.toFixed();
//      ^^^^^^^ Property 'toFixed' does not exist on type 'string'.
