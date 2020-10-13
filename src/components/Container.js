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
            if (item.source === "dustbin") {
                if (left > 200 && left <= 1450) {
                    moveItem(item, left, top, id);
                    return;
                } else {

                    removeItem(item)

                }
            }
            if (item.source === "list") {
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

        setList(
            [
                ..._.slice(list, 0, index),
                {...item, source: "dustbin", left, top },
                ..._.slice(list, index + 1)
            ]
        );

    };
    const removeItem = (item) => {
        let indexList = _.findIndex(list, o => o.id === item.id);
        list.splice(indexList, 1)

    }


    const remoteAllitems = () => {
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
        console.log(item_second)
        if (combineItem) {
            let indexList = _.findIndex(list, o => o.id === item_first.id);
            let indexList1 = _.findIndex(list, o => o.id === item_second.id);
            console.log(item_second);
            console.log(indexList1)
            console.log(list)
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
            if (item_second.source === 'dustbin') {

                newItem.splice(indexList1, 1);
                setList([...newItem]);
                show(combineItem);
            } else {

                setList([...newItem]);
                show(combineItem);
            }


        } else {
            if (combineItem1) {
                let indexList2 = _.findIndex(list, o => o.id === item_first.id);
                let indexList3 = _.findIndex(list, o => o.id === item_second.id);

                let newItem1 = [
                    ..._.slice(list, 0, indexList2),
                    {
                        ...combineItem1,
                        source: "dustbin",
                        left: item_first.left,
                        top: item_first.top,
                        type: ItemTypes.ITEM
                    },
                    ..._.slice(list, indexList2 + 1)
                ];
                if (item_second.source === 'dustbin') {

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

    return ( <
        div ref = { drop }
        className = "dustbin" > {
            listItem.length !== 0 &&
            list.map((item, index) => {
                const { left, top, id } = item;

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