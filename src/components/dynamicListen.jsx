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
  AudioMutedOutlined,
  AudioOutlined,
  CameraOutlined,
  CloseOutlined,
  CopyFilled,
  PoweroffOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title } = Typography;

function DynamicListen() {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const dispatch = useDispatch();
  const [peerId, setPeerId] = useState(null);
  const [remoteStream, setRemote] = useState(null);
  const [call, setCall] = useState(null);
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);
  const [videoStream, setvideoStream] = useState(null);

  const connectToServer = async function () {
    const myPeer = new Peer(undefined, {
      host: "spasm-peer-server.onrender.com",
      path: "/connect",
      port: "443",
      secure: true,
    });

    let videoStream = await startWebcam();

    myPeer.on("open", function (id) {
      console.log("connection opened : " + id);
      setPeerId(id);
    });

    myPeer.on("connection", function (conn) {
      conn.on("data", function (data) {
        // Will print 'hi!'
        console.log(data);
        dispatch(stopSpin());
      });
    });

    myPeer.on("call", function (call) {
      console.log("call ekak awa");
      dispatch(makeSpin());
      if (videoStream) {
        call.answer(videoStream);
        call.on("stream", (remoteStream) => {
          console.log("streaming is happening!!!!");
          setRemote(remoteStream);
          setCall(call);
          const videoElement = document.getElementById("remoteStream");
          videoElement.srcObject = remoteStream;
          videoElement.muted = false;
          videoElement.autoplay = true;
          videoElement.playsInline = true;
        });
      } else {
        console.log("video stream cannot be found!");
        messageApi.error("failed!");
      }
      call.on("close", () => {
        messageApi.info("user disconnected!");
        setRemote(null);
        setCall(null);
      });
      dispatch(stopSpin());
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
        setvideoStream(stream);

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
    dispatch(makeSpin());
    const initialize = async () => {
      await verify();
      await connectToServer();
    };
    initialize();
  }, []);

  const toggleVideo = () => {
    videoStream.getVideoTracks()[0].enabled =
      !videoStream.getVideoTracks()[0].enabled;
    setVideo((video) => !video);
  };

  const toggleAudio = () => {
    videoStream.getAudioTracks()[0].enabled =
      !videoStream.getAudioTracks()[0].enabled;
    setAudio((audio) => !audio);
  };

  const endCall = () => {
    if (call) {
      call.close();
    }
  };

  return (
    <ConfigProvider theme={theme}>
      <Template>
        {contextHolder}
        <div className="text-center">
          <Title className="p-1">
            {call ? `Connected 🥳` : "Streaming 😴"}
          </Title>
        </div>
        <Row justify="space-around">
          <Col sm={23} md={23} lg={11}>
            <div className="shadow-none rounded-md">
              <video id="userStream" className="w-full h-full rounded-md" />
            </div>
          </Col>

          <Col
            sm={23}
            md={23}
            lg={11}
            className={remoteStream ? "block" : "hidden"}
          >
            <div className="shadow-none rounded-md">
              <video muted id="remoteStream" className="w-full" />
            </div>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24} className="p-5">
            <Flex wrap="nowrap" gap="large" justify="center">
              <Tooltip title={!audio ? "mute" : "unmute"}>
                <Button
                  type="primary"
                  shape="circle"
                  icon={!audio ? <AudioOutlined /> : <AudioMutedOutlined />}
                  size="large"
                  onClick={toggleAudio}
                />
              </Tooltip>
              <Tooltip title={!video ? "pause camera" : "resume"}>
                <Button
                  size="large"
                  shape="circle"
                  type="primary"
                  icon={!video ? <CameraOutlined /> : <CloseOutlined />}
                  onClick={toggleVideo}
                />
              </Tooltip>

              <Tooltip title="end call">
                <Button
                  shape="circle"
                  size="large"
                  type="primary"
                  danger
                  icon={<PoweroffOutlined />}
                  onClick={endCall}
                />
              </Tooltip>
              <div className="flex flex-nowrap justify-center items-center">
                <Title
                  level={5}
                  className="p-2"
                  id="peerId"
                  style={{ margin: 0 }}
                >
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
            </Flex>
          </Col>
        </Row>
      </Template>
    </ConfigProvider>
  );
}

export default DynamicListen;
