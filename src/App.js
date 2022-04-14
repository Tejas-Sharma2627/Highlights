import React, { useEffect, useState } from "react";

import NoteContainer from "./Components/NoteContainer/NoteContainer";
import Sidebar from "./Components/Sidebar/Sidebar";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]
  );
  const[buckets, setBuckets]= useState(["Trial"]);
  const addBuckets=(bucket)=>{
    const tempBuckets=[...buckets];
    tempBuckets.push(bucket);
    setBuckets(tempBuckets);
  }
  const addNote = (color) => {
    const tempNotes = [...notes];

    tempNotes.push({
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      bucket: "",
      text: "",
      time: Date.now(),
      color,
    });
    setNotes(tempNotes);
  };
  
  const deleteNote = (id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes.splice(index, 1);
    setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes[index].text = text;
    setNotes(tempNotes);
  };

  useEffect(() => {
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="App">
      <Sidebar addNote={addNote} addBuckets={addBuckets} buckets = {buckets} />
      <NoteContainer
        notes={notes}
        buckets={buckets}
        deleteNote={deleteNote}
        updateText={updateText}
      />
    </div>
  );
}

export default App;
