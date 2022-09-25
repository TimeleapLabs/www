from flask import Flask, request

# Create a flask app
app = Flask(__name__)

# Setup a POST endpoint for receiving data from
# the Kenshi Event Dispatcher
@app.route("/", methods=["POST"])
def add_message():
    # Details for the received blockchain event are
    # in the request body
    print(request.json)
    # Your endpoint must return a status code bigger
    # than or equal to 200, and lower than 300. Any
    # other code is considered an error and results
    # in a retry.
    return "OK", 200


if __name__ == "__main__":
    # Listen on port 8080
    # Note: You don't necessarily need to listen on this
    # port, this is just an example
    app.run(host="0.0.0.0", port=8080)