import {applyMiddleware, createStore} from 'redux';
import rootReducer from './reducer';
import service from './TodoService';

const serviceMiddleware = storeAPI => next => action => {
    if (typeof action === 'function') {
        return action(storeAPI.dispatch, storeAPI.getState)
    }
    return next(action)
}

const store = createStore(rootReducer, {todos: service.getData()}, applyMiddleware(serviceMiddleware));
export default store;