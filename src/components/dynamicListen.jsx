"use client";

import {
  ConfigProvider,
  Typography,
  message,
  Card,
  Row,
  Col,
  Flex,
  Button,
  Tooltip,
} from "antd";
import theme from "@/app/theme";
import Template from "@/template/template";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeSpin, stopSpin } from "@/redux/features/auth";
import { useDispatch } from "react-redux";
import Peer from "peerjs";
import {
  AudioOutlined,
  CameraOutlined,
  CopyFilled,
  PoweroffOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

function DynamicListen() {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const [peerId, setPeerId] = useState(null);
  const [videoStream, setvideoStream] = useState(null);

  const connectToServer = async function () {
    const myPeer = new Peer(undefined, {
      host: "spasm-peer-server.onrender.com",
      path: "/connect",
      port: "443",
      secure: true,
    });

    let videoStream = await startWebcam();
    console.log("video", videoStream);

    myPeer.on("open", function (id) {
      console.log("connection opened : " + id);
      setPeerId(id);
    });

    myPeer.on("connection", function (conn) {
      conn.on("data", function (data) {
        // Will print 'hi!'
        console.log(data);
      });
    });

    myPeer.on("call", function (call) {
      console.log("call ekak awa");
      // if both are present

      if (videoStream) {
        call.answer(videoStream);
        call.on("stream", (remoteStream) => {
          console.log("streaming is happening!!!!");
          const videoElement = document.getElementById("remoteStream");
          videoElement.srcObject = remoteStream;
          videoElement.muted = false;
          videoElement.autoplay = true;
          videoElement.playsInline = true;
        });
      } else {
        console.log("video stream cannot be found!");
      }
    });
  };

  const verify = async () => {
    dispatch(makeSpin());
    try {
      await axios.get("api/user/verify/");
    } catch (error) {
      console.log(error);
      messageApi.error("verification failed!");
    } finally {
      setTimeout(() => dispatch(stopSpin()), 1000);
    }
  };

  const startWebcam = async () => {
    if (typeof window !== "undefined") {
      dispatch(makeSpin());
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setvideoStream(stream);
        const videoElement = document.getElementById("userStream");
        videoElement.srcObject = stream;
        videoElement.muted = true;
        videoElement.autoplay = true;
        videoElement.playsInline = true;

        console.log("Webcam started and attached to the video element.");
        return stream;
      } catch (error) {
        console.error("Error accessing webcam:", error.message);
      } finally {
        setTimeout(() => dispatch(stopSpin()), 1000);
      }
    }
  };

  const copyToClipboard = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(peerId);
        messageApi.success("copied!");
      } catch {
        messageApi.error("falied");
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await verify();
      connectToServer();
    };
    initialize();
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <Template>
        {contextHolder}
        {/* <CustomHeader items={navItemsHidden} keys={[1]} /> */}
        <div className="text-center">
          <Title className="p-2">{`Listening!`}</Title>
          <div className="flex flex-nowrap justify-center items-center p-5">
            <Title level={5} className="p-2" style={{ margin: 0 }} id="peerId">
              {peerId ? peerId : "loading"}
            </Title>
            <Tooltip title="copy to clipboard">
              <Button
                size="medium"
                shape="circle"
                icon={<CopyFilled />}
                onClick={copyToClipboard}
              />
            </Tooltip>
          </div>
        </div>

        <Row justify="center">
          <Col span={12}>
            <Card style={{ padding: 0 }}>
              <video id="userStream" className="w-full" />
            </Card>
          </Col>
          <Col span={11}>
            <Card style={{ padding: 0 }}>
              <video id="remoteStream" className="w-full" />
            </Card>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={6} className="p-5">
            <Flex wrap="nowrap" gap="large" justify="center">
              <Tooltip title="mute">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<AudioOutlined />}
                  size="large"
                />
              </Tooltip>
              <Tooltip title="pause camera">
                <Button
                  size="large"
                  shape="circle"
                  type="primary"
                  icon={<CameraOutlined />}
                />
              </Tooltip>

              <Tooltip title="end call">
                <Button
                  shape="circle"
                  size="large"
                  type="primary"
                  danger
                  icon={<PoweroffOutlined />}
                />
              </Tooltip>
            </Flex>
          </Col>
        </Row>
      </Template>
    </ConfigProvider>
  );
}

export default DynamicListen;
