import { createStore } from 'redux';
import application from './reducers';


let store = createStore(application);

export default store;