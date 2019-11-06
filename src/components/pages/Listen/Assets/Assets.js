import React, { useState, useEffect } from 'react'
import Asset from './Asset/Asset'
import Table from 'react-bootstrap/Table'
import ReactAudioPlayer from 'react-audio-player'
import numberIcon from './hashtag-solid.svg'
import clockIcon from './clock-regular.svg'
import './Assets.css'
import './Asset/Asset.css'

const Assets = () => {
  const [assets, setAssets] = useState([])
  const [currentStoryIndex, setCurrentStoryIndex] = useState('')
  const [currentTitle, setCurrentTitle] = useState('')
  const [currentFilename, setCurrentFilename] = useState('')

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CORS_ANYWHERE}/${process.env.REACT_APP_ASSETS_URL}`, {
      headers: {
        authorization: `token ${process.env.REACT_APP_ROUNDWARE_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(assets => setAssets(assets.sort((a, b) => (a.created < b.created) ? 1 : -1)))
      .catch(err => console.log(err))
  }, [])

  function removePlayingClassFromAssets () {
    const assetArray = document.getElementsByClassName('Asset')
    for (let i = 0; i < assetArray.length; i++) {
      assetArray[i].classList.remove('playing')
    }
    return assetArray
  }

  function addPlayingClassToAsset (assetArray, index) {
    const curAsset = assetArray[index]
    curAsset.classList.add('playing')
  }

  const clickHandler = (index, title, filename) => {
    const assetArray = removePlayingClassFromAssets()

    setCurrentStoryIndex(index)
    setCurrentTitle(title)
    setCurrentFilename(filename)

    addPlayingClassToAsset(assetArray, index)
  }

  // TODO: Change to asset id if it's possible to update the current ids to start at 1
  let listNumber = 0

  const endHandler = () => {
    const nextStoryIndex = currentStoryIndex + 1

    if (nextStoryIndex === assets.length) {
      return null
    } else {
      setCurrentStoryIndex(nextStoryIndex)
      setCurrentTitle('Story ' + assets[nextStoryIndex].id)
      setCurrentFilename(assets[nextStoryIndex].filename)

      const assetArray = removePlayingClassFromAssets()

      addPlayingClassToAsset(assetArray, nextStoryIndex)
    }
  }

  const assetsTable = (
    <div>
      <div className='audio-player'>
        <p className='current-title'>{currentTitle}</p>
        <ReactAudioPlayer
          src={process.env.REACT_APP_ROUNDWARE_PROD + currentFilename}
          controls
          autoPlay
          onEnded={endHandler}
        />
      </div>
      <Table hover>
        <thead>
          <tr>
            <th><img src={numberIcon} className='number-icon' alt='number icon' /></th>
            <th>Title</th>
            <th>Location</th>
            <th><img src={clockIcon} className='clock-icon' alt='clock icon' /></th>
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
    </div>
  )

  return (
    <div className='Assets'>
      {
        assets.length > 0
          ? assetsTable
          : <h1 className='loading'>Loading...</h1>
      }
    </div>
  )
}

export default Assets
