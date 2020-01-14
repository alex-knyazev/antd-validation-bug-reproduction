import { Form } from 'antd';
import Validator from 'async-validator';

import { TripsInput } from './tripsInput';

export function TripsFormItem(props) {
  const { getFieldDecorator, trips } = props;

  const tripsValidationDescriptor = trips.reduce((fieldsRules, _trip, index) => {
    fieldsRules[index] = {
      required: true,
      type: 'object',
      fields: {
        from: {
          type: 'string',
          required: true,
          message: 'from is required',
        },
        to: {
          type: 'string',
          required: true,
          message: 'to is required',
        },
      },
    };

    return fieldsRules;
  }, {});

  const validator = new Validator(tripsValidationDescriptor);

  const tripsFieldsRules = [
    {
      validator: (rule, value, callback) => {
        validator.validate(value, (errors, fields) => {
          if (Array.isArray(errors)) {
            const modifiedErrors = JSON.stringify(errors);
            callback(modifiedErrors);
          }
          callback(errors);
        });
      },
    },
  ];

  return (
    <Form.Item help="" validateStatus="success">
      {getFieldDecorator('trips', {
        initialValue: [],
        rules: tripsFieldsRules,
      })(<TripsInput />)}
    </Form.Item>
  );
}
