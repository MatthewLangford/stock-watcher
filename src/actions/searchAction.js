import axios from 'axios';
import _ from 'lodash';

import { SEARCH_RESULTS, ERROR, ERROR_RATE } from '../constants/actionTypes';

const searchKey = 'BMC7PQQO0DZSICTZ';
const quoteApiKey = 'YTH6BC9T22YO34HQ';

// Searches for stock info and sends the result to the reducer.
export default function searchAndAddStockInfo(input) {
  return (dispatch) => {
    axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${input}&outputsize=full&apikey=${quoteApiKey}`)
      .then((results) => {
        const data = results.data['Global Quote'];
        if (_.has(data, '01. symbol')) {
        // if data was found I still need the name of the stock
          axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${data['01. symbol']}&apikey=${searchKey}`)
            .then((results2) => {
              if (!_.isEmpty(results2.data.bestMatches)) {
                data.name = results2.data.bestMatches[0]['2. name'];
                dispatch({
                  type: SEARCH_RESULTS,
                  payload: data,
                });
              } else {
                dispatch({ type: ERROR, payload: true });
              }
            });
        } else if (results.data.Note) {
          dispatch({ type: ERROR_RATE, payload: true });
        } else {
          dispatch({ type: ERROR, payload: true });
        }
      });
  };
}
