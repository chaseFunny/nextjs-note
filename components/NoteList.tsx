import { getAllNotes } from "@/lib/redis";
import { sleep } from "@/lib/utils";
import NoteHeader from "./NoteHeader";
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
            <div key={noteId} className="bg-purple-400 rounded-md">
              <NoteHeader noteId={noteId} title={noteData.title} />
            </div>
          ),
        };
      })}
    />
  );
}
