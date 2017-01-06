var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var poker = require("./poker.js");

var app = express();

app.use(express.static("../client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

http.createServer(app).listen(3000);

app.post("/startGame", function (req, res) {
  poker.startGame();
  console.log("Player hand:\n" + JSON.stringify(poker.getPlayerHand()) + "\n");
  console.log("Computer hand:\n" + JSON.stringify(poker.getComputerHand()) + "\n");
  res.json({"message" : "Game start"});
});

app.get("/getPlayerHand", function (req, res) {
  res.json(poker.getPlayerHand());
  console.log("Sent to client player hand json");
});

app.get("/getComputerHand", function (req, res) {
  res.json(poker.getComputerHand());
  console.log("Sent to client computer hand json");
});

app.post("/openCards", function (req, res) {
  var response_json = {};
  response_json.computer_hand = poker.getComputerHand();
  response_json.tour_result = poker.getTourResult();
  console.log(response_json);
  res.json(response_json);
});

console.log("Server start on port 3000");
