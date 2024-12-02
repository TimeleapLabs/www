export const parallelSampleCode = `\
import { myFunction } from "./functions.unchained";
import { records } from "./mongodb";

const data = await records();
for (const item of data) {
  myFunction(item).then(console.log);
}
`;
