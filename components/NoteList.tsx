import { getAllNotes } from "@/lib/redis";
import { sleep } from "@/lib/utils";
import Link from "next/link";
import { NotesType } from "./Sidebar";
import SidebarNoteListFilter from "./SidebarNoteListFilter";

export default async function NoteList() {
  const notes: NotesType = await getAllNotes();
  const arr = Object.entries(notes);
  await sleep(500);
  if (arr.length == 0) {
    return <div className="notes-empty">{"还没笔记呢！"}</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <Link href={`/note/${noteId}`}>
              <li key={noteId} className="bg-purple-400 rounded-md  ">
                <header className="sidebar-note-header flex flex-col">
                  <strong className="mb-2">{noteData.title}</strong>
                </header>
              </li>
            </Link>
          ),
        };
      })}
    />
  );
}
