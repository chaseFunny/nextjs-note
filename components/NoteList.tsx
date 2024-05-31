import { NotesType } from "./Sidebar";
import NoteListItem from "./NoteListItem";
import { getAllNotes } from "@/lib/redis";
import { sleep } from "@/lib/utils";

export default async function NoteList() {
  const notes: NotesType = await getAllNotes();
  const arr = Object.entries(notes);
  await sleep(500);
  if (arr.length == 0) {
    return <div className="notes-empty">{"还没笔记呢！"}</div>;
  }

  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        return (
          <NoteListItem key={noteId} n={{ note: JSON.parse(note), noteId }} />
        );
      })}
    </ul>
  );
}
