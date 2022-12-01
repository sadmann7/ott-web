import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// images import
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/solid";

const links = [
  { name: "Home", uri: "/" },
  { name: "Tv Shows", uri: "/home" },
  { name: "Movies", uri: "/home" },
  { name: "New & Popular", uri: "/home" },
  { name: "My List", uri: "/home" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const changeBgColor = () => {
    window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", changeBgColor);
    return () => window.removeEventListener("scroll", changeBgColor);
  }, [isScrolled]);

  return (
    <section
      aria-label="navbar"
      className={`${
        isScrolled ? "bg-background" : ""
      } z-50 fixed top-0 py-4 md:py-6 w-full text-white transition-all`}
    >
      <nav className="w-[89vw] max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image
              src="/images/netflix-logo.svg"
              alt="netflix"
              width={1024}
              height={276.74}
              className="w-28 h-auto object-cover"
              priority
            />
          </Link>
          <ul className="hidden md:flex items-center justify-between gap-5">
            {links.map((link, i) => (
              <li key={i} className="text-sm md:text-base">
                <Link href={link.uri}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-5">
          <MagnifyingGlassIcon className="w-5 aspect-square text-white" />
          <BellIcon className="w-5 aspect-square text-white" />
          <Image
            src="/images/who-is-watching.webp"
            alt="who is watching"
            width={755}
            height={736}
            className="w-7 h-auto rounded-sm"
          />
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
