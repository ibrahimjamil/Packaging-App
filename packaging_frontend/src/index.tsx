import React from 'react';
import ReactDOM from 'react-dom';
import {composeWithDevTools} from 'redux-devtools-extension'
import { createStore , applyMiddleware} from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import middleware,{sagaMiddleware} from './middleware';
import rootReducer from './store/reducer';
import rootSaga from './store/rootSaga'
import { Provider } from 'react-redux';
import Authentication from './views/Authentication';

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)))
sagaMiddleware.run(rootSaga)


ReactDOM.render(
      <Provider store={store}>
        <React.StrictMode>
          <Authentication>
            <Router>
              <Switch>
                <Route path="/" component={App}/>
              </Switch>
            </Router>
          </Authentication>
        </React.StrictMode>
      </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
