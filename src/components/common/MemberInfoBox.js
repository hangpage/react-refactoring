import React from 'react'

const MemberInfoBox = ({memberInfo}) =>{
    return(
      <div className="info-box">
        <span>患者：{memberInfo.memberName}</span>
        <span>手机：{memberInfo.memberMobile}</span>
        <span>性别：{memberInfo.memberSex}</span>
        <span>年龄：{memberInfo.memberAge}</span>
        <span>就诊医师：{memberInfo.doctorName}</span>
        <span>就诊类型：{memberInfo.visitType}</span>
        <span>就诊待遇：{memberInfo.levelName}</span>
        <span>保险：{memberInfo.memberInsurName}</span>
      </div>
    )
};

export default MemberInfoBox;
