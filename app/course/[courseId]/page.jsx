"use client";
import Header from '@/app/_components/Header';
import ChapterList from '@/app/create-course/[course_Id]/_components/ChapterList';
import CourseBasicInfo from '@/app/create-course/[course_Id]/_components/CourseBasicInfo';
import CourseDetail from '@/app/create-course/[course_Id]/_components/CourseDetail';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';

function Course({ params }) {
  const [course, setCourse] = useState();
  const [unwrappedParams, setUnwrappedParams] = useState(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
    };

    fetchParams();
  }, [params]);

  useEffect(() => {
    const GetCourse = async () => {
      if (unwrappedParams?.courseId) {
        try {
          const result = await db
            .select()
            .from(CourseList)
            .where(eq(CourseList.courseId, unwrappedParams.courseId));
          console.log(result);
          setCourse(result[0]); 
        } catch (error) {
          console.error("Error fetching course:", error);
        }
      }
    };

    if (unwrappedParams) {
      GetCourse();
    }
  }, [unwrappedParams]);

  return (
    <div>
      <Header />
      <div className='px-10 p-10 md:px-20 lg:px-44'>
      <CourseBasicInfo course={course} edit={false}/>

      <CourseDetail course={course} />
      <ChapterList course={course} edit={false} />
      </div>
    </div>
  );
}

export default Course;
