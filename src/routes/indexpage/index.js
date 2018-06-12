import React from 'react';
import { Calendar } from 'antd';


function onPanelChange(value, mode) {
  console.log(value, mode);
}

const LybCalendar = () => {
  return (
    <Calendar onPanelChange={onPanelChange} />
  )
}


export default LybCalendar;
