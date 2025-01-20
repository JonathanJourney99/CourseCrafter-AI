"use client";

import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";

function CourseStart({ params }) {
  const [courseId, setCourseId] = useState(null);
  const [course, setCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [error, setError] = useState(null);
  const [chapterContent, setchapterContent] = useState();

  // Unwrap params directly
  const courseIdParam = React.use(params);

  useEffect(() => {
    if (courseIdParam?.courseId) {
      setCourseId(courseIdParam.courseId);
    }
  }, [courseIdParam]);

  useEffect(() => {
    if (courseId) {
      fetchCourse(courseId);
    }
  }, [courseId]);

  /**
   * Fetches course details from the database
   * @param {string} id - Course ID
   */
  const fetchCourse = async (id) => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList.courseId, id));
      if (result.length > 0) {
        setCourse(result[0]);
      } else {
        setError("Course not found");
      }
    } catch (error) {
      setError("Error fetching course data");
      console.error("Error fetching course:", error);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const GetSelectedChapterContent =async(ChapterId)=>{
    const result= await db.select().from(Chapters)
    .where(and(eq(Chapters.chapterId, ChapterId), 
    eq(Chapters.courseId, course?.courseId)));
    setchapterContent(result[0]);
    console.log(result[0]);

  }

  return (
    <div className="flex relative">
      {/* Chapter List Sidebar */}
      <div className="md:w-64 hidden md:block h-screen fixed border-r shadow-sm">
        <h2 className="font-medium text-lg bg-primary p-4 text-white">
          {course?.courseOutput?.course?.name || "Loading..."}
        </h2>
        <div>
          {course?.courseOutput?.course?.chapters?.length > 0 ? (
            course.courseOutput.course.chapters.map((chapter, index) => (
              <div
                key={index}
                className={`cursor-pointer hover:bg-purple-50 ${
                  selectedChapter?.chapterName === chapter?.chapterName
                    ? "bg-purple-100"
                    : ""
                }`}
                onClick={() => {setSelectedChapter(chapter);
                GetSelectedChapterContent(index)
                }}
              >
                <ChapterListCard chapter={chapter} index={index} />
              </div>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-500">No chapters available</p>
          )}
        </div>
      </div>

      {/* Content Div */}
      <div className="md:ml-64 flex-1 p-4">
      <ChapterContent chapter={selectedChapter}
      content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
