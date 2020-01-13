export function EditModeContainer(props) {
  let showValue = typeof props.value === 'object' ? props.value.join(', ') : props.value;
  if (props.valueFormatter) {
    showValue = props.valueFormatter(showValue);
  }
  return props.isEditMode ? (
    <div className="EditModeContainer">{props.children}</div>
  ) : (
    <div className="EditModeContainer" onClick={props.changeEditCell}>
      {showValue}
    </div>
  );
}
