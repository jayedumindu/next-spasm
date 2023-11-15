"use client";

import {
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
  Typography,
  Grid,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import Template from "../../template/template";
import { RefineThemes } from "@refinedev/antd";
import axios from "axios";
import { logIn } from "@/redux/features/auth";
import { useDispatch } from "react-redux";
import { makeSpin, stopSpin } from "@/redux/features/auth";
import { useAppDispatch } from "@/redux/store";
import Link from "next/link";
import CustomHeader from "@/components/header";
import {
  LoginOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { useBreakpoint } = Grid;
const { Title } = Typography;
const { Blue, Orange } = RefineThemes;

const Page = () => {
  const router = useRouter();
  const brk = useBreakpoint();
  const dispatch = useAppDispatch();
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

  const handleLogIn = async (values) => {
    dispatch(makeSpin());
    try {
      const response = await axios.post("api/user/login", values);
      console.log(response);
      messageApi.success("successful!");
      dispatch(logIn(response.data.user));
      router.push("/");
    } catch (error) {
      console.log(error);
      messageApi.error("failed!");
    } finally {
      setTimeout(() => dispatch(stopSpin()), 1000);
    }
  };

  return (
    <ConfigProvider theme={Blue}>
      <Template>
        {contextHolder}
        <CustomHeader items={navItemsPublic} />
        <Title className="text-center p-10">Log In!</Title>
        <Card
          title="Enter your credentials"
          className={brk.md ? `w-1/2` : brk.lg ? `w-1/3` : "auto"}
          style={{ margin: "auto" }}
        >
          <Form name="loginForm" {...formItemLayout} onFinish={handleLogIn}>
            <Form.Item name="email" label="Email">
              <Input placeholder="Enter your email address" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input placeholder="Enter your password" />
            </Form.Item>

            <div className="mx-auto w-1/2 mt-2">
              <Button type="primary" htmlType="submit" className="w-full">
                Log In
              </Button>
            </div>
          </Form>
        </Card>
      </Template>
    </ConfigProvider>
  );
};

export default Page;
