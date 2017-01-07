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

app.post("/openCards", function (req, res) {
  poker.openCards();
  var obj = {"player" : {}, "computer" : {}, "bank" : {}, "message" : {}};
  obj.player = poker.getPlayerState();
  obj.computer = poker.getComputerState();
  obj.bank = poker.getBank();
  obj.message = poker.getTurnResult();
  res.json(obj);
});

app.post("/passTurn", function (req, res) {
  poker.playerPassTurn();
  var obj = {"player" : {}, "computer" : {}, "bank" : {}};
  obj.player.coins = poker.getPlayerState().coins;
  obj.computer.coins = poker.getComputerStateHiddenHand().coins;
  obj.bank.coins = poker.getBank().coins;
  res.json(obj);
});

app.post("/addCoins", function (req, res) {
  poker.playerAddCoins();
  var obj = {"player" : {}, "computer" : {}, "bank" : {}, "message" : "", "computer_turn" : ""};
  obj.computer_turn = poker.computerTurn();
  if (obj.computer_turn === "Add") {
    poker.computerAddCoins();
    obj.player.coins = poker.getPlayerState().coins;
    obj.computer.coins = poker.getComputerStateHiddenHand().coins;
    obj.bank.coins = poker.getBank().coins;
    //obj.computer_turn = computer_turn;
    obj.message = "Computer add 10 coins";
  }
  if (obj.computer_turn === "Open") {
    poker.openCards();
    obj.player.coins = poker.getPlayerState().coins;
    obj.computer = poker.getComputerState();
    obj.bank.coins = poker.getBank().coins;
    obj.message = poker.getTurnResult();
  }
  if (obj.computer_turn === "Pass") {
    poker.computerPassTurn();
    obj.player.coins = poker.getPlayerState().coins;
    obj.computer.coins = poker.getComputerState().coins;
    obj.bank.coins = poker.getBank().coins;
    obj.message = "Computer pass turn. Player win.";
  }
  //obj.player.coins = poker.getPlayerState().coins;
  //obj.computer.coins = poker.getComputerStateHiddenHand().coins;
  //obj.bank.coins = poker.getBank().coins;
  //obj.computer_turn = computer_turn;
  res.json(obj);
});

console.log("Server start on port 3000");
