import React, { ReactElement } from 'react'
import CampaignMonitorForm from '../components/CampaignMonitorForm'

function Home(): ReactElement {
  return (
    <div className="home-page">
      <section className="heroine">
        <p style={{ paddingTop: '20px' }}>
          What if you could watch your favorite poet write?
        </p>
        <p style={{ color: 'darkred', paddingTop: '20px' }}>
          Let’s find out.
        </p>
        <p style={{ paddingTop: '10px' }} />

        <CampaignMonitorForm
          labelForName="Name:"
          labelForEmail="Email address:"
          submitButtonText="Sign up!"
        />
      </section>
    </div>
  )
}

export default Home
