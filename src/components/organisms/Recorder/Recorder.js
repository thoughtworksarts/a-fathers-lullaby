import React, { useState, useEffect } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'
import Wavesurfer from 'wavesurfer.js'
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js'
import recImg from '../../../assets/record.png'
import stopImg from '../../../assets/stop.png'
import playImg from '../../../assets/play.png'
import rerecordImg from '../../../assets/re-record.png'
import uploadImg from '../../../assets/upload.png'
import './Recorder.css'

const Recorder = (props) => {
  const [isRecording, setIsRecording] = useState(false)
  const [blobURL, setBlobURL] = useState('')
  const [mp3file, setMp3file] = useState('')
  const [wavesurferInputMeter, setWavesurferInputMeter] = useState()
  const [waveSurferRecordedAudio, setWaveSurferRecordedAudio] = useState()
  const [Mp3Recorder] = useState(new MicRecorder({ bitRate: 128 }))

  useEffect(() => {
    if (!isRecording) { displayLiveAudio() }
  })

  const setCurrentButtonRow = () => {
    let currentButtonRow
    if (!isRecording && !blobURL) {
      currentButtonRow =
        <div className='row d-flex justify-content-around'>
          {/* record button */}
          <img
            className='mainSpeakingButton' src={recImg} alt='Record Button' onClick={() => {
              start()
              setIsRecording(true)
            }}
          />
        </div>
    } else if (isRecording && !blobURL) {
      currentButtonRow =
        <div className='row d-flex justify-content-around'>
          {/* stop button */}
          <img
            className='mainSpeakingButton' src={stopImg} alt='Stop Button' onClick={() => {
              stop()
              setIsRecording(false)
            }}
          />
        </div>
    } else {
      currentButtonRow =
        <div className='row d-flex justify-content-around'>
          {/* rerecord button */}
          <img
            className='mainSpeakingButton' src={rerecordImg} alt='Rerecord Button' onClick={() => {
              resetRecording()
              if (waveSurferRecordedAudio.isPlaying()) { waveSurferRecordedAudio.stop() }
            }}
          />
          {/* play button */}
          <img
            id='playPauseButton'
            className='mainSpeakingButton' src={playImg} alt='Play/Pause Button' onClick={() => {
              waveSurferRecordedAudio.playPause()
              const playPauseButton = document.getElementById('playPauseButton')
              playPauseButton.src = waveSurferRecordedAudio.isPlaying() ? stopImg : playImg
            }}
          />
          {/* upload button */}
          <img
            className='mainSpeakingButton' src={uploadImg} alt='Upload Button' onClick={() => {
              props.parentCallback(mp3file)
            }}
          />
        </div>
    }
    return currentButtonRow
  }

  /* MP3 Recording Functionality */

  /**
   *
   */
  const start = () => {
    Mp3Recorder
      .start()
      .then(() => {
        wavesurferInputMeter.microphone.on('deviceReady', function (stream) {
          console.log('Device ready!', stream)
        })
        wavesurferInputMeter.microphone.on('deviceError', function (code) {
          console.warn('Device error: ' + code)
        })
        wavesurferInputMeter.microphone.start()
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
        setMp3file(blob)
        displayRecordedAudio(blobURL)
      })
      .then(() => wavesurferInputMeter.microphone.stopDevice())
      .catch((e) => console.log(e))
  }

  /* Wavesurfer audio display functionality */

  /**
   * This function displays audio
   */
  const displayLiveAudio = () => {
    const container = document.getElementById('inputmeter')
    const inputMeterElement = container.querySelectorAll('wave')
    if (!inputMeterElement.length) {
      setWavesurferInputMeter(Wavesurfer.create({
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

    const inputMeterContainer = document.getElementById('inputmeter')
    inputMeterContainer.style.display = 'none'

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
        console.log('Wavesurfer ready to display waveform')
      })

      setWaveSurferRecordedAudio(wavesurfer)
    }
  }

  /**
   * Remove our wave elements from the DOM so we can
   * rerecord.
   */
  const resetRecording = () => {
    const inputMeterContainer = document.getElementById('inputmeter')
    const inputMeterElement = inputMeterContainer.querySelectorAll('wave')

    inputMeterContainer.removeChild(inputMeterElement[0])
    inputMeterContainer.style.display = 'block'
    const waveContainer = document.getElementById('waveform')
    const waveElement = waveContainer.querySelectorAll('wave')

    waveContainer.removeChild(waveElement[0])
    setBlobURL('')
  }

  return (
    <div className='recorder-container'>
      <div className='InstructionBold'>Create your Entry.</div>
      <div className='Instruction'>You can record your voice now.</div>
      {setCurrentButtonRow()}
      <div id='inputmeter' />
      <div id='waveform' />
    </div>
  )
}

export default Recorder
