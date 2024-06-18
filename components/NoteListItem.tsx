import dayjs from "dayjs";
import Link from "next/link";
import NoteListItemContent from "./NoteListItemContent";

interface NoteListItemType {
  noteId: string;
  note: {
    title: string;
    updateTime: string;
  };
}
export default function NoteListItem({ n }: { n: NoteListItemType }) {
  console.log(n, "nnn");

  const { noteId, note } = n;
  const { title, updateTime } = note;
  return (
    <NoteListItemContent
      id={noteId}
      expandedChildren={<small>{dayjs(updateTime).format("YYYY-DD-MM")}</small>}
    >
      <Link href={`/note/${noteId}`}>
        <li key={noteId} className="bg-purple-400 rounded-md  ">
          <header className="sidebar-note-header flex flex-col">
            <strong className="mb-2">{title}</strong>
          </header>
        </li>
      </Link>
    </NoteListItemContent>
  );
}
