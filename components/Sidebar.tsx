// src/components/LiftedComponent.tsx

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface SidebarProps {}
const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <nav className="w-56 bg-violet-300 rounded-md px-3 py-3 h-[80vh] overflow-y-auto">
      <Link href={"/"} className="link--unstyled">
        <section className="sidebar-header flex justify-center items-center">
          <Image
            className="mr-4"
            src="/logo.svg"
            width={48}
            height={48}
            alt="logo"
            role="presentation"
          />
          <strong className="text-lg">React Notes</strong>
        </section>
      </Link>
    </nav>
  );
};

export default Sidebar;
