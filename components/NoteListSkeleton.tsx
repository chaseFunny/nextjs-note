import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const NoteListSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-[160px] mb-4 h-12 rounded-full" />
      <Skeleton className="w-[160px] mb-4 h-12 rounded-full" />
      <Skeleton className="w-[160px] mb-4 h-12 rounded-full" />
      <Skeleton className="w-[160px] mb-4 h-12 rounded-full" />
      <Skeleton className="w-[160px] mb-4 h-12 rounded-full" />
    </div>
  );
};

export default NoteListSkeleton;
