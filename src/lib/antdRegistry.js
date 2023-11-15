"use client";

import React from "react";
import {
  createCache,
  extractStyle,
  StyleProvider,
} from "@ant-design/cssinjs/lib";
import { useServerInsertedHTML } from "next/navigation";

const StyledComponentsRegistry = ({ children }) => {
  // Create a cache for styles using the createCache function from @ant-design/cssinjs/lib package.
  const cache = React.useMemo(() => createCache(), []);

  // Use the useServerInsertedHTML hook from next/navigation to insert styles on the server-side.
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));

  // Provide the created cache to child components using StyleProvider from @ant-design/cssinjs/lib package.
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;
