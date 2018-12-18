/*
*
*  模拟a标签
*
* */
import React from 'react';
const ALink = ({text, onClick, color="#CE8C26"}) => {
    return (
      <div>
        <span style={{color: color}} onClick={onClick}>{text}</span>
      </div>
    )
};

export default ALink;
