import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from  'react-router-dom';
import Button from '@material-ui/core/Button';
import Loading from '../Loading';

function PoseModel({ url }) {
  const history = useHistory();
  const canvasRef = useRef(null);
  const labelRef = useRef(null);
  const parentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [buttonText, setButtonText] = useState("START");
  
  let model, webcam, ctx, maxPredictions;
  useEffect(() => {
    return () => {
      console.log('Unmount');
      webcam.stop();
      // console.log(webcam);
    }
  }, []);

  async function init(url) {
    setLoading(true);
    setComplete(true);
    try {
      const modelURL = url + "model.json";
      const metadataURL = url + "metadata.json";
  
      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // Note: the pose library adds a window.tmPose object to your window (window.window.tmPose)
      model = await window.tmPose.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();
  
      // Convenience function to setup a webcam
      const size = 400;
      const flip = true; // whether to flip the webcam
      webcam = new window.tmPose.Webcam(size, size, flip); // width, height, flip
      console.log(webcam);
      await webcam.setup(); // request access to the webcam
      await webcam.play();
      window.requestAnimationFrame(loop);
  
      // append/get elements to the DOM
      const canvas = canvasRef.current;
      canvas.width = size;
      canvas.height = size;
      ctx = canvas.getContext("2d");
  
      for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelRef.current.appendChild(document.createElement("div"));
      }
      setLoading(false);
    } catch(err) {
      setLoading(false);
      setComplete(false);
      window.alert(err);
      history.go(0);
    }
  }

  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
      if (!labelRef.current) {
        return;
      }
      const classPrediction = `${prediction[i].className}:  ${prediction[i].probability.toFixed(2) * 100}%`
      labelRef.current.childNodes[i].innerHTML = classPrediction;
    }

    // finally draw the poses
    drawPose(pose);
  }

  function drawPose(pose) {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
          const minPartConfidence = 0.5;
          window.tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
          window.tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }

  const handleComplete = () => {
    history.go(0);
  }
  
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
        <div style={{
          marginTop: '1rem',
        }}><canvas ref={canvasRef} id="canvas"></canvas></div>
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

export default PoseModel;
