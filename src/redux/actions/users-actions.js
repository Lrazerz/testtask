import {User, Position} from "../../models";

const _basePath = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const SET_USERS = "SET_USERS";
export const SET_USERS_LOADING = "SET_USERS_LOADING";
export const SET_USERS_ERROR = "SET_USERS_ERROR";
export const FORCE_RESET_USERS = "FORCE_RESET_USERS";

export const SET_POSITIONS = "SET_POSITIONS";
export const SET_POSITIONS_LOADING = "SET_POSITIONS_LOADING";
export const SET_POSITIONS_ERROR = "SET_POSITIONS_ERROR";

export const USER_REGISTERED = "USER_REGISTERED";
export const USER_REGISTERED_ERROR = "USER_REGISTERED_ERROR";

const _setUsers = (users, totalPages) => {
  return {type: SET_USERS, users, totalPages};
}
const _setUsersLoading = (loading) => {
  return {type: SET_USERS_LOADING, loading};
}
const _setUsersError = (error) => {
  return {type: SET_USERS_ERROR, error};
}

const _forceResetUsers = (users) => {
  return {type: FORCE_RESET_USERS, users};
}

const _setPositions = (positions) => {
  return {type: SET_POSITIONS, positions};
}
const _setPositionsLoading = (loading) => {
  return {type: SET_POSITIONS_LOADING, loading};
}
const _setPositionsError = (error) => {
  return {type: SET_POSITIONS_ERROR, error};
}

const _setRegisteredUser = (registered) => {
  return {type: USER_REGISTERED, registered};
}
const _setRegisteredUserError = (error) => {
  return {type: USER_REGISTERED_ERROR, error};
}

const _fetchResource = async (link) => {
  const response = await fetch(`${_basePath}${link}`);

  if (!response.ok) {
    throw new Error('Something went wrong while fetching data');
  }

  const resData = await response.json();

  if (!resData.success) {
    throw new Error('Server error');
  }

  return resData;
}

export const fetchUsers = (count = 6, page = 1) => {
  return async (dispatch, getState) => {
    if (getState().users.length > 0 && page === 1) {
      return;
    }
    try {
      dispatch(_setUsersLoading(true));

      const resData = await _fetchResource(`/users?count=${count}&page=${page}`);

      const users = resData.users.map(user => new User(user.id, user.name, user.email, user.phone, user.position,
        user.position_id, user.registration_timestamp, user.photo));

      dispatch(_setUsers(users, resData.total_pages));
    } catch (err) {
      dispatch(_setUsersError(err))
    } finally {
      dispatch(_setUsersLoading(false));
    }
  }
}

export const fetchPositions = () => {
  return async dispatch => {
    try {
      dispatch(_setPositionsLoading(true));

      const resData = await _fetchResource(`/positions`);

      const positions = resData.positions.map(position => new Position(position.id, position.name));

      dispatch(_setPositions(positions));
    } catch (err) {
      dispatch(_setPositionsError(err))
    } finally {
      dispatch(_setPositionsLoading(false));
    }
  }
}

export const signupUser = (formData) => {
  return async dispatch => {
    try {
      dispatch(_setPositionsLoading(true));

      let resData = await _fetchResource(`/token`)

      if (!resData.success) {
        throw new Error('Server error');
      }

      const token = resData.token;

      const response = await fetch(`${_basePath}/users`, {
        method: "POST",
        body: formData,
        headers: {"Token": token}
      });

      if (!response.ok) {
        throw new Error('Something went wrong while fetching data');
      }

      resData = await response.json();

      if (!resData.success) {
        throw new Error('Server error');
      }

      dispatch(_setRegisteredUser(true));

    } catch (err) {
      dispatch(_setRegisteredUserError(err))
    } finally {
      dispatch(_setPositionsLoading(false));
    }
  }
}

export const forceResetUsers = () => {
  return dispatch => {
    dispatch(_forceResetUsers());
  }
}