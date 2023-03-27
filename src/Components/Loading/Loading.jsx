import React from "react";

import LoadingStyle from "./LoadingStyle";

export default function Loading(props) {
  const styles = LoadingStyle();

  const { isLoading, isSuccessful } = props;

  const getChungusStyle = () => {
    return `${styles.chungus} ${isLoading ?
      styles.chungusLoad : (
        isSuccessful ?
          styles.chungusCheck :
          styles.chungusCross
      )}`;
  };
  return <div className={getChungusStyle()}></div>;
}

Loading.defaultProps = {
  isLoading: true,
  isSuccessful: false
};
