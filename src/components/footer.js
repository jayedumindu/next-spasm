import { Layout, Row, Typography } from "antd";
const { Footer } = Layout;
const { Title } = Typography;

const CustomFooter = ({ styles }) => {
  return (
    <Footer style={styles}>
      <Row justify="center">
        <Title level={5}>jayedumindu © {new Date().getFullYear()}</Title>
      </Row>
    </Footer>
  );
};

export default CustomFooter;
