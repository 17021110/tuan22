import React from 'react';
import PropTypes from 'prop-types';
import Item from './Items';
import './style.css';

SideBar.propTypes = {
  listItems: PropTypes.array,
};
SideBar.defaultProps = {
  listItems: [],
};

export default function SideBar(props) {
  const {listItems} = props;
  return (
    <div className="listcss">
      {listItems.map(
          (item, index) =>
            item.show && <Item item={item} key={index} source="list" />,
      )}
    </div>
  );
}

