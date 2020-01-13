import { Form, Table, Button } from 'antd';
import cloneDeep from 'clone-deep';

import { InputText } from '~/components/common/table/cells';

export function TripsInput(props) {
  const { getFieldDecorator, setFieldsValue, trips } = props;

  function handleAddTrip() {
    const emptyTrip = {
      key: trips.length + 1,
      from: '',
      to: '',
    };
    const newTrips = [...trips, emptyTrip];
    setFieldsValue({
      trips: newTrips,
    });
  }

  function handleChangeTrip(recordIndex, fieldName, value) {
    const newTrips = cloneDeep(trips);
    newTrips[recordIndex] = { ...newTrips[recordIndex], [fieldName]: value };
    setFieldsValue({ trips: newTrips });
  }

  const tripsFieldsRules = [
    {
      required: true,
      type: 'array',
      len: trips.length,
      message: 'NOT VALID',
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

  const columns = [
    {
      title: 'Trip #',
      key: 'key',
      dataIndex: 'key',
    },
    {
      title: 'from',
      key: 'from',
      dataIndex: 'from',
      render: function r(text, record, index) {
        return (
          <InputText
            value={text}
            onChange={value => {
              handleChangeTrip(index, 'from', value);
            }}
          />
        );
      },
    },
    {
      title: 'to',
      key: 'to',
      dataIndex: 'to',
      render: function r(text, record, index) {
        return (
          <InputText
            value={text}
            onChange={value => {
              handleChangeTrip(index, 'to', value);
            }}
          />
        );
      },
    },
  ];

  return (
    <Form.Item>
      {getFieldDecorator('trips', {
        initialValue: [],
        rules: tripsFieldsRules,
      })(
        <div>
          <div className="Trips-Actions">
            <Button sise="large" onClick={handleAddTrip} icon="plus">
              Add New
            </Button>
          </div>
          <Table
            pagination={false}
            className="Travel-Table"
            dataSource={trips}
            columns={columns}
            bordered={false}
          />
        </div>,
      )}
    </Form.Item>
  );
}
