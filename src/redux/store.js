import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk';
import usersReducer from "./reducers/users-reducer";

const store = createStore(usersReducer, applyMiddleware(ReduxThunk));


// store.subscribe(() => console.log('Store state store.js', store.getState()));

export default store;