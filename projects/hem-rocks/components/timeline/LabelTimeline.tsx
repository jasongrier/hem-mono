import React, { ReactElement, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import { assetHostHostname } from '../../functions'
import { RootState } from '../../index'

interface IProps {
  refresh: number
}

function LabelTimeline({ refresh }: IProps): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const el = useRef<null | HTMLDivElement>(null)

  useEffect(function setYearLinePositions() {
    setTimeout(() => {
      if (!el.current) return

      const $timelineContainer = $(el.current).hide()
      const $timelineNav = $('.label-timeline-year-links')

      $timelineContainer.html('')
      $timelineNav.html('')

      let previousYear: string = ''
      let previousOffset: number = 0

      $('.main-content-box').each(function() {
        const year = $(this).attr('class')
          ?.split('main-content-box-date-')[1]
          ?.split(/\s/)[0]
          ?.split('.')
          ?.pop()

        if (year && year !== previousYear) {
          const offset = $(this).offset()?.top

          previousYear = year

          // @ts-ignore
          if (offset - previousOffset < 100) {
            // @ts-ignore
            offset = offset + 100
          }

          // @ts-ignore
          previousOffset = offset

          $timelineContainer.append(`
            <div
              class="label-timeline-tick"
              id="label-timeline-tick-${year}"
              style="top: ${
                // @ts-ignore
                offset - 500
                // year === '2020' ? 50 : offset - 500
              }px"
            >
              ${(year === '2020' || year === '2017' || year === '2014' || year === '2013' || year === '2012' || year === '2011' || year === '2009' || year === '2008' || year === '2007')
                ?
                  (`<img
                    alt="HEM logo from ${year}"
                    src="${assetHost}/hem.rocks/site/timeline-logos/HEM_logo_${year}.jpg"
                  />`)
                :
                  ''
              }
              <span className="label-timeline-tick-label">${year}</span>
            </div>
          `)

          $timelineNav.append(`
            <a href="#label-timeline-tick-${year}">${year}</a>
          `)
        }
      })

      $timelineContainer.show()
    })
  }, [allContentItems.length, refresh])

  const assetHost = assetHostHostname()

  return (
    <div className="label-timeline">
      <div className="label-timeline-year-nav clearfix" hidden>
        <strong>Jump to year: </strong>
        <span className="label-timeline-year-links" />
      </div>
      <div
        className="label-timeline-ticks"
        ref={el}
      >
      </div>
    </div>
  )
}

export default LabelTimeline
