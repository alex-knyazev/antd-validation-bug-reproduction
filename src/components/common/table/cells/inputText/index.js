import { Input } from 'antd';

export function InputText(props) {
  return (
    <Input
      value={props.value}
      onChange={e => {
        e.stopPropagation();
        props.onChange(e.target.value);
      }}
    />
  );
}
