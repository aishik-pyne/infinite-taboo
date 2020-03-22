import faker from "faker";
export function getWord() {
  return {
    guessWord: faker.name.findName(),
    tabooWords: [
      faker.name.findName(),
      faker.name.findName(),
      faker.name.findName(),
      faker.name.findName()
    ]
  };
}
