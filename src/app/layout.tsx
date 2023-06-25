import "../styles/globals.css";

import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import Providers from "~/components/Providers";
import Header from "~/components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Toaster position="bottom-center" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
