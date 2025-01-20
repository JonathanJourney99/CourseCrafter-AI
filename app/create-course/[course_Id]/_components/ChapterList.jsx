import React from "react";
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi";
import EditChapter from "./EditChapter";
function ChapterList({ course, refreshData, edit=true }) {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-2xl">Chapters</h2>
      <div className="mt-2">
        {course?.courseOutput?.course?.chapters?.length > 0 ? (
          course.courseOutput.course.chapters.map((chapter, index) => (
            <div
              key={index}
              className="border p-5 rounded-lg mb-2 flex items-center justify-between"
            >
              <div className="flex gap-5 items-center">
                <h2 className="bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2">
                  {index + 1}
                </h2>
                <div>
                  <h2 className="font-medium text-lg">
                    {chapter?.chapterName}{" "}
                   {edit &&<EditChapter
                      course={course}
                      index={index}
                      refreshData={refreshData}
                    />}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {chapter?.description}
                  </p>
                  <p className="flex gap-2 text-primary items-center">
                    <HiOutlineClock />
                    {chapter?.duration}
                  </p>
                </div>
              </div>
              <HiOutlineCheckCircle className="text-3xl text-gray-300 flex-none" />
            </div>
          ))
        ) : (
          <p>No chapters available</p>
        )}
      </div>
    </div>
  );
}

export default ChapterList;
