import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { BASE_SITE_TITLE } from '../../config'

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

        <h2>Essential Cookies</h2>

        <p>This website will not function properly without the following cookies. When you use this website these cookies <i>will</i> be set no matter what.</p>

        <p><strong>hem-rocks-cookie--cookie-preferences-set</strong></p>

        <p>This prevents you from getting the cookies warning popup every time you visit our site.</p>

        <p><strong>hem-rocks-cookie--cart</strong></p>

        <p>This makes it so the items in your shopping cart are not forgotten when the page is reloaded or opened in a new tab.</p>

        <p><strong>hem-rocks-cookie--cart</strong></p>

        <p>This makes it so the items in your shopping cart are not forgotten when the page is reloaded or opened in a new tab.</p>

        <h2>Third Party Cookies</h2>

        <p>This website will work fine without the following cookies. When you use this website these cookies will be set <i>only</i> if you click "Accept cookies".</p>

        <p>Google Analytics, which provides an analytics solution to help us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content. For more information on Google Analytics cookies, see the official Google Analytics page.</p>

        <p>The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you. For more information on Google AdSense see the official Google AdSense privacy FAQ.</p>

        <p>The Facebook pixel to gather visitor behavior data, including which pages are visited and the actions taken. This may be used to serve Facebook ads. For more information about the Facebook pixel see Facebook's official site. These types of cookies allow us to provide you with content that we feel may be of interest to you.</p>

        <p>We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work the following social media sites including; Facebook, Twitter, will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies. More Information</p>

        <p>If you are looking for more information you can contact us via the <Link to="/support">support page</Link>.</p>

        <h2>A/B Test Cookies</h2>

        <p>The following cookies allow us to test new features by providing variations on the user experience.</p>

        <p>These cookies are disabled when the option "analytics cookies" is disabled.</p>

        <p><strong>hem.rocks-flex-pricing-type</strong></p>

        <p>Lets us figure out whether people prefer to click multiple choice buttons for choose-your-own-price, or to type in a number manually.</p>
      </div>
    </>
  )
}

export default CookiePolicy
