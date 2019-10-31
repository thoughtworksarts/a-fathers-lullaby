import React, { useState, useEffect } from 'react'
import Asset from './Asset/Asset'
import Table from 'react-bootstrap/Table'
import './Assets.css'
import ReactAudioPlayer from 'react-audio-player'
import numberIcon from './hashtag-solid.svg'
import clockIcon from './clock-regular.svg'


const Assets = () => {
  const [assets, setAssets] = useState([])
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentFilename, setCurrentFilename] = useState('')

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ASSETS_URL}`, {
      headers: {
        'authorization': `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(assets => setAssets(assets.sort((a, b) => (a.created < b.created) ? 1 : -1)))
      .catch(err => console.log(err))
  }, [])

  const clickHandler = (title, filename) => {
    setCurrentTitle(title)
    setCurrentFilename(filename)
  }

  // TODO: Change to asset id if it's possible to update the current ids to start at 1
  let listNumber = 0

  return (
    <div className="Assets">
      {
        assets.length > 0
          ? <React.Fragment>
              <div className="audio-player">
                <p className="current-title">{currentTitle}</p>
                <ReactAudioPlayer
                  src={process.env.REACT_APP_ROUNDWARE_PROD + currentFilename}
                  controls
                  autoPlay
                />
              </div>
              <Table hover>
                <thead>
                  <tr>
                    <th><img src={numberIcon} className="number-icon" alt="number icon" /></th>
                    <th>Title</th>
                    <th>Location</th>
                    <th><img src={clockIcon} className="clock-icon" alt="clock icon" /></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    assets.map(asset => {
                      listNumber += 1
                      return <Asset key={asset.id} asset={asset} listNumber={listNumber} clickHandler={clickHandler} />
                    })
                  }
                </tbody>
              </Table>
            </React.Fragment>
          : <h1 className="loading">Loading...</h1>
      }
    </div>
  )
}

export default Assets
