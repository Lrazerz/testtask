import {SET_USERS, SET_USERS_LOADING, SET_USERS_ERROR, SET_POSITIONS, SET_POSITIONS_LOADING,
  SET_POSITIONS_ERROR, USER_REGISTERED, USER_REGISTERED_ERROR} from '../actions/users-actions';

const initialState = {
  users: [],
  totalPages: 0,
  usersLoading: false,
  usersError: null,

  positions: [],
  positionsLoading: false,
  positionsError: null,

  userRegistered: false,
  userRegisteredError: null,
}

const usersReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USERS: {
      return {
        ...state,
        users: [...state.users, ...action.users],
        totalPages: action.totalPages,
      }
    }
    case SET_USERS_LOADING: {
      return {
        ...state,
        usersLoading: action.loading,
      }
    }
    case SET_USERS_ERROR: {
      return {
        ...state,
        usersError: action.error,
      }
    }
    case SET_POSITIONS: {
      return {
        ...state,
        positions: action.positions,
      }
    }
    case SET_POSITIONS_LOADING: {
      return {
        ...state,
        positionsLoading: action.loading,
      }
    }
    case SET_POSITIONS_ERROR: {
      return {
        ...state,
        positionsError: action.error,
      }
    }
    case USER_REGISTERED: {
      return {
        ...state,
        userRegistered: action.registered,
      }
    }
    case USER_REGISTERED_ERROR: {
      return {
        ...state,
        userRegisteredError: action.error,
      }
    }
    default: {
      return state;
    }
  }
}

export default usersReducer;