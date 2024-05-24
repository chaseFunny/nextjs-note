import dayjs from "dayjs";
import Link from "next/link";

interface NoteListItemType {
  noteId: string;
  note: {
    title: string;
    updateTime: string;
  };
}
export default function NoteListItem({ n }: { n: NoteListItemType }) {
  const { noteId, note } = n;
  const { title, updateTime } = note;
  return (
    <Link href={`/note/${noteId}`}>
      <li key={noteId} className="bg-purple-400 rounded-md mb-4 px-2 py-2">
        <header className="sidebar-note-header flex flex-col">
          <strong className="mb-2">{title}</strong>
          <small>{dayjs(updateTime).format("YYYY-DD-MM")}</small>
        </header>
      </li>
    </Link>
  );
}
