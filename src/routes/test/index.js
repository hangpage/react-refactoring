import ComboBox from '../../components/common/ComboBox';
import styles from '../../index.less';

export default () => {
  return (
    <div>
      <ComboBox
        url="/api/sys/diseases"
        valueProp="id"
        text="name"
        allowClear={true}
        style={{ 'minWidth': '200px' }}
        fieldProp="test">
      </ComboBox>
    </div>
  )
}
