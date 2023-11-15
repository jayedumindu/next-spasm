import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/antdRegistry";
import "@/app/globals.css";
import ReduxProvider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`m-0 ${inter.className}`}>
        <StyledComponentsRegistry>
          <ReduxProvider>{children}</ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
