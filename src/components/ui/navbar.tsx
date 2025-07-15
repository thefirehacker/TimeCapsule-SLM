"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./separator";
import SignInButton from "./sign-in";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "DeepResearch", href: "/deep-research" },
  { name: "AI-Frames", href: "https://www.bubblspace.com/about-aiedx" },
  { name: "contact", href: "/contact" },
];

export function Navbar() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (menuState && !target.closest("nav")) {
        setMenuState(false);
      }
    };

    if (menuState) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuState]);

  return (
    <header>
      <nav
        data-state={menuState ? "active" : ""}
        className={`fixed z-50 w-full px-2 group ${isScrolled ? "" : ""}`}
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <div className="relative w-10 h-10">
                  <Image
                    src="/Media/TimeCapsule_04.png"
                    alt="TimeCapsule Logo"
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
                <span
                  className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${
                    isScrolled ? "hidden" : "block"
                  }`}
                >
                  TimeCapsule
                </span>
              </Link>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuState(!menuState);
                }}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:flex lg:w-fit lg:gap-6 lg:items-center">
              <SignInButton />
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              "lg:hidden transition-all duration-300 ease-in-out overflow-hidden",
              menuState ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
            )}
          >
            <div className="bg-background/95 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-2xl">
              <div className="space-y-6">
                <ul className="space-y-4">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuState(false)}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150 text-lg font-medium py-2"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <SignInButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Separator />
    </header>
  );
}
