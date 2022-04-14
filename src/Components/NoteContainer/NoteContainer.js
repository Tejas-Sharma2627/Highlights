import React from "react";
import Button from "@mui/material/Button";
import Note from "../Note/Note";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./NoteContainer.css";

function NoteContainer(props) {
  const reverArray = (arr) => {
    const array = [];

    for (let i = arr.length - 1; i >= 0; --i) {
      array.push(arr[i]);
    }

    return array;
  };

  const notes = reverArray(props.notes);

  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <Button variant="contained"  onClick={() => zoomIn()}>+</Button>
            <Button variant="contained"  onClick={() => zoomOut()}>-</Button>
            <Button variant="contained" onClick={() => resetTransform()}>x</Button>
          </div>
          <TransformComponent>
            <div className="note-container">
              <h2>Highlights</h2>
              <div className="note-container_notes custom-scroll">
                {notes?.length > 0 ? (
                  notes.map((item) => (
                    <Note
                      bucket={props.buckets}
                      key={item.id}
                      note={item}
                      deleteNote={props.deleteNote}
                      updateText={props.updateText}
                    />
                  ))
                ) : (
                  <h3>No Highlights present</h3>
                )}
              </div>
            </div>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
}

export default NoteContainer;
