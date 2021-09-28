import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from  'react-router-dom';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Loading from '../Loading';
import { images } from '../../static/images';
import ResultModal from '../Modal';

const ResultContainer = styled.div`
  display: flex;
  width: 100%;

  .result {
    flex: 1;
    margin: 2px;
    .result__img {
      width: 100%;
      height: 300px;
      object-fit: fill;
    }
  }
`;

function DemoImageModel() {
  const history = useHistory();
  const webcamRef = useRef(null);
  const labelRef = useRef(null);
  const parentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  
  let model, webcam, maxPredictions;
  const url = 'https://teachablemachine.withgoogle.com/models/lIyJhGMlg/';
  useEffect(() => {
    return async () => {
      console.log('Unmount');
      if (webcam) {
        await webcam.stop();
      }
    }
  }, []);

  async function init() {
    console.log('init');
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
    window.cancelAnimationFrame(predict);
  }

  async function loop() {
    if (!labelRef.current) {
      return;
    }
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  useEffect(() => {
  } , [])

  async function predict() {
    // predict can take in an image, video or canvas html element
    const a = [];
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      if (!labelRef.current) {
        return;
      }
      const classPrediction = `${prediction[i].className}:  ${prediction[i].probability.toFixed(2) * 100}%`
      // imageUrl: images[prediction[i].className],
      // precent: prediction[i].probability.toFixed(2) * 100
      a.push({
        imageUrl: images[prediction[i].className],
        name: prediction[i].className,
        percent: prediction[i].probability.toFixed(2) * 100})
      // labelRef.current.childNodes[i].innerHTML = 
      // `<div>
      //   <img src=${images[prediction[i].className]}/>
      //   <div>
      //     <span>${prediction[i].className}:  </span>
      //     <span>${prediction[i].probability.toFixed(2) * 100}%</span>
      //   </div>
      // </div>`
    }
    const r = a.sort(function(a, b) {
      return Number(b.percent) -  Number(a.percent);
    });
    setData(r);
  }

  const handleComplete = () => {
    setComplete(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const replay = () => {
    history.go(0);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div id="parent" ref={parentRef}>
        {!complete && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => init()}
            style={{ margin: '1rem 0' }}
            disabled={loading}
          >START</Button>
        )}
        {loading && <Loading />}
        {/* 실제 컨테츠 장소 */}
        <div ref={webcamRef} id="webcam-container"></div>
        <br />
        <div ref={labelRef} id="label-container"></div>
        <ResultContainer>
          {data.slice(0, 3).map((e,i ) => {
            return (
              <div className="result" key={e.name}>
                <img className="result__img" src={e.imageUrl}/>
                <div className="result__infomation">
                  <span>{e.name}: </span>
                  <span>{e.percent}%</span>
                </div>
              </div>
            )
          })}
        </ResultContainer>
      </div>
      {complete && <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        style={{ margin: '2rem 0' }}
        disabled={loading}
      >
        종료
      </Button>}
      {openModal && (
        <ResultModal
          result={data[0]}
          isOpen={openModal}
          handleModalClose={handleCloseModal}
          handleReplay={replay}
        />
      )}
    </div>
  );
}

export default DemoImageModel;
