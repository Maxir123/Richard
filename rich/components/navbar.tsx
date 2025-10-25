"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // Navigation items for reusability
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/collections", label: "Collections" },
    { href: "/about", label: "About" },
    { href: "/store-locator", label: "store-locator" },

  ];

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`bg-gradient-to-r from-blue-900/95 to-purple-900/95 backdrop-blur-lg border-b border-blue-400/30 transition-all duration-300 ${
          isScrolled ? "shadow-2xl backdrop-blur-xl" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                href="/" 
                className="flex items-center space-x-3 group"
                onClick={closeMobileMenu}
              >
                <Image
                  src="/logo1r.png"
                  alt="Richview"
                  width={70}
                  height={32}
                  className="h-8 w-auto transition-all duration-300 group-hover:scale-110"
                  priority
                />
                <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
                  RICHVIEW
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-white/90 hover:text-white transition-all duration-300 font-medium text-sm uppercase tracking-wide hover:scale-105 px-3 py-2 rounded-md"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-white/20 hover:border-white/40 transition-colors",
                    }
                  }}
                />
              </SignedIn>
              
              <SignedOut>
                <div className="flex items-center space-x-3">
                  <SignInButton mode="modal">
                    <button className="text-white/90 hover:text-white transition-all duration-300 font-medium text-sm px-4 py-2 rounded-full hover:bg-white/10">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="bg-white text-blue-900 hover:bg-white/90 px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm hover:scale-105 shadow-lg">
                      Get Started
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border-2 border-white/20",
                    }
                  }}
                />
              </SignedIn>
              
              <button
                onClick={toggleMobileMenu}
                className="text-white/90 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded-lg"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}>
            <div className="pb-4 border-t border-white/20 pt-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-white/90 hover:text-white transition-all duration-300 font-medium text-sm uppercase tracking-wide py-3 hover:bg-white/10 rounded-lg px-4"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <SignedOut>
                  <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
                    <SignInButton mode="modal">
                      <button
                        className="text-white/90 hover:text-white transition-all duration-300 font-medium text-sm py-3 text-left hover:bg-white/10 rounded-lg px-4"
                        onClick={closeMobileMenu}
                      >
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button
                        className="bg-white text-blue-900 hover:bg-white/90 py-3 rounded-lg transition-all duration-300 font-medium text-sm text-center shadow-lg"
                        onClick={closeMobileMenu}
                      >
                        Get Started
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;