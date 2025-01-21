"use client";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

function Explore() {
  const [courseList, setcourseList] = useState([]);
  const [pageIndex, setpageIndex] = useState(0);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    const result = await db.select().from(CourseList).limit(9).offset(pageIndex*9);
    setcourseList(result); // Updated to handle the full result correctly.
    console.log(result);
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Explore More Projects</h1>
      <p>Explore More Projects built with AI</p>

      <div className="grid grid-cols-3 lg:grid-cols-4">
        {courseList?.map((course, index) => (
          <div key={index}>
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-5">
        {pageIndex!=0 &&<Button onClick={()=>setpageIndex(pageIndex-1)}>Previous Page</Button>}
        <Button onClick={()=>setpageIndex(pageIndex+1)}>Next Page</Button>
      </div>
    </div>
  );
}

export default Explore;
