"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import Service from "@/configs/Service";
import { useRouter } from "next/navigation";

function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null); // Set to null initially for better type checking
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);

  const GetCourse = async (unwrappedParams) => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, unwrappedParams.course_Id),
            eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
      setCourse(result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (unwrappedParams && user) {
      GetCourse(unwrappedParams);
    }
  }, [unwrappedParams, user]);

  const GenerateChapterContent = () => {
    setLoading(true);
    const chapters = course?.courseOutput?.course?.chapters;
    if (!chapters) return;

    chapters.forEach(async (chapter, index) => {
      const PROMPT =
        "Explain the concept in Detail on Topic:" +
        course?.name +
        ", Chapter:" +
        chapter?.chapterName +
        ", in JSON Format with list of array field as title, description in detail, Code Example(Code field in <precode> format) if applicable";
      console.log(PROMPT);
      if (index < 3) {
        try {
          let videoId = "";

          // Generate video URL
          console.log("Fetching videos for:", course?.name + ":" + chapter?.chapterName);
          const videos = await Service.getVideos(course?.name + ":" + chapter?.chapterName);
          console.log("Videos fetched:", videos);
          videoId = videos[0]?.id?.videoId;

          // Generate Chapter Content
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          const content = JSON.parse(await result?.response?.text());

          // Save Chapter Content + Video URL
          const respp = await db.insert(Chapters).values({
            chapterId: index,
            courseId: course?.courseId,
            content: content,
            videoId: videoId,
          }).returning({id:Chapters.id});
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
        await db.update(CourseList).set({
            publish:true
          })
        router.replace("/create-course/" + course?.courseId + "/finish");
      }
    });
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <LoadingDialog loading={loading} />
      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse(unwrappedParams)} />
      {/* Course Details */}
      <CourseDetail course={course} refreshData={() => GetCourse(unwrappedParams)} />

      {/* List Of Chapters */}
      <ChapterList course={course} />

      <Button className="my-10" onClick={GenerateChapterContent}>
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;
