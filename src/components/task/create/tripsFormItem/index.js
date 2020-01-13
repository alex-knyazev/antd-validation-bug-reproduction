import { Form } from 'antd';

import { TripsInput } from './tripsInput';

export function TripsFormItem(props) {
  const { getFieldDecorator, setFieldsValue, trips } = props;

  const tripsFieldsRules = [
    {
      required: true,
      type: 'array',
      fields: trips.reduce((fieldsRules, trip, index) => {
        fieldsRules[index] = {
          type: 'object',
          required: true,
          fields: {
            from: {
              type: 'string',
              required: true,
            },
            to: {
              type: 'string',
              required: true,
            },
          },
        };

        return fieldsRules;
      }, {}),
    },
  ];

  return (
    <Form.Item>
      {getFieldDecorator('trips', {
        initialValue: [],
        rules: tripsFieldsRules,
      })(<TripsInput />)}
    </Form.Item>
  );
}
