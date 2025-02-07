// use client side rendering
"use client";

import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  // use state
  const [search, setSearch] = useState<string>("");
  const [dropdownMenu, setDropdownMenu] = useState<boolean>(false);

  // scroll
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // handle scroll
  const handleScroll = () => {
    // check if window.scrollY is greater than 10
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    // add event listener when component is mounted
    window.addEventListener("scroll", handleScroll);
    // cleanup function to remove the event listener when
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar ${isScrolled && "bg-black-1"}`}>
      <Link href="/">
        <img src="/assets/logo.png" alt="logo" className="logo" />
      </Link>

      <div className="nav-links">
        // Home and My List
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/my-list" className="nav-link">
          My List
        </Link>
      </div>

      <div className="nav-right">
        // search bar
        <div className="search">
          <input
            placeholder="Search movie..."
            className="input-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          // search icon
          <Search className="icon" />
          <img
            src="/assets/profile_icon.jpg"
            className="profile"
            alt="profile"
            onClick={() => setDropdownMenu(!dropdownMenu)}
          />
          // dropdown menu
          {dropdownMenu && (
            <div className="dropdown-menu">
              <Link href="/">Home</Link>
              <Link href="/my-list">My List</Link>
              <a href="">Log Out</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
