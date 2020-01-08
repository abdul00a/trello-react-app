import React from 'react';
import './checkitems.css';

function CheckItems(props) {
  const status = () => {
    return props.ItemState === 'complete' ? true : false;
  };

  const { name, id } = props;
  return (
    <div className="items">
      <label>
        <input
          type="checkbox"
          id={id}
          onClick={e => props.onStatus(e)}
          defaultChecked={status()}
        />
        <span>{name}</span>
      </label>
      <i className="small material-icons" onClick={() => props.onDelItem(id)}>
        cancel
      </i>
    </div>
  );
}

export default CheckItems;
