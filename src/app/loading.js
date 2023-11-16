import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

function Loading() {
  const styles = {
    spinner: {
      backgroundColor: "white",
    },
    indicator: {
      fontSize: 40,
    },
  };

  return (
    <Spin
      size="large"
      indicator={<LoadingOutlined style={styles.indicator} />}
      spinning={true}
      style={styles.spinner}
      fullscreen
    />
  );
}

export default Loading;
