"use client";
import dynamic from "next/dynamic";
import { type FC, memo } from "react";
const TagsList = dynamic(() => import("@/components/lowCode"), { ssr: false });

const lowCodePage: FC = () => {
  return (
    <div className="lowCodePage">
      <TagsList />
    </div>
  );
};

export default memo(lowCodePage);
