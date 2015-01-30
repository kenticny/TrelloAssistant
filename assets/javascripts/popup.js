var BG = chrome.extension.getBackgroundPage();
var mainArea = new Template(BG.document, "simple-template");
var headArea = new Template(BG.document, "nav");

$(function(){

  if(!BG.isValid()) {
    $('article').html("<a href='javascript:;' class='oauth'>PLEASE LOGIN</a>");
  }

  $(".oauth").click(function() {
    BG.authorize();
  });

  getBoards();
  //   $('article').html(getBoardTemplate(JSON.parse(boards)));

  //   $('.board').click(function() {
  //     var boardId = $(this).attr('data-id');
  //     BG.getListsByBoardId(boardId, function(lists) {
  //       $('#nav').html(getListsTemplate(JSON.parse(lists)));
  //       $('.list').click(function() {

  //       });
  //     });
  //     BG.getCardsByBoardId(boardId, function(cards) {
  //       $('article').html(getCardsTemplate(JSON.parse(cards)));
  //       $('.card').click(function() {
  //         BG.getCardContentById($(this).attr('data-id'), {actions: 'commentCard'}, function(content) {
  //           // console.log(content)
  //         });
  //       });
  //     });
  //   });

  BG.getCurrentUser(function(user) {
    var userInfo = JSON.parse(user);
    var photo = "https://trello-avatars.s3.amazonaws.com/" + userInfo.avatarHash + "/30.png"
    $("header #user .fullname").html(userInfo.fullName)
    $("header #user img").attr("src", photo);
  });

  // BG.getNotification(function(notifications) {
  //   // console.log(JSON.parse(notifications));
  // });

});

function getBoards() {
  BG.getBoards(function(boards) {
    mainArea.get("boards").iterator(JSON.parse(boards), {
      background: function(data) {
        return data.prefs.backgroundColor || 'url(' + data.prefs.backgroundImage + ')';
      }
    });
    $(".board").click(function() {
      var boardId = $(this).attr('data-id');
      getListsByBoardId(boardId);
      getCardsByBoardId(boardId);
    });
  });
}

function getListsByBoardId(id) {
  BG.getListsByBoardId(id, function(lists) {
    headArea.get("lists").iterator(JSON.parse(lists));
  });
}

function getCardsByBoardId(id) {
  BG.getCardsByBoardId(id, function(cards) {
    mainArea.get("cards").iterator(JSON.parse(cards));
  });
}
