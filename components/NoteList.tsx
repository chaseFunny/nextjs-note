import { NotesType } from "./Sidebar";
import NoteListItem from "./NoteListItem";

export default async function NoteList({ notes }: { notes: NotesType }) {
  const arr = Object.entries(notes);

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
