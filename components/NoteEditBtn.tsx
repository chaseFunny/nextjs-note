"use client";
import Link from "next/link";
import { type FC, memo } from "react";
import { Button } from "./ui/button";

const NoteEditBtn: FC<{
  noteId: string | null;
  children?: React.ReactNode;
}> = ({ noteId, children }) => {
  return (
    <div className="NoteEditBtn">
      <Link href={`/note/edit/${noteId ?? ""}`}>
        <Button>
          {noteId ? "编辑" : "新增"}
          {children}
        </Button>
      </Link>
    </div>
  );
};

export default memo(NoteEditBtn);
