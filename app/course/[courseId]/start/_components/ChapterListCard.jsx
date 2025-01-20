import React from "react";
import { HiOutlineClock } from "react-icons/hi";

function ChapterListCard({ chapter, index }) {
  return (
    <div className="flex items-center p-4 items-center border-b">
      <div className="p-1 bg-primary w-12 h-8 text-white rounded-full text-center flex items-center justify-center">
        {index + 1}
      </div>
      <div className="ml-4">
        <h2 className="font-medium">{chapter?.chapterName}</h2>
        <h2 className="flex items-center gap-2 text-sm text-primary font-bold">
          <HiOutlineClock className="font-extrabold text-lg"/>
          {chapter?.duration}
        </h2>
      </div>
    </div>
  );
}

export default ChapterListCard;
