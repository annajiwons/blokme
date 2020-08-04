// 3rd Party
import React from 'react';

// Components
import Main from './components/Main/';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

// Other
import './App.css';
import { rootReducer } from './store/reducers';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
