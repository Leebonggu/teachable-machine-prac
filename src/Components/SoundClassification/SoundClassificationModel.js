import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from  'react-router-dom';
import Button from '@material-ui/core/Button';
import Loading from '../Loading';

function SoundModel({ url }) {
  const history = useHistory();
  const webcamRef = useRef(null);
  const labelRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [buttonText, _] = useState("START");
  
  useEffect(() => {
    return () => {
      console.log('Unmount');
    }
  }, []);

  async function createModel(url) {
      const checkpointURL = url + "model.json"; // model topology
      const metadataURL = url + "metadata.json"; // model metadata

      const recognizer = window.speechCommands.create(
          "BROWSER_FFT", // fourier transform type, not useful to change
          undefined, // speech commands vocabulary feature, not useful for your models
          checkpointURL,
          metadataURL);

      // check that model and metadata are loaded via HTTPS requests.
      await recognizer.ensureModelLoaded();

      return recognizer;
  }

  async function init() {
    setLoading(true);
    setComplete(true);
  
    const recognizer = await createModel(url);
    const classLabels = recognizer.wordLabels(); // get class labels
    for (let i = 0; i < classLabels.length; i++) {
        labelRef.current.appendChild(document.createElement("div"));
    }

    // listen() takes two arguments:
    // 1. A callback function that is invoked anytime a word is recognized.
    // 2. A configuration object with adjustable fields
    recognizer.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class
        for (let i = 0; i < classLabels.length; i++) {
          if(!labelRef.current) {
            return;
          }
          const classPrediction = classLabels[i] + ": " + result.scores[i].toFixed(2);
          labelRef.current.childNodes[i].innerHTML = classPrediction;
        }
    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });
    // Stop the recognition in 5 seconds.
    // setTimeout(() => recognizer.stopListening(), 5000);
    setLoading(false);
  }

  const handleComplete = () => {
    history.go(0);
  }
  
  return (
    <div>
      <div id="parent">
        {!complete && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => init(url)}
            style={{ margin: '1rem 0' }}
            disabled={loading}
          >{buttonText}</Button>
        )}
        {loading && <Loading/>}
        <div ref={webcamRef} id="webcam-container"></div>
        <br />
        <div ref={labelRef} id="label-container"></div>
      </div>
      {complete && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleComplete}
          style={{ margin: '2rem 0' }}
          disabled={loading}
        >다시하기</Button>
      )}
    </div>
  )
}

export default SoundModel;
