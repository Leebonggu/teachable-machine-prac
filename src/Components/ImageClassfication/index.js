/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Container from '../../Common/Container';

import useInput from '../../hooks/useInput'
import Model from './ImageClassificationModel'


function index() {
  const [url, handleUrl, setUrl] = useInput('');
  const [complete, setComplete] = useState(false);
  const handleSubmit = useCallback((e) => {
    setComplete(prev => !prev);
  }, []);

  const reSubmit = useCallback((e) => {
    setComplete(prev => !prev);
    setUrl('');
  }, []);

  return (
    <Container>
      <Typography variant="h5" >
        이미지 분류모델 URL을 입력해주세요
      </Typography>
      <TextField
        id="outlined-textarea"
        value={url}
        onChange={handleUrl}
        label="Model url"
        type="url"
        fullWidth
        multiline
        required
      />
      {!complete && (
        <Button
          style={{ margin: '1rem 0' }}
          variant="contained"
          onClick={handleSubmit}
          color="secondary"
          disabled={url.length ? false : true}
        >
          제출
        </Button>
      )}
      {complete && <Model url={url} reSubmit={reSubmit}/>}
    </Container>
  );
}

export default index;

