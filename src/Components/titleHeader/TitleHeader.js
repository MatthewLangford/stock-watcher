import React from 'react';

import './titleHeader.css';

const TitleHeader = ({ title }) => {
  return (
    <div className='title-header'>
      <h1>{ title }</h1>
    </div>
  );
};
export default TitleHeader;
