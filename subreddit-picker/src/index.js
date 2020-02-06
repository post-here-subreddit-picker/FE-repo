import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import { reducer } from './reducers'


function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch(e) {
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined 
        return JSON.parse (serializedState) 
    } catch(e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

const store = createStore(reducer, persistedState, applyMiddleware(thunk, logger))
store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
<Provider store={store}>
<Router>
    <App />
</Router>
</Provider>,
document.getElementById('root'));


