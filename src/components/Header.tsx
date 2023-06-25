"use client";
import { Navbar } from "flowbite-react";
import Image from "next/image";
import React from "react";
import SignInButton from "./SignInButton";

const Header = () => {
  return (
    <Navbar fluid className="max-w-screen">
      <Navbar.Brand href="https://flowbite-react.com">
        <Image
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="https://www.flowbite-react.com/favicon.svg"
          width={32}
          height={32}
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <SignInButton />
      <Navbar.Collapse>
        <Navbar.Link active href="/">
          Home
        </Navbar.Link>
        <Navbar.Link href="/userPost">User Post</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
