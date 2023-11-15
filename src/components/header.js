import { Layout, Menu } from "antd";
import { usePathname } from "next/navigation";

const { Header } = Layout;

const CustomHeader = ({ keys, items }) => {
  const pathname = usePathname();

  const styles = {
    position: "sticky",
    top: 0,
    zIndex: 100,
    padding: 0,
  };
  return (
    <Header style={styles}>
      <Menu
        theme="light"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={items}
      />
    </Header>
  );
};

export default CustomHeader;
