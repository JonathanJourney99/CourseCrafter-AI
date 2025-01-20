import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  let categoryImage = null;
  switch (course?.category?.toLowerCase()) {
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
      categoryImage = null;
  }

  const imageSrc = selectedFile || categoryImage;

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.course?.name}
            {edit && (
              <EditCourseBasicInfo
                className="mt-3"
                course={course}
                refreshData={() => refreshData(true)}
              />
            )}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.course?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <HiOutlinePuzzle />
            {course?.category}
          </h2>
          <Button className="w-full py-5 mt-4">Start</Button>
        </div>
        <div>
          <label htmlFor="upload-image">
            {imageSrc ? (
              <Image
                src={imageSrc}
                width={200}
                height={200}
                alt="Course Image"
                className="w-full rounded-xl object-cover h-[300px]"
              />
            ) : (
              <div className="w-full h-[300px] rounded-xl bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">No Image Available</p>
              </div>
            )}
          </label>
          {edit &&<input
            type="file"
            id="upload-image"
            className="opacity-0"
            onChange={onFileSelected}
          />}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
