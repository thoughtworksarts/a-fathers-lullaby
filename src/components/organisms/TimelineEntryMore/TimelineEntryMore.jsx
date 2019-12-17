import React, { useEffect, useState } from 'react'
import './TimelineEntryMore.css'
import { Button } from 'atoms'
import { useParams } from 'react-router-dom'
import * as TimelineDescriptions from '../../atoms/TimelineDescriptions/TimelineDescriptions.jsx'

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
      <p>{currTimelineEntry.full_desc}</p>
    </div>
  )

  return (
    <div className='TimelineEntryMorePage'>
      <div className='intro'>
        <h1>There are <span className='highlight'>2.7 million children</span> with a parent in prison or jail. 92% of parents <span className='highlight'>in prison are fathers.</span></h1>
        <Button to='/share'>Participate</Button>
        <h2>Personal stories have transformative power and create profound encounters. A Father's Lullaby invites you to become part of a growing movement.</h2>
      </div>
      {
        currTimelineEntry
          ? expandedEntry
          : <div />
      }
    </div>
  )
}

export default TimelineEntryMore
