var Roundware = require('roundware-web-framework/dist/roundware'); 

const roundwareServerUrl = 'http://localhost:8888/api/2'; 
const roundwareProjectId = 25; 

const roundware = new Roundware(window, { 
    serverUrl: roundwareServerUrl, 
    projectId: roundwareProjectId,  
}); 

console.log(roundware);
function ready() {
    console.info("Connected to Roundware Server. Ready to play.");
    // this is a good place to initialize audio player controls, etc.
  }

  // Generally we throw user-friendly messages and log a more technical message
  function handleError(userErrMsg) {
    console.error("Roundware Error: " + userErrMsg);
  }

 roundware.connect().
   then(ready).
   catch(handleError);

 function startListening(streamURL) {
   console.info("Loading " + streamURL);
   // good place to connect your audio player to the audio stream
 }

 roundware.play(startListening).catch(handleError);
