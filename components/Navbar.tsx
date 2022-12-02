import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// images import
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/solid";

// hooks import
import { useAuth } from "@/contexts/AuthProvider";

const links = [
  { name: "Home", uri: "/" },
  { name: "TV Shows", uri: "/tv-shows" },
  { name: "Movies", uri: "/movies" },
  { name: "New & Popular", uri: "/new-and-popular" },
  { name: "My List", uri: "/my-list" },
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

  const { signout } = useAuth();

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
              className="w-28 h-auto object-cover hover:opacity-75 active:opacity-100 transition-opacity"
              priority
            />
          </Link>
          <ul className="hidden md:flex items-center justify-between gap-5">
            {links.map((link, i) => (
              <li
                key={i}
                className="text-sm md:text-base hover:opacity-75 active:opacity-100 transition-opacity"
              >
                <Link href={link.uri}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-5">
          <MagnifyingGlassIcon className="w-5 aspect-square text-white cursor-pointer hover:opacity-75 active:opacity-100 transition-opacity" />
          <BellIcon className="w-5 aspect-square text-white cursor-pointer hover:opacity-75 active:opacity-100 transition-opacity" />
          <Image
            src="/images/who-is-watching.webp"
            alt="who is watching"
            width={755}
            height={736}
            className="w-7 h-auto rounded-sm cursor-pointer hover:opacity-75 active:opacity-100 transition-opacity"
            onClick={signout}
          />
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
