import { Layout, Spin } from "antd";
import { useSelector } from "react-redux";
import CustomFooter from "@/components/footer";
import CustomContent from "@/components/content";
import { Loading3QuartersOutlined, LoadingOutlined } from "@ant-design/icons";

const Template = ({ children, selectedKeys }) => {
  let styles = {
    layout: {},
    content: {
      minHeight: "100vh",
    },
    footer: {
      textAlign: "center",
    },
    spinner: {
      backgroundColor: "white",
    },
    indicator: {
      fontSize: 40,
    },
  };

  const loading = useSelector((state) => state.loading);
  const tip = useSelector((state) => state.tip);

  return (
    <Layout style={styles.layout}>
      <Spin
        size="large"
        indicator={<LoadingOutlined style={styles.indicator} />}
        spinning={loading}
        style={styles.spinner}
        fullscreen
      />

      <CustomContent styles={styles.content}>{children}</CustomContent>
      <CustomFooter styles={styles.footer} />
    </Layout>
  );
};

export default Template;
