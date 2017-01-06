var computer_hand_background = [
  {"rank" : "black", "suit" : "joker"},
  {"rank" : "black", "suit" : "joker"},
  {"rank" : "black", "suit" : "joker"},
  {"rank" : "black", "suit" : "joker"},
  {"rank" : "black", "suit" : "joker"}
];

var showHand = function (player_class, hand) {
  $(player_class + " img").hide();
  $(player_class + " img").remove();
  hand.forEach(function (card) {
    var $img = $("<img>");
    $img.attr("src", "images/" + card.suit + "-" +  card.rank + ".png");
    $img.fadeIn(1000);
    $("main " + player_class).append($img);
  });
};

var startGame = function () {
  $.post("/startGame", {}, function (obj) {
    console.log(obj);
  });
  showHand(".computer-hand", computer_hand_background);
  $.getJSON("/getPlayerHand", function (obj) {
    console.log(obj);
    showHand(".player-hand", obj.hand);
  });
  //$(".message").text("");
};

var setMessage = function (message, func) {
  var $p = $(".message");
  $p.text(message);
  setTimeout(function() {
    $p.text("");
    func();
  }, 3000);
};

var buttonsEventListener = function () {
  $(".button-pass").on("click", function () {
    $.post("/hand", {"hand" : ""}, function (obj) {
      console.log(obj);
    });
  });

  $(".button-add").on("click", function () {
    $.post("/hand", {"hand" : ""}, function (obj) {
      console.log(obj);
    });
  });

  $(".button-open").on("click", function () {
    $.post("/openCards", {}, function (json) {
      console.log(json);
      showHand(".computer-hand", json.computer_hand);
      setMessage(json.tour_result, startGame);
      //alert(json.tour_result);
      //var $p = $("p.message");
      //$(".message-space").append($p);
      //$p.text(json.tour_result);
      //$p.hide();
      //$p.fadeIn(3000, function () {
        //startGame();
        //$p.remove();
      //});
      //$p.remove();
    });
  });
};

var main = function () {
  "use strict";
  buttonsEventListener();
  startGame();
  console.log("Hello, World!");
};

$(document).ready(main);
