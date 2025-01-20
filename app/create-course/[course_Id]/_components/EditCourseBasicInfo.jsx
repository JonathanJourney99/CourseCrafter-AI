import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  // Initialize state with course data
  useEffect(() => {
    if (course?.courseOutput?.course) {
      setName(course?.courseOutput?.course?.name || "");
      setDescription(course?.courseOutput?.course?.description || "");
    }
  }, [course]);

  const onUpdateHandler = async() => {
    if (course?.courseOutput?.course) {
      course.courseOutput.course.name = name;
      course.courseOutput.course.description = description;
      const result = await db.update(CourseList).set({
        courseOutput:course?.courseOutput
      }).where(eq(CourseList?.id,course?.id))
      .returning({id:CourseList.id})

      refreshData(true)

      console.log(result);
    //   console.log("Updated Course:", course);
    } else {
      console.error("Course structure is invalid or undefined.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label>Course Title</label>
              <Input
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <Textarea
                className="h-40"
                defaultValue={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditCourseBasicInfo;
