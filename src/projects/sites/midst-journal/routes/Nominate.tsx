import React, { ReactElement } from 'react'

function Nominate(): ReactElement {
  return (
    <div className="nominate-form">
      <form action="https://docs.google.com/forms/d/e/1FAIpQLSei-hPO34f2fgPJ1-HWtsWa36CAKLB2TYPlfBUWUuErdnrqOQ/formResponse?embedded=true" target="_blank">
        <div className="form-block">
          {/* <p>
            Nominations for Issue 1 of Midst are open through Spring 2019. Dream big and let us know whose work you’re excited about!<br />
            We’re especially interested in working with poets who typically write on a computer already, but this isn’t a requirement.<br />
            You may nominate yourself.
          </p> */}
          <p>
            If you could get a peek into the writing process of <i>any</i> living poet, who would that poet be?
          </p>
        </div>

        <div className="form-block">
          <label htmlFor="emailAddress">Your email address <sup>*</sup></label>
          <input name="emailAddress" type="email" required />
        </div>

        <div className="form-block">
          <label htmlFor="entry.1094220916">Which poet do you want to nominate? <sup>*</sup></label>
          <input name="entry.1094220916" type="text" required />
        </div>

        <div className="form-block">
          <label htmlFor="entry.737165529">Why this poet? Anything else you want to tell us?</label>
          <textarea name="entry.737165529"></textarea>
        </div>

        <div className="form-block">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  )
}

export default Nominate
