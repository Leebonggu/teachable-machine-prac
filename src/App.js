import { BrowserRouter as Rotuer, Route } from 'react-router-dom';
import Layout from './Layout';
import ImageClassfication from './Components/ImageClassfication';
import SoundClassification from './Components/SoundClassification';
import PoseClassfication from './Components/PoseClassfication';
import Demo from './Components/Demo';
import About from './Components/About';
import Main from './Components/Main';

function App() {
  return (
    <Rotuer>
      <Layout>
        <Route exact path='/image-classfication'>
          <ImageClassfication />
        </Route>
        <Route exact path='/sound-classfication'>
          <SoundClassification />
        </Route>
        <Route exact path='/pose-classfication'>
          <PoseClassfication />
        </Route>
        <Route exact path='/demo'>
          <Demo />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/'>
          <Main />
        </Route>
      </Layout>
    </Rotuer>
  );
}

export default App;
