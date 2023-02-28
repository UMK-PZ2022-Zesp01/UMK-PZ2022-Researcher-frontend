import React from "react";
import { createUseStyles } from "react-jss";

export default createUseStyles({

  title: {
    color: "#512C8C",
    marginBottom: "20px"
  },

  researchForm: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  formInputRegular: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#C6B1E7",
    outline: "none",
    border: "2px solid #C6B1E7",
    borderRadius: "5px",
    fontFamily: "sans-serif",

    "&:focus": {
      border: "2px solid #512C8C"
    }
  },

  formInputLarge: {
    height: "100%",
    padding: "10px",
    backgroundColor: "#C6B1E7",
    outline: "none",
    border: "2px solid #C6B1E7",
    borderRadius: "5px",
    fontFamily: "sans-serif",
    resize: "none",

    "&:focus": {
      border: "2px solid #512C8C"
    }
  },

  rowContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px"
  },

  formRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "15px",

    "& label": {
      fontWeight: "bold",
      color: "#512C8C"
    }
  },

  formLabel: {
    fontWeight: "bold",
    color: "#512C8C",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  posterButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
    height: "250px",
    backgroundColor: "#C6B1E7",
    padding: "25px",
    borderRadius: "5px",
    transition: ".5s",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#D7C2F8"
    }
  },

  posterIcon: {
    fontSize: "72px"
  },

  posterButtonDesc: {
    fontSize: "20px",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: "10px",
    color: "#512C8C"
  },

  formRow1Right: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  inputWithLabel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "50%",
    gap: "10px",

    "& label": {
      fontWeight: "bold",
      color: "#512C8C"
    }
  },

  map: {
    width: "100%",
    height: "400px",
    backgroundColor: "#C6B1E7",
    borderRadius: "10px"
  },

  addRewardReqLabel: {
    fontWeight: "bold",
    color: "#512C8C",

    "&:hover": {
      cursor: "pointer"
    }
  },

  plusSign: {
    fontSize: "20px"
  },

  checkboxLabel: {
    fontSize: "14px !important",
    fontWeight: "normal !important",
    color: "#000 !important"
  },

  formButton: {
    width: "100%",
    backgroundColor: "#512C8C",
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "5px",
    padding: "10px",
    outline: "none",
    border: "2px solid #512C8C",
    
    "&:hover": {
      backgroundColor: "#6D3B9E",
      border: "2px solid #6D3B9E",
      cursor: "pointer"
    }
  }

});