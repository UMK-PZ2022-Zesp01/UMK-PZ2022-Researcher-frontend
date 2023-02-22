import React from "react";
import { createUseStyles } from "react-jss";

export default createUseStyles({

  title: {
    color: '#512C8C',
    marginBottom: '50px'
  },

  researchForm: {
    width: '100%'
  },

  formInputRegular: {
    padding: '10px'
  },

  formInputLarge: {
    height: '100%',
    padding: '10px',
    fontFamily: 'sans-serif',
    resize: 'none'
  },

  formRow1: {
    display: 'flex',
    flexDirection: 'row',
    gap: '15px'
  },

  posterButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    height: '250px',
    backgroundColor: '#C6B1E7',
    padding: '25px',
    borderRadius: '10px',
    '&:hover': {
      cursor: 'pointer'
    }
  },

  posterButtonImage: {
    width: '75%'
  },

  posterButtonDesc: {
    fontSize: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#512C8C'
  },

  formRow1Right: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  }

});