import React, { useState, useEffect } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'

const Recorder = () => {
    const [isRecording, setIsRecording] = useState(false)
    const [blobURL, setBlobURL] = useState('')
    const [isBlocked, setIsBlocked] = useState(false)

    useEffect(() => {
        /*This might need to get wrapped in an if statment depending on behavior*/
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(function(stream) {
        /* use the stream */
            console.log('Permission Granted');
            //Set state to is blocked to false
        })
        .catch(function(err) {
         /* handle the error */
            console.log('Permission Denied');
            //Set state to is blocked to true
        });
    })

   
    const Mp3Recorder = new MicRecorder({ bitRate: 128 });

    return (
        <div>
            Recorder will go here
        </div>
      )
}

export default Recorder;