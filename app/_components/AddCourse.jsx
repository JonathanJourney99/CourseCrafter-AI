"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function AddCourse() {
  const { user } = useUser();
  return (
    <div className="flex item-center justify-between">
      <div>
        <h2 className="text-3xl">
          Hello, <span className="font-bold">{user?.fullName}</span>
        </h2>
        <p className="text-sm text-gray-500">
          Create a new Course with AI, Share with friends and Learn from it
        </p>
      </div>
      <Link href={"/create-course"}>
        <Button> + Create AI Course</Button>
      </Link>
    </div>
  );
}

export default AddCourse;
