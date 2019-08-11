import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import { IS_DEV } from '.';

const reactotron = IS_DEV
  ? Reactotron
    .configure({
      name: "Let's find the cat!",
      host: window.location.hostname,
    })
    .use(reactotronRedux())
    .use(sagaPlugin())
    .connect()
  : null;

if (IS_DEV) reactotron.clear();

export default reactotron;
