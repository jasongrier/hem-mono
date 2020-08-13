import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { CampaignMonitorForm } from '../../../../lib/components'
import { AboutSubnav } from '../../components/layout'
import { assetHostHostname } from '../../functions'
import { BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_ACTION, CAMPAIGN_MONITOR_FORM_ID, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME } from '../../config'

function CookiePolicy(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="page page-about page-with-subnav">
        <h1>Cookie Policy</h1>
        
        <p>This site uses cookies. Cookies are bits of text that are downloaded to your web browser, to improve your browsing experience. For more information on cookies see the Wikipedia article on HTTP Cookies... We use cookies for a variety of reasons detailed below. Disabling cookies will impact the functionality and features of this site. You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this website. It is recommended that you do not disable cookies.</p>

        <h2>The Cookies We Set</h2>

        <p>If you create an account then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.</p>

        <p>We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. To provide you with a great experience on this site we provide the functionality to identify you and set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>

        <h2>Third Party Cookies</h2>
        
        <p>In some special cases we also use cookies provided by trusted third parties These include:</p>

        <p>Matomo, which provides an analytics solution to help us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content. For more information on Google Analytics cookies, see the official Google Analytics page.</p>

        <p>The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you. For more information on Google AdSense see the official Google AdSense privacy FAQ.</p>

        <p>The Facebook pixel to gather visitor behaviour data, including which pages are visited and the actions taken. This may be used to serve Facebook ads. For more information about the Facebook pixel see Facebooks official site. These types of cookies allow us to provide you with content that we feel may be of interest to you.</p>

        <p>We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work the following social media sites including; Facebook, Twitter, will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies. More Information</p>

        <p>If you are looking for more information you can contact us via support@bleepstores.com</p>

        <h2>Essential cookies</h2>

        <p><strong>hem-rocks-cookie--cookie-preferences-set</strong></p>

        <p>This prevents you from getting the cookies warning popup every time you visit our site.</p>

        <p><strong>hem-rocks-cookie--cart</strong></p>

        <p>This makes it so the items in your shopping cart are not forgotten when the page is reloaded or opened in a new tab.</p>
      </div>
    </>
  )
}

export default CookiePolicy
