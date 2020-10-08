
import React, { useState } from "react";


import {HTML5Backend} from 'react-dnd-html5-backend';
import { DndProvider } from "react-dnd";
import SideBar from "./components/SideBar";
import Container from "./components/Container";
import _ from "lodash";
import "./App.css";

import { data } from "./components/data";


function App() {
  
  const [list, setList] = useState(data);
  
  const show = item => {
    let indexList = _.findIndex(list, o=>o.name === item.name );
    setList([
      ..._.slice(list, 0, indexList),
      {...item, show: true, },
      ..._.slice(list, indexList + 1)
    ]);
   
  };
  return (
    <div className="App">
      
      <DndProvider backend={HTML5Backend}>
        <Container listItem={list} show={show} />
        <SideBar listItems={list} />
      </DndProvider>
    </div>
  );
}

export default App;

