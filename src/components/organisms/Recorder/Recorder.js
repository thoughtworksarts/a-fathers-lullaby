import React, { useState, useEffect } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'
import Wavesurfer from 'wavesurfer.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js'
import recImg from '../../../assets/record.png'
import stopImg from '../../../assets/stop.png'
import playImg from '../../../assets/play.png'
import './Recorder.css'

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  // const [buttonImgRow, setButtonImgRow] = useState(recImg)
  const [wavesurferInput, setWavesurferInput] = useState()
  const [Mp3Recorder] = useState(new MicRecorder({ bitRate: 128 }))

  useEffect(() => {
    
  }, [isRecording, blobURL])

  useEffect(() => {
    if(!Mp3Recorder.activeStream)
        displayLiveAudio()
  }, [Mp3Recorder])
  
  const setCurrentButtonRow = () => {
    let currentButtonRow
    if (!isRecording && !blobURL) {
      currentButtonRow =
        <div className='row'>
          {/* record button */}
          <img
          className='mainSpeakingButton' src={recImg} alt='Record Button' onClick={() => {
            console.log("we should be recording")
            start()
            setIsRecording(!isRecording)
          }}
          />
        </div>
    } 
    else if (isRecording && !blobURL){
      currentButtonRow =
        <div className='row'>
          {/* stop button */}
          <img
          className='mainSpeakingButton' src={stopImg} alt='Stop Button' onClick={() => {
            stop()
            setIsRecording(!isRecording)
          }}
          />
        </div>
    }
    else {
      currentButtonRow =
        <div className='row'>
          {/* rerecord button */}
          {/* play button */}
          <img
          className='mainSpeakingButton' src={playImg} alt='Play Button' onClick={() => {
  
          }}
          />
          {/* upload button */}
        </div>
    }
    return currentButtonRow
  }
  
  /* MP3 Recodring Functionality */

  /**
   * 
   */
  const start = () => {
      Mp3Recorder
        .start()
        .then(() => {
          wavesurferInput.microphone.on('deviceReady', function (stream) {
            console.log('Device ready!', stream)
          })
          wavesurferInput.microphone.on('deviceError', function (code) {
            console.warn('Device error: ' + code)
          })
          wavesurferInput.microphone.start()
        })
        .catch((e) => console.error(e))
        
  }

  /**
   * 
   */
  const stop = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        setBlobURL(blobURL)
        displayRecordedAudio(blobURL)
      })
      .then(() => wavesurferInput.microphone.stopDevice() )
      .catch((e) => console.log(e))
  }

  /* Wavesurfer audio display functionality */

  /**
   * This function displays audio
   */
  const displayLiveAudio = () => {
    console.log('display live audio')
    const container = document.getElementById('inputmeter')
    const inputMeterElement = container.querySelectorAll('wave')
    if (!inputMeterElement.length) {
      setWavesurferInput(Wavesurfer.create({
        container: '#inputmeter',
        waveColor: 'red',
        height: 128,
        barWidth: 2,
        barHeight: 1.2,
        cursorWidth: 0,
        plugins: [
          MicrophonePlugin.create()
        ]
      }))
    }
  }

  /**
   * 
   * @param {*} blob 
   */
  const displayRecordedAudio = (blob) => {
    const container = document.getElementById('waveform')
    const waveElement = container.querySelectorAll('wave')
    if (!waveElement.length) {
      const wavesurfer = Wavesurfer.create({
        container: '#waveform',
        waveColor: 'red',
        progressColor: 'purple',
        height: 128,
        barWidth: 2,
        barHeight: 1.2
      })
      wavesurfer.load(blob)
      wavesurfer.on('ready', function () {
        console.log('wavesurfer ready to display waveform')
      })
    }
  }

  return (

    <div className = "row">
    
      {setCurrentButtonRow()}
      { /*
        (blobURL != null) ? <div id='waveform' /> : <div id='inputmeter' />
        */
      }
      <div id='inputmeter' className = "row"/>
      <div id='waveform' className = "row"/> 
      {displayLiveAudio()}
      
    </div>

  )
}

export default Recorder
