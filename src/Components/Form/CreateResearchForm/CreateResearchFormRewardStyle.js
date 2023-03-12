import { createUseStyles } from "react-jss";

export default createUseStyles({
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

  rewardRow: {
    display: "flex",
    flexDirection: "row",
    gap: "15px"
  },

  removeRewardButton: {
    fontWeight: "bolder",
    color: "#512C8C",
    padding: "10px",
    backgroundColor: "#C6B1E7",
    border: "2px solid #C6B1E7",
    borderRadius: "5px",
    transition: ".5s",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "#D7C2F8",
      border: "2px solid #D7C2F8"
    }
  },

  trashIcon: {
    margin: "0 5px"
  }

});