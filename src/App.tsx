import { Provider } from 'react-redux';
import { ReactElement } from 'react';
import AppRouter from './routes/AppRouter';
import reduxStore from './redux/index';
import Socket from './components/common/Socket';
import Notification from './components/common/Notification';

function App(): ReactElement {
    return (
      <Provider store={reduxStore}>
        <AppRouter/>
        <Notification/>
        <Socket/>
      </Provider>
    );
}

export default App;
