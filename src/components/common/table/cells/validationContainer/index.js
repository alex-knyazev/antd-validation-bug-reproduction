import { Popover, Typography } from 'antd';
import './index.less';

const { Text } = Typography;

export function ValidationContainer(props) {
  const popoverContent = <Text type="danger">{props.message}</Text>;
  return props.isNotMatch ? (
    <Popover content={popoverContent}>
      <div className="ValidationContainer">{props.children}</div>
    </Popover>
  ) : (
    props.children
  );
}
