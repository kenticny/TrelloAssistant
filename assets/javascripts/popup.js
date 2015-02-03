var BG = chrome.extension.getBackgroundPage();
var mainArea = new Template(BG.document, "simple-template");
var navArea = new Template(BG.document, "nav .list-panel");

$(function(){

  // $("body").click(function() {
  //   var flag = $("#nav .list-panel").hasClass("shown-flag");
  //   if(flag) navHide();
  // });

  if(!BG.isValid()) {
    $('article').html("<a href='javascript:;' class='oauth'>PLEASE LOGIN</a>");
  }

  $(".oauth").click(function() {
    BG.authorize();
  });

  getBoards();

  $("header #nav .label-panel").click(function() {
    var flag = $("#nav .list-panel").hasClass("shown-flag");
    flag ? navHide() : navShow();
  });

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
      setShownList();
      getCardsByBoardId(boardId);
    });
  });
}

function getListsByBoardId(id, callback) {
  BG.getListsByBoardId(id, function(lists) {
    navArea.get("lists").iterator(JSON.parse(lists));
    $("div.list").click(function() {
      var listId = $(this).attr("data-id");
      var label = $(this).text();
      getCardsByListId(listId);
      setShownList(label);
      navHide();
    });
  });
}

function setShownList(listname) {
  listname = listname || "全部";
  $("header #nav .label-panel").html(listname);
}

function getCardsByBoardId(id) {
  BG.getCardsByBoardId(id, function(cards) {
    iteratorCards(cards);
  });
}

function getCardsByListId(id) {
  BG.getCardsByListId(id, function(cards) {
    iteratorCards(cards);
  });
}

function iteratorCards(cards) {
  mainArea.get("cards").iterator(JSON.parse(cards));
}

function navShow() {
  if(!$("#nav .list-panel").hasClass("shown-flag")) {
    $("#nav .list-panel").show();
    $("#nav .list-panel").addClass("shown-flag");
  }
}

function navHide() {
  if($("#nav .list-panel").hasClass("shown-flag")) {
    $("#nav .list-panel").hide();
    $("#nav .list-panel").removeClass("shown-flag");
  }
}