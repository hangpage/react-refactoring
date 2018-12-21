import React from 'react';
import DataTable from "../../components/common/DataTable";
import {Popconfirm} from "antd";

const columns = [{
  title: '姓名',
  dataIndex: 'memberName',
  key: 'memberName',
}, {
  title: '手机号',
  dataIndex: 'mobile',
  key: 'mobile',
}, {
  title: '性别',
  dataIndex: 'gender',
  key: 'gender',
}, {
  title: '生日',
  dataIndex: 'birthday',
  key: 'birthday',
}, {
  title: '档案号',
  dataIndex: 'archivesNo',
  key: 'archivesNo',
}, {
  title: '档案存放地',
  dataIndex: 'profileLocationName',
  key: 'profileLocationName',
}, {
  title: '证件类型',
  dataIndex: 'identityTypeName',
  key: 'identityTypeName',
}, {
  title: '证件号码',
  dataIndex: 'identityCode',
  key: 'identityCode',
}];

class Test extends React.Component{
    constructor(props){
      super(props);

      this.textInput = null;

      // this.setTextInputRef = element => {
      //   this.textInput = element;
      // };
    }
    getData =(e) =>{
      console.log(this.textInput.getSelectedRows());
    };
    render(){
      return (
        <div>
          <div onClick={this.getData}>点击我</div>
          <DataTable
            columns={columns}
            url='/api/member/info/list'
            ref={c => {this.textInput = c}}
          />
        </div>
      )
    }

}

export default Test;
