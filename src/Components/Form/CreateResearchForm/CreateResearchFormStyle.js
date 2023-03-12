import { createUseStyles } from "react-jss";

export default createUseStyles({

  title: {
    width: "100%",
    display: "flex",
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
    transition: ".3s",

    "&:focus": {
      border: "2px solid #512C8C",
      backgroundColor: "#D7C2F8"
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
    transition: ".3s",

    "&:focus": {
      border: "2px solid #512C8C",
      backgroundColor: "#D7C2F8"
    }
  },

  rowContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "10px"
  },

  formRowTop: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "15px",

    "& label": {
      fontWeight: "bold",
      color: "#512C8C"
    }
  },

  formRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "15px",

    "& label": {
      fontWeight: "bold",
      color: "#512C8C"
    }
  },

  formColumn: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  formLabel: {
    fontWeight: "bold",
    color: "#512C8C",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  posterDisplay: {
    width: "25%",
    height: "250px",
    borderRadius: "5px",
    cursor: "pointer"
  },

  posterImg: {
    width: "100%",
    height: "100%",
    borderRadius: "5px",
    objectFit: "cover"
  },

  posterButton: {
    position: "relative",
    width: "25%",
    height: "250px",
  },

  posterIcon: {
    display: "block",
    position: "relative",
    fontSize: "48px"
  },

  posterButtonOverlay: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "5px",
    color: "#512C8C",
    backgroundColor: "#C6B1E7",
    transition: ".5s",
    opacity: 0,

    "&:hover": {
      opacity: 1
    }
  },

  overlayActive: {
    opacity: 1
  },

  overlayTile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0",
    borderRadius: "5px",
    backgroundColor: "#C6B1E7",
    cursor: "pointer",
    transition: "background-color .5s",

    "&:hover": {
      backgroundColor: "#D7C2F8"
    }
  },

  posterButtonDesc: {
    display: "block",
    position: "relative",
    fontSize: "20px",
    fontWeight: "bold",
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
    borderRadius: "5px"
  },

  addRewardReqLabel: {
    fontWeight: "bold",
    color: "#512C8C",
    marginLeft: "10px",
    border: "2px solid #512C8C",
    padding: "0 10px 5px 10px",
    borderRadius: "20px",
    transition: ".5s",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#C6B1E7"
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
    transition: ".3s",
    
    "&:hover": {
      backgroundColor: "#6D3B9E",
      border: "2px solid #6D3B9E",
      cursor: "pointer"
    }
  },

  "@media (max-width: 500px)": {
    title: {
      fontSize: "1em",
      justifyContent: "center"
    },

    formRowTop: {
      flexDirection: "column"
    },

    posterButton: {
      width: "100%",
      height: "100px",
      flexDirection: "row",
      gap: "15px"
    },

    posterIcon: {
      fontSize: "48px"
    },

    posterButtonDesc: {
      margin: "0"
    },

    formRow1Right: {
      width: "100%"
    },

    formInputLarge: {
      height: "10em"
    },

    formRow: {
      flexDirection: "column",
      width: "100%"
    },

    inputWithLabel: {
      width: "100%"
    },

    formLabel: {

    }
  }

});