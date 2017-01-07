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

var refreshCoinsValues = function (obj) {
  $("#computer-coins").text(obj.computer.coins);
  $("#bank-coins").text(obj.bank.coins);
  $("#player-coins").text(obj.player.coins);
};

var setMessage = function (message) {
  $("#message").text(message);
};

var startGame = function () {
  $.post("/startGame", {}, function (obj) {
    console.log(obj);
    refreshCoinsValues(obj);
  });
  //showHand(".computer-hand", computer_hand_background);
  //$.getJSON("/getPlayerHand", function (obj) {
  //  console.log(obj);
  //  showHand(".player-hand", obj.hand);
  //});
  //$(".message").text("");
};

var startTurn = function () {
  $.post("/startTurn", {}, function (obj) {
    console.log(obj);
    refreshCoinsValues(obj);
    showHand(".computer-hand", obj.computer.hand);
    showHand(".player-hand", obj.player.hand);
    setMessage("Start turn");
  });
};

var openCards = function () {
  $.post("/openCards", {}, function (obj) {
    console.log(obj);
    refreshCoinsValues(obj);
    showHand(".computer-hand", obj.computer.hand);
    setMessage("Player open cards. " + obj.message);
  });
};

var playerPassTurn = function () {
  $.post("/passTurn", {}, function (obj) {
    console.log(obj);
    refreshCoinsValues(obj);
    setMessage("Player pass. Computer win.");
    $("#button-open").text("Start");
  });
};

var playerAddCoins = function () {
  $.post("/addCoins", function (obj) {
    console.log(obj);
    refreshCoinsValues(obj);
    if (obj.computer_turn === "Add") {
      setMessage(obj.message);
    }
    if (obj.computer_turn === "Open") {
      setMessage("Computer open cards. " + obj.message);
      showHand(".computer-hand", obj.computer.hand);
      $("#button-open").text("Start");
    }
    if (obj.computer_turn === "Pass") {
      setMessage(obj.message);
      $("#button-open").text("Start");
    }
  });
};

var buttonsEventListener = function () {
  var $btnStartOpen = $("#button-open");

  $("#button-pass").on("click", function () {
    if ($("#button-open").text() === "Open") playerPassTurn();
  });

  $("#button-add").on("click", function () {
    if ($("#button-open").text() === "Open") playerAddCoins();
  });

  $btnStartOpen.on("click", function () {
    /*
    $.post("/openCards", {"message" : $btnStartOpen.text()}, function (json) {
      console.log(json);
      showHand(".computer-hand", json.computer_hand.hand);
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
      $btnStartOpen.text($btnStartOpen.text() === "Open" ? "Start" : "Open");
    });
    */
    if ($btnStartOpen.text() === "Start") {
      startTurn();
      $btnStartOpen.text("Open");
    } else {
      openCards();
      $btnStartOpen.text("Start");
    }
  });
};

var main = function () {
  "use strict";
  buttonsEventListener();
  startGame();
  console.log("Hello, World!");
};

$(document).ready(main);
