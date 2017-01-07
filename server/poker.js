var suit_array = ["diamond", "heart", "cross", "spear"];
var rank_array = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"];

var player = {"hand" : [], "coins" : 0};
var computer = {"hand" : [], "coins" : 0};
var bank = {"coins" : 0};

var computer_hidden_hand = [
  {"rank" : "black", "suit" : "joker"},
  {"rank" : "black", "suit" : "joker"},
  {"rank" : "black", "suit" : "joker"},
  {"rank" : "black", "suit" : "joker"},
  {"rank" : "black", "suit" : "joker"},
];

var getRateArray = function (hand) {
  var arr = [];
  for (var i = 0; i < hand.length; ++i) {
    var count = 0;
    for (var j = 0; j < hand.length; ++j) {
      if (hand[i].rank === hand[j].rank) ++count;
    }
    arr.push(Number(count + hand[i].rank));
  }
  return arr;
};

var sortHand = function (hand) {
  var rate_array = getRateArray(hand);
  for (var i = 0; i < hand.length; ++i) {
    for (var j = 0; j < hand.length; ++j) {
      if (rate_array[i] > rate_array[j]) {
        var tmp = hand[i];
        hand[i] = hand[j];
        hand[j] = tmp;
        tmp = rate_array[i];
        rate_array[i] = rate_array[j];
        rate_array[j] = tmp;
      }
    }
  }
  return hand;
};

var dealCards = function () {
  var card_list = [];
  for (var i = 0; i < 10; ++i) {
    while (true) {
      var card = {"rank" : null, "suit" : null};
      card.suit = suit_array[Math.round(Math.random() * (suit_array.length - 1))];
      card.rank = rank_array[Math.round(Math.random() * (rank_array.length - 1))];
      if (i === 0) {
        card_list.push(card);
        break;
      }
      var result = true;
      card_list.forEach(function (element) {
        result &= JSON.stringify(card) !== JSON.stringify(element);
      });
      if (result) {
        card_list.push(card);
        break;
      }
    }
  }
  player.hand = sortHand(card_list.slice(0, 5));
  computer.hand = sortHand(card_list.slice(5, 10));
};

var startGame = function () {
  player.coins = 500;
  computer.coins = 500;
  bank.coins = 0;
};

var startTurn = function () {
  dealCards();
  player.coins -= 10;
  computer.coins -= 10;
  bank.coins = 20;  
};

var getPlayerState = function () {
  return player;
};

var getComputerState = function () {
  return computer;
};

var getComputerStateHiddenHand = function () {
  return {"hand" : computer_hidden_hand, "coins" : computer.coins};
};

var getBank = function () {
  return bank;
};

var isOnePair = function (hand) {
  var arr = getRateArray(hand);
  var count = 0;
  for (var i = 0; i < arr.length; ++i) {
    if ((arr[i] > 200) && (arr[i] < 300)) {
      ++count;
    }
  }
  return count === 2;
};

var isTwoPairs = function (hand) {
  var arr = getRateArray(hand);
  var count = 0;
  for (var i = 0; i < arr.length; ++i) {
    if ((arr[i] > 200) && (arr[i] < 300)) {
      ++count;
    }
  }
  return count === 4;
};

var isSet = function (hand) {
  var arr = getRateArray(hand);
  arr.forEach(function (num) {
    if (num > 300 && num < 400) return true;
  });
  return false;
};

var isStraight = function (hand) {
  var num = Number(hand[0].rank);
  if (num < 6) return false;
  for (var i = 1; i < hand.length; ++i) {
    if (Number(hand[i].rank) === num - 1) {
      num -= 1;
    } else {
      return false;
    }
  }
  return true;
};

var isFlush = function (hand) {
  var suit = hand[0].suit;
  for (var i = 1; i < hand.length; ++i) {
    if (hand[i].suit !== suit) return false; 
  }
  return true;
};

var isFullHouse = function (hand) {
  return isOnePair(hand) && isSet(hand);
};

var isCare = function (hand) {
  var arr = getRateArray(hand);
  arr.forEach(function (num) {
    if (num > 400) return true;
  });
  return false;
};

var isFlushStraight = function (hand) {
  return isFlush(hand) && isStraight(hand);
};

var isFlushRoyal = function (hand) {
  return isFlushStraight(hand) && hand[0].rank === 14;
};

var handRank = function (hand) {
  if (isOnePair(hand)) console.log("---- One pair ----");
  if (isTwoPairs(hand)) console.log("---- Two pairs ----");

  var rank = "";
  if (isFlushRoyal(hand)) rank = "09"
  else if (isFlushStraight(hand)) rank = "08";
  else if (isCare(hand)) rank = "07";
  else if (isFullHouse(hand)) rank = "06";
  else if (isFlush(hand)) rank = "05";
  else if (isStraight(hand)) rank = "04";
  else if (isSet(hand)) rank = "03";
  else if (isTwoPairs(hand)) rank = "02";
  else if (isOnePair(hand)) rank = "01";
  else rank = "00";

  hand.forEach(function (card) {
    rank += card.rank;
  });
  return rank;
};

var getTurnResult = function () {
  var computer_hand_rank = handRank(computer.hand);
  var player_hand_rank = handRank(player.hand);
  return player_hand_rank > computer_hand_rank ? "Player win" : (player_hand_rank < computer_hand_rank ? "Computer win" : "Draw");
};

var openCards = function () {
  var turn_result = getTurnResult();
  if (turn_result === "Player win") player.coins += bank.coins;
  if (turn_result === "Computer win") computer.coins += bank.coins;
  if (turn_result === "Draw") {
    player.coins += bank.coins / 2;
    computer.coins += bank.coins / 2;
  }
  bank.coins = 0;
};

var playerPassTurn = function () {
  computer.coins += bank.coins;
  bank.coins = 0;
};

var computerPassTurn = function () {
  player.coins += bank.coins;
  bank.coins = 0;
};

var playerAddCoins = function () {
  player.coins -= 10;
  bank.coins += 10;
};

var computerAddCoins = function () {
  computer.coins -= 10;
  bank.coins += 10;
};

var computerTurn = function () {
  var rate = Math.round(Math.random() * 10);
  return (rate < 7 ? "Add" : (rate < 9 ? "Open" : "Pass"));
};

module.exports.startGame = startGame;
module.exports.startTurn = startTurn;
module.exports.getPlayerState = getPlayerState;
module.exports.getComputerState = getComputerState;
module.exports.getComputerStateHiddenHand = getComputerStateHiddenHand;
module.exports.getBank = getBank;
module.exports.getTurnResult = getTurnResult;
module.exports.openCards = openCards;
module.exports.playerPassTurn = playerPassTurn;
module.exports.computerPassTurn = computerPassTurn;
module.exports.playerAddCoins = playerAddCoins;
module.exports.computerAddCoins = computerAddCoins;
module.exports.computerTurn = computerTurn;
