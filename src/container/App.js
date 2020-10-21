import React,{Component} from 'react';
import 'styles/index.scss';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'redux/reducers'
import {axiosAuthMiddleware} from 'middleware/axios-middleware';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Routes} from 'config/Routes';
import MainLayout from 'container/MainLayout';
// import FavouriteContacts from 'views/fav-contact/FavouriteContact';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)


const createStoreWithMiddleware = applyMiddleware(
  axiosAuthMiddleware,
  reduxThunk,
  logger
)(createStore);

const store = createStoreWithMiddleware(
  // reducers,
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

// export default () => {
//   let store = createStore(persistedReducer)
//   let persistor = persistStore(store)
//   return { store, persistor }
// }


class App extends Component {

  render(){
    return (
      <div className="App">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Route component={MainLayout} path={Routes.ContactList}/>
            </Router>
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;
