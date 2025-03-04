"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../../assets/Real-Logo-edited.png";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/home" },
    { name: "Deepfake Detection", href: "/deep-fake" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
      <div
        className="flex items-center gap-1"
        onClick={() => {
          router.push("/home");
        }}
      >
        <Image
          src={Logo}
          width={60}
          height={60}
          alt="Real-Eye logo"
          className="shadow-lg"
        />
      </div>

      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none text-white">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className={`transition-all duration-300 ${
                pathname === link.href
                  ? "text-[#234ff6]"
                  : "hover:text-[#1B3ECC]"
              }`}
            >
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link
        href="/login"
        className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px]  "
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#4169E1_0%,#023c90_40%,#0088FF_70%,#1E90FF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Get Started
        </span>
      </Link>
    </header>
  );
};

export default Navbar;
