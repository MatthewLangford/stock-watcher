import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import './stockList.css';
import Stock from '../stock/Stock';

const mapStateToProps = state => {
    return { addedStocks: state.addedStocks };
};

const StockList = ({ addedStocks }) => {
  return (
    <div className='stock-list'>
      {addedStocks.map((stock, index) =>{
        return <Stock key={ index } stockInfo={ stock }/>
        })
      }       
      {_.isEmpty(addedStocks) && <h1 className='no-stocks-header'>No Stocks Yet!</h1>}         
    </div>
  )
};

export default connect(mapStateToProps)(StockList);
