var BG = chrome.extension.getBackgroundPage();

$(function(){

  if(BG.isValid()) {
    checkUserInfo()
  }else {
    $('article').html("<a href='javascript:;' class='oauth'>PLEASE LOGIN</a>")
  }

  $(".oauth").click(function() {
    doAuth();
  })

  // $('#test').click(function() {
  //   // BG.test()
  //   alert($(BG.document).find('template#demo').html());
  // })

  BG.getBoards(function(boards) {
    $('article').html(getBoardTemplate(JSON.parse(boards)));

    $('.board').click(function() {
      var boardId = $(this).attr('data-id');
      BG.getListsByBoardId(boardId, function(lists) {
        $('#nav').html(getListsTemplate(JSON.parse(lists)));
      });
      BG.getCardsByBoardId(boardId, function(cards) {
        $('article').html(getCardsTemplate(JSON.parse(cards)));
        $('.card').click(function() {
          BG.getCardContentById($(this).attr('data-id'), {actions: 'commentCard'}, function(content) {
            console.log(content)
          });
        });
      });
    });
  });

  // BG.getCurrentUser(function(user) {
  //   // console.log(JSON.parse(user));
  //   // $("header #user").html()
  // });

  // BG.getNotification(function(notifications) {
  //   // console.log(JSON.parse(notifications));
  // });

});

function doAuth() {
  BG.authorize(function() {
    alert("ok")
  });
}

function checkUserInfo() {
  BG.getCurrentUser(function(a,b,c) {
    console.log(a,b,c)
  })
}

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
    cardsTemplate += '<div class="card" data-id="' + cards[i].id + '">' + cards[i].name + '</div>'
  }
  return cardsTemplate;
}

function getCardContentTemplate(content) {
  var cardContentTemplate = '';
}