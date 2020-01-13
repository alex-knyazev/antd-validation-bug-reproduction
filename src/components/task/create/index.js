import React, { useState } from 'react';
import { Button, Typography, Form, Input } from 'antd';

import { TripsInput } from './tripsInput';

function TravelFormBase(props) {
  const {
    validateFields,
    getFieldsValue,
    setFieldsValue,
    getFieldDecorator,
    getFieldsError,
  } = props.form;

  const [someState, changeSomeState] = useState(false);

  const formValues = getFieldsValue();
  const { trips = [] } = formValues;

  function handleSubmit(e) {
    e.preventDefault();
    validateFields({ force: true }, (err, values) => {
      if (!err) {
        alert('cool!');
      }
      changeSomeState(!someState);
    });
  }

  const errors = getFieldsError();

  return (
    <div className="Trips">
      <Typography.Title level={3}>Trips</Typography.Title>
      <div className="Travel">
        <Form onSubmit={handleSubmit}>
          <Form.Item label="User name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please enter task name!' }],
            })(<Input placeholder="Input your name" />)}
          </Form.Item>
          <TripsInput
            getFieldDecorator={getFieldDecorator}
            setFieldsValue={setFieldsValue}
            trips={trips}
            addresses={props.addresses}
          />
          <Button type="primary" size="large" htmlType="submit">
            Confirm
          </Button>
        </Form>
      </div>
    </div>
  );
}

export const TravelForm = Form.create({
  name: 'TravelForm',
  mapPropsToFields: props => {
    // const trips = props.taskData ? props.taskData.trips : [];
    return {
      // trips: Form.createFormField({
      //   value: trips,
      // }),
    };
  },
})(TravelFormBase);
