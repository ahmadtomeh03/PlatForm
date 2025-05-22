import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Vedio from "../Vedio/Vedio";

export default function AccordionUsage({ numberOfWeek }) {
  return (
    <div style={{ margin: "10px" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Week-{numberOfWeek}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Vedio numberOfLecture={1 + (numberOfWeek - 1) * 3} />
          <Vedio numberOfLecture={2 + (numberOfWeek - 1) * 3} />
          <Vedio numberOfLecture={3 + (numberOfWeek - 1) * 3} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
