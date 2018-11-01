import ComboBox from '../../components/common/ComboBox';


export default () => {
  return (
    <div>
      <ComboBox url="/api/sys/diseases" value="id" text="name" style="width: 200px"></ComboBox>
    </div>
  )
}
