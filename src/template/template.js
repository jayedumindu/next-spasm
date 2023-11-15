import { Layout, Spin } from "antd";
import { useSelector } from "react-redux";
import CustomFooter from "@/components/footer";
import CustomContent from "@/components/content";
import { LoadingOutlined } from "@ant-design/icons";

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
  };

  const spinning = useSelector((state) => state.loading);

  return (
    <Layout style={styles.layout}>
      <Spin
        fullscreen
        spinning={spinning}
        style={styles.spinner}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      />
      <CustomContent styles={styles.content}>{children}</CustomContent>
      <CustomFooter styles={styles.footer} />
    </Layout>
  );
};

export default Template;
