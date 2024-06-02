"use client";
import { useRouter } from "next/navigation";
import { type FC, memo, useState } from "react";
interface NoteListItemContentProps {
  id?: string;
  children?: React.ReactNode;
  expandedChildren?: React.ReactNode;
}
const NoteListItemContent: FC<NoteListItemContentProps> = ({
  id,
  children,
  expandedChildren,
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => router.push(`/note/${id}`)}
      className="rounded-md NoteListItemContent relative bg-purple-400 px-4 py-4 mb-4  transition-all duration-200"
    >
      <div className="absolute top-2 right-2  flex justify-start">
        <img
          onClick={(e) => {
            setIsExpanded(!isExpanded);
            e.stopPropagation();
          }}
          src="/icon/expand.svg"
          width="20px"
          height="20px"
          alt="Collapse"
          className={
            isExpanded
              ? "rotate-90  transition-all duration-200"
              : "rotate-0 transition-all duration-200"
          }
        />
        <img
          src={"/icon/delete.svg"}
          width="20px"
          height="20px"
          alt="Collapse"
        />
      </div>
      {children}
      {isExpanded && expandedChildren}
    </div>
  );
};

export default memo(NoteListItemContent);
