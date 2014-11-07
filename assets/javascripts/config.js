var config = {
  urls: {
    user: "https://trello.com/1/Members/me",
    boards: "https://trello.com/1/Members/me?boards=open%2Cstarred&board_fields=name%2Cclosed%2CdateLastActivity%2CdateLastView%2CidOrganization%2Cprefs%2CshortLink%2CshortUrl%2Curl%2Csubscribed&boardStars=true&boardsInvited=all&boardsInvited_fields=name%2Cclosed%2CdateLastActivity%2CdateLastView%2CidOrganization%2Cprefs%2CshortLink%2CshortUrl%2Curl%2Csubscribed&board_organization=true&board_organization_fields=name%2CdisplayName%2Cproducts%2Cprefs%2ClogoHash&credits=invitation%2CpromoCode&organizations=all&organization_fields=name%2CdisplayName%2Cproducts%2Cprefs%2ClogoHash&organizationsInvited=all&organizationsInvited_fields=name%2CdisplayName%2Cproducts%2Cprefs%2ClogoHash&paid_account=true",
    board: "https://trello.com/1/boards",
    card: "https://trello.com/1/card",

  }
}


/**
 *  Boards/:id
 *  
 *  list=all
 *  cards=visible
 *  card_attachments=cover
 *  card_stickers=true
 *  card_fields=badges%2Cclosed%2CdateLastActivity%2Cdesc%2CdescData%2Cdue%2CidAttachmentCover%2CidList%2CidBoard%2CidMembers%2CidShort%2Clabels%2Cname%2Cpos%2CshortUrl%2CshortLink%2Csubscribed%2Curl
 *  card_checklists=none
 *  members=all
 *  member_fields=fullName%2Cinitials%2CmemberType%2Cusername%2CavatarHash%2Cbio%2CbioData%2Cconfirmed%2Cproducts%2Curl%2Cstatus
 *  membersInvited=all
 *  membersInvited_fields=fullName%2Cinitials%2CmemberType%2Cusername%2CavatarHash%2Cbio%2CbioData%2Cconfirmed%2Cproducts%2Curl
 *  checklists=none
 *  organization=true
 *  organization_fields=name%2CdisplayName%2Cdesc%2CdescData%2Curl%2Cwebsite%2Cprefs%2Cmemberships%2ClogoHash%2Cproducts
 *  myPrefs=true
 *  fields=name%2Cclosed%2CdateLastActivity%2CdateLastView%2CidOrganization%2Cprefs%2CshortLink%2CshortUrl%2Curl%2Cdesc%2CdescData%2Cinvitations%2Cinvited%2ClabelNames%2Cmemberships%2Cpinned%2CpowerUps%2Csubscribed
 *
 *  User
 *  
 *  notifications:all
 *  notifications_limit:5
 *  notification_memberCreator_fields:fullName,initials,memberType,username,avatarHash,bio,bioData,confirmed,products,url
 *  organizations:all
 *  organization_paid_account:true
 *  organization_fields:name,displayName
 *  paid_account:true
 *  savedSearches:true
 *  
 */