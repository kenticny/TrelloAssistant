/**
 * send GET request
 * @param  {[string]}   url      [url]
 * @param  {Function} callback 
 */
function getRequest(url, callback) {
  $.get(url, callback);
}

/**
 * send POST request
 * @param  {[string]}   url      [url]
 * @param  {[object]}   [params]   Optional[parameters with request]
 * @param  {Function} callback 
 */
function postRequest(url, params, callback) {
  if(arguments.length == 2) {
    callback = params; params = null;
  }
  $.post(url, params || {}, callback);
}

/**
 * get Current User Trello Boards
 * @param  {Function} callback
 */
function getBoards(callback) {
  getRequest(config.urls.boards, callback);
}

/**
 * get current user infomation
 * @param  {Function} callback 
 */
function getCurrentUser(callback) {
  getRequest(config.urls.user + '?notifications=all', callback);
}

/**
 * get board content by board id
 * @param  {[string]}   id       [board id]
 * @param  {Function} callback 
 */
function getBoardById(id, callback) {
  getRequest(config.urls.board + '/' + id + '?lists=all&cards=visible', callback);
}

/**
 * get the number of current user unread notifications
 * @param  {Function} callback
 */
function getUnreadNoticeNumber(callback) {
  getCurrentUser(function(result) {
    callback(result.notifications.filter(function(n) {return n.unread;}).length);
  })
}

/**
 * set warning(red background) badge
 * @param {[string]} text [badge text]
 */
function setWarningBadge(text) {
  chrome.browserAction.setBadgeText({text: text});
  chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
}

/**
 * check whether have unread notification
 * @param  {[number]} timer [check interval]
 */
function checkNotifications(timer) {
  setInterval(function() {
    getUnreadNoticeNumber(function(number) {
      if(number > 0) {
        setWarningBadge(String(number));
      }
    })
  }, timer || 30000);
}

checkNotifications();