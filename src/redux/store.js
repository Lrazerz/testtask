import {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk';
import usersReducer from "./reducers/users-reducer";

const store = createStore(usersReducer, applyMiddleware(ReduxThunk));

export default store;