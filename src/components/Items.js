import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import "./style.css";

const Item = ({ item, source, combine,removeItem, hideSourceOnDrag, left, top,id,}) => {

    
  const [{isDragging, canDrag}, drag] = useDrag({
    item: { type: ItemTypes.ITEM, name: item.name, img: item.img,removeItem,source,left,top,id,},
    
    collect: monitor => ({
      canDrag : monitor.canDrag(),
      isDragging : monitor.isDragging(),
    }),
  });
 
  const [, setHasDropped] = useState(false);
  const [{ dropItem }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop() {
      console.log(dropItem) // cai minh keo 
      console.log(item) // cai chua(bao gom) cai minh keo tha vao
      console.log(source) // nguon lay tu the Item 
      
      if ((source === "list"&&dropItem.source==='dustbin'))
          {
            console.log('xoa')
            console.log(dropItem)
            dropItem.removeItem(dropItem)
          
          }
      else if(source==='list'&&dropItem.source==='list'){
        console.log('khong duowc')
      }
      else{
        combine(item, dropItem);
        setHasDropped(true);
    }
     
    },
    collect: monitor => ({
      dropItem: monitor.getItem(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });
  
hideSourceOnDrag = source === "dustbin" ? true:false
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }


  let refType = canDrag ? drag : drop

  return (
    
      <div ref={refType} className="items" style={{left,top}}>
        <img src={require("../Images/" + item.img)} alt='img' />
        <div className="text">{item.name}</div>
      </div>
    
  );
};
export default Item;
