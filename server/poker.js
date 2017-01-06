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
  var sortByRank = function (a, b) {
    return ((a.rank > b.rank) ? -1 : ((a.rank < b.rank) ? 1 : 0));
  };
  player.hand = card_list.slice(0, 5).sort(sortByRank);
  computer.hand = card_list.slice(5, 10).sort(sortByRank);
};

/*var sortByRank = function (a, b) {
  return ((a.rank > b.rank) ? -1 : ((a.rank < b.rank) ? 1 : 0));
};*/

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

/*var generateHands = function () {
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
  player.hand = card_list.slice(0, 5).sort(sortByRank);
  computer.hand = card_list.slice(5, 10).sort(sortByRank);
};*/

var handRank = function (hand) {
  var rank = "";
  hand.forEach(function (card) {
    rank += card.rank;
  });
  return rank;
};

var getTourResult = function () {
  var player_hand_rank = handRank(player.hand);
  var computer_hand_rank = handRank(computer.hand);
  return player_hand_rank > computer_hand_rank ? "Player win" : (player_hand_rank < computer_hand_rank ? "Computer win" : "Draw");
};

/*var startGame = function () {
  generateHands();
};*/

/*var getPlayerHand = function () {
  return {"hand" : player.hand, "rank" : handRank(player.hand)};
};

var getComputerHand = function () {
  return {"hand" : computer.hand, "rank" : handRank(computer.hand)};
};*/

module.exports.startGame = startGame;
module.exports.startTurn = startTurn;
module.exports.getPlayerState = getPlayerState;
module.exports.getComputerState = getComputerState;
module.exports.getComputerStateHiddenHand = getComputerStateHiddenHand;
module.exports.getBank = getBank;
module.exports.getTourResult = getTourResult;
