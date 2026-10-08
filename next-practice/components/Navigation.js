"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const path = usePathname();
  return (
    <nav aria-label="주 메뉴">
      {[
        { href: "/", label: "홈" },
        { href: "/notes", label: "내 메모" },
      ].map(({ href, label }) => (
        <Link
          key={href}
          className={path === href ? "nav-link active" : "nav-link"}
          aria-current={path === href ? "page" : undefined}
          href={href}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
