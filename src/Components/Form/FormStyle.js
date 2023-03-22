import React from 'react';
import { createUseStyles } from 'react-jss';

export default createUseStyles({
  fullWidth: {
    width: '100%',
  },
  hBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '10vh',
    margin: '0',
    textAlign: 'center',
    justifyContent: 'space-evenly',
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: '500',
    margin: '0 auto',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#6D3B9E',
  },
  h3: {
    fontSize: '1.2rem',
    margin: '0 auto',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#6D3B9E',
  },
  loginFormBox: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '33%',
    flexGrow: '1',
    margin: '0',
  },
  registerFormBox: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: '66%',
    flexGrow: '2',
    margin: '0',
  },
  loginForm: {
    display: 'flex',
    padding: '1rem 2rem',
    flexDirection: 'column',
  },
  registerForm: {
    display: 'flex',
    padding: '1rem 2rem',
    flexDirection: 'column',
  },
  aPurple: {
    padding: '0.3rem',
    alignSelf: 'end',
    fontWeight: '700',
    fontSize: '0.7rem',
    color: '#512c8c',
    borderRadius: '5px',
    textDecoration: 'none',
    '&:hover': {
      color: '#6D3B9E',
    },
  },

  textInput: {
    width: '100%',
    height: '2rem',
    padding: '0.5rem',
    margin: '0.25rem 0',
    backgroundColor: '#C6B1E7',
    display: 'block',
    appearance: 'none',
    border: 'none',
    '&:focus': {
      appearance: 'none',
      outline: 'none',
    },
    '&:-internal-autofill-selected': {
      WebkitBoxShadow: '0 0 0 50px #C6B1E7 inset',
    },
    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 50px #C6B1E7 inset',
      '&:hover': {
        WebkitBoxShadow: '0 0 0 50px #C6B1E7 inset',
      },
      '&:focus': {
        WebkitBoxShadow: '0 0 0 50px #C6B1E7 inset',
      },
      '&:active': {
        WebkitBoxShadow: '0 0 0 50px #C6B1E7 inset',
      },
    },
  },
  select: {
    position: 'static',
    width: '100%',
    height: '2rem',
    padding: '0.5rem',
    margin: '0.25rem 0',
    backgroundColor: '#C6B1E7',
    display: 'block',
    appearance: 'none',
    border: 'none',
    '&:focus': {
      appearance: 'none',
      outline: 'none',
    },
    '&:-internal-autofill-selected': {
      WebkitBoxShadow: '0 0 0 50px #C6B1E7 inset',
    },
    backgroundImage:
      'linear-gradient(45deg, transparent 50%, #000000 50%),\r\n    linear-gradient(135deg, #000000 50%, transparent 50%),\r\n    linear-gradient(to right, #C6B1E7, #C6B1E7)',
    backgroundPosition:
      'calc(100% - 20px) calc(1em + 2px),\r\n    calc(100% - 15px) calc(1em + 2px),\r\n    100% 0',
    backgroundSize: '5px 5px,\r\n    5px 5px,\r\n    2.5em 2.5em',
    backgroundRepeat: 'no-repeat',
  },

  option: {
    lineHeight: '2rem',
  },

  submitButton: {
    position:'relative',
    zIndex:'0',
    padding: '0.5rem',
    margin: '0.5rem 0',
    backgroundColor: '#512c8c',
    color: '#ffffff',
    fontWeight: '400',
    appearance: 'none',
    border: 'none',
    borderRadius: '5px',
    transition:'translate linear 0.1s ',

    '&::before':{
      zIndex:'-1',
      position:'absolute',
      content:'""',
      top:'0',
      left:'50%',
      width:'0',
      height:'100%',
      transition:'width ease-in-out 0.3s, left ease-in-out 0.3s',
      borderRadius:'5px',
      backgroundColor: '#6D3B9E',
    },

    '&:hover': {
      cursor: 'pointer',
      '&::before':{
        width:'100%',
        left:'0',
      }
    },
    '&:active': {
      backgroundColor:'#512c8c',
      translate:'0 2px'

    },
  },
  orLoginWith: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '2px solid #512c8c',
    lineHeight: '0.1rem',
    margin: '10px 0 20px',
    '& span': {
      padding: '0 1rem',
      backgroundColor: '#F4F0FA',
    },
  },
  loginWith: {
    padding: '0.5rem',
    margin: '0.5rem 0',
    flexBasis: '48%',
    backgroundColor: '#D9D9D9',
    appearance: 'none',
    border: 'none',
    borderRadius: '5px',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:active': {},
  },
  agreementBox: {
    textAlign: 'justify',
    '& label': {
      width: '2rem',
      fontSize: '1rem',
    },
  },
  checkboxInput: {
    width: '1rem',
    height: '1rem',
    border: '1px solid #512c8c',
    borderRadius: '2px',
    appearance: 'none',
    cursor: 'pointer',
    '&::after': {
      content: '"\\2713"',
      position: 'relative',
      color: '#F4F0FA',
      left: '2px',
      top: '-2px',
    },
    '&:checked': {
      backgroundColor: '#6D3B9E',
    },
  },
  flexRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexColumn: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexColumnSep: {
    width: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
