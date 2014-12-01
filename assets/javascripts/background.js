/**
 * 发送HTTP请求 (send basic request)
 * @param  {[string]}   url      [url]
 * @param  {[object]}   params   [request params]
 * @param  {[string]}   method   [POST,GET,PUT,DELETE,etc...]
 * @param  {Function} callback 
 */
function sendRequest(url, params, method, callback) {
  oa.sendSignedRequest(url, callback, {
      method: method, 
      parameters: params || {} 
  });
}

/**
 * 发送GET请求 (send GET request with sign)
 * @param  {[string]}   url      [url]
 * @param  {Function} callback 
 */
function getRequest(url, params, callback) {
  if(callback == null && typeof params == "function") {
    callback = params; params = null;
  }
  sendRequest(url, params || {}, 'GET', callback);
}

/**
 * 发送POST请求 (send POST request with sign)
 * @param  {[string]}   url      [url]
 * @param  {[object]}   [params]   Optional[parameters with request]
 * @param  {Function} callback 
 */
function postRequest(url, params, callback) {
  if(callback == null && typeof params == "function") {
    callback = params; params = null;
  }
  sendRequest(url, params || {}, 'POST', callback);
}

/**
 * OAuth
 * @param  {[string]} key    [key]
 * @param  {[string]} secret [secret]
 * @param  {Function} callback 
 */
function oauth(key, secret, callback) {
  var oauth = ChromeExOAuth.initBackgroundPage({
    "request_url" : "https://trello.com/1/OAuthGetRequestToken",
    "authorize_url" : "https://trello.com/1/OAuthAuthorizeToken",
    "access_url" : "https://trello.com/1/OAuthGetAccessToken",
    "consumer_key" : key,
    "consumer_secret" : secret,
    //"scope" : "https://api.trello.com/1/",
    "app_name" : "Trello Assistant"
  });
  return oauth;
}

/**
 * 生成带参数的URL (replace url with params)
 * @param  {[string]} url    [url template]
 * @param  {[object]} params [params object, param name -> param value]
 * @return {[string]}        [complete url]
 */
function getUrl(url, params) {
  var host = config.basic.host, version = config.basic.version;
  if(params) {
    for(var p in params) {
      url = url.replace("{" + p + "}", params[p]);
    }
  }
  return host + version + url;
}

/**
 * 获取当前用户信息 (get current user infomation)
 * @param  {Function} callback 
 */
function getCurrentUser(callback) {
  getRequest(getUrl(config.api.member.me), callback);
}

/**
 * 获取用户的提醒消息
 * get the number of current user notifications
 * @param  {Function} callback
 */
function getNotification(callback) {
  getRequest(getUrl(config.api.member.notifications), callback);
}

/**
 * 获取当前用户的Board (get Current User Trello Boards)
 * @param {[object]} [params] [params of the request]
 * @param  {Function} callback
 */
function getBoards(params, callback) {
  if(callback == null && typeof params == "function") {
    callback = params; params = null;
  }
  getRequest(getUrl(config.api.member.boards), params || {}, callback);  
}

/**
 * 获取指定Board下的List (get lists by board id)
 * @param  {[string]}   boardId  [board id]
 * @param  {[object]}   params  [request params]
 * @param  {Function} callback 
 */
function getListsByBoardId(boardId, params, callback) {
  if(callback == null && typeof params == "function") {
    callback = params; params = null;
  }
  getRequest(getUrl(config.api.board.lists, {id: boardId}), params || {}, callback);
}

/**
 * 获取指定Board下的Card (get cards by board id)
 * @param  {[string]}   boardId  [board id]
 * @param  {[object]}   params  [request params]
 * @param  {Function} callback 
 */
function getCardsByBoardId(boardId, params, callback) {
  if(callback == null && typeof params == "function") {
    callback = params; params = null;
  }
  getRequest(getUrl(config.api.board.cards, {id: boardId}), params || {}, callback);
}

/**
 * 获取指定List下的Card (get cards by list id)
 * @param  {[string]}   listId   [list id]
 * @param  {[object]}   params  [request params]
 * @param  {Function} callback 
 */
function getCardsByListId(listId, params, callback) {
  if(callback == null && typeof params == "function") {
    callback = params; params = null;
  }
  getRequest(getUrl(config.api.list.cards, {id: listId}), params || {}, callback);
}

/**
 * 获取指定Card的内容 (get card content by card id)
 * @param  {[string]}   cardId   [card id]
 * @param  {[object]}   params  [request params]
 * @param  {Function} callback 
 */
function getCardContentById(cardId, params, callback) {
  if(callback == null && typeof params == "function") {
    callback = params; params = null;
  }
  getRequest(getUrl(config.api.card.content, {id: cardId}), params || {}, callback);
}

/**
 * 设置提醒 (set warning(red background) badge)
 * @param {[string]} text [badge text]
 */
function setWarningBadge(text) {
  chrome.browserAction.setBadgeText({text: text});
  chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
}

/**
 * 清除提醒 (clear warning(red background) badge)
 */
function clearWarningBadge() {
  chrome.browserAction.setBadgeText({text: ""});
}

/**
 * 检查是否有未读信息 (check whether have unread notification)
 * @param  {[number]} timer [check interval]
 */
// function checkNotifications(timer) {
//   setInterval(function() {
//     getUnreadNoticeNumber(function(number) {
//       if(number > 0) {
//         setWarningBadge(String(number));
//       }
//     });
//   }, timer || 30000);
// }

//checkNotifications();

var oa = oauth(
  "1f7fc3749300a14a879de2eef7fba060", 
  "0509b5365debaf38e176068db56e8dca3cc87ce9f29a5e0e4ba107b4ba71df43");

function test() {
  oa.authorize(function(token,b,c) {
    console.log(token,b,c);
    
    oa.sendSignedRequest("https://api.trello.com/1/members/me", function(res, xhr) {
      console.log(res);
    }, {method: "GET"})
  });
}