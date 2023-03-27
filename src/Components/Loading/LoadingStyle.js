import { createUseStyles } from "react-jss";

export default createUseStyles({
  chungus: {
    width: "7rem",
    height: "7rem",
    position: "relative",
    borderRadius: "100%",
    fontSize: "6rem",

    "&::after": {
      position: "absolute",
      lineHeight: "0",
      margin: "0"
    }
  },

  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" }
  },

  chungusLoad: {
    border: "0.4rem dotted #512c8c",
    animationName: "$spin",
    animationDuration: "10s",
    animationIterationCount: "infinite",
    animationTimeline: "linear"
  },

  chungusCheck: {
    color: "#58a23c",
    border: "0.4rem solid #58a23c",

    "&::after": {
      top: "3rem",
      left: "0.5rem",
      content: "\"✔\""
    }
  },

  chungusCross: {
    color: "#b63434",
    border: "0.4rem solid #b63434",

    "&::after": {
      top: "2.2rem",
      left: "1.75rem",
      content: "\"x\""
    }
  }
});