var suit_array = ["diamond", "heart", "cross", "spear"];
var rank_array = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

var player_hand = [];
var compter_hand = [];

var isHandValid = function (hand) {
  var result = true;
  if (hand.length !== 5) result &= false;
  hand.forEach(function (card) {
    if (suit_array.indexOf(card.suit) === -1 || rank_array.indexOf(card.rank) === -1) {
      result &= false;
    }
  });
  return result; 
};

var getBestCombination = function (hand) {
  var result = {"handString" : null, "error" : null};
  if (!isHandValid(hand)) {
    result.handString = null;
    result.error = "Incorrect cards in hand.";
    return result;
  }
  return result;
};

var sortByRank = function (a, b) {
  return ((a.rank > b.rank) ? -1 : ((a.rank < b.rank) ? 1 : 0));
};

var generateHands = function () {
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
  player_hand = card_list.slice(0, 5).sort(sortByRank);
  computer_hand = card_list.slice(5, 10).sort(sortByRank);
};

var startGame = function () {
  generateHands();
};

var getPlayerHand = function () {
  return {"hand" : player_hand};
};

var getComputerHand = function () {
  return {"hand" : computer_hand};
};

module.exports.getBestCombination = getBestCombination;
module.exports.startGame = startGame;
module.exports.getPlayerHand = getPlayerHand;
module.exports.getComputerHand = getComputerHand;
