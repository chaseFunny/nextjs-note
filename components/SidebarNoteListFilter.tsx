"use client";
import { useSearchParams } from "next/navigation";
import { type FC, memo } from "react";
import NoteListItemContent from "./NoteListItemContent";
interface noteItemType {
  noteId: string;
  note: Record<string, string>;
  header: React.ReactNode;
}
/** 过滤笔记，展示筛选后的笔记 */
const SidebarNoteListFilter: FC<{ notes: noteItemType[] }> = ({ notes }) => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q");
  return (
    <div className="SidebarNoteListFilter">
      <ul className="list">
        {notes.map((noteItem) => {
          const { noteId, note, header } = noteItem;
          if (
            !searchText ||
            (searchText &&
              note.title.toLowerCase().includes(searchText.toLowerCase()))
          ) {
            return (
              <li key={noteId}>
                <NoteListItemContent
                  key={noteId}
                  id={noteId}
                  expandedChildren={
                    <p className="sidebar-note-excerpt">
                      {note.content.substring(0, 20) || <i>(No content)</i>}
                    </p>
                  }
                >
                  {header}
                </NoteListItemContent>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </div>
  );
};

export default memo(SidebarNoteListFilter);
