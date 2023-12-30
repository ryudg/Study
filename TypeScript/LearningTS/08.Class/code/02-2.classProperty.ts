// 8.Class/02-2.classProperty.ts

class FieldTrip {
  destination: string;

  constructor(destination: string) {
    this.destination = destination;

    console.log(`We're going to ${destination}!`);
  }
}

const trip = new FieldTrip("Seoul");

trip.destination;

trip.nonexistent;
//   ^^^^^^^^^^^ Property 'nonexistent' does not exist on type 'FieldTrip'.
