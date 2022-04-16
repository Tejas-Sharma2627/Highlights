import React, { useEffect, useState } from "react";
import _ from "lodash";
import NoteContainer from "./Components/NoteContainer/NoteContainer";
import Sidebar from "./Components/Sidebar/Sidebar";
import { DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import { v4 } from "uuid";
import Note from "./Components/Note/Note";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { paginationItemClasses } from "@mui/material";
import deleteIcon from "./assets/delete.svg";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { AiOutlineEdit } from "react-icons/ai";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./Components/Note/Note.css";
import plusIcon from "./assets/plus.png";
const trialItem = {
  id: v4(),
  name: "Trial Item",
};
const trialItem2 = {
  id: v4(),
  name: "Trial Item2",
};
function App() {
  const [notes, setNotes] = useState([]);
  const [buckets, setBuckets] = useState(["Trial"]);
  const [text, setText] = useState("");
  const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];
  const [listOpen, setListOpen] = useState(false);
  const [buck, setBuck] = useState(true);
  const [bucketName, setBucketName] = useState("");
  const [pair, setPair] = useState({
    default: {
      title: "Default Bucket",
      items: [trialItem, trialItem2],
    },

    new: {
      title: "New Bucket",
      items: [],
    },
    "in-progress": {
      title: "In Progress",
      items: [],
    },
  });
  const addBuckets = (bucket) => {
    const newPair = { ...pair, [bucket]: { title: bucket, items: [] } };
    setPair(newPair);
  };

  const addNote = (color) => {
    const tempNotes = [...notes];
    setPair((prev) => {
      return {
        ...prev,
        default: {
          title: "title",
          items: [
            {
              id: v4(),
              name: text,
            },
            ...prev.default.items,
          ],
        },
      };
    });
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
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const itemCopy = { ...pair[source.droppableId].items[source.index] };
    setPair((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };
  const handleChange = (event) => {
    setBucketName(event.target.value);

    setBuck(false);
  };
  const addItem = (texte) => {
    setPair((prev) => {
      return {
        ...prev,
        default: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: texte,
            },
            ...prev.default.items,
          ],
        },
      };
    });

    setText("");
  };
  return (
    <div className="App">
      <Sidebar
        addNote={addNote}
        addItem={addItem}
        updateText={updateText}
        addBuckets={addBuckets}
        buckets={buckets}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(pair, (data, key) => {
          return (
            <div key={key}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      <div className="note-container">
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                console.log(snapshot);
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Button
                                      variant="contained"
                                      
                                    >
                                      {data.title}
                                    </Button>
                                    {el.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      </div>
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
