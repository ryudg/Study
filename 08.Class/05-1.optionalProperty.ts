// 8.Class/05-1.optionalProperty.ts

class MissingInitializer {
  property?: string;
}

new MissingInitializer().property?.length;

new MissingInitializer().property.length;
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Object is possibly 'undefined'.
