"use client";

import { Card, Typography, Spin, message } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Title } = Typography;

const Page = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [info, setMessage] = useState(null);
  const searchParams = useSearchParams();
  const DOMAIN = "http://localhost:3000";

  const verifyUser = async () => {
    try {
      let token = searchParams.get("token");
      console.log("token", token);
      const response = await fetch(DOMAIN + "/api/user/verifymail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });

      if (response.ok) {
        messageApi.success("user verified!");
        setMessage("successful!");
        return;
      }

      messageApi.error("user verification failed!");
      setMessage("failed!");
    } catch (error) {
      console.log(error);
      messageApi.error("interrupted!");
      setMessage("interrupted!");
    } finally {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <Card className="h-screen rounded-none">
      {contextHolder}
      <Title level={2}>User Verification</Title>
      <Title level={3}>
        You will be redirected after verification is completed
      </Title>
      <Title level={3}>{info}</Title>
    </Card>
  );
};

export default Page;
