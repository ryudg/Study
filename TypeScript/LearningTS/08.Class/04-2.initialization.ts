// 8.Class/04-2.initialization.ts

class MissingInitializer {
  property: string;
}

new MissingInitializer().property.length;
