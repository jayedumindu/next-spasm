"use client";

import {
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
  Typography,
  message,
  Grid,
} from "antd";
import Template from "../../template/template";
import { RefineThemes } from "@refinedev/antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { makeSpin, stopSpin } from "@/redux/features/auth";
import CustomHeader from "@/components/header";
import Link from "next/link";
import {
  LoginOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { useBreakpoint } = Grid;
const { Blue } = RefineThemes;
const { Title } = Typography;

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const brk = useBreakpoint();
  const [messageApi, contextHolder] = message.useMessage();

  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const navItemsPublic = [
    {
      key: "/login",
      label: <Link href="/login">Log In</Link>,
      icon: <LoginOutlined />,
    },
    {
      key: "/signup",
      label: <Link href="/signup">Sign Up</Link>,
      icon: <SolutionOutlined />,
    },
  ];

  const handleSignUp = async (values) => {
    dispatch(makeSpin());
    try {
      const response = await axios.post("api/user/signup/", values);
      console.log(response);
      messageApi.success("successful!");
      router.push("/login");
    } catch (error) {
      console.log(error);
      messageApi.error("failed");
    } finally {
      setTimeout(() => dispatch(stopSpin()), 1000);
    }
  };

  return (
    <ConfigProvider theme={Blue}>
      <Template>
        {contextHolder}
        <CustomHeader items={navItemsPublic} />
        <Title className="text-center p-4">Be a Member!</Title>
        <Card
          title="Enter your credentials"
          className={brk.md ? `w-1/2` : brk.lg ? `w-1/3` : "auto"}
          style={{ margin: "auto" }}
        >
          <Form
            name="loginForm"
            {...formItemLayout}
            onFinish={(values) => handleSignUp(values)}
          >
            <Form.Item name="email" label="Email">
              <Input type="email" placeholder="Enter your email address" />
            </Form.Item>
            <Form.Item name="username" label="Username">
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" placeholder="Enter your password" />
            </Form.Item>

            <div className="mx-auto w-1/2 mt-2">
              <Button type="primary" htmlType="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </Form>
        </Card>
      </Template>
    </ConfigProvider>
  );
};

export default Page;
