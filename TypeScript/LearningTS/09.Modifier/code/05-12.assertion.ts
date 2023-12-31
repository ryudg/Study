// 9.Modifier/05-12.assertion.ts

function describePreference(preference: "maybe" | "no" | "yes") {
  switch (preference) {
    case "maybe":
      return "I suppose...";
    case "no":
      return "No thanks...";
    case "yes":
      return "Yes please!!";
  }
}

// 타입은 { movie: string; standup: string; }
const preferencesMutable = {
  movie: "maybe",
  standup: "yes",
};

describePreference(preferencesMutable.movie);
//                 ^^^^^^^^^^^^^^^^^^^^^^^^ Argument of type 'string' is not assignable to parameter of type '"maybe" | "no" | "yes"'.

preferencesMutable.movie = "no";

const preferencesReadOnly = {
  movie: "maybe",
  standup: "yes",
} as const;

describePreference(preferencesReadOnly.movie);

preferencesReadOnly.movie = "no";
//                  ^^^^^ Cannot assign to 'movie' because it is a read-only property.
