import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import './addStock.css';
import { refreshInput, errorInput } from '../../actions/errors';
import  searchAndAddStockInfo from '../../actions/searchAction';

const regex = /[^\w+.&-]/g;

const mapDispatchToProps = dispatch => {
  return {
    searchAndAddStockInfo: input => dispatch(searchAndAddStockInfo(input)),
    refreshInput: () => dispatch(refreshInput()),
    errorInput: () => dispatch(errorInput()),
  };
};

const mapStateToProps = state => {
    return { addedStocks: state.addedStocks,
             inputError: state.inputError,
             errorRate: state.errorRate };
};

class AddStock extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      searchArray: [],
      recentSearches: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  
  // Searches for the closest match to the stock symbol you type.
  searchForClosestMatch = async input => {
    const { recentSearches } = this.state;
    // Checking to see if you had types that search already before hitting the API.
    if(_.has(recentSearches, input)){
      this.setState({ searchArray: recentSearches[input] });
      return;
    };
    // If symbol entered is not in the recent searches object, we use the API to search.
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=BMC7PQQO0DZSICTZ`);
      const { bestMatches } = response.data;
      if (!_.isEmpty(bestMatches)) {
        recentSearches[input] = bestMatches;  
        this.setState({ searchArray: bestMatches });
      };
    } catch(error) {
      console.log(error);
    };
  };
  // Formats the inputed text then passes it to function above.
  handleChange(event) {
    this.props.refreshInput();
    const formattedInput = _.replace(event.target.value, regex, '').toUpperCase();
    this.setState({ inputValue: formattedInput });
    if (formattedInput) {
      this.searchForClosestMatch(formattedInput);
    } else {
        this.setState({ searchArray: [] });
    };
  };
  handleClick(event, symbol) {
    this.setState({ inputValue: symbol, searchArray: [] });
  };
  // Handles firing off the SearchAndAdd action.
  handleSubmit(event) {
    event.preventDefault();
    let duplicate = false;
    const { addedStocks, errorInput } = this.props;    
    const { inputValue } = this.state;
    //Checking for duplicates 
      addedStocks.forEach(stock => {
        if(stock['01. symbol'] === inputValue){
          errorInput();
          this.setState({ inputValue: '', searchArray: [] })
          duplicate = true;
        }
      });
      if (!duplicate) {
        this.props.searchAndAddStockInfo(inputValue);
        this.setState({ searchArray: [], inputValue: '' });
      }
  }; 
  
  
  render() {
    const { inputValue, searchArray } = this.state;
    const { inputError, errorRate } = this.props;
    return (
      <div className='add-stock-div'>
        <form onSubmit={ this.handleSubmit }>     
          <input onChange={ this.handleChange } value={ inputValue } className={ `stock-input ${inputError ? 'error':''}` } placeholder=' Enter stock symbol...' type='text' /> 
          <input className='add-button' type='submit' value='ADD' onClick={ this.handleSubmit } />
        </form>  
        {(searchArray && inputValue !== '') &&
          <ul className='search-list'>
            {searchArray.map(result => {
              const { '1. symbol': symbol, '2. name': name } = result;
              return <li onClick={ (e) => this.handleClick(e, symbol) } key={ symbol }>
                       <span>{ symbol }</span><span>{ name }</span>
                     </li>
            })}
          </ul>
        }
        {inputError && <p className='error-pop-up'>Oops! The stock you entered has been added already or doesn't exist. Please try again.</p>}
        {errorRate && <p className='error-pop-up'>Uh oh! This free api can't handle this many requests lol. Please try again in 10-20 seconds.</p>}
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddStock);
