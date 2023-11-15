"use client";
import dynamic from "next/dynamic";

const DynamicListen = dynamic(
  () => import("../../components/dynamicListen.jsx"),
  {
    ssr: false,
  }
);

const Listen = () => {
  return <DynamicListen />;
};
export default Listen;
