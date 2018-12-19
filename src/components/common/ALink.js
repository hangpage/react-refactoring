/*
*
*  模拟a标签
*
* */
import React from 'react';
const ALink = ({text, onClick, color="#CE8C26"}) => {
    const style = {
      color: color,
      cursor: 'pointer'
    };
    return (
      <div>
        <span style={style} onClick={onClick}>{text}</span>
      </div>
    )
};

export default ALink;
