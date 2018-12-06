import React from 'react';
import _ from 'lodash';

import './stock.css';

const Stock = ( { stockInfo }) => {
  const { '01. symbol': symbol, '03. high': high, '04. low': low, '05. price': price,
          '09. change': changeAmount, '10. change percent': changePercent, name } = stockInfo;
  return (
    <div className='stock-card'>
      <section className='stock-card-top'>
        <section className='stock-card-top-left'>
          <h4 className='stock-name-header'>{ _.truncate(name, {'length': 15}) }</h4><p className='stock-symbol'>{ symbol }</p>
        </section>
        <section className='stock-card-top-right right'>
          <p className='stock-high'>HI ${ Number(high).toFixed(2) }</p>
        </section>          
      </section>
      <section className='stock-card-bottom'>
        <section className='stock-card-bottom-left'>
          <span className={ `change-amount ${changeAmount > 0 && 'pos'}` }>{ changeAmount > 0 ? <span>&#8683; </span>:<span>&#8681; </span>} 
            { Number(changeAmount).toFixed(2) }<span> ({ Number(changePercent.slice(0, -1)).toFixed(2) }%)</span></span>
          <h3 className='stock-price'>${ Number(price).toFixed(2) }</h3>
        </section>
        <section className='stock-card-bottom-right'>
          <p className='stock-low'>LO ${ Number(low).toFixed(2) }</p>
        </section>          
      </section>
    </div>
  )
};

export default Stock;
