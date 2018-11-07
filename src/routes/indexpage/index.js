import React from 'react';
import moment from 'moment';
import { Calendar, Badge} from 'antd';


function onPanelChange(value, mode) {
  console.log(value, mode);
}

const birthday = '2018-11-13';
const myBirthday = '2019-02-22';

function dateCellRender(value){
    if(value.isSame(birthday, 'day')){
      return (
        <span>
          <Badge status={'error'} text={'大聪明生日'} />
        </span>
      )
    }else if(value.isSame(moment(), 'day')){
      let distance = moment().diff(birthday, 'days');
      let distance2 = moment().diff(myBirthday, 'days');
      distance = `距离大聪明生日还有${Math.abs(distance)}天`;
      distance2 = `距离我生日还有${Math.abs(distance2)}天`;
      return (
        <ul>
          <li>
            <Badge status={'success'} text={distance}/>
          </li>
          <li>
            <Badge status={'warning'} text={distance2}/>
          </li>
        </ul>
      )
    }
}

const LybCalendar = () => {
  return (
    <Calendar onPanelChange={onPanelChange} dateCellRender = {dateCellRender}/>
  )
}


export default LybCalendar;
