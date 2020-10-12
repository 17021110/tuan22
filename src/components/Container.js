import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Item from "./Items";
import { data } from "./data";
import _ from "lodash";
import Homepage from "./Homepage";

const Container = ({ listItem, show, hideSourceOnDrag }) => {
    const [list, setList] = useState([]);
    const newlist = listItem.filter(l => l.show === true);
    const length = newlist.length;
    const legth1 = listItem.length;
    // console.log(length)
    // console.log(listItem)
    // const [id,setId]=useState('');
    const [hasDropped, setHasDropped] = useState(false);
    const [, drop] = useDrop({
        accept: ItemTypes.ITEM,
        drop(item, monitor) {
            const didDrop = monitor.didDrop();
            // console.log(didDrop)
            if (didDrop) {
                console.log('drop')

                return;

            }
            const delta = monitor.getClientOffset();
            // console.log('tuan',delta)
            const left = Math.round(delta.x);
            console.log(left)
            const id = list.length + 50;
            const top = Math.round(delta.y);
            if (item.source === "dustbin") {
                if (left > 200 && left <= 1450) {
                    moveItem(item, left, top, id);
                    return;
                } else {

                    removeItem(item)

                }
            }
            if (item.source === "list") {
                // const id1=list.length+50;
                // setId(id1);
                addItem(item, left, top, id);

            }

            setHasDropped(true);
            return undefined;
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true })
        })
    });
    const addItem = (item, left, top, id) => {

        setList(list.concat({...item, source: "dustbin", left, top, id }));



    };
    const moveItem = (item, left, top) => {
        console.log(list)
            // console.log(item)
        let index = _.findIndex(list, o => o.id === item.id)
        console.log(index)
        setList(
            [
                ..._.slice(list, 0, index),
                {...item, source: "dustbin", left, top },
                ..._.slice(list, index + 1)
            ]
        );

    };
    const removeItem = (item) => {
        // console.log(item)
        // console.log(id)
        // console.log(list)
        let indexList = _.findIndex(list, o => o.id === item.id);

        list.splice(indexList, 1)
            // console.log(list)


    }


    const remoteAllitems = () => {
        // console.log('xoa het')
        // console.log(list)
        setList([]);

    }
    const CombinDrop = (item_first, item_second) => {
        let a = item_first.name + " " + item_second.name;
        let b = _.find(data, item => a === item.condition);

        return b;
    };
    const combine = (item_first, item_second) => {

        const combineItem = CombinDrop(item_first, item_second);
        const combineItem1 = CombinDrop(item_second, item_first)
        if (combineItem) {
            let indexList = _.lastIndexOf(list, item_first);
            let indexList1 = _.lastIndexOf(list, item_second);
            let newItem = [
                ..._.slice(list, 0, indexList),
                {
                    ...combineItem,
                    source: "dustbin",
                    left: item_first.left,
                    top: item_first.top,
                    type: ItemTypes.ITEM
                },
                ..._.slice(list, indexList + 1),

            ];
            newItem.splice(indexList1, 1);

            setList([...newItem]);
            show(combineItem);
        } else {
            if (combineItem1) {
                let indexList1 = _.lastIndexOf(list, item_first);
                let newItem1 = [
                    ..._.slice(list, 0, indexList1),
                    {
                        ...combineItem1,
                        source: "dustbin",
                        left: item_first.left,
                        top: item_first.top,
                        type: ItemTypes.ITEM
                    },
                    ..._.slice(list, indexList1 + 1)
                ];
                setList([...newItem1]);
                show(combineItem1);
            }
        }

        hasDropped && console.log(list);
    };

    return ( <
        div ref = { drop }
        className = "dustbin" >

        {
            listItem.length !== 0 &&
            list.map((item, index) => {
                const { left, top, id } = item;
                console.log(removeItem)
                return ( <
                    Item key = { index }
                    item = { item }
                    source = "dustbin"
                    combine = { combine }
                    left = { left }
                    top = { top }
                    hideSourceOnDrag = { hideSourceOnDrag }
                    id = { id }
                    removeItem = { removeItem }

                    />

                );
            })
        } { hasDropped && setHasDropped(false) } <
        div className = 'total' > Total: { length }
        /{legth1}</div >
        <
        Homepage remote = { remoteAllitems }
        />   < /
        div >
    );
};

export default Container;