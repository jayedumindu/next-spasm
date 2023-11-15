"use client";
import dynamic from "next/dynamic";

const DynamicConnect = dynamic(
  () => import("../../components/dynamicConnect.jsx"),
  {
    ssr: false,
  }
);

const Connect = () => {
  return <DynamicConnect />;
};

export default Connect;
