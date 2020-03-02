import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import vilde from "../icons/vilde.png";
import s from "../icons/s.png";
import c from "../icons/c.png";
import sd from "../icons/sd.png";
import kd from "../icons/kd.png";
import l from "../icons/l.png";
import m from "../icons/m.png";
import v from "../icons/v.png";
import mp from "../icons/mp.png";

const useStyles = makeStyles(() => ({
  badge: {
    width: 32,
    border: "4px solid white",
    borderRadius: 100,
    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.16)"
  }
}));

const Badge = ({ party }) => {
  const classes = useStyles();
  let img;

  switch (party) {
    case "S":
      img = s;
      break;
    case "C":
      img = c;
      break;
    case "SD":
      img = sd;
      break;
    case "KD":
      img = kd;
      break;
    case "L":
      img = l;
      break;
    case "M":
      img = m;
      break;
    case "V":
      img = v;
      break;
    case "MP":
      img = mp;
      break;
    case "-":
      img = vilde;
      break;
    default:
      img = s;
      break;
  }
  return (
    <div>
      <img className={classes.badge} src={img} alt={`Logo for (${party})`} />
    </div>
  );
};

export default Badge;
