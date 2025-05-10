import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
//import CardActionArea from "@mui/material/CardActionArea";
//import { MdComputer } from "react-icons/md";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import "../../index.css";
export default function Majer({ nameOfMajer, decription, icon }) {
  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{
        margin: "10px",
        background: "#94B4C1",
      }}
    >
      <div className="flex flex-row justify-start items-center">
        <div
          style={{
            width: "50px",
            background: "white",
            height: "50px",
            margin: "10px",
          }}
          className="rounded-full flex flex-col justify-center items-center "
        >
          {/* <MdComputer size={20} /> */}
          {icon}
        </div>

        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ fontFamily: "Amiri" }}
        >
          {nameOfMajer}
        </Typography>
      </div>
      <CardContent>
        {/* <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ fontFamily: "Amiri" }}
        >
          Computer Engineering
        </Typography> */}
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          style={{ fontFamily: "cursive" }}
        >
          {decription}
        </Typography>
        <CardActions className="flex flex-row justify-end items-end  ">
          <Button
            size="small"
            variant="contained"
            style={{
              background: "#303841",
              textTransform: "none",
              fontFamily: "inherit",
              margin: "10px",
            }}
            onClick={() => {}}
          >
            Show Materials
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
