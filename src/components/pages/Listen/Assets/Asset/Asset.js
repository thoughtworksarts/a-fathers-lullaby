import React from 'react'

const Asset = props => {
  const minutes = Math.floor(props.asset.audio_length_in_seconds / 60)
  const seconds = Math.trunc(props.asset.audio_length_in_seconds - (minutes * 60))
  const title = 'Story ' + props.asset.id
  const filename = props.asset.filename

  return (
    <tr className="Asset" onClick={() => props.clickHandler(title, filename)}>
      <td width='10%'>{props.listNumber}</td>
      <td width='10%'>Story {props.asset.id}</td>
      {/* TODO: Change location to reflect asset latitude and longitude with a geocoding API */}
      <td width='10%'>Boston, MA</td>
      <td width='10%'>{minutes}:{seconds < 10 ? '0' + seconds : seconds}</td>
    </tr>
  )
}

export default Asset
