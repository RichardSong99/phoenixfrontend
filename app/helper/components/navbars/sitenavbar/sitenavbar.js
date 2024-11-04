"use client";

import React, {useState} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Divider,
  cn,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const menuItems = ["Home", "SAT Bible", "About Us"];

const CenteredNavbar = React.forwardRef(
  ({ classNames: { base, wrapper, ...otherClassNames } = {}, ...props }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const router = useRouter();

    return (
      <Navbar
        ref={ref}
        classNames={{
          base: cn(
            "max-w-full bg-white rounded-none px-4 py-2",
            base
          ),
          wrapper: cn("px-0", wrapper),
          ...otherClassNames,
        }}
        height="60px"
        isMenuOpen={isMenuOpen}
        position="static"
        onMenuOpenChange={setIsMenuOpen}
        {...props}
      >
        <NavbarBrand>
          <span className="text-lg font-semibold text-gray-800">ACME</span>
        </NavbarBrand>

        <NavbarContent className="hidden md:flex" justify="center">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link className="text-gray-600 hover:text-gray-800" href="#" size="sm">
                {item}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent className="hidden md:flex" justify="end">
          <NavbarItem>
            <Button
              className="bg-gray-800 text-white hover:bg-gray-700"
              endContent={
                <Icon className="pointer-events-none" icon="solar:alt-arrow-right-linear" />
              }
              onClick={ () => router.push('/auth') }
              radius="full"
            >
              Get Started
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenuToggle className="text-gray-600 md:hidden" />

        <NavbarMenu
          className="bottom-0 top-[initial] max-h-fit rounded-t-lg bg-white shadow-lg pb-6 pt-6"
          motionProps={{
            initial: { y: "100%" },
            animate: { y: 0 },
            exit: { y: "100%" },
            transition: { type: "spring", bounce: 0, duration: 0.3 },
          }}
        >
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={index}>
              <Link className="mb-2 w-full text-gray-600" href="#" size="md">
                {item}
              </Link>
              {index < menuItems.length - 1 && <Divider className="opacity-50" />}
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <Button fullWidth as={Link} className="border-0 text-gray-800" href="/#" variant="faded">
              Sign In
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem className="mb-4">
            <Button fullWidth as={Link} className="bg-gray-800 text-white"  onClick={ () => router.push('/auth') }
            >
              Get Started
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    );
  }
);

CenteredNavbar.displayName = "CenteredNavbar";

export default CenteredNavbar;
