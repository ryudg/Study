let physicist = Math.random() > 0.5 ? "Einstein" : 100;

physicist.toString(); // Ok

physicist.toUppercase();
//        ^^^^^^^^^^^ Property 'toUppercase' does not exist on type 'string | number'.
//                    Property 'toUppercase' does not exist on type 'string'.

physicist.toFixed();
//        ^^^^^^^^ Property 'toFixed' does not exist on type 'string | number'.
//                 Property 'toFixed' does not exist on type 'string'.
