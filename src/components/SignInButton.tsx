"use client";
import { Dropdown, Avatar, Navbar, Button } from "flowbite-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignInButton = () => {
  //* hooks
  const { data: session, status } = useSession();
  console.log("SignInButton ~ session:", session?.user);

  //* render
  if (status === "loading") {
    return <p className="md:order-2 text-black">Loading...</p>;
  }
  if (session && session.user) {
    return <SignOutButton user={session.user} />;
  }
  return (
    <Button className="md:order-2">
      <Link href="/sign-in">Sign In</Link>
    </Button>
  );
};

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface SignOutButtonProps {
  user: User;
}

const SignOutButton = ({ user }: SignOutButtonProps) => {
  return (
    <div className="flex md:order-2">
      <Dropdown
        inline
        label={
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">{user.name || "..."}</span>
          <span className="block truncate text-sm font-medium">
            {user.email || "..."}
          </span>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
  );
};

export default SignInButton;
