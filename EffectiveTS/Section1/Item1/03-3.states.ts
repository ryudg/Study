interface State {
  name: string;
  capital: string;
}

const states: State[] = [
  { name: "Alabama", capitol: "Montgomery" },
  { name: "Alaska", capitol: "Juneau" },
  { name: "Arizona", capitol: "Phoenix" },
];

for (const state of states) {
  console.log(state.capital);
}
