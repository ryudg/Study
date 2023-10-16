// 8.Class/03-2.funtionProperty.ts

class WithProperty {
  myProperty: () => {};
}

new WithProperty().myProperty === new WithProperty().myProperty;
