// 8.Class/02-1.classProperty.ts

class FieldTrip {
  destination: string;

  constructor(destination: string) {
    this.destination = destination;

    console.log(`We're going to ${destination}!`);

    this.nonexistent = destination;
    //   ^^^^^^^^^^^ Property 'nonexistent' does not exist on type 'FieldTrip'.
  }
}
