import { SEARCH_RESULTS, ERROR, ERROR_RATE } from '../constants/actionTypes';

const initialState = {
  addedStocks: [],
  inputError: false,
  errorRate: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      return Object.assign({}, state, { addedStocks: state.addedStocks.concat(action.payload) });
    case ERROR:
      return Object.assign({}, state, { inputError: action.payload });
    case ERROR_RATE:
      return Object.assign({}, state, { errorRate: action.payload });
    default:
      return state;
  }
};

export default searchReducer;
