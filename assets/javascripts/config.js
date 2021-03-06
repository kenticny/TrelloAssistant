var config = {
  basic: {
    host: "https://api.trello.com",
    version: "/1"
  },
  api: {
    member: {
      me: "/members/me",
      boards: "/members/me/boards",
      notifications: "/members/me/notifications"
    },
    board: {
      lists: "/boards/{id}/lists",
      cards: "/boards/{id}/cards"
    },
    list: {
      cards: "/lists/{id}/cards"
    },
    card: {
      content: "/cards/{id}"
    }
  }
}
