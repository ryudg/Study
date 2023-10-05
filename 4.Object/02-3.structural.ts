// 4.Object/02-3.structural.ts

type TimeRange = {
  start: Date;
};

const hasStartString: TimeRange = {
  start: "2023-10-02",
  //^^^^^ Type 'string' is not assignable to type 'Date'.
  //      02-3.structural.ts(4, 3): The expected type comes from property 'start' which is declared here on type 'TimeRange'
};
