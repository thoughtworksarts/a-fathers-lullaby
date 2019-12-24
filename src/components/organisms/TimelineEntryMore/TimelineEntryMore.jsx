import React, { useEffect, useState } from 'react'
import { Intro } from 'molecules'
import { useParams } from 'react-router-dom'
import * as TimelineDescriptions from 'atoms/TimelineDescriptions/TimelineDescriptions.jsx'
import './TimelineEntryMore.css'

const TimelineEntryMore = () => {
  const { id } = useParams()
  const [currTimelineEntry, setCurrTimelineEntry] = useState({})

  useEffect(() => {
    if (id === '1') {
      setCurrTimelineEntry(TimelineDescriptions.timelineEntry1)
    } else if (id === '2') {
      setCurrTimelineEntry(TimelineDescriptions.timelineEntry2)
    } else if (id === '3') {
      setCurrTimelineEntry(TimelineDescriptions.timelineEntry3)
    }
  }, [id, currTimelineEntry])

  const expandedEntry = (
    <div className='ExpandedEntry'>
      <img alt={currTimelineEntry.alt_text} src={currTimelineEntry.img} />
      <p className='EntryYear'>{currTimelineEntry.year}</p>
      <div>{currTimelineEntry.full_desc}</div>
    </div>
  )

  return (
    <div className='TimelineEntryMorePage'>
      <Intro />
      {
        currTimelineEntry
          ? expandedEntry
          : <div />
      }
    </div>
  )
}

export default TimelineEntryMore
