import { Table, Button } from 'antd';
import cloneDeep from 'clone-deep';

import { InputText } from '~/components/common/table/cells';

export function TripsInput(props) {
  const { value: tripsValue, onChange } = props;

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

  function handleAddTrip() {
    const emptyTrip = {
      key: tripsValue.length + 1,
      from: '',
      to: '',
    };
    const newTrips = [...tripsValue, emptyTrip];
    onChange(newTrips);
  }

  function handleChangeTrip(recordIndex, fieldName, value) {
    const newTrips = cloneDeep(tripsValue);
    newTrips[recordIndex] = { ...newTrips[recordIndex], [fieldName]: value };
    onChange(newTrips);
  }

  return (
    <div>
      <Button sise="large" onClick={handleAddTrip} icon="plus">
        Add New
      </Button>
      <Table
        pagination={false}
        className="Travel-Table"
        dataSource={tripsValue}
        columns={columns}
        bordered={false}
      />
    </div>
  );
}
