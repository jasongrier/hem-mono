import React, { ReactElement } from 'react'
import { Arrangement, Clip, Section } from '../../components/arrangement'

function DemoArrangements(): ReactElement {
  return (
    <div className="page page--demo-arrangements">
      {/* <Arrangement>
        <Section>
          <h1>Lorem Ipsum</h1>
          <Clip src="lol.mp3">
            <h1>Lorem Ipsum</h1>
            <Description locale="en_GB">
              <p>Lorem Ipsum dolor sit amet</p>
            </Description>
            <Description locale="de_DE">
              <p>Lorem Ipsum dolor sit amet</p>
            </Description>
            <Tags>Foo, Bar, Baz</Tags>
          </Clip>
          <Clip src="wtf.mp3" />
          <Clip src="asap.mp3" />
        </Section>
      </Arrangement> */}
    </div>
  )
}

export default DemoArrangements
