import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

function ResultModal({ result, isOpen, handleModalClose, handleReplay }) {
  let subtitle;


  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#101';
  }


  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={handleModalClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{`축하합니다. 당신은 ${result.name} 입니다`}</h2>
        <img src={result.imageUrl} />
        <hr/>
        <Button
          onClick={handleReplay}
          variant="contained"
          color="primary"
        >
          다시하기
        </Button>
      </Modal>
    </div>
  );
}

export default ResultModal;