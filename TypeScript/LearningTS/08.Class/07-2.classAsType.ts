// 8.Class/07-2.classAsType.ts

class SchoolBus {
  getAbilities() {
    return ["magic", "shapeshifting"];
  }
}

function withSchoolBus(bus: SchoolBus) {
  console.log(bus.getAbilities());
}

withSchoolBus(new SchoolBus());

withSchoolBus({
  getAbilities: () => ["transmorgrification"],
});

withSchoolBus({
  getAbilities: () => 123,
  //                  ^^^ Type 'number' is not assignable to type 'string[]'.
});
