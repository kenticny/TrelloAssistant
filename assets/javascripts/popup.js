var BG = chrome.extension.getBackgroundPage();

$(function(){
  $('article').html("<div>Loading...</div>");

  BG.getCurrentUser(function(result) {
    var username = result.fullName;
    var unreadNoticeNum = result.notifications.filter(function(n) {return n.unread;}).length;
    $('header #user').html(username + '(' + unreadNoticeNum + ')');
  });

  BG.getBoards(function(result) {
    var boards = result.boards;
    $('article').html(getBoardTemplate(boards));

    $('.board').click(function() {
      var id = $(this).attr('data-id');
      BG.getBoardById(id, function(result) {

        // show lists
        var lists = result.lists.filter(function(n) {return !n.closed;});
        $('header #nav').html(getListsTemplate(lists));

        // show cards
        var cards = result.cards.filter(function(n) {return !n.closed;});
        $('article').html(getCardsTemplate(cards));

        $(".list").click(function() {
          // filter card by list tag
          var id = $(this).attr("data-id");
          var filterCards = cards.filter(function(n) {return n.idList == id; });
          $('article').html(getCardsTemplate(filterCards));
        });

      });
    });
  });
});

function getBoardTemplate(boards) {
  var boardTemplate = '';
  for(var i in boards) {
    var background = boards[i].prefs.backgroundColor || 'url(' + boards[i].prefs.backgroundImage + ')';
    boardTemplate += '<div class="board" style="background:' + background + '" data-id="' 
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