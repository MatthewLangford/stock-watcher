import React from 'react';

import './App.css';
import TitleHeader from '../titleHeader/TitleHeader';
import AddStock from '../addStock/AddStock';
import StockList from '../stockList/StockList';

const title = 'Stock Watcher';

const App = () => {
  return (
    <div className="app">
      <TitleHeader title ={ title } />
      <AddStock />
      <StockList />
    </div>
  );
};

export default App;
