import "./InfoBox.css";
import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import {  numberFormater } from "./utils";

function InfoBox({ isRed, active, title, cases, totle, ...props }) {
  return (
    <Card
      onClick={props.onClick}
      className={`infobox ${active && "infobox--selected"} ${
        isRed && "infobox-red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2 className={`infobox_cases ${!isRed && 'text-color-green'}`}>+{cases!=null || NaN || undefined ?numberFormater(cases):0  }</h2>
        <Typography className="infobox_totle" color="textSecondary">
          +{numberFormater(totle)} Totle
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
