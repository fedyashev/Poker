var suit_array = ["diamond", "heart", "cross", "spear"];
var rank_array = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"];

//var player_hand = [];
//var compter_hand = [];

var player = {"hand" : "", "hand_rate" : 0, "coins" : 0};
var computer = {"hand" : "", "hand_rate" : 0, "coins" : 0};

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
  player.hand = card_list.slice(0, 5).sort(sortByRank);
  computer.hand = card_list.slice(5, 10).sort(sortByRank);
};

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

var startGame = function () {
  generateHands();
};

var startTour = function () {
  
};

var getPlayerHand = function () {
  return {"hand" : player.hand, "rank" : handRank(player.hand)};
};

var getComputerHand = function () {
  return {"hand" : computer.hand, "rank" : handRank(computer.hand)};
};

module.exports.getBestCombination = getBestCombination;
module.exports.startGame = startGame;
module.exports.getPlayerHand = getPlayerHand;
module.exports.getComputerHand = getComputerHand;
module.exports.getTourResult = getTourResult;
