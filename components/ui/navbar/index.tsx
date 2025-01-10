"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const items = [
    { link: "/exercise1", label: "Exercise 1" },
    { link: "/exercise2", label: "Exercise 2" },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <nav className="relative w-full bg-white shadow" aria-label="Main navigation">
            <div className="relative z-50 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white">
                <Link href="/" aria-label="Homepage">
                    <Image
                        src="/logo.svg"
                        alt="Mango - Technical Assessment"
                        width={120}
                        height={30}
                        priority
                    />
                </Link>

                <ul className="hidden md:flex gap-6" role="menubar">
                    {items.map((item) => (
                        <li key={item.link} role="none">
                            <Link
                                href={item.link}
                                className="text-gray-700 hover:text-gray-900"
                                role="menuitem"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={toggleMenu}
                    className="block md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                >
                    {menuOpen ? <Close /> : <Open />}
                </button>
            </div>

            <div
                id="mobile-menu"
                className={`
                    absolute left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out overflow-hidden
                    ${menuOpen ? "translate-y-[1px] max-h-screen" : "-translate-y-full max-h-0"}
                `}
                role="menu"
                aria-hidden={!menuOpen}
            >
                <ul className="flex flex-col">
                    {items.map((item) => (
                        <li key={item.link} className="border-b" role="none">
                            <Link
                                href={item.link}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

const Close = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
};

const Open = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    );
};
