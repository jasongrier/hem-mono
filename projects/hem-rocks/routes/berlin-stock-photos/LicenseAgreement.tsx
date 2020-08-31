import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import ReactGA from 'react-ga'
import { Header, Footer } from '../../components/berlin-stock-photos'
import { assetHostHostname } from '../../functions'
import { CampaignMonitorForm } from '../../../../lib/components'
import { CAMPAIGN_MONITOR_FORM_ACTION, BASE_SITE_TITLE, CAMPAIGN_MONITOR_FORM_EMAIL_FIELD_NAME, CAMPAIGN_MONITOR_FORM_ID, MAILING_LIST_TEXT } from '../../config'

function LicenseAgreement(): ReactElement {
  return (
    <>
      <Helmet>
        <title>{ BASE_SITE_TITLE }: LicenseAgreement</title>
        <meta name="description" content="Lushness. Weirdness. Greenery. Grit. Cheap stock photos from Berlin, Germany, updated daily." />
      </Helmet>
      <Header />
      <div className="page berlin-stock-photos bsp-page bsp-terms-page">
        <div className="main-content-section-x">
          <h1>License Agreement</h1>
          <p>
            This License Agreement governs the terms by which Users of Berlin Stock Photos obtain the right to use Stock Media provided by other Users through this License.
          </p>
          <p>
            If you download Stock Media you wish to license under this License you agree to be bound by the terms of this License Agreement, the Berlin Stock Photos Privacy Policy and Berlin Stock Photos's Terms of Use which are incorporated herein and made a part hereof by reference. Berlin Stock Photos reserves the right to change any of the terms of this License Agreement at any time, and you agree to be bound by such changes. Please make sure that you read and understand all such changes. If you do not agree to this License Agreement, as may be amended from time to time, do not download any Stock Media from Berlin Stock Photos.
          </p>
          <p>
            Your failure to comply with the terms herein could result in legal proceedings.
          </p>
          <p>
            1. Agreement Background
            <br /><br />
            a. All Stock Media on the Service is protected by German and international copyright laws and treaties. Berlin Stock Photos and/or its various Contributors own all rights, interests and title, including the copyrights, in and to the Stock Media. Berlin Stock Photos and/or its Contributors reserve all rights in and to the Stock Media not expressly granted to you by the terms of this License Agreement. Your rights to use any Stock Media are subject to this License Agreement and are conditioned upon your payment to Berlin Stock Photos for your use of the Stock Media.
            <br /><br />
            b. Stock Media licensed under this License may be both downloaded for use outside Berlin Stock Photos.
            <br /><br />
            c. You understand and agree that Berlin Stock Photos may, in its sole discretion:
            <br /><br />
            i. monitor anything you download from the Service, as frequently Berlin Stock Photos in its sole discretion determines, for any violation of this License Agreement;
            ii. retain for an indefinite period details of a Berlin Stock Photos Stock Media that you have Exported;
            <br /><br />
            2. License Terms
            <br /><br />
            Subject to the terms and conditions hereof, we hereby grant to you a perpetual, non-exclusive, non-transferable worldwide license to use the Stock Media for Permitted Uses (as defined below). Unless the activity or use is a Permitted Use, you cannot do it. All other rights in and to the Stock Media, including, without limitation, all copyright and other Intellectual Property Rights relating to the Stock Media, are retained by Berlin Stock Photos  and/or its Contributors as the case may be.
            <br /><br />
            3. Permitted Uses
            <br /><br />
            Subject to the restrictions described under Prohibited Uses below, the following are “Permitted Uses” of Berlin Stock Photos Stock Media:
            <br /><br />
            a. invitations, advertising and promotional projects, including printed materials, product packaging, presentations, film and video presentations, commercials, catalogues, brochures, greeting cards and postcards for promotion and/or resale, without any reproduction quantity limit;
            <br /><br />
            b. school or university projects;
            <br /><br />
            c. social media post or profile image;
            <br /><br />
            d. decorative background on a personal computer or mobile device;
            <br /><br />
            e. entertainment applications, such as books and book covers, magazines, newspapers, editorials, newsletters, and video, broadcast and theatrical presentations of unlimited prints;
            <br /><br />
            f. online or electronic publications, including web pages, blogs, ebooks and videos, limited where to a maximum of 480,000 total pixels (for example: 600px x 800px) per Stock Media file where un-edited
            <br /><br />
            g. prints, posters (i.e. a hardcopy) and other reproductions for personal or promotional purposes, resale, license or other distribution;
            <br /><br />
            h. install and use the Stock Media in more than one location or post a copy of the Stock Media on a network server or web server for use solely by other users employed by or performing services for you;
            <br /><br />
            i. any other uses approved in writing by Berlin Stock Photos
            <br /><br />
            In the event that you create a derivative work based on or incorporating the Stock Media, all rights in and to such Stock Media shall continue to be owned by Berlin Stock Photos or its Contributor(s), subject to your rights to use such Stock Media pursuant to the terms and limitations set forth herein.
            <br /><br />
            All other rights in the Stock Media are expressly reserved by Berlin Stock Photos for itself and its Contributors.
            <br /><br />
            4. Prohibited Uses
            <br /><br />
            You may not do anything with the Stock Media that is not expressly permitted in the preceding section. For greater certainty, the following are “Prohibited Uses” and you may not:
            <br /><br />
            a. sub-license, re-sell, rent, lend, assign, gift or otherwise transfer or distribute the Stock Media or the rights granted under this License Agreement;
            <br /><br />
            b. use any of the Stock Media as part of a trade-mark, design-mark, trade-name, business name, service mark, or logo;
            <br /><br />
            c. use Stock Media identified as “Editorial Use Only”, for any commercial, promotional, endorsement, advertising or merchandising use. For clarification, in this Agreement “Editorial Use Only” of Stock Media means use relating to events that are newsworthy or of general interest and expressly excludes any advertorial sections (i.e. sections or supplements featuring brand and/or product names or sections or supplements in relation to which you receive a fee from a third-party advertiser or sponsor);
            <br /><br />
            d. remove any notice of copyright, trade-mark or other proprietary right from any place where it is on or embedded in the Stock Media;
            <br /><br />
            e. use the Stock Media in a fashion that is considered by Berlin Stock Photos or under applicable law to be infringing, defamatory or libelous in nature, or that would be reasonably likely to bring any person or property reflected in the Stock Media into disrepute;
            <br /><br />
            f. use the Stock Media in a way that places any person depicted in the Stock Media in a bad light or in a way that they may find offensive – this includes, but is not limited to, the use of images: a) in pornography, “adult videos” or the like; b) in ads for tobacco products; c) in ads or promotional materials for adult entertainment clubs or similar venues, or for escort, dating or similar services; d) in connection with political endorsements; e) in advertisements or promotional materials for pharmaceutical or healthcare, herbal or medical products, including, but not limited to dietary supplements, digestive aids, herbal supplements, personal hygiene or birth control products; and f) uses that are defamatory, or contain otherwise unlawful, offensive or immoral content. You may not use Stock Media containing the likeness of a person if such use implies that the model engages in any immoral or illegal activity or suffers from a physical or mental infirmity, ailment or condition;
            <br /><br />
            g. use Stock Media in a manner that competes with Berlin Stock Photos' business including, but not limited to, displaying Stock Media in any format (including thumbnails) for download or Export on a website or offering Stock Media for sale;
            <br /><br />
            h. use the Stock Media for editorial purposes without including the following credit adjacent to the Stock Media or in audio/visual production credits: "&copy;Jason Gillis-Grier" via berlinstockphotos.com";
            <br /><br />
            i. incorporate the Stock Media in any product that results in a re-distribution or re-use of the Stock Media or is otherwise made available in a manner such that a person can extract or access or reproduce the Stock Media as an electronic file;
            <br /><br />
            j. to the extent that source code is contained within the Stock Media, reverse engineer, decompile, or disassemble any part of such source code;
            <br /><br />
            k. use or display the Stock Media in an electronic format that enables it to be downloaded, Exported or distributed via mobile devices or shared in any peer-to-peer or similar file sharing arrangement; or
            <br /><br />
            l. use or display Stock Media in such a manner that gives the impression that the Stock Media were created by you or a person other than the copyright holder of the Stock Media.
            <br /><br />
            5. Disclaimers
            <br /><br />
            a. You acknowledge that no releases are generally obtained for any Stock Media that is identified as "Editorial Use Only" and that some jurisdictions provide legal protection against a person’s image, likeness or property being used for commercial purposes when they have not provided a release. For Stock Media identified as "Editorial Use Only", Berlin Stock Photos does not grant any right nor make any warranty with regard to the use of names, people, trademarks, trade dress, logos, registered designs or works of art or architecture depicted therein. In such cases, you shall be solely responsible for determining whether release(s) is/are required in connection with any proposed use of the Stock Media identified as "Editorial Use Only", and shall be responsible for obtaining such release(s).
            <br /><br />
            b. While we have made reasonable efforts to correctly categorize, keyword, caption and title the Stock Media, Berlin Stock Photos does not warrant the accuracy of such information and Berlin Stock Photos also does not warrant the accuracy of any metadata that may be provided with the Stock Media.
            <br /><br />
            6. Termination
            <br /><br />
            a. You can terminate this License Agreement by destroying the Stock Media, along with any copies or archives of it or accompanying materials (if applicable), and ceasing to use the Berlin Stock Photos Design for any purpose. Berlin Stock Photos can terminate this License Agreement without advance notice if at any time you fail to comply with any of its terms. Upon termination, you must immediately (i) cease using the Stock Media for any purpose; (ii) destroy or delete all copies and archives of the Stock Media or accompanying materials; and (iii) if requested, confirm to Berlin Stock Photos in writing that you have complied with these requirements.
            <br /><br />
            b. We reserve the right to revoke or amend the license granted by this Extended License Agreement and replace the Stock Media with an alternative for any reason.
            <br /><br />
            c. Upon notice from Canva, or upon your knowledge that any Stock Media is subject to a threatened, potential or actual claim of infringement of another’s right for which Berlin Stock Photos may be liable, you must immediately and at your own expense (i) stop using the Stock Media; (ii) delete or remove the Stock Media from your premises, computer systems and storage (electronic or physical); (iii) ensure that your clients, printers or ISPs do likewise; and (iv) let Berlin Stock Photos know.
          </p>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default LicenseAgreement
