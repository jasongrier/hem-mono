import React, { useState, SyntheticEvent } from 'react'
import './style.css'

const lines = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Aliquam sit amet nisi varius, facilisis diam nec, porta lorem. ',
  'Quisque imperdiet nibh vestibulum libero ultrices convallis',
  'Vivamus aliquet, mauris at consequat sodales, dolor erat tincidunt urna, eu rhoncus magna tellus a enim',
  'Mauris metus purus, venenatis at quam malesuada, pretium semper lacus',
  'Proin commodo nulla sed massa bibendum viverra',
  'Quisque finibus elementum mattis',
  'Integer rhoncus magna id augue rutrum posuere.',
  'Mauris sodales mi tempor, pellentesque mi et, ultrices purus',
  'Maecenas ut imperdiet turpis, non cursus augue',
  'Vivamus facilisis diam nec pretium consequat',
  'Sed diam elit, ornare id enim vitae, pretium tincidunt eros',
  'Fusce vitae sem rutrum, pharetra lacus in, semper eros',
  'Proin nec convallis nisl, molestie hendrerit arcu',
  'Aenean tincidunt felis nec lectus malesuada porttitor',
  'Vivamus sodales lacus nisi.',
  'In ac magna ornare, iaculis lectus eu, mollis massa',
  'Proin id eros purus',
  'Sed non sem lacinia, lobortis tellus eget, sagittis urna',
  'In hac habitasse platea dictumst',
  'Vestibulum dignissim, odio in scelerisque commodo, ante sem commodo sapien, sit amet egestas sapien nibh eget turpis',
  'Quisque placerat rutrum neque, sit amet tincidunt metus rutrum et',
  'Nunc porttitor ex quis accumsan laoreet',
  'Nunc in nulla turpis',
  'Donec justo turpis, varius id commodo non, scelerisque quis libero',
  'Aliquam tincidunt, libero a congue maximus, ex ante posuere lectus, in vulputate ex nulla non mauris',
  'Suspendisse eu posuere velit, sit amet finibus elit',
  'Nullam eu dapibus tellus, in rhoncus augue.',
]

function filterLines(searchText: string) {
  const filteredLines = []
  for (const line of lines) {
    if (line.includes(searchText)) {
      filteredLines.push(line)
    }
  }
  return filteredLines
}

function Equus() {
  const [searchText, setSearchText] = useState('')
  const [filteredLines, setFilteredLines] = useState([] as string[])

  function onSearchTextChanged(evt: SyntheticEvent<HTMLInputElement>) {
    setSearchText(evt.currentTarget.value)
    setFilteredLines(filterLines(searchText))
  }

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={onSearchTextChanged}
      />
      <ul>
        {filteredLines.map((line: string) => (
          <li>{line}</li>
        ))}
      </ul>
    </div>
  )
}

export default Equus
