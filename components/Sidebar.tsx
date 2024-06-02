import NoteListSkeleton from "./NoteListSkeleton";
import Image from "next/image";
import Link from "next/link";
import NoteList from "./NoteList";
import { Suspense } from "react";
import SidebarSearchField from "./SidebarSearchField";
import NoteEditBtn from "./NoteEditBtn";
export interface NotesType {
  notes: Record<string, string>;
}
const Sidebar = () => {
  return (
    <nav className="w-[200px] bg-violet-200 rounded-md px-3 py-3 h-[90vh] overflow-y-auto">
      <Link href={"/"} className="link--unstyled">
        <section className="sidebar-header flex justify-center items-center">
          <Image
            className="mr-4"
            src="/logo.svg"
            width={32}
            height={32}
            alt="logo"
          />
          <strong className="text-lg">阿星的笔记</strong>
        </section>
      </Link>
      <section className="sidebar-menu" role="menubar">
        <SidebarSearchField />
        <NoteEditBtn noteId={null}>New</NoteEditBtn>
      </section>
      <Suspense fallback={<NoteListSkeleton />}>
        <NoteList />
      </Suspense>
    </nav>
  );
};

export default Sidebar;
