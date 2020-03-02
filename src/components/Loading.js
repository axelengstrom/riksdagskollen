import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  loader: {
    position: "relative",
    margin: "0 auto",
    width: 40,
    top: "40vh",
    height: 40
  }
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
