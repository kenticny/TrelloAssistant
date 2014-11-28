var BG = chrome.extension.getBackgroundPage();

$(function(){
  $("#test").click(function() {
    BG.test()
  })

  BG.getBoards(function(boards) {
    $("article").html(getBoardTemplate(JSON.parse(boards)));
  });

  BG.getCurrentUser(function(user) {
    // console.log(JSON.parse(user));
    // $("header #user").html()
  });

  BG.getNotification(function(notifications) {
    console.log(JSON.parse(notifications));
  });

  $(".board").click(function() {
    BG.getLists($(this).attr("data-id"), function(lists) {
      $("article").html(getListsTemplate(JSON.parse(lists)));
    });
  });

});

function getBoardTemplate(boards) {
  var boardTemplate = '';
  for(var i in boards) {
    var background = boards[i].prefs.backgroundColor || 'url(' + boards[i].prefs.backgroundImage + ')';
    boardTemplate += '<div class="board" style="background:' + background + ';" data-id="' 
    + boards[i].id + '">' + boards[i].name + '</div>';
  }
  return boardTemplate;
}

function getListsTemplate(lists) {
  var listsTemplate = '';
  for(var i in lists) {
    listsTemplate += '<div class="list" data-id="' + lists[i].id + '">' + lists[i].name + '</div>'
  }
  return listsTemplate;
}

function getCardsTemplate(cards) {
  var cardsTemplate = '';
  for(var i in cards) {
    cardsTemplate += '<div class="card">' + cards[i].name + '</div>'
  }
  return cardsTemplate;
}