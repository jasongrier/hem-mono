/*******************************/
/* NEW, SPLIT-BY-CONFIG METHOD */
/*******************************/
module.exports.PROJECT_CONFIGS = {
  'hem.rocks': {
    htmlHeadMeta: {
      BASE_SITE_TITLE: 'HEM',
      META_DESCRIPTION: 'Sound | Art | Software | Rare Tracks | Articles | Editions',
    },
    campaignMonitor: {
      CAMPAIGN_MONITOR_FORM_ACTION: 'https://humanear.createsend.com/t/r/s/mddyht/',
      CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME: 'cm-mddyht-mddyht',
      CAMPAIGN_MONITOR_FORM_ID: '5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756',
      MAILING_LIST_TEXT: 'Subscribe to HEM to receive updates on projects and happenings, sound, and software.',
    },
    HAS_PLAYER: true,
    USES_COOKIES: true,
    HIDE_COOKIES_FRAME_FOR: ['life-in-letters'],
    HIDE_PLAYER_FRAME_FOR: ['print-flip-books', 'web-movie', 'life-in-letters'],
    NAG_HEADER: 'HEM Newsletter',
    NAG_TEXT: 'HEM Newsletter',
    ROUTED_POPUPS: [
      'apps',
      'articles',
      'artists',
      'blog',
      'code',
      'editions',
      'faqs',
      'home',
      'label',
      'merch',
      'mixes',
      'playlists',
      'press-kits',
      'press-releases',
      'press',
      'sound-library',
      'stock-photos',
      'tracks',
      'tutorials',
      'user-guides',
      'venue-archive',
      'venue-calendar',
      'venue-merch',
      'videos',
    ],
    CURATED_PLAYLISTS: [
      {
        name: 'Player Featured',
        linkTo: '/tracks/filter/featured',
      },
      {
        name: 'Player Rare',
        linkTo: '/tracks/filter/rare',
      },
      {
        name: 'Player Live',
        linkTo: '/tracks/filter/live',
      },
      {
        name: 'Player Radio',
        linkTo: '/tracks/filter/radio',
      },
      {
        name: 'Player Sound Library',
        linkTo: '/sound-library',
      },
      {
        name: 'Player Releases',
        linkTo: '/label',
      },
    ]
  },
  'berlinstockphotos.com': {
    htmlHeadMeta: {
      BASE_SITE_TITLE: 'Berlin Stock Photos',
      META_DESCRIPTION: 'Lushness. Weirdness. Greenery. Grit. Cheap stock photos from Berlin, Germany, updated daily.',
    },
    campaignMonitor: {
      CAMPAIGN_MONITOR_FORM_ACTION: 'https://www.createsend.com/t/subscribeerror?description=',
      CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME: 'cm-oujlyid-oujlyid',
      CAMPAIGN_MONITOR_FORM_ID: '5B5E7037DA78A748374AD499497E309EB922E7320A74FE320567395932FD1E089D2A299E8E211FF50C89D028E56FA7A33DAA79AA4ACDB46632A1641971EAA8B4',
      MAILING_LIST_TEXT: 'Subscribe to Berlin Stock Photos to receive updates on new photos, prints, and more.',
    },
  },
  'midst.press': {
    htmlHeadMeta: {
      BASE_SITE_TITLE: 'Berlin Stock Photos',
      META_DESCRIPTION: 'Lushness. Weirdness. Greenery. Grit. Cheap stock photos from Berlin, Germany, updated daily.',
    },
    campaignMonitor: {
      CAMPAIGN_MONITOR_FORM_ACTION: 'https://www.createsend.com/t/subscribeerror?description=',
      CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME: 'cm-oujlyid-oujlyid',
      CAMPAIGN_MONITOR_FORM_ID: '5B5E7037DA78A748374AD499497E309EB922E7320A74FE320567395932FD1E089D2A299E8E211FF50C89D028E56FA7A33DAA79AA4ACDB46632A1641971EAA8B4',
      MAILING_LIST_TEXT: 'Subscribe to Berlin Stock Photos to receive updates on new photos, prints, and more.',
    },
  },
  'breto': { },
  'dot': { },
  'midst': { },
}

/********************************/
/* OLD, SPLIT-BY-TOOLING METHOD */
/*******************************/
var BERLIN_STOCK_PHOTOS = false

// Source configs
var HEM_BASE_SITE_TITLE = 'HEM'
var HEM_META_DESCRIPTION = 'Sound | Art | Software | Rare Tracks | Articles | Editions'
var HEM_CAMPAIGN_MONITOR_FORM_ACTION = 'https://humanear.createsend.com/t/r/s/mddyht/'
var HEM_CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME = 'cm-mddyht-mddyht'
var HEM_CAMPAIGN_MONITOR_FORM_ID = '5B5E7037DA78A748374AD499497E309E34883504EC972B188E4CB169FC87154EA44D7B3A50124374F2DEEFB33D7CE7A53C0566B978C890570F878E42C80AD756'
var HEM_MAILING_LIST_TEXT = 'Subscribe to HEM to receive updates on projects and happenings, sound, and software.'

var BSP_BASE_SITE_TITLE = 'Berlin Stock Photos'
var BSP_META_DESCRIPTION = 'Lushness. Weirdness. Greenery. Grit. Cheap stock photos from Berlin, Germany, updated daily.'
var BSP_CAMPAIGN_MONITOR_FORM_ACTION = 'https://www.createsend.com/t/subscribeerror?description='
var BSP_CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME = 'cm-oujlyid-oujlyid'
var BSP_CAMPAIGN_MONITOR_FORM_ID = '5B5E7037DA78A748374AD499497E309EB922E7320A74FE320567395932FD1E089D2A299E8E211FF50C89D028E56FA7A33DAA79AA4ACDB46632A1641971EAA8B4'
var BSP_MAILING_LIST_TEXT = 'Subscribe to Berlin Stock Photos to receive updates on new photos, prints, and more.'

// HEM static configs
module.exports.FORCE_PLACEMATS = false
module.exports.LISTS_HAVE_BLURBS = true
module.exports.PREVIEW_MODE = false
module.exports.RELEASE_PHASE = 1

// BSP static configs
module.exports.MINIMUM_PRICE_FOR_RAW = 10

// Dynamic configs
module.exports.BERLIN_STOCK_PHOTOS = BERLIN_STOCK_PHOTOS
module.exports.BASE_SITE_TITLE = BERLIN_STOCK_PHOTOS ? BSP_BASE_SITE_TITLE : HEM_BASE_SITE_TITLE
module.exports.META_DESCRIPTION = BERLIN_STOCK_PHOTOS ? BSP_META_DESCRIPTION : HEM_META_DESCRIPTION
module.exports.CAMPAIGN_MONITOR_FORM_ACTION = BERLIN_STOCK_PHOTOS ? BSP_CAMPAIGN_MONITOR_FORM_ACTION : HEM_CAMPAIGN_MONITOR_FORM_ACTION
module.exports.CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME = BERLIN_STOCK_PHOTOS ? BSP_CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME : HEM_CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME
module.exports.CAMPAIGN_MONITOR_FORM_ID = BERLIN_STOCK_PHOTOS ? BSP_CAMPAIGN_MONITOR_FORM_ID : HEM_CAMPAIGN_MONITOR_FORM_ID
module.exports.MAILING_LIST_TEXT = BERLIN_STOCK_PHOTOS ? BSP_MAILING_LIST_TEXT : HEM_MAILING_LIST_TEXT
