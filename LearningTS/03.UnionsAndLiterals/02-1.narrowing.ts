let admiral: number | string;

admiral = "Grace Hopper";

admiral.toUpperCase(); // OK

admiral.toFixed();
//      ^^^^^^^ Property 'toFixed' does not exist on type 'string'.
