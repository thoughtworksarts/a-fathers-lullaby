import React, { useState, useEffect } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'
import Wavesurfer from 'wavesurfer.js'
import recImg from '../../../assets/record.png'
import stopImg from '../../../assets/stop.png'
import playImg from '../../../assets/play.png'
import './Recorder.css'

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  const [isBlocked, setIsBlocked] = useState(false)
  const [buttonImg, setButtonImg] = useState(recImg)

  useEffect(() => {
    /* This might need to get wrapped in an if statment depending on behavior */
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(function (stream) {
        /* use the stream */
        console.log('Permission Granted')
        // Set state to is blocked to
      })
      .catch(function (err) {
        /* handle the error */
        if (err) console.log(err.stack)
        console.log('Permission Denied')
        // Set state to is blocked to true
        setIsBlocked(true)
      })

    if (blobURL !== '' && !isRecording) {
      display()
    }

    changeImgFunc()
  })

  const changeImgFunc = () => {
    if (!isRecording && blobURL === '') {
      setButtonImg(recImg)
    } else if (isRecording) {
      setButtonImg(stopImg)
      start()
    } else {
      setButtonImg(playImg)
    }
  }

  const Mp3Recorder = new MicRecorder({ bitRate: 128 })

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied')
    } else {
      Mp3Recorder
        .start()
        .catch((e) => console.error(e))
    }
  }

  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        setBlobURL(blobURL)
      }).catch((e) => console.log(e))
  }

  const display = () => {
    const waveElement = document.getElementsByTagName('wave')
    if (!waveElement.length) {
      const wavesurfer = Wavesurfer.create({
        container: '#waveform',
        waveColor: 'red',
        progressColor: 'purple',
        barWidth: 2
      })
      wavesurfer.load(blobURL)
      wavesurfer.on('ready', function () {
        console.log('wavesurfer ready to display waveform')
      })
    }
  }

  return (

    <div>

      <img
        className='mainSpeakingButton' src={buttonImg} alt='Record Button' onClick={() => {
          if (isRecording) stop()
          setIsRecording(!isRecording)
        }}
      />
      <div id='waveform'> </div>
    </div>

  )
}

export default Recorder
