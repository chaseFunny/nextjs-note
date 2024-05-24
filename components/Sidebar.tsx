import { getAllNotes } from "@/lib/redis";
import Image from "next/image";
import Link from "next/link";
import NoteList from "./NoteList";
export interface NotesType {
  notes: Record<string, string>;
}
interface SidebarProps {}
const Sidebar = async () => {
  const notes: NotesType = await getAllNotes();
  return (
    <nav className="w-56 bg-violet-200 rounded-md px-3 py-3 h-[90vh] overflow-y-auto">
      <Link href={"/"} className="link--unstyled">
        <section className="sidebar-header flex justify-center items-center">
          <Image
            className="mr-4"
            src="/logo.svg"
            width={32}
            height={32}
            alt="logo"
            role="presentation"
          />
          <strong className="text-lg">阿星的笔记</strong>
        </section>
      </Link>
      <section className="sidebar-menu py-2" role="menubar">
        {/* SideSearchField */}
      </section>
      <NoteList notes={notes} />
    </nav>
  );
};

export default Sidebar;
