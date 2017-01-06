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
  console.log("Player hand:\n" + JSON.stringify(poker.getPlayerHand().hand) + "\n");
  console.log("Computer hand:\n" + JSON.stringify(poker.getComputerHand().hand) + "\n");
  res.json({"message" : "Game start"});
});

app.get("/getPlayerHand", function (req, res) {
  var player_hand = poker.getPlayerHand();
  res.json(player_hand);
  console.log("Sent to client player hand json");
  console.log(player_hand);
});

app.get("/getComputerHand", function (req, res) {
  console.log("Sent to client computer hand json");
  res.json(poker.getComputerHand());
});

app.post("/openCards", function (req, res) {
  var response_json = {};
  response_json.computer_hand = poker.getComputerHand().hand;
  response_json.tour_result = "Player win";
  console.log(response_json);
  res.json(response_json);
});

console.log("Server start on port 3000");
