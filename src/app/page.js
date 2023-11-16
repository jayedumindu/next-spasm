"use client";
import {
  ConfigProvider,
  Typography,
  message,
  Input,
  Avatar,
  Card,
  Divider,
  Row,
  Col,
  Carousel,
  Statistic,
  Badge,
  Flex,
  Button,
  Form,
} from "antd";
import theme from "@/app/theme";
import Template from "@/template/template";
import { useState, useEffect } from "react";
import axios from "axios";
import { makeSpin, stopSpin } from "@/redux/features/auth";
import { useDispatch } from "react-redux";
import CustomHeader from "@/components/header";
import Link from "next/link";
import {
  CustomerServiceFilled,
  HomeFilled,
  HomeOutlined,
  LogoutOutlined,
  SendOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  WalletFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import CustomFooter from "@/components/footer";

const { Title } = Typography;

const HomePage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState(null);

  const logout = async () => {
    dispatch(makeSpin());
    try {
      await axios.get("/api/user/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      messageApi.error("failed!");
    } finally {
      setTimeout(() => dispatch(stopSpin()), 1000);
    }
  };

  const navItemsHidden = [
    {
      key: "/",
      label: <Link href="/">Home</Link>,
      icon: <HomeOutlined />,
    },

    {
      key: "#",
      label: (
        <div className="flex items-center space-x-4">
          <Avatar
            style={{ backgroundColor: "#1890ff" }}
            icon={<UserOutlined />}
          />
          <p className="p-0 m-0">{user ? user.email : "loading...."}</p>
        </div>
      ),
      children: [
        {
          label: "Log Out",
          key: 5,
          onClick: logout,
          icon: <LogoutOutlined />,
        },
        {
          label: "Account",
          key: 6,
        },
      ],
      style: {
        marginLeft: "auto",
      },
    },
  ];

  useEffect(() => {
    const verify = async () => {
      dispatch(makeSpin());
      try {
        const response = await axios.get("api/user/verify/");
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => dispatch(stopSpin()), 1000);
      }
    };
    verify();
  }, []);

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const listen = async (values) => {
    dispatch(makeSpin());
    try {
      localStorage.setItem("user", JSON.stringify(values));
      router.push("/listen");
    } catch (error) {
      console.log(error);
      messageApi.error("failed!");
    }
  };

  const connectToPeer = (value) => {
    console.log("came here");
    router.push(`/connect?host=${value.host}`);
  };

  return (
    <ConfigProvider theme={theme}>
      <Template>
        {contextHolder}
        <CustomHeader items={navItemsHidden} keys={[1]} />
        <Title className="text-center p-5">{`Welcome to SPASM 😛`}</Title>
        <Row justify="center">
          <Col>
            <Form name="listenForm" {...formItemLayout} onFinish={listen}>
              <Form.Item name="name" label="Name">
                <Input placeholder="Your name to appear" />
              </Form.Item>
              <Form.Item name="interests" label="Your Interests">
                <Input placeholder="Describe your interest to others" />
              </Form.Item>

              <div className="mx-auto w-1/2 mt-2">
                <Button type="primary" htmlType="submit" className="w-full">
                  Continue to chat
                </Button>
              </div>
            </Form>
            <Divider>or</Divider>
            <Form
              name="connectForm"
              {...formItemLayout}
              onFinish={connectToPeer}
            >
              <Form.Item name="host" label="Enter Host Id">
                <Input
                  type="text"
                  placeholder="enter the id given by the host"
                />
              </Form.Item>
              <div className="mx-auto w-1/2 mt-2">
                <Button type="primary" htmlType="submit" className="w-full">
                  connect
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Template>
    </ConfigProvider>
  );
};

export default HomePage;
