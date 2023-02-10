import React, { useRef, useState } from "react";
import "../App.css";
const Dragndrop = ({ data }) => {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const dragStartHandeler = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handelDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragenter = (e, params) => {
    const currentItem = dragItem.current;
    console.log(params)
    if (e.target !== dragNode.current) {
      setList((oldList) => {
        const newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpi].items.splice(params.itemi,0,newList[currentItem.grpi].items.splice(currentItem.itemi,1)[0] );
        dragItem.current = params;
        return newList;
      });
    }
  };

  const handelDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handelDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (currentItem.grpi === params.grpi && currentItem.itemi === params.itemi) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  return list.map((grp, grpi) => (
    <div
      key={grp.title}
      onDragEnter={dragging && !grp.items.length? (e) => handleDragenter(e, { grpi, itemi: 0 }):null} className="drag-drop">
      <div>{grp.title}</div>

      {grp.items.map((item, itemi) => (
        <div draggable onDragStart={(e) => { dragStartHandeler(e, { grpi, itemi }); }}key={item} onDragEnter={dragging? (e) => {handleDragenter(e, { grpi, itemi });}: null}className={dragging ? getStyles({ grpi, itemi }) : "dnd-item"}>
          {item}
        </div>
      ))}
    </div>
  ));
};

export default Dragndrop;
