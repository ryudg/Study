let lifespan: number | "ongoing" | "uncertain";

lifespan = 100;

lifespan = "ongoing";

lifespan = "uncertain";

lifespan = true;
// ^^^^^^^^ Type 'true' is not assignable to type 'string | number | "ongoing" | "uncertain"'.
