import { type FC, memo } from "react";

const NoteHeader: FC<{
  noteId: string | null;
  title: string;
}> = ({ noteId, title }) => {
  return (
    <div className="NoteHeader">
      <div key={noteId} className="bg-purple-400 rounded-md  ">
        <header className="sidebar-note-header flex flex-col">
          <strong className="mb-2">{title}</strong>
        </header>
      </div>
    </div>
  );
};

export default memo(NoteHeader);
