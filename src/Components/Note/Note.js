import React, { useState } from "react";

import deleteIcon from "../../assets/delete.svg";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { AiOutlineEdit } from "react-icons/ai";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./Note.css";

let timer = 500,
  timeout;
function Note(props) {
  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    let hrs = date.getHours();
    let amPm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs ? hrs : "12";
    hrs = hrs > 12 ? (hrs = 24 - hrs) : hrs;

    let min = date.getMinutes();
    min = min < 10 ? "0" + min : min;

    let day = date.getDate();
    const month = monthNames[date.getMonth()];

    return `${hrs}:${min} ${amPm} ${day} ${month}`;
  };

  const debounce = (func) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, timer);
  };

  const updateText = (text, id) => {
    debounce(() => props.updateText(text, id));
  };
  const [buck, setBuck] = useState(true);
  const [bucketName, setBucketName] = useState("");
  const handleChange = (event) => {
    setBucketName(event.target.value);
    console.log(props.bucket);
    setBuck(false);
  };
  return (
    <div className="note" style={{ backgroundColor: props.note.color }}>
      {buck && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bucketName}
              label="Age"
              onChange={handleChange}
            >
              {props.bucket.map((item, index) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      {!buck && (
        <div style={{ display: "flex" }}>
          <Button variant="contained" style={{ width: "150px" }}>
            {bucketName}
          </Button>
          <AiOutlineEdit
            style={{
              color: "white",
              backgroundColor: "black",
              fontSize: "20px",
              borderRadius: "5px",
              marginLeft: "50px",
            }}
            onClick={() => {
              setBuck(true);
            }}
          ></AiOutlineEdit>
        </div>
      )}
      <textarea
        className="note_text"
        defaultValue={props.note.text}
        onChange={(event) => updateText(event.target.value, props.note.id)}
      />
      <div className="note_footer">
        <p>{formatDate(props.note.time)}</p>
        <img
          src={deleteIcon}
          alt="DELETE"
          onClick={() => props.deleteNote(props.note.id)}
        />
      </div>
    </div>
  );
}

export default Note;
