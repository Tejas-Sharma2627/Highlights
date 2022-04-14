import React, { useState } from "react";

import plusIcon from "../../assets/plus.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Sidebar.css";

function Sidebar(props) {
  const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];
  const [listOpen, setListOpen] = useState(false);
  const [bucketName, setBucketName] = useState("");
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
      <div>
        <img src={plusIcon} alt="Add" onClick={() => setListOpen(!listOpen)} />
        <ul className={`sidebar_list ${listOpen ? "sidebar_list_active" : ""}`}>
          {colors.map((item, index) => (
            <li
              key={index}
              className="sidebar_list_item"
              style={{ backgroundColor: item }}
              onClick={() => props.addNote(item)}
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
