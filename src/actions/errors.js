import { ERROR, ERROR_RATE } from '../constants/actionTypes';

export function refreshInput() {
  return (dispatch) => {
    dispatch({ type: ERROR, payload: false });
    dispatch({ type: ERROR_RATE, payload: false });
  };
}

export function errorInput() {
  return dispatch => dispatch({ type: ERROR, payload: true });
}
