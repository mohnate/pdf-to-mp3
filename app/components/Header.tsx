"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnnouncementBar from "./AnnouncementBar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);

  useGSAP(() => {
    gsap.to(headerRef.current, {
      opacity: 0,
      y: -100,
      ease: "power1",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="">
      <AnnouncementBar />
      <header ref={headerRef} className="bg-stone-200 px-8 py-4 relative z-40">
        <div className="container flex flex-row justify-between items-center px-4">
          <div className="flex items-center cursor-pointer hover:text-[#3fcfa4] transition duration-300">
            <Image src="/favicon.ico" alt="logo" width={32} height={32} />
            <h1 className="md:block hidden text-xl md:text-2xl font-bold ml-2">
              PDF to MP3 Generator
            </h1>
          </div>
          <NavigationMenu className="md:mr-[100px] z-50">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-bold transition-transform duration-300 hover:scale-110 hover:text-[#3fcfa4] cursor-pointer">
                  Menu
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid p-2 gap-3 md:w-[450px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Image
                            src="/favicon.ico"
                            alt="logo"
                            width={54}
                            height={54}
                          />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            PDF to MP3 Generator
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Convert your text or PDF documents into MP3 files
                            quickly and easily.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Learn more about how our app works and its features.
                    </ListItem>
                    <ListItem href="/features" title="Features">
                      Discover the various features available in our app.
                    </ListItem>
                    <ListItem href="/contact" title="Contact">
                      Get in touch with us for any inquiries or support.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-bold transition-transform duration-300 hover:scale-110 hover:text-[#3fcfa4] cursor-pointer">
                  Components
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid lg:w-[450px] w-[350px] gap-3 p-4 md:grid-cols-2 ">
                    <ListItem href="/convert" title="Convert">
                      Convert text input or PDF documents to MP3 files.
                    </ListItem>
                    <ListItem href="/download" title="Download">
                      Access and download your converted MP3 files.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-bold transition-transform duration-300 hover:scale-110 hover:text-[#3fcfa4] cursor-pointer">
                  Links
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid lg:w-[450px] w-[350px] gap-3 p-4 md:grid-cols-2 ">
                    <ListItem href="/" title="Home">
                      Home
                    </ListItem>
                    <ListItem href="/about" title="Download">
                      About
                    </ListItem>
                    <ListItem href="/features" title="Featured Items.">
                      Features
                    </ListItem>
                    <ListItem href="/contact" title="Contact Page">
                      Contact
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Header;
