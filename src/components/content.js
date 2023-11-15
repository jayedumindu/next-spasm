import { Layout } from "antd";
const { Content } = Layout;

const CustomContent = ({ children, styles }) => {
  return <Content style={styles}>{children}</Content>;
};

export default CustomContent;
