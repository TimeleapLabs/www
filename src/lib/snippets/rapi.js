export const rapi = `import express from "express";
import parser from "body-parser";

const app = express();
app.use(parser.json());

app.post("/", (req, res) => {
  console.dir(req.body, { depth: null });
  res.status(200).end("OK");
});

app.listen(8080);`;
