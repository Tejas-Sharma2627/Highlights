import React, { useState } from "react";

import plusIcon from "../../assets/plus.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Sidebar.css";
import deleteIcon from "../../assets/delete.svg";
import InputLabel from "@mui/material/InputLabel";
import { AiOutlineEdit } from "react-icons/ai";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
let timer = 500,
  timeout;
function Sidebar(props) {
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
  const[text, setText] = useState("");
  const [bucketName, setBucketName] = useState("");
  const handleChange = (event) => {
    setBucketName(event.target.value);
    console.log(props.bucket);
    setBuck(false);
  };
  const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];
  const [listOpen, setListOpen] = useState(false);
  return (
    <div className="sidebar">
      <div>
        {" "}
        <TextField
          id="standard-basic"
          label="Add Bucket"
          variant="standard"
          onChange={(event) => setBucketName(event.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          onClick={(e) => {
            if (bucketName != "") props.addBuckets(bucketName);
            setBucketName("");
            console.log(props.buckets);
          }}
        >
          Add Bucket
        </Button>
      </div>
      <div className="note" style={{ backgroundColor: colors[Math.floor(Math.random() * 6) + 1] }}>
      {buck && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bucket</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bucketName}
              label="Bucket"
              onChange={handleChange}
            >
              
                <MenuItem value={"Default"}>Default</MenuItem>
                <MenuItem value={"New Bucket"}>New Bucket</MenuItem>
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
              
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
        defaultValue={text}
        onChange={(event) => setText(event.target.value)}
      />
    </div>
      <div>
        <img src={plusIcon} alt="Add" onClick={() => setListOpen(!listOpen)} />
        <ul className={`sidebar_list ${listOpen ? "sidebar_list_active" : ""}`}>
          {colors.map((item, index) => (
            <li
              key={index}
              className="sidebar_list_item"
              style={{ backgroundColor: item }}
              onClick={()=>props.addItem(text)}
            />
          ))}
        </ul>
      </div>

      {/* <img src={plusIcon} alt="Add" onClick={() => setListOpen(!listOpen)} />
      <ul className={`sidebar_list ${listOpen ? "sidebar_list_active" : ""}`}>
        {color.map((item, index) => (
          <li
            key={index}
            className="sidebar_list_item"
            style={{ backgroundColor: "black", color:"white" }}
            onClick={() => props.addNote(item)}
          >{item}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Sidebar;
