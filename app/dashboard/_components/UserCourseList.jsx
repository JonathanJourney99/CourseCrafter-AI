"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "../layout";

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const [userCourseListlen, setUserCourseListlen] = useContext(
    UserCourseListContext
  ); 
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        );

      setCourseList(result);
      setUserCourseListlen(result.length); 
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="font-medium text-lg">My Courses</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.length > 0
          ? courseList.map((course, index) => (
              <CourseCard
                course={course}
                key={index}
                refreshData={() => getUserCourses()}
              />
            ))
          : Array.from({ length: courseList?.length || 5 }).map((_, index) => (
              <div
                key={index}
                className="w-full bg-slate-400 animate-pulse rounded-lg h-[250px]"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default UserCourseList;
