import React, { ReactElement } from 'react'

interface ITopic {
  title: string
  body: string
}

interface IProps {
  footer: string
  styles: string
  subHeading: string
  title: string
  topics: ITopic[]
  type: 'text' | 'html'
}

function Newsletter({
  footer,
  styles,
  subHeading,
  title,
  topics,
  type,
 }: IProps): ReactElement {
  function dividingLine() {
    return new Array(79).fill('_').join('')
  }

  switch (type) {
    case 'html':
      return (
        <div className="newsletter">
          <style>{styles}</style>
          <h1>{title}</h1>
          <h2>{subHeading}</h2>
          {topics.map(({title, body}) => (
            <div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      )

    case 'text':
      return (
        <>
          <>{`${title}
            ${subHeading}
            ${dividingLine()}

          `}</>
          <>{topics.map(topic => {
              return (
                `${topic.title}
                ${topic.body}
                ${dividingLine()}

              `)
            })}
          </>
          <>{footer}</>
        </>
      )
  }
}

Newsletter