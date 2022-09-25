import express from "express";
import parser from "body-parser";

/**
 * Creat an express app
 */
const app = express();
app.use(parser.json());

/**
 * Create a POST endpoint for receiving data from
 * the Kenshi Event Dispatcher
 */
app.post("/", (req, res) => {
  /**
   * Details for the received blockchain event are
   * in the request body
   */
  console.log(req.body);
  /**
   * Your endpoint must return a status code bigger
   * than or equal to 200, and lower than 300. Any
   * other code is considered an error and results
   * in a retry.
   */
  res.status(200).end("OK");
});

/**
 * Listen on port 8080
 * Note: You don't necessarily need to listen on this
 * port, this is just an example
 */
app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));
