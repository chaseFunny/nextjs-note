import NoteEditor from "@/components/NoteEditor";
import { type FC, memo } from "react";

const NoteEditWithNew: FC = () => {
  return (
    <div className="NoteEditWithNew">
      <NoteEditor noteId={null} />
    </div>
  );
};

export default memo(NoteEditWithNew);
