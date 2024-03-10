"use client"
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import { navLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";

export default function LeftSideBar() {
  const pathName = usePathname();
  return (
    <div className="h-screen left-0 static p-10 flex flex-col gap-16 bg-blue-2 shadow-lg max-lg:hidden">
      <p className="text-[30px] font-semibold">PaikariBazar</p>
      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathName === link.url ? "text-blue-1" : ""
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
}
