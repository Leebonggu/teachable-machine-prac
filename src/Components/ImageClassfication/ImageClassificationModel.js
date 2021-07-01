import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from  'react-router-dom';
import Button from '@material-ui/core/Button';
import Loading from '../Loading';

function ImageModel({ url }) {
  const history = useHistory();
  const webcamRef = useRef(null);
  const labelRef = useRef(null);
  const parentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [buttonText, setButtonText] = useState("START");
  
  let model, webcam, maxPredictions;
  useEffect(() => {
    return () => {
      console.log('Unmount');
      webcam.stop();
    }
  }, []);

  async function init(url) {
    setLoading(true);
    setComplete(true);
    const modelURL = url + "model.json";
    const metadataURL = url + "metadata.json";
    const flip = true;

    model = await window.tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    webcam = new window.tmImage.Webcam(400, 400, flip)
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    webcamRef.current.appendChild(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) { // and class labels
      labelRef.current.appendChild(document.createElement("div"));
    }
    setLoading(false);
  }

  async function loop() {
    if (!labelRef.current) {
      return;
    }
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      if (!labelRef.current) {
        return;
      }
      const classPrediction = `${prediction[i].className}:  ${prediction[i].probability.toFixed(2) * 100}%`
      labelRef.current.childNodes[i].innerHTML = classPrediction;
    }
  }

  const handleComplete = () => {
    history.go(0);
  };
  
  return (
    <div>
      <div id="parent" ref={parentRef}>
        {!complete && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => init(url)}
            style={{ margin: '1rem 0' }}
            disabled={loading}
          >{buttonText}</Button>
        )}
        {/* 제출 후 잠시 로딩표시 */}
        {loading && <Loading/>}
        {/* 실제 컨테츠 장소 */}
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

export default ImageModel;
