// 13.ConfigurationOptions/06-2.type.ts

// const logMessage = (message) => {
//   console.log(message);
// };

// const logMessage = (message: string) => {
//   console.log(message);
// };

type LogsMessage = (message: string) => void;

const logMessage: LogsMessage = (message) => {
  console.log(message);
};
