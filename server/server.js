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
  console.log("Player hand:\n" + JSON.stringify(poker.getPlayerState()) + "\n");
  console.log("Computer hand:\n" + JSON.stringify(poker.getComputerState()) + "\n");
  var obj = {"player" : {}, "computer" : {}, "bank" : {}};
  obj.player.coins = poker.getPlayerState().coins;
  obj.computer.coins = poker.getComputerStateHiddenHand().coins;
  obj.bank.coins = poker.getBank().coins;
  res.json(obj);
});

app.post("/startTurn", function (req, res) {
  poker.startTurn();
  console.log("Player hand:\n" + JSON.stringify(poker.getPlayerState()) + "\n");
  console.log("Computer hand:\n" + JSON.stringify(poker.getComputerState()) + "\n");
  var obj = {"player" : {}, "computer" : {}, "bank" : {}};
  obj.player = poker.getPlayerState();
  obj.computer = poker.getComputerStateHiddenHand();
  obj.bank = poker.getBank();
  res.json(obj);
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
