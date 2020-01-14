import { Table, Button } from 'antd';
import cloneDeep from 'clone-deep';
import lodashGet from 'lodash.get';

import { InputText } from '~/components/common/table/cells';
import { ValidationContainer } from '~/components/common/table/cells/validationContainer';

export function TripsInput(props) {
  const { value: tripsValue, onChange } = props;
  const errorsOfField = props['data-__field'].errors;

  let errors = [];
  if (errorsOfField && errorsOfField.length) {
    errors = JSON.parse(errorsOfField[0].message);
  }

  const errorsByColumnsAndFields = errors.reduce((result, error) => {
    const [recordIndex, fieldName] = error.field.split('.');
    if (result[recordIndex] === undefined) {
      result[recordIndex] = { [fieldName]: [error] };
      return result;
    }
    if (result[recordIndex][fieldName] === undefined) {
      result[recordIndex][fieldName] = [error];
      return result;
    }
    result[recordIndex][fieldName].push(error);
    return result;
  }, {});

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
        const fieldErrors = lodashGet(errorsByColumnsAndFields, `${index}.from`);
        const errorMessage = fieldErrors ? fieldErrors.map(error => error.message).join(', ') : '';
        return (
          <ValidationContainer isNotMatch={errorMessage !== ''} message={errorMessage}>
            <InputText
              value={text}
              onChange={value => {
                handleChangeTrip(index, 'from', value);
              }}
            />
          </ValidationContainer>
        );
      },
    },
    {
      title: 'to',
      key: 'to',
      dataIndex: 'to',
      render: function r(text, record, index) {
        const fieldErrors = lodashGet(errorsByColumnsAndFields, `${index}.from`);
        const errorMessage = fieldErrors ? fieldErrors.map(error => error.message).join(', ') : '';
        return (
          <ValidationContainer isNotMatch={errorMessage !== ''} message={errorMessage}>
            <InputText
              value={text}
              onChange={value => {
                handleChangeTrip(index, 'to', value);
              }}
            />
          </ValidationContainer>
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
