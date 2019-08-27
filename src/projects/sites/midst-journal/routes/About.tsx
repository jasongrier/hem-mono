import React, { ReactElement } from 'react'

function About(): ReactElement {
  return (
    <div className="about-page">
      <section className="heroine heroine--normal">
        <h2>About</h2>
        <p>What if you could watch your favorite poet write?</p>
        <p>Midst is a new literary journal publishing poems in the form of interactive timelapses, giving readers and writers unprecedented access to the creative process.<br />
        Midst shows you the finished poem by default—just like any other magazine—but then allows you to hit play and “rewind” to find out exactly how it was written: blank page to final draft, and every edit in between.</p>
        <p>We’re also building custom <a href="http://www.midst.press/app">software</a> to make it happen!</p>
        <p>We’re currently looking for brave poets for our pilot, and writers of all stripes to test out our desktop app so we can perfect it for you. Want to get involved? <a href="http://www.midst.press/contact">Drop us a line.</a></p>
        <p>You can also <a href="http://www.midst.press/nominate">nominate</a> your favorite poet to contribute to the Midst journal.</p>
        <p>Lots more info over at our <a href="http://www.midst.press/faq">FAQ</a>.</p>
        <h2>Team</h2>
        <p>Founding Director: <a href="http://www.annelysegelman.com">Annelyse Gelman</a><br />
        Lead Software Engineer: Jason Grier<br />
        Advisor: Bret Anthony Johnston</p>
        <h2>Contact</h2>
        <p>Nominate a poet: <a href="http://www.midst.press/nominate">midst.press/nominate</a>.<br />
        Tech support: midsthq@gmail.com.<br />
        Other inquiries: annelysegelman at gmail.</p>
        <h2>Thank you!</h2>
        <p>Boots contributed early code. <a href="http://www.chloescheffe.github.io/">Chloe Scheffe</a> made our logo.<br />
        Thanks to Genesis, Erica and Amardeep Bains, Startup Lab + Josh, Gerald, Aaron, and Rajesh.</p>
      </section>
    </div>
  )
}

export default About
