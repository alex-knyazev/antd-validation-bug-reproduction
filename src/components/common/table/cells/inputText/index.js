import { Input } from 'antd';

export function InputText(props) {
  return (
    <Input
      value={props.value}
      onChange={e => {
        props.onChange(e.target.value);
      }}
    />
  );
}
