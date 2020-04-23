import React, { ReactElement, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import { RootState } from '../../index'

function LabelTimeline(): ReactElement {
  const { allContentItems } = useSelector((state: RootState) => ({
    allContentItems: state.content.contentItems,
  }))

  const el = useRef<null | HTMLDivElement>(null)

  useEffect(function setYearLinePositions() {
    setTimeout(() => {
      if (!el.current) return

      const $timelineContainer = $(el.current).hide()

      let previousYear: string = ''

      $('.main-content-box').each(function() {
        const year = $(this).attr('class')
          ?.split('main-content-box-date-')[1]
          ?.split(/\s/)[0]
          ?.split('.')
          ?.pop()

        if (year && year !== previousYear) {
          previousYear = year

          // @ts-ignore
          console.log($(this).offset()?.top - 300)

          $timelineContainer.append(`
            <div
              class="label-timeline-tick"
              id="label-timeline-tick-${year}"
              style="top: ${
                // @ts-ignore
                year === '2020' ? '0' : $(this).offset()?.top - 500
              }px"
            >
              <!-- <img
                alt="HEM logo from ${year}"
                src="http://static.hem.rocks/site/timeline-logos/HEM_logo_${year}.jpg"
              /> -->
              <span className="label-timeline-tick-label">${year}</span>
            </div>
          `)
        }
      })

      $timelineContainer.show()
    })
  }, [allContentItems.length])

  return (
    <div
      className="label-timeline"
      ref={el}
    />
  )
}

export default LabelTimeline
