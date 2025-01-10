import Image from "next/image";
import Link from "next/link";

const items = [
    {
        link: "/exercise1",
        label: "Exercise 1",
    },
    {
        link: "/exercise2",
        label: "Exercise 2",
    },
];

const Navbar = () => {

    return (
        <nav
            className="w-full h-20 shadow flex items-center justify-between p-4 sm:px-6 lg:px-8"
            aria-label="Main Navigation"
        >
            <Link href="/">
                <Image
                    src="/logo.svg"
                    alt="Mango - Technical Assessment"
                    width={180}
                    height={38}
                    priority
                />
            </Link>
            <ul className="flex gap-4">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={item.link}
                            className="relative group text-gray-700 hover:text-gray-900 transition"
                            aria-current={item.link === "/exercise1" ? "page" : undefined}
                        >
                            {item.label}
                            <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar