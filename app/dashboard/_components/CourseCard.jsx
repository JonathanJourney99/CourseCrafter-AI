import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen } from "react-icons/hi";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import DropDown from "./DropDown";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseCard({ course, refreshData, displayUser = false }) {
  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList?.id });

    if (resp) {
      refreshData();
    }
  };
  let categoryImage;
  switch (course?.courseOutput?.course?.category.toLowerCase()) {
    case "programming":
      categoryImage = "/programming.png";
      break;
    case "health":
      categoryImage = "/health.png";
      break;
    case "creative":
      categoryImage = "/creativity.jpg";
      break;
    default:
      categoryImage = None;
  }

  return (
    <div className="shadow-sm rounded-lg border p-2 cursor-pointer hover:border-primary">
      <Link href={"/course/" + course?.courseId}>
        <Image
          src={categoryImage}
          width={300}
          height={200}
          alt="banner"
          className="w-full h-[200px] object-cover"
        />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex justify-between items-center">
          {course?.courseOutput?.course?.name}
          {!displayUser&&<DropDown handleOnDelete={() => handleOnDelete()}>
            <HiMiniEllipsisVertical />
          </DropDown>}
        </h2>
        <p className="text-sm text-gray-400">
          {course?.courseOutput?.course?.category}
        </p>
        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm">
            <HiOutlineBookOpen />
            {course?.courseOutput?.course?.noofChapters} Chapters
          </h2>
          <h2 className="text-sm bg-purple-50 text-primary p-1 rounded-sm">
            {course?.level}
          </h2>
        </div>
       {displayUser&& <div className="flex gap-2 items-center mt-2">
          <Image
            src={course?.userProfileImage}
            width={35}
            height={35}
            alt="user-profile-image"
            className="rounded-full"
           
          />
          <h2 className="text-sm">{course?.username}</h2>
        </div>}
      </div>
    </div>
  );
}

export default CourseCard;
