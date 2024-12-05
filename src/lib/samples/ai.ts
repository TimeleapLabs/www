export const aiSampleCode = `\
import { generateImage } from "@timeleap/ai";

const image = await generateImage({
  prompt: "A serene and tranquil landscape painting of the countryside.",
  model: "black-forest-labs/FLUX.1-schnell",
  steps: 32
});
`;
