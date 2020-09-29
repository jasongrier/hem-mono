HEM_BASE_SITE_TITLE = 'HEM'
BSP_BASE_SITE_TITLE = 'Berlin Stock Photos'

var HEM_CAMPAIGN_MONITOR_FORM_ACTION = 'https://humanear.createsend.com/t/r/s/mddyht/'
var HEM_CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME = 'cm-mddyht-mddyht'
var HEM_CAMPAIGN_MONITOR_FORM_ID = '5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756'
var HEM_MAILING_LIST_TEXT = 'Subscribe to HEM to receive updates on projects and happenings; sound and software.'

var BSP_CAMPAIGN_MONITOR_FORM_ACTION = 'https://www.createsend.com/t/subscribeerror?description='
var BSP_CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME = 'cm-oujlyid-oujlyid'
var BSP_CAMPAIGN_MONITOR_FORM_ID = '5B5E7037DA78A748374AD499497E309EB922E7320A74FE320567395932FD1E089D2A299E8E211FF50C89D028E56FA7A33DAA79AA4ACDB46632A1641971EAA8B4'
var BSP_MAILING_LIST_TEXT = 'Subscribe to Berlin Stock Photos to receive updates on new photos, prints, and more.'

module.exports.FORCE_PLACEMATS = false
module.exports.LISTS_HAVE_BLURBS = true
module.exports.PREVIEW_MODE = false
module.exports.RELEASE_PHASE = 1

BERLIN_STOCK_PHOTOS = true
module.exports.BERLIN_STOCK_PHOTOS = true

module.exports.CAMPAIGN_MONITOR_FORM_ACTION = BERLIN_STOCK_PHOTOS ? BSP_CAMPAIGN_MONITOR_FORM_ACTION : HEM_CAMPAIGN_MONITOR_FORM_ACTION

module.exports.BASE_SITE_TITLE = BERLIN_STOCK_PHOTOS ? BSP_BASE_SITE_TITLE : HEM_BASE_SITE_TITLE
module.exports.CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME = BERLIN_STOCK_PHOTOS ? BSP_CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME : HEM_CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME
module.exports.CAMPAIGN_MONITOR_FORM_ID = BERLIN_STOCK_PHOTOS ? BSP_CAMPAIGN_MONITOR_FORM_ID : HEM_CAMPAIGN_MONITOR_FORM_ID
module.exports.MAILING_LIST_TEXT = BERLIN_STOCK_PHOTOS ? BSP_MAILING_LIST_TEXT : HEM_MAILING_LIST_TEXT

module.exports.MINIMUM_PRICE_FOR_RAW = 10