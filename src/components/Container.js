import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDrop} from 'react-dnd';
import ItemTypes from './ItemTypes';
import Item from './Items';
import {data} from './data';
import _ from 'lodash';
import Homepage from './Homepage';

Container.propTypes = {
  listItem: PropTypes.array,
  show: PropTypes.func,
  hideSourceOnDrag: PropTypes.string,
};
Container.defaultProps = {
  listItem: [],
  show: null,
  hideSourceOnDrag: null,

};

function Container(props) {
  const {listItem, show, hideSourceOnDrag} = props;
  const [list, setList] = useState([]);
  const newlist = listItem.filter((l) => l.show === true);
  const length = newlist.length;
  const legth1 = listItem.length;

  const [hasDropped, setHasDropped] = useState(false);
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      const didDrop = monitor.didDrop();

      if (didDrop) {
        return;
      }
      const delta = monitor.getClientOffset();
      // console.log('tuan',delta)
      const left = Math.round(delta.x);

      const id = list.length + 50;
      const top = Math.round(delta.y);
      if (item.source === 'dustbin') {
        if (left > 200 && left <= 1450) {
          moveItem(item, left, top, id);
          return;
        } else {
          removeItem(item);
        }
      }
      if (item.source === 'list') {
        addItem(item, left, top, id);
      }

      setHasDropped(true);
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({shallow: true}),
    }),
  });
  const addItem = (item, left, top, id) => {
    setList(list.concat({...item, source: 'dustbin', left, top, id}));
  };
  const moveItem = (item, left, top) => {
    console.log(list);
    // console.log(item)
    const index = _.findIndex(list, (o) => o.id === item.id);

    setList(
        [
          ..._.slice(list, 0, index),
          {...item, source: 'dustbin', left, top},
          ..._.slice(list, index + 1),
        ],
    );
  };
  const removeItem = (item) => {
    const indexList = _.findIndex(list, (o) => o.id === item.id);
    list.splice(indexList, 1);
  };

  const remoteAllitems = () => {
    setList([]);
  };
  const CombinDrop = (itemFirst, itemSecond) => {
    const a = itemFirst.name + ' ' + itemSecond.name;
    const b = _.find(data, (item) => a === item.condition);
    return b;
  };
  const combine = (itemFirst, itemSecond) => {
    const combineItem = CombinDrop(itemFirst, itemSecond);
    const combineItem1 = CombinDrop(itemSecond, itemFirst);
    console.log(itemSecond);
    if (combineItem) {
      const indexList = _.findIndex(list, (o) => o.id === itemFirst.id);
      const indexList1 = _.findIndex(list, (o) => o.id === itemSecond.id);

      const newItem = [
        ..._.slice(list, 0, indexList),
        {
          ...combineItem,
          source: 'dustbin',
          left: itemFirst.left,
          top: itemFirst.top,
          type: ItemTypes.ITEM,
        },
        ..._.slice(list, indexList + 1),

      ];
      if (itemSecond.source === 'dustbin') {
        newItem.splice(indexList1, 1);
        setList([...newItem]);
        show(combineItem);
      } else {
        setList([...newItem]);
        show(combineItem);
      }
    } else {
      if (combineItem1) {
        const indexList2 = _.findIndex(list, (o) => o.id === itemFirst.id);
        const indexList3 = _.findIndex(list, (o) => o.id === itemSecond.id);

        const newItem1 = [
          ..._.slice(list, 0, indexList2),
          {
            ...combineItem1,
            source: 'dustbin',
            left: itemFirst.left,
            top: itemFirst.top,
            type: ItemTypes.ITEM,
          },
          ..._.slice(list, indexList2 + 1),
        ];
        if (itemSecond.source === 'dustbin') {
          newItem1.splice(indexList3, 1);
          setList([...newItem1]);
          show(combineItem1);
        } else {
          setList([...newItem1]);
          show(combineItem1);
        }
      }
    }

    hasDropped && console.log(list);
  };


  return (
    <div ref={drop} className="dustbin">

      {listItem.length !== 0 &&
        list.map((item, index) => {
          const {left, top, id} = item;
          console.log(removeItem);
          return (
            <Item
              key={index}
              item={item}
              source="dustbin"
              combine={combine}
              left={left}
              top={top}
              hideSourceOnDrag={hideSourceOnDrag}
              id={id}
              removeItem={removeItem}

            />

          );
        })}
      {hasDropped && setHasDropped(false)}
      <div className='total'>Total:{length}/{legth1}</div>
      <Homepage

        remote={remoteAllitems}
      />
    </div>
  );
};

export default Container;
